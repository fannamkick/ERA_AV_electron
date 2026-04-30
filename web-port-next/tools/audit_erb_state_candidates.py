from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
WEB_PORT_NEXT_ROOT = Path(__file__).resolve().parents[1]
CSV_ROOT = REPO_ROOT / "original-game" / "CSV"
SCAN_JSON = WEB_PORT_NEXT_ROOT / "data" / "legacy-state-scan" / "erb-state-inventory.json"
OUT_JSON = WEB_PORT_NEXT_ROOT / "data" / "legacy-state-scan" / "erb-state-audit.json"
OUT_MD = WEB_PORT_NEXT_ROOT / "docs" / "ERB_STATE_AUDIT.ko.md"

CATALOG_FAMILIES = {
    "ITEMNAME",
    "ABLNAME",
    "TALENTNAME",
    "EXPNAME",
    "MARKNAME",
    "PALAMNAME",
    "TRAINNAME",
    "BASENAME",
    "SOURCENAME",
    "EXNAME",
    "EQUIPNAME",
    "TEQUIPNAME",
    "FLAGNAME",
    "CFLAGNAME",
    "TFLAGNAME",
    "STR",
    "PALAMLV",
    "EXPLV",
    "ITEMPRICE",
}

SCRIPT_FAMILIES = set("ABCDEFGHIJKLMNOPQRSTUVWXYZ") | {"LOCAL", "LOCALS", "ARG", "ARGS", "RESULT", "RESULTS", "COUNT"}

SESSION_FAMILIES = {
    "TARGET",
    "ASSI",
    "MASTER",
    "PLAYER",
    "TFLAG",
    "UP",
    "DOWN",
    "EJAC",
    "LOSEBASE",
    "SELECTCOM",
    "ASSIPLAY",
    "PREVCOM",
    "NEXTCOM",
    "SOURCE",
    "TEQUIP",
    "SAVESTR",
    "TSTR",
    "TCVAR",
    "CUP",
    "CDOWN",
    "DOWNBASE",
    "DITEMTYPE",
    "DA",
    "DB",
    "DC",
    "DD",
    "DE",
    "TA",
    "TB",
    "NOWEX",
}

PERSISTENT_FAMILIES = {
    "DAY",
    "TIME",
    "MONEY",
    "FLAG",
    "GLOBAL",
    "GLOBALS",
    "PBAND",
    "BASE",
    "MAXBASE",
    "ABL",
    "TALENT",
    "EXP",
    "MARK",
    "PALAM",
    "EX",
    "CFLAG",
    "JUEL",
    "STAIN",
    "GOTJUEL",
    "CSTR",
    "RELATION",
    "ITEM",
    "ITEMSALES",
    "BOUGHT",
    "NOITEM",
    "EQUIP",
    "ISASSI",
    "CHARASALES",
}

DYNAMIC_SCALAR_FAMILIES = {"CALLNAME", "NAME", "NICKNAME", "NO", "CHARANUM", "SAVEDATA"}

NAME_DEFINITION_FILES = {
    "ABL": "Abl.csv",
    "BASE": "BASE.csv",
    "MAXBASE": "BASE.csv",
    "TALENT": "Talent.csv",
    "EXP": "exp.csv",
    "MARK": "Mark.csv",
    "PALAM": "Palam.csv",
    "ITEM": "Item.csv",
    "ITEMSALES": "Item.csv",
    "BOUGHT": "Item.csv",
    "NOITEM": "Item.csv",
}

CHARA_ROW_TO_FAMILY = {
    "\u57fa\u790e": "BASE",
    "\u80fd\u529b": "ABL",
    "\u7d4c\u9a13": "EXP",
    "\u7d20\u8cea": "TALENT",
    "\u30d5\u30e9\u30b0": "CFLAG",
    "CFLAG": "CFLAG",
    "CSTR": "CSTR",
    "\u76f8\u6027": "RELATION",
}


def decode_text(path: Path) -> str:
    data = path.read_bytes()
    if data.startswith(b"\xff\xfe") or data.startswith(b"\xfe\xff"):
        return data.decode("utf-16")
    return data.decode("utf-8-sig", errors="replace")


