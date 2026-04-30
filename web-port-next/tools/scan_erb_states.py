from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
WEB_PORT_NEXT_ROOT = Path(__file__).resolve().parents[1]
ORIGINAL_ROOT = REPO_ROOT / "original-game"
ERB_ROOT = ORIGINAL_ROOT / "ERB"
VARIABLE_SIZE_CSV = ORIGINAL_ROOT / "CSV" / "VariableSize.CSV"
OUT_DIR = WEB_PORT_NEXT_ROOT / "data" / "legacy-state-scan"
OUT_JSON = OUT_DIR / "erb-state-inventory.json"
OUT_MD = WEB_PORT_NEXT_ROOT / "docs" / "ERB_STATE_SCAN.ko.md"

EXTRA_STATE_NAMES = {
    "ISASSI",
    "ITEMPRICE",
    "CHARASALES",
    "CALLNAME",
    "NAME",
    "NICKNAME",
    "NO",
    "SAVEDATA",
    "CHARANUM",
}

OPERATION_NAMES = {
    "INPUT",
    "WAIT",
    "DRAWLINE",
    "GETCHARA",
    "ADDCHARA",
    "DELCHARA",
    "SAVEGAME",
    "LOADGAME",
    "SAVEDATA",
    "CALL",
    "CALLFORM",
    "TRYCALL",
    "TRYCCALLFORM",
    "GOTO",
    "JUMP",
    "RETURN",
    "RAND",
    "RANDCHOOSE",
    "RANDCHOOSE_NUM",
    "DOTRAIN",
}

WRITE_OPERATORS = ("+=", "-=", "*=", "/=", "%=", "|=", "&=", "=")
SCRIPT_FAMILIES = set("ABCDEFGHIJKLMNOPQRSTUVWXYZ") | {"LOCAL", "LOCALS", "ARG", "ARGS", "RESULT", "RESULTS", "COUNT"}

DOMAIN_BY_FAMILY: dict[str, str] = {
    "ITEMNAME": "definitions",
    "ABLNAME": "definitions",
    "TALENTNAME": "definitions",
    "EXPNAME": "definitions",
    "MARKNAME": "definitions",
    "PALAMNAME": "definitions",
    "TRAINNAME": "definitions",
    "BASENAME": "definitions",
    "SOURCENAME": "definitions",
    "EXNAME": "definitions",
    "EQUIPNAME": "definitions",
    "TEQUIPNAME": "definitions",
    "FLAGNAME": "definitions",
    "CFLAGNAME": "definitions",
    "TFLAGNAME": "definitions",
    "STR": "definitions|text",
    "PALAMLV": "definitions",
    "EXPLV": "definitions",
    "DAY": "run",
    "TIME": "run",
    "MONEY": "economy",
    "ITEM": "inventory",
    "ITEMSALES": "inventory|feature-state",
    "BOUGHT": "inventory",
    "NOITEM": "inventory",
    "EQUIP": "equipment",
    "RELATION": "social",
    "FLAG": "world|missingMapping",
    "GLOBAL": "world",
    "GLOBALS": "world|text",
    "PBAND": "world|missingMapping",
    "TARGET": "feature-session",
    "ASSI": "feature-session",
    "MASTER": "feature-session",
    "PLAYER": "feature-session",
    "TFLAG": "feature-session|interaction|missingMapping",
    "UP": "feature-session",
    "DOWN": "feature-session",
    "EJAC": "interaction|feature-session",
    "LOSEBASE": "feature-session|body",
    "SELECTCOM": "feature-session",
    "ASSIPLAY": "feature-session",
    "PREVCOM": "feature-session",
    "NEXTCOM": "feature-session",
    "SOURCE": "feature-session",
    "TEQUIP": "feature-session|interaction|equipment|missingMapping",
    "SAVESTR": "feature-session|text|script",
    "TSTR": "feature-session|script",
    "TCVAR": "feature-session",
    "CUP": "feature-session",
    "CDOWN": "feature-session",
    "DOWNBASE": "feature-session",
    "DITEMTYPE": "feature-session|inventory",
    "DA": "feature-session|script",
    "DB": "feature-session|script",
    "DC": "feature-session|script",
    "DD": "feature-session|script",
    "DE": "feature-session|script",
    "TA": "feature-session|script",
    "TB": "feature-session|script",
    "RESULT": "script|ui-session",
    "RESULTS": "script|ui-session|save",
    "COUNT": "script",
    "LOCAL": "script",
    "LOCALS": "script",
    "ARG": "script",
    "ARGS": "script",
    "ISASSI": "people",
    "ITEMPRICE": "definitions",
    "CHARASALES": "feature-state|economy",
    "CALLNAME": "people|text",
    "NAME": "people|text",
    "NICKNAME": "people|text",
    "NO": "people",
    "SAVEDATA": "save",
    "CHARANUM": "people",
}

