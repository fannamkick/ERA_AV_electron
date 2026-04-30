from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from io import StringIO
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
WEB_PORT_NEXT_ROOT = Path(__file__).resolve().parents[1]
ORIGINAL_ROOT = REPO_ROOT / "original-game"
CSV_ROOT = ORIGINAL_ROOT / "CSV"
ERB_ROOT = ORIGINAL_ROOT / "ERB"
VARIABLE_SIZE_CSV = CSV_ROOT / "VariableSize.CSV"
FAMILY_OWNERSHIP_TS = WEB_PORT_NEXT_ROOT / "src" / "adapters" / "legacy" / "familyOwnership.ts"
OUT_DIR = WEB_PORT_NEXT_ROOT / "data" / "legacy-mapping"
OUT_JSON = OUT_DIR / "source-addresses.json"
OUT_TSV = OUT_DIR / "source-addresses.tsv"
OUT_MD = WEB_PORT_NEXT_ROOT / "docs" / "LEGACY_MAPPING_INVENTORY.ko.md"

ENCODING_CANDIDATES = ("utf-8-sig", "utf-8", "cp932", "shift_jis", "cp949", "euc_kr")

EXTRA_STATE_NAMES = {
    "CALLNAME",
    "CHARANUM",
    "CHARASALES",
    "ISASSI",
    "ITEMPRICE",
    "NAME",
    "NICKNAME",
    "NO",
    "SAVEDATA",
}

WRITE_OPERATORS = ("+=", "-=", "*=", "/=", "%=", "|=", "&=", "=")
SCRIPT_FAMILIES = set("ABCDEFGHIJKLMNOPQRSTUVWXYZ") | {"LOCAL", "LOCALS", "ARG", "ARGS", "RESULT", "RESULTS", "COUNT"}

CSV_DEFINITION_SPECS = (
    ("Item.csv", ("ITEM", "ITEMSALES", "ITEMNAME", "ITEMPRICE")),
    ("Abl.csv", ("ABL", "ABLNAME")),
    ("BASE.csv", ("BASE", "MAXBASE", "BASENAME")),
    ("Talent.csv", ("TALENT", "TALENTNAME")),
    ("exp.csv", ("EXP", "EXPNAME")),
    ("Mark.csv", ("MARK", "MARKNAME")),
    ("Palam.csv", ("PALAM", "PALAMNAME")),
    ("Train.csv", ("TRAINNAME",)),
    ("CSTR.csv", ("CSTR",)),
    ("Str.csv", ("STR",)),
    ("source.csv", ("SOURCE", "SOURCENAME")),
    ("cflag.csv", ("CFLAG", "CFLAGNAME")),
)

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

CHARA_IDENTITY_ROWS = {
    "\u756a\u53f7": "NO",
    "\u540d\u524d": "NAME",
    "\u547c\u3073\u540d": "CALLNAME",
    "\u3042\u3060\u540d": "NICKNAME",
}


@dataclass
class Evidence:
    source_kind: str
    file: str
    line: int | None
    text: str


@dataclass
class SourceAddress:
    address: str
    family: str
    index: str
    address_kind: str
    variable_size_declared: bool = False
    variable_size_dimensions: tuple[str, ...] = ()
    source_kinds: set[str] = field(default_factory=set)
    labels: set[str] = field(default_factory=set)
    read_count: int = 0
    write_count: int = 0
    chara_seed_count: int = 0
    files: Counter[str] = field(default_factory=Counter)
    samples: list[Evidence] = field(default_factory=list)

    def add_evidence(self, evidence: Evidence) -> None:
        self.source_kinds.add(evidence.source_kind)
        if evidence.file:
            self.files[evidence.file] += 1
        if len(self.samples) < 8:
            self.samples.append(evidence)


def relative_path(path: Path) -> str:
    try:
        return path.relative_to(REPO_ROOT).as_posix()
    except ValueError:
        return path.as_posix()


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


def strip_comment(line: str) -> str:
    stripped = line.lstrip()
    if stripped.startswith(";"):
        return ""
    return line.split(";", 1)[0]


def parse_csv_rows(path: Path) -> tuple[list[tuple[int, list[str], str]], str, str | None]:
    text, encoding, decode_error = decode_text(path)
    rows: list[tuple[int, list[str], str]] = []
    for line_number, row in enumerate(csv.reader(StringIO(text)), start=1):
        columns = [column.strip() for column in row]
        rows.append((line_number, columns, ",".join(row).strip()))
    return rows, encoding, decode_error