def parse_index_csv(file_name: str) -> dict[int, str]:
    path = CSV_ROOT / file_name
    if not path.exists():
        return {}
    result: dict[int, str] = {}
    for raw_line in decode_text(path).splitlines():
        line = raw_line.strip()
        if not line or line.startswith(";"):
            continue
        columns = [column.strip() for column in line.split(",")]
        if columns and re.fullmatch(r"\d+", columns[0]):
            result[int(columns[0])] = columns[1] if len(columns) > 1 else ""
    return result


def read_name_maps() -> dict[str, dict[int, str]]:
    return {family: parse_index_csv(file_name) for family, file_name in NAME_DEFINITION_FILES.items()}


def read_chara_seed_indexes() -> dict[str, Counter[int]]:
    seed_indexes: dict[str, Counter[int]] = defaultdict(Counter)
    for path in sorted(CSV_ROOT.glob("Chara*.csv")):
        for raw_line in decode_text(path).splitlines():
            line = raw_line.strip()
            if not line or line.startswith(";"):
                continue
            columns = [column.strip() for column in line.split(",")]
            if len(columns) < 2:
                continue
            family = CHARA_ROW_TO_FAMILY.get(columns[0])
            if family and re.fullmatch(r"\d+", columns[1]):
                seed_indexes[family][int(columns[1])] += 1
    return seed_indexes


def slot_index(candidate: str) -> int | None:
    tail = candidate.rsplit(":", 1)[-1]
    if re.fullmatch(r"\d+", tail):
        return int(tail)
    return None


def bucket_family(family: str) -> str:
    if family in CATALOG_FAMILIES:
        return "not-runtime/definition-static"
    if family in SCRIPT_FAMILIES:
        return "not-domain/script-scratch"
    if family in SESSION_FAMILIES:
        return "runtime/session-buffer"
    if family in PERSISTENT_FAMILIES:
        return "runtime/persistent-candidate"
    if family in DYNAMIC_SCALAR_FAMILIES:
        return "runtime/dynamic-scalar-or-lookup"
    return "unknown/needs-review"


def classify_slot(slot: dict[str, Any], name_maps: dict[str, dict[int, str]], seed_indexes: dict[str, Counter[int]]) -> str:
    family = slot["family"]
    base_bucket = bucket_family(family)
    index = slot_index(slot["candidate"])
    has_name = index is not None and index in name_maps.get(family, {})
    has_seed = index is not None and index in seed_indexes.get(family, {})
    has_write = slot["writeCount"] > 0

    if base_bucket != "runtime/persistent-candidate":
        return base_bucket
    if has_name and has_seed:
        return "runtime/persistent/name+chara-seed+erb"
    if has_name:
        return "runtime/persistent/name+erb"
    if has_seed:
        return "runtime/persistent/chara-seed+erb"
    if has_write:
        return "runtime/persistent/erb-write-only-evidence"
    return "runtime/persistent/erb-read-only-evidence"


def classify_access_state(state: dict[str, Any]) -> str:
    family = state["family"]
    bucket = bucket_family(family)
    if state.get("numericSlotCandidate"):
        return f"{bucket}/numeric-access"
    return f"{bucket}/non-numeric-access"


def summarize_group(items: list[dict[str, Any]]) -> dict[str, Any]:
    return {
        "count": len(items),
        "totalOccurrences": sum(item["totalCount"] for item in items),
        "writeCandidates": sum(1 for item in items if item.get("writeCount", 0) > 0),
        "families": Counter(item["family"] for item in items).most_common(),
    }


