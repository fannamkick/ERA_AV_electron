from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass
from io import StringIO
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
WEB_PORT_NEXT_ROOT = Path(__file__).resolve().parents[1]
CSV_ROOT = REPO_ROOT / "original-game" / "CSV"
OUT_DIR = WEB_PORT_NEXT_ROOT / "data" / "catalog"
OUT_JSON = OUT_DIR / "legacy-catalog.json"
OUT_DEFINITIONS_TSV = OUT_DIR / "legacy-catalog-definitions.tsv"
OUT_CHARACTERS_TSV = OUT_DIR / "legacy-character-templates.tsv"
OUT_CHARACTER_INITIAL_VALUES_TSV = OUT_DIR / "legacy-character-initial-values.tsv"
OUT_MD = WEB_PORT_NEXT_ROOT / "docs" / "CSV_CATALOG_COLLECTION.ko.md"


ENCODING_CANDIDATES = ("utf-8-sig", "utf-8", "cp932", "shift_jis", "cp949", "euc_kr")


@dataclass(frozen=True)
class CatalogInputSpec:
    file_name: str
    catalog_key: str
    family: str
    kind: str


INPUT_SPECS = (
    CatalogInputSpec("Item.csv", "items", "ITEM", "item"),
    CatalogInputSpec("Abl.csv", "abilities", "ABL", "definition"),
    CatalogInputSpec("BASE.csv", "baseStats", "BASE", "definition"),
    CatalogInputSpec("Talent.csv", "talents", "TALENT", "definition"),
    CatalogInputSpec("exp.csv", "experiences", "EXP", "definition"),
    CatalogInputSpec("Mark.csv", "marks", "MARK", "definition"),
    CatalogInputSpec("Palam.csv", "trainingParams", "PALAM", "definition"),
    CatalogInputSpec("Train.csv", "trainingCommands", "TRAIN", "definition"),
    CatalogInputSpec("source.csv", "sourceDefinitions", "SOURCE", "definition"),
    CatalogInputSpec("CSTR.csv", "characterTextDefinitions", "CSTR", "cstr"),
    CatalogInputSpec("cflag.csv", "legacyCharacterFlagDefinitions", "CFLAG", "prefixed"),
)


CATALOG_KEYS = (
    "characters",
    "baseStats",
    "abilities",
    "talents",
    "experiences",
    "marks",
    "trainingParams",
    "trainingCommands",
    "sourceDefinitions",
    "characterTextDefinitions",
    "legacyCharacterFlagDefinitions",
    "items",
    "shopListings",
    "thresholds",
)

CHARA_IDENTITY_ROWS = {
    "\u756a\u53f7": "id",
    "\u540d\u524d": "displayName",
    "\u547c\u3073\u540d": "callName",
    "\u3042\u3060\u540d": "nickname",
}

CHARA_INITIAL_ROWS = {
    "\u57fa\u790e": ("BASE", "baseStats", "number"),
    "\u80fd\u529b": ("ABL", "abilities", "number"),
    "\u7d4c\u9a13": ("EXP", "experiences", "number"),
    "\u7d20\u8cea": ("TALENT", "talents", "boolean"),
    "\u30d5\u30e9\u30b0": ("CFLAG", "characterFlags", "number"),
    "CFLAG": ("CFLAG", "characterFlags", "number"),
    "CSTR": ("CSTR", "characterTexts", "text"),
    "\u76f8\u6027": ("RELATION", "relations", "number"),
}


def relative_path(path: Path) -> str:
    try:
        return path.relative_to(REPO_ROOT).as_posix()
    except ValueError:
        return path.as_posix()


def empty_catalog() -> dict[str, dict[str, Any]]:
    return {key: {} for key in CATALOG_KEYS}


def resolve_input_path(spec: CatalogInputSpec) -> tuple[Path | None, list[str]]:
    primary = CSV_ROOT / spec.file_name
    if primary.exists():
        return primary, []

    if spec.file_name.lower() not in {"source.csv", "cflag.csv"}:
        return None, []

    candidates = sorted(
        path
        for path in REPO_ROOT.glob(f"*/{spec.file_name}")
        if path.is_file() and path.parent.name not in {"web-port", "web-port-next"}
    )
    return (candidates[0] if candidates else None), [relative_path(path) for path in candidates]