PEOPLE_OR_BODY = {
    "BASE",
    "MAXBASE",
    "TALENT",
    "EXP",
    "MARK",
    "PALAM",
    "EX",
    "CFLAG",
    "JUEL",
    "STAIN",
    "GOTJUEL",
    "NOWEX",
    "CSTR",
    "ABL",
}

DOMAIN_BY_FAMILY.update(
    {
        "BASE": "body|people",
        "MAXBASE": "body|people",
        "ABL": "people",
        "TALENT": "people|body|missingMapping",
        "EXP": "people|body|missingMapping",
        "MARK": "people|body",
        "PALAM": "body|feature-session",
        "EX": "people|body|missingMapping",
        "CFLAG": "people|body|feature-state|world|missingMapping",
        "JUEL": "body|people",
        "STAIN": "body",
        "GOTJUEL": "body|feature-session",
        "NOWEX": "feature-session",
        "CSTR": "text|people|body|missingMapping",
    }
)

for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
    DOMAIN_BY_FAMILY.setdefault(letter, "script")


@dataclass
class Evidence:
    file: str
    line: int
    text: str


@dataclass
class StateRecord:
    family: str
    key: str
    domain: str
    read_count: int = 0
    write_count: int = 0
    operators: Counter[str] = field(default_factory=Counter)
    files: Counter[str] = field(default_factory=Counter)
    samples: list[Evidence] = field(default_factory=list)

    def add(self, kind: str, operator: str, rel_path: str, line_number: int, line_text: str) -> None:
        if kind == "write":
            self.write_count += 1
        else:
            self.read_count += 1
        self.operators[operator] += 1
        self.files[rel_path] += 1
        if len(self.samples) < 8:
            self.samples.append(Evidence(rel_path, line_number, line_text.strip()))


def decode_text(path: Path) -> str:
    data = path.read_bytes()
    if data.startswith(b"\xff\xfe") or data.startswith(b"\xfe\xff"):
        return data.decode("utf-16")
    for encoding in ("utf-8-sig", "utf-8", "cp932", "shift_jis", "cp949", "euc_kr"):
        try:
            return data.decode(encoding)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace")