def main() -> None:
    scan = json.loads(SCAN_JSON.read_text(encoding="utf-8"))
    name_maps = read_name_maps()
    seed_indexes = read_chara_seed_indexes()

    slot_groups: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for slot in scan["slotCandidates"]:
        index = slot_index(slot["candidate"])
        slot = {
            **slot,
            "index": index,
            "nameDefined": index is not None and index in name_maps.get(slot["family"], {}),
            "name": name_maps.get(slot["family"], {}).get(index) if index is not None else None,
            "charaSeedCount": seed_indexes.get(slot["family"], Counter()).get(index, 0) if index is not None else 0,
        }
        slot_groups[classify_slot(slot, name_maps, seed_indexes)].append(slot)

    access_groups: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for state in scan["states"]:
        access_groups[classify_access_state(state)].append(state)

    runtime_persistent = []
    for key, values in slot_groups.items():
        if key.startswith("runtime/persistent"):
            runtime_persistent.extend(values)

    runtime_persistent_supported = [
        slot
        for slot in runtime_persistent
        if slot["nameDefined"] or slot["charaSeedCount"] > 0 or slot["writeCount"] > 0
    ]
    runtime_session = slot_groups["runtime/session-buffer"]

    audit = {
        "schemaVersion": "erb-state-audit/v1",
        "summary": {
            "stateAccessKeys": scan["summary"]["uniqueStateAccessKeys"],
            "numericSlotCandidates": len(scan["slotCandidates"]),
            "definitionStaticNumericSlots": len(slot_groups["not-runtime/definition-static"]),
            "scriptScratchAccessKeys": sum(
                len(values) for key, values in access_groups.items() if key.startswith("not-domain/script-scratch")
            ),
            "runtimePersistentNumericSlots": len(runtime_persistent),
            "runtimePersistentSupportedSlots": len(runtime_persistent_supported),
            "runtimeSessionNumericSlots": len(runtime_session),
            "dynamicScalarOrLookupAccessKeys": sum(
                len(values) for key, values in access_groups.items() if key.startswith("runtime/dynamic-scalar-or-lookup")
            ),
            "persistentMissingMappingSlots": sum(1 for slot in runtime_persistent if "missingMapping" in slot["domains"]),
            "sessionMissingMappingSlots": sum(1 for slot in runtime_session if "missingMapping" in slot["domains"]),
        },
        "nameDefinitionSizes": {family: len(values) for family, values in sorted(name_maps.items())},
        "charaSeedIndexSizes": {family: len(values) for family, values in sorted(seed_indexes.items())},
        "slotGroups": {key: summarize_group(values) for key, values in sorted(slot_groups.items())},
        "accessGroups": {key: summarize_group(values) for key, values in sorted(access_groups.items())},
        "topPersistentErbOnly": sorted(
            slot_groups["runtime/persistent/erb-write-only-evidence"] + slot_groups["runtime/persistent/erb-read-only-evidence"],
            key=lambda item: item["totalCount"],
            reverse=True,
        )[:100],
        "topSession": sorted(runtime_session, key=lambda item: item["totalCount"], reverse=True)[:80],
        "topDynamicScalarOrLookup": sorted(
            [
                state
                for key, values in access_groups.items()
                if key.startswith("runtime/dynamic-scalar-or-lookup")
                for state in values
            ],
            key=lambda item: item["totalCount"],
            reverse=True,
        )[:80],
    }

    OUT_JSON.write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")
    write_markdown(audit)
    print(json.dumps(audit["summary"], ensure_ascii=False, indent=2))