def decode_text(path: Path) -> tuple[str, str, str | None]:
    data = path.read_bytes()
    if data.startswith(b"\xff\xfe") or data.startswith(b"\xfe\xff"):
        try:
            return data.decode("utf-16"), "utf-16", None
        except UnicodeDecodeError as error:
            return data.decode("utf-16", errors="replace"), "utf-16-replacement", str(error)

    for encoding in ENCODING_CANDIDATES:
        try:
            return data.decode(encoding), encoding, None
        except UnicodeDecodeError:
            continue

    error = "strict decoding failed for all candidate encodings"
    return data.decode("utf-8", errors="replace"), "utf-8-replacement", error


def is_numeric_id(value: str) -> bool:
    return re.fullmatch(r"\d+", value) is not None


def parse_prefixed_id(value: str, family: str) -> tuple[str, str | None] | None:
    match = re.fullmatch(rf"{re.escape(family)}:(\d+)(?:[.．](.+))?", value.strip())
    if not match:
        return None
    inline_label = match.group(2).strip() if match.group(2) else None
    return match.group(1), inline_label


def first_non_empty(columns: list[str]) -> str:
    for column in columns:
        value = column.strip()
        if value:
            return value
    return ""


def last_non_empty(columns: list[str]) -> str:
    for column in reversed(columns):
        value = column.strip()
        if value:
            return value
    return ""


def parse_scalar_value(value: str, value_kind: str) -> int | str:
    stripped = value.strip()
    if value_kind == "text":
        return stripped
    if stripped == "":
        return 1 if value_kind == "boolean" else 0
    try:
        return int(stripped)
    except ValueError:
        return stripped


def normalize_extra_text(columns: list[str]) -> str | None:
    parts = [column.strip() for column in columns if column.strip()]
    if not parts:
        return None
    text = " ".join(parts).strip()
    return text.lstrip(";").strip() or None


def source_for(path: Path, original_id: str, original_name: str) -> dict[str, str]:
    return {
        "path": relative_path(path),
        "originalId": original_id,
        "originalName": original_name,
    }


def make_definition(path: Path, row_id: str, label: str, description: str | None) -> dict[str, Any]:
    definition: dict[str, Any] = {
        "id": row_id,
        "label": label,
        "source": source_for(path, row_id, label),
        "tags": [],
    }
    if description:
        definition["description"] = description
    return definition


def make_item(
    path: Path,
    row_id: str,
    label: str,
    price_text: str | None,
    description: str | None,
    diagnostics: dict[str, list[dict[str, Any]]],
    line_number: int,
) -> dict[str, Any]:
    item = make_definition(path, row_id, label, description)
    item["category"] = "unknown"

    if price_text:
        try:
            item["basePrice"] = int(price_text)
        except ValueError:
            diagnostics["invalidPrices"].append(
                {
                    "path": relative_path(path),
                    "line": line_number,
                    "id": row_id,
                    "value": price_text,
                }
            )

    return item