def resolve_auxiliary_csv(file_name: str) -> Path | None:
    primary = CSV_ROOT / file_name
    if primary.exists():
        return primary

    candidates = sorted(
        path
        for path in REPO_ROOT.glob(f"*/{file_name}")
        if path.is_file() and path.parent.name not in {"web-port", "web-port-next"}
    )
    return candidates[0] if candidates else None


def parse_variable_size() -> dict[str, tuple[str, ...]]:
    declarations: dict[str, tuple[str, ...]] = {}
    text, _encoding, _error = decode_text(VARIABLE_SIZE_CSV)
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith(";"):
            continue
        columns = [column.strip() for column in line.split(",")]
        family = columns[0].upper()
        if re.fullmatch(r"[A-Z][A-Z0-9_]*", family):
            declarations[family] = tuple(column for column in columns[1:] if column)
    return declarations


def parse_family_ownership() -> dict[str, dict[str, str]]:
    text = FAMILY_OWNERSHIP_TS.read_text(encoding="utf-8")
    ownership: dict[str, dict[str, str]] = {}
    group_pattern = re.compile(
        r"\{\s*families:\s*\[(?P<families>.*?)\],\s*ownerDomain:\s*'(?P<ownerDomain>[^']+)',\s*"
        r"ownerPath:\s*'(?P<ownerPath>[^']+)',\s*persistence:\s*'(?P<persistence>[^']+)',\s*"
        r"status:\s*'(?P<status>[^']+)',\s*notes:\s*'(?P<notes>.*?)',\s*\}",
        re.DOTALL,
    )
    for match in group_pattern.finditer(text):
        families = re.findall(r"'([^']+)'", match.group("families"))
        for family in families:
            ownership[family] = {
                "ownerDomain": match.group("ownerDomain"),
                "ownerPath": match.group("ownerPath"),
                "persistence": match.group("persistence"),
                "status": match.group("status"),
                "notes": match.group("notes"),
            }
    return ownership


def make_address(family: str, index: str = "", address_kind: str | None = None) -> tuple[str, str, str]:
    family = family.upper()
    normalized_index = index.strip()
    if address_kind is None:
        if normalized_index == "":
            address_kind = "scalar-or-family"
        elif "<dynamic>" in normalized_index or any(char in normalized_index for char in "()[]+-*/"):
            address_kind = "dynamic-index"
        elif ":" in normalized_index:
            address_kind = "compound-index"
        else:
            address_kind = "fixed-index"
    address = family if normalized_index == "" else f"{family}:{normalized_index}"
    return address, normalized_index, address_kind


def get_record(
    records: dict[str, SourceAddress],
    family: str,
    index: str = "",
    address_kind: str | None = None,
) -> SourceAddress:
    address, normalized_index, resolved_kind = make_address(family, index, address_kind)
    existing = records.get(address)
    if existing:
        return existing
    record = SourceAddress(address=address, family=family.upper(), index=normalized_index, address_kind=resolved_kind)
    records[address] = record
    return record


def add_variable_size(records: dict[str, SourceAddress], declarations: dict[str, tuple[str, ...]]) -> None:
    for family, dimensions in sorted(declarations.items()):
        record = get_record(records, family, address_kind="family-declaration")
        record.variable_size_declared = True
        record.variable_size_dimensions = dimensions
        record.source_kinds.add("variableSize")
        record.add_evidence(Evidence("variableSize", relative_path(VARIABLE_SIZE_CSV), None, f"{family},{','.join(dimensions)}"))


def numeric_id(value: str) -> bool:
    return re.fullmatch(r"\d+", value.strip()) is not None


def add_label(record: SourceAddress, label: str) -> None:
    clean_label = label.strip()
    if clean_label:
        record.labels.add(clean_label)


def add_csv_definitions(records: dict[str, SourceAddress], diagnostics: dict[str, Any]) -> None:
    for file_name, families in CSV_DEFINITION_SPECS:
        path = resolve_auxiliary_csv(file_name)
        if path is None:
            diagnostics["missingDefinitionFiles"].append(file_name)
            continue
        rows, encoding, decode_error = parse_csv_rows(path)
        if decode_error:
            diagnostics["decodeWarnings"].append({"path": relative_path(path), "encoding": encoding, "error": decode_error})
        for line_number, columns, raw_line in rows:
            if not columns or not any(columns):
                continue
            first = columns[0].strip()
            if not first or first.startswith(";"):
                continue
            if not numeric_id(first):
                continue
            label = columns[1].strip() if len(columns) > 1 else ""
            for family in families:
                record = get_record(records, family, first)
                record.source_kinds.add("csvDefinition")
                add_label(record, label)
                record.add_evidence(Evidence("csvDefinition", relative_path(path), line_number, raw_line))