def write_markdown(audit: dict[str, Any]) -> None:
    lines = [
        "# ERB 상태 후보 감사",
        "",
        "## 핵심 결론",
        "",
        f"- 상태 접근식 unique 수: {audit['summary']['stateAccessKeys']}",
        f"- 숫자 슬롯 후보 unique 수: {audit['summary']['numericSlotCandidates']}",
        f"- definition/static 숫자 슬롯: {audit['summary']['definitionStaticNumericSlots']}",
        f"- script/local 접근식: {audit['summary']['scriptScratchAccessKeys']}",
        f"- persistent 런타임 숫자 슬롯 후보: {audit['summary']['runtimePersistentNumericSlots']}",
        f"- persistent 후보 중 이름 정의, 캐릭터 seed, 또는 write 근거가 있는 슬롯: {audit['summary']['runtimePersistentSupportedSlots']}",
        f"- session/runtime buffer 숫자 슬롯 후보: {audit['summary']['runtimeSessionNumericSlots']}",
        f"- 동적/스칼라/lookup 접근식: {audit['summary']['dynamicScalarOrLookupAccessKeys']}",
        f"- persistent missingMapping 슬롯: {audit['summary']['persistentMissingMappingSlots']}",
        f"- session missingMapping 슬롯: {audit['summary']['sessionMissingMappingSlots']}",
        "",
        "## 숫자 슬롯 후보 분류",
        "",
        "| 분류 | 후보 수 | 발생 수 | write 후보 | 주요 family |",
        "| --- | ---: | ---: | ---: | --- |",
    ]
    for key, info in audit["slotGroups"].items():
        families = ", ".join(f"{family}:{count}" for family, count in info["families"][:10])
        lines.append(f"| `{key}` | {info['count']} | {info['totalOccurrences']} | {info['writeCandidates']} | {families} |")

    lines.extend(
        [
            "",
            "## 접근식 분류",
            "",
            "| 분류 | 접근식 수 | 발생 수 | write 후보 | 주요 family |",
            "| --- | ---: | ---: | ---: | --- |",
        ]
    )
    for key, info in audit["accessGroups"].items():
        families = ", ".join(f"{family}:{count}" for family, count in info["families"][:10])
        lines.append(f"| `{key}` | {info['count']} | {info['totalOccurrences']} | {info['writeCandidates']} | {families} |")

    lines.extend(
        [
            "",
            "## CSV 이름 정의 크기",
            "",
            "| family | 정의된 index 수 |",
            "| --- | ---: |",
        ]
    )
    for family, count in audit["nameDefinitionSizes"].items():
        lines.append(f"| `{family}` | {count} |")

    lines.extend(
        [
            "",
            "## 캐릭터 CSV seed index 크기",
            "",
            "| family | seed index 수 |",
            "| --- | ---: |",
        ]
    )
    for family, count in audit["charaSeedIndexSizes"].items():
        lines.append(f"| `{family}` | {count} |")

    lines.extend(
        [
            "",
            "## 이름/seed 없이 ERB 근거만 있는 persistent 상위 후보",
            "",
            "| slot | 발생 수 | write | files | 도메인 후보 |",
            "| --- | ---: | ---: | ---: | --- |",
        ]
    )
    for slot in audit["topPersistentErbOnly"][:50]:
        lines.append(
            f"| `{slot['candidate']}` | {slot['totalCount']} | {slot['writeCount']} | {slot['fileCount']} | `{slot['domains']}` |"
        )

    lines.extend(
        [
            "",
            "## session/runtime buffer 상위 후보",
            "",
            "| slot | 발생 수 | write | files | 도메인 후보 |",
            "| --- | ---: | ---: | ---: | --- |",
        ]
    )
    for slot in audit["topSession"][:50]:
        lines.append(
            f"| `{slot['candidate']}` | {slot['totalCount']} | {slot['writeCount']} | {slot['fileCount']} | `{slot['domains']}` |"
        )

    lines.extend(
        [
            "",
            "## 동적/스칼라/lookup 접근식 상위 후보",
            "",
            "| 접근식 | 발생 수 | write | files | family |",
            "| --- | ---: | ---: | ---: | --- |",
        ]
    )
    for state in audit["topDynamicScalarOrLookup"][:50]:
        lines.append(
            f"| `{state['key']}` | {state['totalCount']} | {state['writeCount']} | {state['fileCount']} | `{state['family']}` |"
        )

    lines.extend(
        [
            "",
            "## 한계",
            "",
            "- `definition/static`: 정의 데이터.",
            "- `script/local`: 계산용 프레임.",
            "- `persistent/name+erb`: 이름 CSV 정의와 ERB 사용 근거가 있는 슬롯.",
            "- `persistent/chara-seed+erb`: 캐릭터 CSV 초기값과 ERB 사용 근거가 있는 슬롯.",
            "- `persistent/erb-write-only-evidence`: CSV 이름/seed 없이 ERB write가 확인된 슬롯.",
            "- `session-buffer`: 기능 실행 중 관리해야 하는 런타임 상태.",
            "",
        ]
    )
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