def collect_file(
    spec: CatalogInputSpec,
    catalog: dict[str, dict[str, Any]],
    diagnostics: dict[str, list[dict[str, Any]]],
) -> dict[str, Any]:
    path, fallback_candidates = resolve_input_path(spec)
    input_report: dict[str, Any] = {
        "fileName": spec.file_name,
        "family": spec.family,
        "catalogKey": spec.catalog_key,
        "requestedPath": relative_path(CSV_ROOT / spec.file_name),
        "resolvedPath": None,
        "fallbackCandidates": fallback_candidates,
        "encoding": None,
        "totalRows": 0,
        "commentRows": 0,
        "dataRows": 0,
        "collectedRows": 0,
        "invalidRows": 0,
        "duplicateRows": 0,
    }

    if path is None:
        diagnostics["missingFiles"].append(
            {
                "fileName": spec.file_name,
                "requestedPath": relative_path(CSV_ROOT / spec.file_name),
                "fallbackCandidates": fallback_candidates,
            }
        )
        return input_report

    input_report["resolvedPath"] = relative_path(path)
    text, encoding, decode_error = decode_text(path)
    input_report["encoding"] = encoding
    if decode_error:
        diagnostics["decodeFailures"].append(
            {
                "path": relative_path(path),
                "encoding": encoding,
                "error": decode_error,
            }
        )

    first_line_by_id: dict[str, int] = {}
    reader = csv.reader(StringIO(text))
    for line_number, raw_row in enumerate(reader, start=1):
        input_report["totalRows"] += 1
        row = [column.strip() for column in raw_row]
        if not row or not any(row):
            continue
        first_column = row[0]
        if first_column.startswith(";"):
            input_report["commentRows"] += 1
            continue
        prefixed_id = parse_prefixed_id(first_column, spec.family) if spec.kind == "prefixed" else None
        if spec.kind == "prefixed" and prefixed_id is not None:
            row_id, inline_label = prefixed_id
        elif is_numeric_id(first_column):
            row_id = first_column
            inline_label = None
        else:
            input_report["invalidRows"] += 1
            diagnostics["invalidRows"].append(
                {
                    "path": relative_path(path),
                    "line": line_number,
                    "row": row,
                    "reason": "first column is not a numeric id",
                }
            )
            continue

        if spec.kind == "cstr":
            label = row[2].strip() if len(row) > 2 and row[2].strip() else last_non_empty(row[1:])
            description = row[1].strip() if len(row) > 2 and row[1].strip() else normalize_extra_text(row[2:])
        elif spec.kind == "prefixed":
            label = inline_label or first_non_empty(row[1:])
            description = normalize_extra_text(row[2:] if inline_label is None else row[1:])
        else:
            label = row[1] if len(row) > 1 else ""
            description = normalize_extra_text(row[2:])

        if not label:
            diagnostics["emptyLabels"].append(
                {
                    "path": relative_path(path),
                    "line": line_number,
                    "id": row_id,
                }
            )

        input_report["dataRows"] += 1
        if row_id in first_line_by_id:
            input_report["duplicateRows"] += 1
            diagnostics["duplicateIds"].append(
                {
                    "path": relative_path(path),
                    "id": row_id,
                    "firstLine": first_line_by_id[row_id],
                    "duplicateLine": line_number,
                    "kept": "first",
                }
                )
            continue
        first_line_by_id[row_id] = line_number

        if spec.kind == "item":
            price_text = row[2] if len(row) > 2 and row[2].strip() else None
            description = normalize_extra_text(row[3:])
            catalog[spec.catalog_key][row_id] = make_item(
                path,
                row_id,
                label,
                price_text,
                description,
                diagnostics,
                line_number,
            )
        else:
            catalog[spec.catalog_key][row_id] = make_definition(path, row_id, label, description)
        input_report["collectedRows"] += 1

    return input_report


def empty_character_template(path: Path) -> dict[str, Any]:
    return {
        "id": "",
        "displayName": "",
        "callName": "",
        "nickname": "",
        "source": {
            "path": relative_path(path),
        },
        "baseStatIds": [],
        "abilityIds": [],
        "talentIds": [],
        "experienceIds": [],
        "initialState": {
            "baseStats": {},
            "abilities": {},
            "experiences": {},
            "talents": [],
            "characterFlags": {},
            "characterTexts": {},
            "relations": {},
        },
    }


def add_initial_value(
    character: dict[str, Any],
    character_id: str,
    path: Path,
    line_number: int,
    family: str,
    index: str,
    value: int | str,
    storage_key: str,
    initial_rows: list[dict[str, Any]],
    diagnostics: dict[str, list[dict[str, Any]]],
) -> None:
    initial_state = character["initialState"]
    target = initial_state[storage_key]

    if isinstance(target, list):
        if index not in target:
            target.append(index)
        stored_value: int | str = 1
    else:
        if index in target:
            diagnostics["duplicateCharacterInitialValues"].append(
                {
                    "path": relative_path(path),
                    "line": line_number,
                    "characterId": character_id,
                    "family": family,
                    "index": index,
                    "kept": "last",
                }
            )
        target[index] = value
        stored_value = value

    id_key = {
        "baseStats": "baseStatIds",
        "abilities": "abilityIds",
        "talents": "talentIds",
        "experiences": "experienceIds",
    }.get(storage_key)
    if id_key and index not in character[id_key]:
        character[id_key].append(index)

    initial_rows.append(
        {
            "characterId": character_id,
            "family": family,
            "index": index,
            "value": stored_value,
            "sourcePath": relative_path(path),
            "line": line_number,
        }
    )