def read_variable_names() -> set[str]:
    names: set[str] = set()
    text = decode_text(VARIABLE_SIZE_CSV)
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith(";"):
            continue
        name = line.split(",", 1)[0].strip().upper()
        if re.fullmatch(r"[A-Z][A-Z0-9_]*", name):
            names.add(name)
    names.update(EXTRA_STATE_NAMES)
    names.update(set("ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
    return names


def strip_comment(line: str) -> str:
    stripped = line.lstrip()
    if stripped.startswith(";"):
        return ""
    return line.split(";", 1)[0]


def is_word_boundary(line: str, start: int, end: int) -> bool:
    before = line[start - 1] if start > 0 else ""
    after = line[end] if end < len(line) else ""
    return not (before.isalnum() or before == "_") and not (after.isalnum() or after == "_")


def consume_balanced(line: str, start: int, open_char: str, close_char: str) -> tuple[str, int]:
    depth = 0
    pos = start
    while pos < len(line):
        char = line[pos]
        if char == open_char:
            depth += 1
        elif char == close_char:
            depth -= 1
            if depth == 0:
                pos += 1
                return line[start:pos], pos
        pos += 1
    return line[start:pos], pos


def consume_index_expr(line: str, start: int) -> tuple[str, int]:
    pos = start
    while pos < len(line) and line[pos].isspace():
        pos += 1
    if pos >= len(line):
        return "", pos
    if line[pos] == "(":
        return consume_balanced(line, pos, "(", ")")
    if line[pos] == "[":
        return consume_balanced(line, pos, "[", "]")

    begin = pos
    while pos < len(line):
        char = line[pos]
        if char in ", \t\r\n=+-*/%<>!&|)]}":
            break
        if char == ";":
            break
        if char == ":":
            break
        pos += 1
    return line[begin:pos].strip(), pos


def parse_ref(line: str, start: int, name: str) -> tuple[str, int]:
    pos = start + len(name)
    indices: list[str] = []
    while True:
        scan = pos
        while scan < len(line) and line[scan].isspace():
            scan += 1
        if scan >= len(line) or line[scan] != ":":
            break
        expr, next_pos = consume_index_expr(line, scan + 1)
        if not expr:
            break
        indices.append(re.sub(r"\s+", " ", expr.strip()))
        pos = next_pos
    key = name if not indices else f"{name}:{':'.join(indices)}"
    return key, pos


def classify_usage(line: str, pos: int) -> tuple[str, str]:
    scan = pos
    while scan < len(line) and line[scan].isspace():
        scan += 1
    tail = line[scan : scan + 2]
    if tail in ("++", "--"):
        return "write", tail
    for op in WRITE_OPERATORS:
        if line.startswith(op, scan):
            if op == "=" and scan + 1 < len(line) and line[scan + 1] in ("=", ">"):
                return "read", "read"
            return "write", op
    return "read", "read"


def infer_domain(family: str, key: str) -> str:
    if key in {"FLAG:1", "FLAG:2"}:
        return "run"
    if key in {"TFLAG:899", "TFLAG:860", "TFLAG:900", "TFLAG:901"}:
        return "feature-session"
    if key in {"SAVESTR:0", "SAVESTR:2", "SAVESTR:3"}:
        return "feature-session"
    if family in PEOPLE_OR_BODY and family not in DOMAIN_BY_FAMILY:
        return "people|body|missingMapping"
    return DOMAIN_BY_FAMILY.get(family, "legacy-adapter|missingMapping")


def split_key_indices(key: str, family: str) -> list[str]:
    rest = key[len(family) :]
    if rest.startswith(":"):
        rest = rest[1:]
    if not rest:
        return []

    parts: list[str] = []
    current = ""
    depth = 0
    for char in rest:
        if char == "(":
            depth += 1
            current += char
        elif char == ")":
            depth = max(0, depth - 1)
            current += char
        elif char == ":" and depth == 0:
            if current.strip():
                parts.append(current.strip())
            current = ""
        else:
            current += char
    if current.strip():
        parts.append(current.strip())
    return parts


def numeric_slot_candidate(record: StateRecord) -> str | None:
    if record.family in SCRIPT_FAMILIES:
        return None
    indices = split_key_indices(record.key, record.family)
    numeric_indices = [index for index in indices if re.fullmatch(r"\d+", index)]
    if not numeric_indices:
        return None
    if record.family == "RELATION" and len(numeric_indices) >= 2:
        return f"{record.family}:{':'.join(numeric_indices[-2:])}"
    return f"{record.family}:{numeric_indices[-1]}"


def scan_states(variable_names: set[str]) -> dict[str, StateRecord]:
    states: dict[str, StateRecord] = {}
    sorted_names = sorted(variable_names, key=len, reverse=True)

    for path in sorted(ERB_ROOT.rglob("*.ERB")):
        rel_path = path.relative_to(REPO_ROOT).as_posix()
        text = decode_text(path)
        for line_number, raw_line in enumerate(text.splitlines(), start=1):
            line = strip_comment(raw_line)
            if not line.strip():
                continue
            upper_line = line.upper()
            cursor = 0
            while cursor < len(line):
                match_name = None
                match_start = -1
                for name in sorted_names:
                    idx = upper_line.find(name, cursor)
                    if idx < 0:
                        continue
                    end = idx + len(name)
                    if is_word_boundary(upper_line, idx, end):
                        if match_start < 0 or idx < match_start:
                            match_name = name
                            match_start = idx
                    if match_start == cursor:
                        break
                if match_name is None:
                    break
                key, end_pos = parse_ref(line, match_start, match_name)
                kind, operator = classify_usage(line, end_pos)
                domain = infer_domain(match_name, key)
                record = states.setdefault(key, StateRecord(match_name, key, domain))
                record.add(kind, operator, rel_path, line_number, raw_line)
                cursor = max(end_pos, match_start + len(match_name))

    return states


def scan_declarations() -> list[dict[str, Any]]:
    declarations: list[dict[str, Any]] = []
    pattern = re.compile(r"^\s*#(DIM|DIMS|DIMCONST|DIMSCONST)\s+(.+)$", re.IGNORECASE)
    for path in sorted(ERB_ROOT.rglob("*.ERB")):
        rel_path = path.relative_to(REPO_ROOT).as_posix()
        text = decode_text(path)
        for line_number, raw_line in enumerate(text.splitlines(), start=1):
            match = pattern.match(strip_comment(raw_line))
            if not match:
                continue
            kind = match.group(1).upper()
            body = match.group(2).strip()
            name = re.split(r"[\s,=]", body, maxsplit=1)[0].strip()
            declarations.append(
                {
                    "kind": kind,
                    "name": name,
                    "domain": "script",
                    "file": rel_path,
                    "line": line_number,
                    "text": raw_line.strip(),
                }
            )
    return declarations


def scan_operations() -> dict[str, Any]:
    operation_counts: dict[str, Counter[str]] = {name: Counter() for name in OPERATION_NAMES}
    label_counts: Counter[str] = Counter()
    label_samples: list[dict[str, Any]] = []
    operation_pattern = re.compile(r"\b(" + "|".join(sorted(OPERATION_NAMES, key=len, reverse=True)) + r")\b", re.IGNORECASE)
    label_pattern = re.compile(r"^\s*@([A-Za-z0-9_가-힣ぁ-んァ-ン一-龥]+)")

    for path in sorted(ERB_ROOT.rglob("*.ERB")):
        rel_path = path.relative_to(REPO_ROOT).as_posix()
        text = decode_text(path)
        for line_number, raw_line in enumerate(text.splitlines(), start=1):
            line = strip_comment(raw_line)
            if not line.strip():
                continue
            for match in operation_pattern.finditer(line):
                operation_counts[match.group(1).upper()][rel_path] += 1
            label_match = label_pattern.match(line)
            if label_match:
                label = label_match.group(1)
                label_counts[label] += 1
                if len(label_samples) < 20:
                    label_samples.append({"label": label, "file": rel_path, "line": line_number, "text": raw_line.strip()})

    return {
        "operations": {
            name: {"count": sum(files.values()), "files": len(files)}
            for name, files in sorted(operation_counts.items())
            if sum(files.values()) > 0
        },
        "labels": {
            "unique": len(label_counts),
            "totalDefinitions": sum(label_counts.values()),
            "top": label_counts.most_common(30),
            "samples": label_samples,
        },
    }


def state_to_json(record: StateRecord) -> dict[str, Any]:
    slot_candidate = numeric_slot_candidate(record)
    return {
        "key": record.key,
        "family": record.family,
        "domain": record.domain,
        "numericSlotCandidate": slot_candidate,
        "readCount": record.read_count,
        "writeCount": record.write_count,
        "totalCount": record.read_count + record.write_count,
        "operators": dict(record.operators),
        "fileCount": len(record.files),
        "topFiles": record.files.most_common(10),
        "samples": [e.__dict__ for e in record.samples],
    }


def write_markdown(payload: dict[str, Any]) -> None:
    families = payload["summary"]["families"]
    domains = payload["summary"]["domains"]
    operations = payload["operations"]["operations"]
    labels = payload["operations"]["labels"]
    top_states = sorted(payload["states"], key=lambda item: item["totalCount"], reverse=True)[:40]
    top_slots = sorted(payload["slotCandidates"], key=lambda item: item["totalCount"], reverse=True)[:40]
    missing_states = [state for state in payload["states"] if "missingMapping" in state["domain"]]
    missing_slots = [slot for slot in payload["slotCandidates"] if "missingMapping" in slot["domains"]]

    lines = [
        "# ERB 상태 스캔",
        "",
        "## 스캔 범위",
        "",
        f"- ERB 파일 수: {payload['summary']['erbFileCount']}",
        f"- 상태 접근식 unique key 수: {payload['summary']['uniqueStateAccessKeys']}",
        f"- 숫자 슬롯 후보 unique 수: {payload['summary']['uniqueNumericSlotCandidates']}",
        f"- script/local 접근식 unique 수: {payload['summary']['scriptAccessKeys']}",
        f"- 동적/스칼라 비-script 접근식 unique 수: {payload['summary']['dynamicNonNumericAccessKeys']}",
        f"- 상태 참조 총 발생 수: {payload['summary']['totalStateOccurrences']}",
        f"- #DIM/#DIMS 선언 수: {payload['summary']['declaredLocalCount']}",
        f"- 라벨 unique 수: {labels['unique']}",
        f"- 라벨 정의 총 수: {labels['totalDefinitions']}",
        f"- missingMapping 포함 접근식 unique 수: {len(missing_states)}",
        f"- missingMapping 포함 숫자 슬롯 후보 unique 수: {len(missing_slots)}",
        "",
        "## 도메인 후보별 상태 key 수",
        "",
        "| 도메인 후보 | unique key | 발생 수 |",
        "| --- | ---: | ---: |",
    ]
    for domain, info in sorted(domains.items(), key=lambda item: item[0]):
        lines.append(f"| `{domain}` | {info['uniqueKeys']} | {info['occurrences']} |")

    lines.extend(["", "## family별 상태 key 수", "", "| family | unique key | 발생 수 |", "| --- | ---: | ---: |"])
    for family, info in sorted(families.items(), key=lambda item: item[0]):
        lines.append(f"| `{family}` | {info['uniqueKeys']} | {info['occurrences']} |")

    lines.extend(["", "## 가장 많이 등장한 숫자 슬롯 후보", "", "| slot candidate | family | 도메인 후보 | 접근식 수 | 발생 수 | files |", "| --- | --- | --- | ---: | ---: | ---: |"])
    for slot in top_slots:
        lines.append(
            f"| `{slot['candidate']}` | `{slot['family']}` | `{slot['domains']}` | {slot['accessKeyCount']} | {slot['totalCount']} | {slot['fileCount']} |"
        )

    lines.extend(["", "## 가장 많이 등장한 상태 접근식", "", "| key | slot candidate | 도메인 후보 | read | write | files |", "| --- | --- | --- | ---: | ---: | ---: |"])
    for state in top_states:
        lines.append(
            f"| `{state['key']}` | `{state['numericSlotCandidate'] or ''}` | `{state['domain']}` | {state['readCount']} | {state['writeCount']} | {state['fileCount']} |"
        )

    lines.extend(
        [
            "",
            "## missingMapping 포함 상태",
            "",
            f"- 총 {len(missing_states)}개 접근식 unique key가 `missingMapping` 후보를 포함한다.",
            f"- 총 {len(missing_slots)}개 숫자 슬롯 후보가 `missingMapping` 후보를 포함한다.",
            "",
            "| slot candidate | family | 도메인 후보 | 접근식 수 | 발생 수 | files |",
            "| --- | --- | --- | ---: | ---: | ---: |",
        ]
    )
    for slot in sorted(missing_slots, key=lambda item: item["totalCount"], reverse=True)[:120]:
        lines.append(f"| `{slot['candidate']}` | `{slot['family']}` | `{slot['domains']}` | {slot['accessKeyCount']} | {slot['totalCount']} | {slot['fileCount']} |")

    lines.extend(["", "## ERB operation 집계", "", "| operation | 발생 수 | files |", "| --- | ---: | ---: |"])
    for name, info in sorted(operations.items(), key=lambda item: item[0]):
        lines.append(f"| `{name}` | {info['count']} | {info['files']} |")

    lines.extend(
        [
            "",
            "## 산출물",
            "",
            "- 전체 JSON: `data/legacy-state-scan/erb-state-inventory.json`",
            "- 재생성 명령: `npm run scan:erb-states`",
            "",
            "## 한계",
            "",
            "- 이 스캔은 ERB의 상태 참조를 빠뜨리지 않기 위한 기계 추출이다.",
            "- 슬롯의 최종 의미는 자동 확정하지 않는다.",
            "- `missingMapping`이 포함된 항목은 별도 슬롯 사전에서 승인해야 한다.",
            "- 동적 `CALLFORM`이나 문자열 조합으로 만들어지는 의미는 operation/label 근거로 따로 검토해야 한다.",
            "",
        ]
    )
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    variable_names = read_variable_names()
    states = scan_states(variable_names)
    declarations = scan_declarations()
    operations = scan_operations()

    family_summary: dict[str, dict[str, int]] = defaultdict(lambda: {"uniqueKeys": 0, "occurrences": 0})
    domain_summary: dict[str, dict[str, int]] = defaultdict(lambda: {"uniqueKeys": 0, "occurrences": 0})
    state_json = [state_to_json(record) for record in sorted(states.values(), key=lambda item: item.key)]
    slot_groups: dict[str, dict[str, Any]] = {}

    for state in state_json:
        total = state["totalCount"]
        family_summary[state["family"]]["uniqueKeys"] += 1
        family_summary[state["family"]]["occurrences"] += total
        domain_summary[state["domain"]]["uniqueKeys"] += 1
        domain_summary[state["domain"]]["occurrences"] += total
        candidate = state["numericSlotCandidate"]
        if candidate:
            group = slot_groups.setdefault(
                candidate,
                {
                    "candidate": candidate,
                    "family": state["family"],
                    "domains": set(),
                    "accessKeys": set(),
                    "totalCount": 0,
                    "readCount": 0,
                    "writeCount": 0,
                    "files": set(),
                    "samples": [],
                },
            )
            group["domains"].add(state["domain"])
            group["accessKeys"].add(state["key"])
            group["totalCount"] += total
            group["readCount"] += state["readCount"]
            group["writeCount"] += state["writeCount"]
            for file_name, _count in state["topFiles"]:
                group["files"].add(file_name)
            if len(group["samples"]) < 8:
                group["samples"].extend(state["samples"][: max(0, 8 - len(group["samples"]))])

    slot_candidates = []
    for group in slot_groups.values():
        slot_candidates.append(
            {
                "candidate": group["candidate"],
                "family": group["family"],
                "domains": "|".join(sorted(group["domains"])),
                "accessKeyCount": len(group["accessKeys"]),
                "totalCount": group["totalCount"],
                "readCount": group["readCount"],
                "writeCount": group["writeCount"],
                "fileCount": len(group["files"]),
                "sampleAccessKeys": sorted(group["accessKeys"])[:20],
                "samples": group["samples"][:8],
            }
        )
    slot_candidates.sort(key=lambda item: item["candidate"])

    script_access_keys = sum(1 for state in state_json if state["family"] in SCRIPT_FAMILIES)
    dynamic_non_numeric_access_keys = sum(
        1 for state in state_json if state["family"] not in SCRIPT_FAMILIES and not state["numericSlotCandidate"]
    )

    payload = {
        "schemaVersion": "erb-state-scan/v1",
        "sourceRoot": str(ORIGINAL_ROOT.relative_to(REPO_ROOT)).replace("\\", "/"),
        "summary": {
            "erbFileCount": len(list(ERB_ROOT.rglob("*.ERB"))),
            "variableFamilies": len(variable_names),
            "uniqueStateKeys": len(state_json),
            "uniqueStateAccessKeys": len(state_json),
            "uniqueNumericSlotCandidates": len(slot_candidates),
            "scriptAccessKeys": script_access_keys,
            "dynamicNonNumericAccessKeys": dynamic_non_numeric_access_keys,
            "totalStateOccurrences": sum(item["totalCount"] for item in state_json),
            "declaredLocalCount": len(declarations),
            "families": dict(sorted(family_summary.items())),
            "domains": dict(sorted(domain_summary.items())),
        },
        "states": state_json,
        "slotCandidates": slot_candidates,
        "declaredLocals": declarations,
        "operations": operations,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    write_markdown(payload)
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