def parse_chara_id(path: Path, rows: list[tuple[int, list[str], str]]) -> str:
    for _line_number, columns, _raw_line in rows:
        if len(columns) >= 2 and columns[0] == "\u756a\u53f7" and columns[1].strip():
            return columns[1].strip()
    match = re.search(r"Chara0*([0-9]+)", path.name, re.IGNORECASE)
    return match.group(1) if match else path.stem


def add_chara_seed(records: dict[str, SourceAddress], diagnostics: dict[str, Any]) -> None:
    chara_files = sorted(CSV_ROOT.glob("Chara*.csv"))
    for path in chara_files:
        rows, encoding, decode_error = parse_csv_rows(path)
        if decode_error:
            diagnostics["decodeWarnings"].append({"path": relative_path(path), "encoding": encoding, "error": decode_error})
        character_id = parse_chara_id(path, rows)
        for line_number, columns, raw_line in rows:
            if not columns or not any(columns):
                continue
            row_kind = columns[0].strip()
            if row_kind.startswith(";"):
                continue

            identity_family = CHARA_IDENTITY_ROWS.get(row_kind)
            if identity_family and len(columns) >= 2:
                record = get_record(records, identity_family, character_id)
                record.source_kinds.add("charaIdentity")
                add_label(record, columns[1])
                record.chara_seed_count += 1
                record.add_evidence(Evidence("charaIdentity", relative_path(path), line_number, raw_line))
                continue

            family = CHARA_ROW_TO_FAMILY.get(row_kind)
            if family is None:
                if row_kind and not row_kind.startswith(";"):
                    diagnostics["unmappedCharaRowKinds"][row_kind] += 1
                continue
            if len(columns) < 2 or not numeric_id(columns[1]):
                diagnostics["invalidCharaRows"].append({"path": relative_path(path), "line": line_number, "row": columns})
                continue
            record = get_record(records, family, columns[1])
            record.source_kinds.add("charaSeed")
            record.chara_seed_count += 1
            if len(columns) >= 3:
                add_label(record, columns[2])
            record.add_evidence(Evidence("charaSeed", relative_path(path), line_number, raw_line))


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
        if char in ";:":
            break
        pos += 1
    return line[begin:pos].strip(), pos


def parse_ref(line: str, start: int, name: str) -> tuple[list[str], int]:
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
    return indices, pos


def classify_usage(line: str, pos: int) -> tuple[str, str]:
    scan = pos
    while scan < len(line) and line[scan].isspace():
        scan += 1
    tail = line[scan : scan + 2]
    if tail in ("++", "--"):
        return "write", tail
    for operator in WRITE_OPERATORS:
        if line.startswith(operator, scan):
            if operator == "=" and scan + 1 < len(line) and line[scan + 1] in ("=", ">"):
                return "read", "read"
            return "write", operator
    return "read", "read"


def canonical_index(indices: list[str]) -> tuple[str, str]:
    if not indices:
        return "", "scalar-or-family"
    numeric_indices = [index for index in indices if re.fullmatch(r"\d+", index)]
    if numeric_indices:
        return numeric_indices[-1], "fixed-index"
    return "<dynamic>", "dynamic-index"


def add_code_usage(
    records: dict[str, SourceAddress],
    variable_names: set[str],
    diagnostics: dict[str, Any],
) -> None:
    sorted_names = sorted(variable_names, key=len, reverse=True)
    code_files = sorted(ERB_ROOT.rglob("*.ERB")) + sorted(ERB_ROOT.rglob("*.ERH"))
    for path in code_files:
        source_kind = "erbUsage" if path.suffix.upper() == ".ERB" else "erhUsage"
        rel_path = relative_path(path)
        text, encoding, decode_error = decode_text(path)
        if decode_error:
            diagnostics["decodeWarnings"].append({"path": rel_path, "encoding": encoding, "error": decode_error})
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

                indices, end_pos = parse_ref(line, match_start, match_name)
                index, address_kind = canonical_index(indices)
                if match_name in SCRIPT_FAMILIES:
                    address_kind = "script-scratch"
                record = get_record(records, match_name, index, address_kind)
                record.source_kinds.add(source_kind)
                if indices and index == "<dynamic>":
                    add_label(record, ":".join(indices))
                kind, _operator = classify_usage(line, end_pos)
                if kind == "write":
                    record.write_count += 1
                else:
                    record.read_count += 1
                record.add_evidence(Evidence(source_kind, rel_path, line_number, raw_line.strip()))
                cursor = max(end_pos, match_start + len(match_name))