def collect_characters(
    catalog: dict[str, dict[str, Any]],
    diagnostics: dict[str, list[dict[str, Any]]],
) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    report = {
        "fileCount": 0,
        "collectedCharacters": 0,
        "duplicateCharacters": 0,
        "invalidRows": 0,
        "unmappedRows": 0,
        "initialValues": 0,
    }
    initial_rows: list[dict[str, Any]] = []

    for path in sorted(CSV_ROOT.glob("Chara*.csv")):
        if not path.is_file():
            continue
        report["fileCount"] += 1
        text, encoding, decode_error = decode_text(path)
        if decode_error:
            diagnostics["decodeFailures"].append(
                {
                    "path": relative_path(path),
                    "encoding": encoding,
                    "error": decode_error,
                }
            )

        character = empty_character_template(path)
        pending_rows: list[tuple[int, list[str]]] = []
        reader = csv.reader(StringIO(text))

        for line_number, raw_row in enumerate(reader, start=1):
            row = [column.strip() for column in raw_row]
            if not row or not any(row):
                continue
            row_kind = row[0]
            if row_kind.startswith(";"):
                continue

            if row_kind in CHARA_IDENTITY_ROWS:
                field = CHARA_IDENTITY_ROWS[row_kind]
                value = row[1] if len(row) > 1 else ""
                if field == "id":
                    character["id"] = value
                    character["source"]["originalId"] = value
                else:
                    character[field] = value
                continue

            pending_rows.append((line_number, row))

        character_id = character["id"]
        if not character_id:
            diagnostics["invalidCharacterRows"].append(
                {
                    "path": relative_path(path),
                    "reason": "missing character id row",
                }
            )
            continue

        for line_number, row in pending_rows:
            row_kind = row[0]
            if row_kind not in CHARA_INITIAL_ROWS:
                report["unmappedRows"] += 1
                diagnostics["unmappedCharacterRows"].append(
                    {
                        "path": relative_path(path),
                        "line": line_number,
                        "rowKind": row_kind,
                        "row": row,
                    }
                )
                continue

            if len(row) < 2 or not is_numeric_id(row[1]):
                report["invalidRows"] += 1
                diagnostics["invalidCharacterRows"].append(
                    {
                        "path": relative_path(path),
                        "line": line_number,
                        "row": row,
                        "reason": "missing numeric index",
                    }
                )
                continue

            family, storage_key, value_kind = CHARA_INITIAL_ROWS[row_kind]
            index = row[1]
            value = parse_scalar_value(row[2] if len(row) > 2 else "", value_kind)
            add_initial_value(
                character,
                character_id,
                path,
                line_number,
                family,
                index,
                value,
                storage_key,
                initial_rows,
                diagnostics,
            )
            report["initialValues"] += 1

        if character_id in catalog["characters"]:
            report["duplicateCharacters"] += 1
            diagnostics["duplicateCharacterIds"].append(
                {
                    "path": relative_path(path),
                    "id": character_id,
                    "kept": "first",
                }
            )
            continue

        catalog["characters"][character_id] = character
        report["collectedCharacters"] += 1

    return report, initial_rows


def summary_for(catalog: dict[str, dict[str, Any]], diagnostics: dict[str, list[dict[str, Any]]]) -> dict[str, Any]:
    definition_counts = {key: len(catalog[key]) for key in CATALOG_KEYS}
    return {
        "definitionCounts": definition_counts,
        "totalDefinitions": sum(definition_counts.values()),
        "missingFiles": len(diagnostics["missingFiles"]),
        "decodeFailures": len(diagnostics["decodeFailures"]),
        "duplicateIds": len(diagnostics["duplicateIds"]),
        "invalidRows": len(diagnostics["invalidRows"]),
        "emptyLabels": len(diagnostics["emptyLabels"]),
        "invalidPrices": len(diagnostics["invalidPrices"]),
        "duplicateCharacterIds": len(diagnostics["duplicateCharacterIds"]),
        "invalidCharacterRows": len(diagnostics["invalidCharacterRows"]),
        "unmappedCharacterRows": len(diagnostics["unmappedCharacterRows"]),
        "duplicateCharacterInitialValues": len(diagnostics["duplicateCharacterInitialValues"]),
    }


def write_tsv(path: Path, rows: list[dict[str, Any]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({field: row.get(field, "") for field in fieldnames})


def write_catalog_tsvs(payload: dict[str, Any], initial_rows: list[dict[str, Any]]) -> None:
    catalog = payload["catalog"]
    definition_rows: list[dict[str, Any]] = []
    for catalog_key, definitions in catalog.items():
        if catalog_key in {"characters", "shopListings", "thresholds"}:
            continue
        for definition in definitions.values():
            source = definition.get("source", {})
            definition_rows.append(
                {
                    "catalogKey": catalog_key,
                    "id": definition.get("id", ""),
                    "label": definition.get("label", ""),
                    "basePrice": definition.get("basePrice", ""),
                    "category": definition.get("category", ""),
                    "tags": "|".join(definition.get("tags", [])),
                    "sourcePath": source.get("path", ""),
                    "originalId": source.get("originalId", ""),
                    "originalName": source.get("originalName", ""),
                }
            )

    character_rows: list[dict[str, Any]] = []
    for character in catalog["characters"].values():
        initial_state = character["initialState"]
        character_rows.append(
            {
                "id": character["id"],
                "displayName": character["displayName"],
                "callName": character.get("callName", ""),
                "nickname": character.get("nickname", ""),
                "sourcePath": character["source"].get("path", ""),
                "baseStatCount": len(initial_state["baseStats"]),
                "abilityCount": len(initial_state["abilities"]),
                "talentCount": len(initial_state["talents"]),
                "experienceCount": len(initial_state["experiences"]),
                "characterFlagCount": len(initial_state["characterFlags"]),
                "characterTextCount": len(initial_state["characterTexts"]),
                "relationCount": len(initial_state["relations"]),
            }
        )

    write_tsv(
        OUT_DEFINITIONS_TSV,
        definition_rows,
        ["catalogKey", "id", "label", "basePrice", "category", "tags", "sourcePath", "originalId", "originalName"],
    )
    write_tsv(
        OUT_CHARACTERS_TSV,
        character_rows,
        [
            "id",
            "displayName",
            "callName",
            "nickname",
            "sourcePath",
            "baseStatCount",
            "abilityCount",
            "talentCount",
            "experienceCount",
            "characterFlagCount",
            "characterTextCount",
            "relationCount",
        ],
    )
    write_tsv(
        OUT_CHARACTER_INITIAL_VALUES_TSV,
        initial_rows,
        ["characterId", "family", "index", "value", "sourcePath", "line"],
    )


def write_markdown(payload: dict[str, Any]) -> None:
    summary = payload["summary"]
    item_definitions = list(payload["catalog"]["items"].values())
    item_group_counts = {
        "shopItems": sum(1 for item in item_definitions if item["id"].isdigit() and 0 <= int(item["id"]) <= 99),
        "recruitListings": sum(1 for item in item_definitions if item["id"].isdigit() and 100 <= int(item["id"]) <= 199),
        "specialItems": sum(1 for item in item_definitions if item["id"].isdigit() and 200 <= int(item["id"]) <= 214),
    }
    lines = [
        "# CSV 정의 데이터 수집 결과",
        "",
        "## 입력",
        "",
        "| 파일 | 원본 묶음 | 정의 데이터 key | 경로 | 인코딩 | 수집 | 중복 | 무효 |",
        "| --- | --- | --- | --- | --- | ---: | ---: | ---: |",
    ]
    for item in payload["inputs"]:
        resolved_path = item["resolvedPath"] or "(missing)"
        encoding = item["encoding"] or ""
        lines.append(
            f"| `{item['fileName']}` | `{item['family']}` | `{item['catalogKey']}` | `{resolved_path}` | `{encoding}` | {item['collectedRows']} | {item['duplicateRows']} | {item['invalidRows']} |"
        )

    lines.extend(
        [
            "",
            "## 정의 데이터 크기",
            "",
            "| 정의 데이터 key | 정의 수 |",
            "| --- | ---: |",
        ]
    )
    for key, count in summary["definitionCounts"].items():
        if count:
            lines.append(f"| `{key}` | {count} |")

    lines.extend(
        [
            "",
            "## Runtime bridge",
            "",
            "`collect:catalog` 산출물은 원본 수집 결과를 보존하므로 `Item.csv` 109개를 `items`에 그대로 두고 `shopListings`는 0개로 기록한다. Runtime에서는 `src/catalog/legacyCatalog.ts`가 게임 구성 역할 기준으로 다시 나눈다.",
            "",
            "| runtime 역할 | 수 | 기준 |",
            "| --- | ---: | --- |",
            f"| 구매형 item 후보 | {item_group_counts['shopItems']} | `Item.csv` 0~99. M6/M24 상점 구매 루프에서 사용한다. |",
            f"| 영입 listing 후보 | {item_group_counts['recruitListings']} | `Item.csv` 100~199. M7/M24 영입 루프에서 사용한다. |",
            f"| 특수 항목 후보 | {item_group_counts['specialItems']} | `Item.csv` 200~214. M20/M24에서 실제 owner와 handler를 확정한다. |",
            "",
            "이 차이는 산출물 누락이 아니라 raw artifact와 runtime bridge의 책임 차이다. 최종 완료는 각 항목이 consuming feature 또는 blocker를 가질 때만 인정한다.",
        ]
    )

    character_report = payload["characterInput"]
    lines.extend(
        [
            "",
            "## Chara CSV",
            "",
            f"- 파일 수: {character_report['fileCount']}",
            f"- 캐릭터 템플릿: {character_report['collectedCharacters']}",
            f"- 초기값 행: {character_report['initialValues']}",
            f"- 중복 캐릭터 ID: {character_report['duplicateCharacters']}",
            f"- 무효 Chara 행: {character_report['invalidRows']}",
            f"- 미분류 Chara 행: {character_report['unmappedRows']}",
        ]
    )

    lines.extend(
        [
            "",
            "## 진단",
            "",
            f"- 누락 파일: {summary['missingFiles']}",
            f"- 인코딩 실패: {summary['decodeFailures']}",
            f"- 중복 ID: {summary['duplicateIds']}",
            f"- 무효 행: {summary['invalidRows']}",
            f"- 빈 이름: {summary['emptyLabels']}",
            f"- 무효 가격: {summary['invalidPrices']}",
            f"- 중복 캐릭터 ID: {summary['duplicateCharacterIds']}",
            f"- 무효 Chara 행: {summary['invalidCharacterRows']}",
            f"- 미분류 Chara 행: {summary['unmappedCharacterRows']}",
            f"- 중복 캐릭터 초기값: {summary['duplicateCharacterInitialValues']}",
            "",
            "## 산출물",
            "",
            "- JSON: `data/catalog/legacy-catalog.json`",
            "- 정의 TSV: `data/catalog/legacy-catalog-definitions.tsv`",
            "- 캐릭터 TSV: `data/catalog/legacy-character-templates.tsv`",
            "- 캐릭터 초기값 TSV: `data/catalog/legacy-character-initial-values.tsv`",
            "- 재생성 명령: `npm run collect:catalog`",
        ]
    )
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    catalog = empty_catalog()
    diagnostics: dict[str, list[dict[str, Any]]] = {
        "missingFiles": [],
        "decodeFailures": [],
        "duplicateIds": [],
        "invalidRows": [],
        "emptyLabels": [],
        "invalidPrices": [],
        "duplicateCharacterIds": [],
        "invalidCharacterRows": [],
        "unmappedCharacterRows": [],
        "duplicateCharacterInitialValues": [],
    }
    inputs = [collect_file(spec, catalog, diagnostics) for spec in INPUT_SPECS]
    character_input, character_initial_rows = collect_characters(catalog, diagnostics)
    payload = {
        "schemaVersion": "csv-catalog/v1",
        "sourceRoot": relative_path(CSV_ROOT),
        "inputs": inputs,
        "characterInput": character_input,
        "catalog": catalog,
        "diagnostics": diagnostics,
        "summary": summary_for(catalog, diagnostics),
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write_catalog_tsvs(payload, character_initial_rows)
    write_markdown(payload)
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