def mapping_action(record: SourceAddress, ownership: dict[str, dict[str, str]]) -> str:
    owner = ownership.get(record.family)
    status = owner["status"] if owner else ""
    persistence = owner["persistence"] if owner else ""
    if record.address_kind == "script-scratch" or status == "excluded":
        return "exclude-script-scratch"
    if status == "reserved":
        return "reserved-review"
    if persistence == "catalog":
        return "definition-only"
    if record.address_kind == "dynamic-index":
        return "define-pattern-mapping"
    if record.address_kind == "family-declaration" and record.source_kinds == {"variableSize"}:
        return "family-only-review"
    if persistence == "session":
        return "map-session-state"
    if persistence == "save":
        return "map-save-state"
    return "needs-review"


def evidence_to_json(evidence: Evidence) -> dict[str, Any]:
    return {
        "sourceKind": evidence.source_kind,
        "file": evidence.file,
        "line": evidence.line,
        "text": evidence.text,
    }


def record_to_json(record: SourceAddress, ownership: dict[str, dict[str, str]]) -> dict[str, Any]:
    owner = ownership.get(record.family, {})
    return {
        "address": record.address,
        "family": record.family,
        "index": record.index,
        "addressKind": record.address_kind,
        "sourceKinds": sorted(record.source_kinds),
        "labels": sorted(record.labels)[:20],
        "variableSizeDeclared": record.variable_size_declared,
        "variableSizeDimensions": list(record.variable_size_dimensions),
        "readCount": record.read_count,
        "writeCount": record.write_count,
        "charaSeedCount": record.chara_seed_count,
        "fileCount": len(record.files),
        "topFiles": record.files.most_common(10),
        "familyOwnerDomain": owner.get("ownerDomain", ""),
        "familyOwnerPath": owner.get("ownerPath", ""),
        "familyPersistence": owner.get("persistence", ""),
        "familyStatus": owner.get("status", ""),
        "mappingAction": mapping_action(record, ownership),
        "samples": [evidence_to_json(evidence) for evidence in record.samples],
    }


def write_tsv(records: list[dict[str, Any]]) -> None:
    fieldnames = [
        "address",
        "family",
        "index",
        "addressKind",
        "sourceKinds",
        "labels",
        "readCount",
        "writeCount",
        "charaSeedCount",
        "fileCount",
        "familyOwnerDomain",
        "familyOwnerPath",
        "familyPersistence",
        "familyStatus",
        "mappingAction",
        "sampleEvidence",
    ]
    with OUT_TSV.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames, delimiter="\t", extrasaction="ignore")
        writer.writeheader()
        for record in records:
            sample = record["samples"][0] if record["samples"] else {}
            writer.writerow(
                {
                    **record,
                    "sourceKinds": "|".join(record["sourceKinds"]),
                    "labels": " | ".join(record["labels"]),
                    "sampleEvidence": (
                        f"{sample.get('sourceKind', '')}:{sample.get('file', '')}:{sample.get('line', '')} {sample.get('text', '')}"
                        if sample
                        else ""
                    ),
                }
            )


def build_summary(
    records: list[dict[str, Any]],
    declarations: dict[str, tuple[str, ...]],
    ownership: dict[str, dict[str, str]],
    diagnostics: dict[str, Any],
) -> dict[str, Any]:
    family_set = {record["family"] for record in records}
    source_kind_counts = Counter(source_kind for record in records for source_kind in record["sourceKinds"])
    return {
        "variableSizeFamilies": len(declarations),
        "familyOwnershipFamilies": len(ownership),
        "sourceAddresses": len(records),
        "familiesInInventory": len(family_set),
        "addressKinds": dict(sorted(Counter(record["addressKind"] for record in records).items())),
        "mappingActions": dict(sorted(Counter(record["mappingAction"] for record in records).items())),
        "sourceKinds": dict(sorted(source_kind_counts.items())),
        "csvDefinitionAddresses": source_kind_counts.get("csvDefinition", 0),
        "charaSeedAddresses": source_kind_counts.get("charaSeed", 0),
        "erbUsageAddresses": source_kind_counts.get("erbUsage", 0),
        "erhUsageAddresses": source_kind_counts.get("erhUsage", 0),
        "referencedFamiliesWithoutVariableSizeDeclaration": sorted(
            family
            for family in family_set
            if family not in declarations and any("Usage" in source for record in records if record["family"] == family for source in record["sourceKinds"])
        ),
        "familiesWithoutFamilyOwnership": sorted(family for family in family_set if family not in ownership),
        "variableSizeOnlyFamilies": sorted(
            record["family"]
            for record in records
            if record["addressKind"] == "family-declaration" and record["sourceKinds"] == ["variableSize"]
        ),
        "diagnosticCounts": {
            "missingDefinitionFiles": len(diagnostics["missingDefinitionFiles"]),
            "decodeWarnings": len(diagnostics["decodeWarnings"]),
            "invalidCharaRows": len(diagnostics["invalidCharaRows"]),
            "unmappedCharaRowKinds": len(diagnostics["unmappedCharaRowKinds"]),
        },
    }


def write_markdown(payload: dict[str, Any]) -> None:
    summary = payload["summary"]
    lines = [
        "# Legacy Mapping Inventory",
        "",
        "## 요약",
        "",
        f"- VariableSize family: {summary['variableSizeFamilies']}",
        f"- family ownership entries: {summary['familyOwnershipFamilies']}",
        f"- source addresses: {summary['sourceAddresses']}",
        f"- families in inventory: {summary['familiesInInventory']}",
        f"- CSV definition addresses: {summary['csvDefinitionAddresses']}",
        f"- Chara seed addresses: {summary['charaSeedAddresses']}",
        f"- ERB usage addresses: {summary['erbUsageAddresses']}",
        f"- ERH usage addresses: {summary['erhUsageAddresses']}",
        "",
        "## Mapping Actions",
        "",
        "| action | count |",
        "| --- | ---: |",
    ]
    for action, count in summary["mappingActions"].items():
        lines.append(f"| `{action}` | {count} |")

    lines.extend(["", "## Address Kinds", "", "| kind | count |", "| --- | ---: |"])
    for kind, count in summary["addressKinds"].items():
        lines.append(f"| `{kind}` | {count} |")

    lines.extend(
        [
            "",
            "## Diagnostics",
            "",
            f"- Missing definition files: {summary['diagnosticCounts']['missingDefinitionFiles']}",
            f"- Decode warnings: {summary['diagnosticCounts']['decodeWarnings']}",
            f"- Invalid Chara rows: {summary['diagnosticCounts']['invalidCharaRows']}",
            f"- Unmapped Chara row kinds: {summary['diagnosticCounts']['unmappedCharaRowKinds']}",
            "",
            "## Families Referenced In Code But Not Declared In VariableSize",
            "",
        ]
    )
    if summary["referencedFamiliesWithoutVariableSizeDeclaration"]:
        for family in summary["referencedFamiliesWithoutVariableSizeDeclaration"]:
            lines.append(f"- `{family}`")
    else:
        lines.append("- 없음")

    lines.extend(["", "## Families Without Current Family Ownership", ""])
    if summary["familiesWithoutFamilyOwnership"]:
        for family in summary["familiesWithoutFamilyOwnership"]:
            lines.append(f"- `{family}`")
    else:
        lines.append("- 없음")

    lines.extend(
        [
            "",
            "## Outputs",
            "",
            "- `data/legacy-mapping/source-addresses.json`",
            "- `data/legacy-mapping/source-addresses.tsv`",
        ]
    )
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    declarations = parse_variable_size()
    ownership = parse_family_ownership()
    diagnostics: dict[str, Any] = {
        "missingDefinitionFiles": [],
        "decodeWarnings": [],
        "invalidCharaRows": [],
        "unmappedCharaRowKinds": Counter(),
    }

    records: dict[str, SourceAddress] = {}
    add_variable_size(records, declarations)
    add_csv_definitions(records, diagnostics)
    add_chara_seed(records, diagnostics)

    variable_names = set(declarations) | EXTRA_STATE_NAMES | SCRIPT_FAMILIES
    variable_names.update(record.family for record in records.values())
    add_code_usage(records, variable_names, diagnostics)

    record_json = [record_to_json(record, ownership) for record in records.values()]
    record_json.sort(key=lambda item: (item["family"], item["addressKind"], item["address"]))
    diagnostics_json = {
        **diagnostics,
        "unmappedCharaRowKinds": dict(diagnostics["unmappedCharaRowKinds"].most_common()),
    }
    payload = {
        "schemaVersion": "legacy-mapping-source-inventory/v1",
        "sourceRoot": relative_path(REPO_ROOT),
        "inputs": {
            "variableSize": relative_path(VARIABLE_SIZE_CSV),
            "csvRoot": relative_path(CSV_ROOT),
            "erbRoot": relative_path(ERB_ROOT),
            "familyOwnership": relative_path(FAMILY_OWNERSHIP_TS),
        },
        "summary": build_summary(record_json, declarations, ownership, diagnostics),
        "diagnostics": diagnostics_json,
        "addresses": record_json,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write_tsv(record_json)
    write_markdown(payload)
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
