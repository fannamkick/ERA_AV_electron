from __future__ import annotations

import csv
import hashlib
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[2]
WEB_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = REPO_ROOT / "original-game"
ERB_ROOT = SOURCE_ROOT / "ERB"
CSV_ROOT = SOURCE_ROOT / "CSV"
OUT_DIR = WEB_ROOT / "data" / "game-system-analysis"


EXTRA_STATE_NAMES = {
    "NAME",
    "CALLNAME",
    "NICKNAME",
    "NO",
    "CHARANUM",
    "CHARASALES",
    "ISASSI",
    "ITEMPRICE",
    "SAVEDATA",
    "MASTER",
    "PLAYER",
    "TARGET",
    "ASSI",
    "MONEY",
    "TIME",
    "DAY",
    "RESULT",
    "RESULTS",
}

KEY_FILES = {
    "SYSTEM_GAMESTART.ERB",
    "SYSTEM_NEWGAME.ERB",
    "SHOP_MAIN.ERB",
    "SHOP_ITEM.ERB",
    "SHOP_CHARABUY.ERB",
    "SELL_CHARA.ERB",
    "TRAIN_MAIN.ERB",
    "USERCOM.ERB",
    "COMABLE.ERB",
    "SYSTEM_SOURCE.ERB",
    "EVENT_TURNEND.ERB",
    "EVENT_NEXTDAY.ERB",
    "EVENT_NEXTMONTH.ERB",
    "MISSION.ERB",
    "ARBEIT.ERB",
    "HOUMON.ERB",
    "SHOP_AV.ERB",
    "WORK_NORMAL.ERB",
    "WORK_RECEPTION.ERB",
}

IMPORTANT_STATE_NAMES = {
    "MONEY",
    "DAY",
    "TIME",
    "FLAG",
    "CFLAG",
    "TFLAG",
    "TEQUIP",
    "ITEM",
    "ITEMSALES",
    "BOUGHT",
    "TARGET",
    "ASSI",
    "PLAYER",
    "MASTER",
    "SELECTCOM",
    "SOURCE",
    "UP",
    "DOWN",
    "LOSEBASE",
    "PALAM",
    "BASE",
    "MAXBASE",
    "JUEL",
    "EXP",
    "ABL",
    "TALENT",
    "MARK",
    "STAIN",
    "RELATION",
    "PBAND",
    "GLOBAL",
    "GLOBALS",
}

SCRATCH_STATE_NAMES = {
    *(chr(code) for code in range(ord("A"), ord("Z") + 1)),
    "DA",
    "DB",
    "DC",
    "DD",
    "DE",
    "TA",
    "TB",
    "LOCAL",
    "LOCALS",
    "ARG",
    "ARGS",
    "RESULT",
    "RESULTS",
    "COUNT",
    "TCVAR",
}


LABEL_RE = re.compile(r"^\s*@([^\s(;]+)")
FLOW_LABEL_RE = re.compile(r"^\s*@([^\s;]+)")
LOCAL_LABEL_RE = re.compile(r"^\s*\$([A-Za-z0-9_]+)")
CALL_KINDS = (
    "TRYCCALLFORM",
    "TRYCALLFORM",
    "CALLFORM",
    "TRYCALL",
    "CALL",
    "JUMP",
    "GOTO",
    "BEGIN",
)
CALL_KIND_RE = re.compile(r"\b(" + "|".join(CALL_KINDS) + r")\b")
INPUT_RE = re.compile(r"^\s*INPUT(?:\s|$)")
FLOW_ACTION_RE = re.compile(
    r"^\s*(RETURNF?|QUIT|RESETDATA|SAVEGAME|LOADGAME|SAVEDATA|LOADGLOBAL|SAVEGLOBAL|INPUT|WAIT)\b"
)
WRITE_RE = re.compile(
    r"(?<![A-Za-z0-9_])([A-Z][A-Z0-9]*)(?::[^\s=+\-*/%,)]+(?::[^\s=+\-*/%,)]+)?)?\s*(=|\+=|-=|\*=|/=|\+\+|--)"
)


@dataclass
class FileSummary:
    path: Path
    area: str
    encoding: str
    lines: int
    labels: list[tuple[int, str]] = field(default_factory=list)
    calls: list[dict[str, object]] = field(default_factory=list)
    inputs: int = 0
    state_reads: Counter[str] = field(default_factory=Counter)
    state_writes: Counter[str] = field(default_factory=Counter)


def read_text(path: Path) -> tuple[str, str]:
    raw = path.read_bytes()
    for encoding in ("utf-8-sig", "utf-8", "cp932", "euc-jp", "cp949"):
        try:
            return raw.decode(encoding), encoding
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace"), "replace"


def strip_comment(line: str) -> str:
    if line.lstrip().startswith(";"):
        return ""
    return line.split(";", 1)[0]


def iter_call_targets(line: str) -> Iterable[tuple[str, str]]:
    for match in CALL_KIND_RE.finditer(line):
        kind = match.group(1)
        index = match.end()
        while index < len(line) and line[index].isspace():
            index += 1
        if index >= len(line):
            continue

        start = index
        brace_depth = 0
        paren_depth = 0
        is_form_call = "FORM" in kind

        while index < len(line):
            char = line[index]
            if char == "{" and is_form_call:
                brace_depth += 1
            elif char == "}" and brace_depth > 0:
                brace_depth -= 1
            elif char == "(":
                if not is_form_call and brace_depth == 0:
                    break
                paren_depth += 1
            elif char == ")" and paren_depth > 0:
                paren_depth -= 1
            elif char == "," and brace_depth == 0 and paren_depth == 0:
                break
            elif char.isspace() and brace_depth == 0 and paren_depth == 0:
                break
            index += 1

        target = line[start:index].strip()
        if target:
            yield kind, target


def load_state_names() -> set[str]:
    names = set(EXTRA_STATE_NAMES)
    path = CSV_ROOT / "VariableSize.CSV"
    if not path.exists():
        return names

    text, _ = read_text(path)
    for line in text.splitlines():
        line = strip_comment(line).strip()
        if not line:
            continue
        head = line.split(",", 1)[0].strip()
        if re.fullmatch(r"[A-Z][A-Z0-9]*", head):
            names.add(head)
    return names


def area_for(path: Path) -> str:
    rel = path.relative_to(ERB_ROOT)
    return rel.parts[0] if len(rel.parts) > 1 else "(root)"


def iter_source_files() -> Iterable[Path]:
    for path in ERB_ROOT.rglob("*"):
        if path.is_file() and path.suffix.lower() in {".erb", ".erh"}:
            yield path


def analyze_file(path: Path, state_names: set[str], state_token_re: re.Pattern[str]) -> FileSummary:
    text, encoding = read_text(path)
    lines = text.splitlines()
    summary = FileSummary(
        path=path,
        area=area_for(path),
        encoding=encoding,
        lines=len(lines),
    )

    current_label = "(file)"
    for line_no, raw_line in enumerate(lines, start=1):
        line = strip_comment(raw_line)
        if not line.strip():
            continue

        label_match = LABEL_RE.match(line)
        if label_match:
            current_label = label_match.group(1)
            summary.labels.append((line_no, current_label))

        if INPUT_RE.match(line):
            summary.inputs += 1

        for kind, target in iter_call_targets(line):
            summary.calls.append(
                {
                    "line": line_no,
                    "sourceLabel": current_label,
                    "kind": kind,
                    "target": target,
                    "dynamic": "{" in target or "}" in target or ("FORM" in kind and "(" in target),
                }
            )

        written_families: set[str] = set()
        for match in WRITE_RE.finditer(line):
            family = match.group(1)
            if family in state_names:
                summary.state_writes[family] += 1
                written_families.add(family)

        for match in state_token_re.finditer(line):
            family = match.group(1)
            if family in state_names:
                summary.state_reads[family] += 1

    return summary


def write_tsv(path: Path, rows: Iterable[dict[str, object]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({field: row.get(field, "") for field in fieldnames})


def top_items(counter: Counter[str], limit: int = 10) -> str:
    return ", ".join(f"{key}:{value}" for key, value in counter.most_common(limit))


def dot_id(value: str) -> str:
    return "n" + hashlib.sha1(value.encode("utf-8")).hexdigest()[:16]


def dot_escape(value: object) -> str:
    return str(value).replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def classify_flow_action(action: str) -> str:
    if action in {"RETURN", "RETURNF", "QUIT", "RESETDATA"}:
        return "exit"
    if action in {"SAVEGAME", "LOADGAME", "SAVEDATA", "LOADGLOBAL", "SAVEGLOBAL"}:
        return "persistence"
    if action in {"INPUT", "WAIT"}:
        return "pause"
    return "other"


BEGIN_EVENT_TARGETS = {
    "SHOP": "EVENTSHOP",
    "TRAIN": "EVENTTRAIN",
    "TURNEND": "EVENTTURNEND",
    "AFTERTRAIN": "EVENTEND",
}

ENGINE_ENTRY_LABELS = {
    "EVENTFIRST",
    "EVENTSHOP",
    "EVENTTRAIN",
    "EVENTCOM",
    "EVENTCOMEND",
    "EVENTEND",
    "EVENTTURNEND",
    "EVENTBUY",
}


def normalize_label_name(raw: str) -> str:
    value = raw.strip()
    if value.startswith("@") or value.startswith("$"):
        value = value[1:]
    value = value.split(";", 1)[0].strip()
    value = value.split("(", 1)[0].strip()
    value = value.split(",", 1)[0].strip()
    return value


def dynamic_prefix(target: str) -> str:
    prefix = target.split("{", 1)[0].strip()
    return normalize_label_name(prefix)


def write_flowgraph_dot(
    path: Path,
    label_rows: list[dict[str, object]],
    resolved_rows: list[dict[str, object]],
    flow_actions: list[dict[str, object]],
) -> None:
    node_ids = {str(row["labelId"]): dot_id(str(row["labelId"])) for row in label_rows}

    with path.open("w", encoding="utf-8", newline="\n") as f:
        f.write("digraph GameFlow {\n")
        f.write('  rankdir="LR";\n')
        f.write('  graph [fontsize=10, labelloc="t", label="Original ERB complete call flow"];\n')
        f.write('  node [shape=box, fontsize=9];\n')
        f.write('  edge [fontsize=8];\n')

        for row in label_rows:
            label_id = str(row["labelId"])
            node_id = node_ids[label_id]
            style = "bold" if row["entryKind"] == "engine-entry" else "solid"
            label = f"{row['label']}\\n{row['path']}:{row['line']}"
            f.write(
                f'  {node_id} [label="{dot_escape(label)}", style="{style}"];\n'
            )

        for row in resolved_rows:
            source_id = str(row["sourceLabelId"])
            source_node = node_ids.get(source_id)
            if source_node is None:
                source_node = dot_id(source_id)
                node_ids[source_id] = source_node
                f.write(f'  {source_node} [label="{dot_escape(source_id)}", style="dotted"];\n')

            edge_label = f"{row['kind']} {row['targetRaw']}\\n{row['path']}:{row['line']}"
            resolved_target_ids = str(row["resolvedTargetIds"]).split("|") if row["resolvedTargetIds"] else []
            if resolved_target_ids:
                for target_id in resolved_target_ids:
                    target_node = node_ids.get(target_id)
                    if target_node:
                        f.write(
                            f'  {source_node} -> {target_node} [label="{dot_escape(edge_label)}"];\n'
                        )
                continue

            if row["resolution"] == "dynamic":
                target_key = f"dynamic:{row['path']}:{row['line']}:{row['dynamicPattern']}"
                target_node = node_ids.get(target_key)
                if target_node is None:
                    target_node = dot_id(target_key)
                    node_ids[target_key] = target_node
                    dynamic_label = (
                        f"dynamic {row['dynamicPattern']}*\\n"
                        f"candidates={row['dynamicCandidateCount']}\\n{row['path']}:{row['line']}"
                    )
                    f.write(
                        f'  {target_node} [label="{dot_escape(dynamic_label)}", shape=component, style="dashed"];\n'
                    )
                f.write(f'  {source_node} -> {target_node} [label="{dot_escape(edge_label)}"];\n')
            else:
                target_key = f"unresolved:{row['path']}:{row['line']}:{row['targetRaw']}"
                target_node = node_ids.get(target_key)
                if target_node is None:
                    target_node = dot_id(target_key)
                    node_ids[target_key] = target_node
                    unresolved_label = f"unresolved {row['targetRaw']}\\n{row['path']}:{row['line']}"
                    f.write(
                        f'  {target_node} [label="{dot_escape(unresolved_label)}", shape=octagon, color=red];\n'
                    )
                f.write(f'  {source_node} -> {target_node} [label="{dot_escape(edge_label)}"];\n')

        for row in flow_actions:
            source_id = str(row["sourceLabelId"])
            source_node = node_ids.get(source_id)
            if source_node is None:
                continue
            target_key = f"flow-action:{row['path']}:{row['line']}:{row['action']}"
            target_node = dot_id(target_key)
            label = f"{row['action']}\\n{row['actionKind']}\\n{row['path']}:{row['line']}"
            shape = {
                "exit": "doublecircle",
                "pause": "ellipse",
                "persistence": "cylinder",
            }.get(str(row["actionKind"]), "note")
            f.write(
                f'  {target_node} [label="{dot_escape(label)}", shape={shape}];\n'
            )
            f.write(
                f'  {source_node} -> {target_node} [label="{dot_escape(row["action"])}"];\n'
            )

        f.write("}\n")


def build_flow_outputs() -> dict[str, object]:
    labels: list[dict[str, object]] = []
    calls: list[dict[str, object]] = []
    flow_actions: list[dict[str, object]] = []
    global_by_name: dict[str, list[str]] = defaultdict(list)
    local_by_scope: dict[tuple[str, str, str], str] = {}
    label_by_id: dict[str, dict[str, object]] = {}

    for path in sorted(iter_source_files()):
        text, encoding = read_text(path)
        rel = path.relative_to(REPO_ROOT).as_posix()
        area = area_for(path)
        current_global_id = f"{rel}:0:(file)"
        current_global_name = "(file)"

        for line_no, raw_line in enumerate(text.splitlines(), start=1):
            line = strip_comment(raw_line)
            if not line.strip():
                continue

            global_match = FLOW_LABEL_RE.match(line)
            if global_match:
                raw_name = global_match.group(1)
                name = normalize_label_name(raw_name)
                label_id = f"{rel}:{line_no}:{name}"
                current_global_id = label_id
                current_global_name = name
                row = {
                    "labelId": label_id,
                    "label": name,
                    "rawLabel": raw_name,
                    "scope": "",
                    "kind": "global",
                    "path": rel,
                    "area": area,
                    "line": line_no,
                    "encoding": encoding,
                }
                labels.append(row)
                label_by_id[label_id] = row
                global_by_name[name].append(label_id)
                continue

            local_match = LOCAL_LABEL_RE.match(line)
            if local_match:
                name = normalize_label_name(local_match.group(1))
                label_id = f"{rel}:{line_no}:{current_global_name}${name}"
                row = {
                    "labelId": label_id,
                    "label": name,
                    "rawLabel": f"${name}",
                    "scope": current_global_name,
                    "kind": "local",
                    "path": rel,
                    "area": area,
                    "line": line_no,
                    "encoding": encoding,
                }
                labels.append(row)
                label_by_id[label_id] = row
                local_by_scope[(rel, current_global_name, name)] = label_id
                continue

            flow_action_match = FLOW_ACTION_RE.match(line)
            if flow_action_match:
                action = flow_action_match.group(1)
                flow_actions.append(
                    {
                        "path": rel,
                        "area": area,
                        "line": line_no,
                        "sourceLabelId": current_global_id,
                        "sourceLabel": current_global_name,
                        "action": action,
                        "actionKind": classify_flow_action(action),
                        "text": line.strip(),
                    }
                )

            for kind, target_raw in iter_call_targets(line):
                calls.append(
                    {
                        "path": rel,
                        "area": area,
                        "line": line_no,
                        "sourceLabelId": current_global_id,
                        "sourceLabel": current_global_name,
                        "kind": kind,
                        "targetRaw": target_raw,
                        "text": line.strip(),
                    }
                )

    resolved_rows: list[dict[str, object]] = []
    dynamic_rows: list[dict[str, object]] = []
    indegree: Counter[str] = Counter()
    outdegree: Counter[str] = Counter()

    for call in calls:
        kind = str(call["kind"])
        target_raw = str(call["targetRaw"])
        source_id = str(call["sourceLabelId"])
        source_label = str(call["sourceLabel"])
        rel = str(call["path"])
        target_name = normalize_label_name(target_raw)
        resolution = "unresolved"
        resolved_ids: list[str] = []
        resolved_labels: list[str] = []
        pattern = ""
        candidate_count = 0

        if kind == "BEGIN":
            target_name = BEGIN_EVENT_TARGETS.get(target_name.upper(), f"EVENT{target_name.upper()}")

        is_dynamic = "{" in target_raw or "}" in target_raw or ("FORM" in kind and "(" in target_raw)
        if is_dynamic:
            resolution = "dynamic"
            pattern = dynamic_prefix(target_raw)
            candidate_ids = [
                label_id
                for label, label_ids in global_by_name.items()
                if pattern and label.startswith(pattern)
                for label_id in label_ids
            ]
            candidate_count = len(candidate_ids)
            dynamic_rows.append(
                {
                    "path": rel,
                    "area": call["area"],
                    "line": call["line"],
                    "sourceLabel": source_label,
                    "kind": kind,
                    "targetRaw": target_raw,
                    "pattern": pattern,
                    "candidateCount": candidate_count,
                    "candidateLabels": ", ".join(
                        f"{label_by_id[label_id]['label']}@{label_by_id[label_id]['path']}:{label_by_id[label_id]['line']}"
                        for label_id in candidate_ids[:30]
                    ),
                }
            )
        else:
            local_id = local_by_scope.get((rel, source_label, target_name))
            if local_id:
                resolved_ids = [local_id]
                resolution = "resolved-local"
            else:
                resolved_ids = global_by_name.get(target_name, [])
                if len(resolved_ids) == 1:
                    resolution = "resolved"
                elif len(resolved_ids) > 1:
                    resolution = "multiple"
                else:
                    resolution = "unresolved"

            resolved_labels = [
                f"{label_by_id[label_id]['label']}@{label_by_id[label_id]['path']}:{label_by_id[label_id]['line']}"
                for label_id in resolved_ids
            ]
            for label_id in resolved_ids:
                indegree[label_id] += 1

        outdegree[source_id] += 1
        resolved_rows.append(
            {
                "path": rel,
                "area": call["area"],
                "line": call["line"],
                "sourceLabelId": source_id,
                "sourceLabel": source_label,
                "kind": kind,
                "targetRaw": target_raw,
                "targetLabel": target_name,
                "resolution": resolution,
                "resolvedTargetIds": "|".join(resolved_ids),
                "resolvedTargets": " | ".join(resolved_labels),
                "dynamicPattern": pattern,
                "dynamicCandidateCount": candidate_count,
                "text": call["text"],
            }
        )

    label_rows: list[dict[str, object]] = []
    for label in labels:
        label_id = str(label["labelId"])
        name = str(label["label"])
        entry_kind = ""
        if name in ENGINE_ENTRY_LABELS:
            entry_kind = "engine-entry"
        elif indegree[label_id] == 0 and label["kind"] == "global":
            entry_kind = "unreferenced-global"
        elif label["kind"] == "local":
            entry_kind = "local"

        label_rows.append(
            {
                **label,
                "incomingStaticCalls": indegree[label_id],
                "outgoingCalls": outdegree[label_id],
                "entryKind": entry_kind,
            }
        )

    entry_rows = [
        row
        for row in label_rows
        if row["entryKind"] in {"engine-entry", "unreferenced-global"}
    ]

    write_tsv(
        OUT_DIR / "label-index.tsv",
        label_rows,
        [
            "labelId",
            "label",
            "rawLabel",
            "scope",
            "kind",
            "path",
            "area",
            "line",
            "encoding",
            "incomingStaticCalls",
            "outgoingCalls",
            "entryKind",
        ],
    )
    write_tsv(
        OUT_DIR / "resolved-call-edges.tsv",
        resolved_rows,
        [
            "path",
            "area",
            "line",
            "sourceLabelId",
            "sourceLabel",
            "kind",
            "targetRaw",
            "targetLabel",
            "resolution",
            "resolvedTargetIds",
            "resolvedTargets",
            "dynamicPattern",
            "dynamicCandidateCount",
            "text",
        ],
    )
    write_tsv(
        OUT_DIR / "dynamic-call-patterns.tsv",
        dynamic_rows,
        [
            "path",
            "area",
            "line",
            "sourceLabel",
            "kind",
            "targetRaw",
            "pattern",
            "candidateCount",
            "candidateLabels",
        ],
    )
    write_tsv(
        OUT_DIR / "flow-control-actions.tsv",
        flow_actions,
        ["path", "area", "line", "sourceLabelId", "sourceLabel", "action", "actionKind", "text"],
    )
    write_tsv(
        OUT_DIR / "entrypoint-summary.tsv",
        entry_rows,
        [
            "labelId",
            "label",
            "rawLabel",
            "scope",
            "kind",
            "path",
            "area",
            "line",
            "encoding",
            "incomingStaticCalls",
            "outgoingCalls",
            "entryKind",
        ],
    )
    legacy_terminal_path = OUT_DIR / "terminal-actions.tsv"
    if legacy_terminal_path.exists():
        legacy_terminal_path.unlink()

    write_flowgraph_dot(OUT_DIR / "flowgraph.dot", label_rows, resolved_rows, flow_actions)

    return {
        "labels": len(labels),
        "globalLabels": sum(1 for row in labels if row["kind"] == "global"),
        "localLabels": sum(1 for row in labels if row["kind"] == "local"),
        "resolvedEdges": sum(1 for row in resolved_rows if str(row["resolution"]).startswith("resolved")),
        "multipleEdges": sum(1 for row in resolved_rows if row["resolution"] == "multiple"),
        "dynamicEdges": len(dynamic_rows),
        "unresolvedEdges": sum(1 for row in resolved_rows if row["resolution"] == "unresolved"),
        "flowControlActions": len(flow_actions),
        "exitActions": sum(1 for row in flow_actions if row["actionKind"] == "exit"),
        "pauseActions": sum(1 for row in flow_actions if row["actionKind"] == "pause"),
        "persistenceActions": sum(1 for row in flow_actions if row["actionKind"] == "persistence"),
        "engineEntries": sum(1 for row in entry_rows if row["entryKind"] == "engine-entry"),
        "unreferencedGlobalEntries": sum(1 for row in entry_rows if row["entryKind"] == "unreferenced-global"),
    }


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    state_names = load_state_names()
    state_token_re = re.compile(r"(?<![A-Za-z0-9_])(" + "|".join(sorted(map(re.escape, state_names), key=len, reverse=True)) + r")(?:\b|:)")

    summaries = [analyze_file(path, state_names, state_token_re) for path in sorted(iter_source_files())]

    area_rows = []
    by_area: dict[str, list[FileSummary]] = defaultdict(list)
    for summary in summaries:
        by_area[summary.area].append(summary)

    for area, items in sorted(by_area.items()):
        writes = Counter()
        reads = Counter()
        core_writes = Counter()
        core_reads = Counter()
        for item in items:
            writes.update(item.state_writes)
            reads.update(item.state_reads)
            core_writes.update({key: value for key, value in item.state_writes.items() if key not in SCRATCH_STATE_NAMES})
            core_reads.update({key: value for key, value in item.state_reads.items() if key not in SCRATCH_STATE_NAMES})
        area_rows.append(
            {
                "area": area,
                "fileCount": len(items),
                "lineCount": sum(item.lines for item in items),
                "labelCount": sum(len(item.labels) for item in items),
                "callCount": sum(len(item.calls) for item in items),
                "inputCount": sum(item.inputs for item in items),
                "stateReadCount": sum(reads.values()),
                "stateWriteCount": sum(writes.values()),
                "coreStateReadCount": sum(core_reads.values()),
                "coreStateWriteCount": sum(core_writes.values()),
                "topWrittenFamilies": top_items(writes),
                "topReadFamilies": top_items(reads),
                "topCoreWrittenFamilies": top_items(core_writes),
                "topCoreReadFamilies": top_items(core_reads),
            }
        )

    file_rows = []
    for summary in summaries:
        rel = summary.path.relative_to(REPO_ROOT).as_posix()
        file_rows.append(
            {
                "path": rel,
                "area": summary.area,
                "encoding": summary.encoding,
                "lineCount": summary.lines,
                "labelCount": len(summary.labels),
                "callCount": len(summary.calls),
                "inputCount": summary.inputs,
                "stateReadCount": sum(summary.state_reads.values()),
                "stateWriteCount": sum(summary.state_writes.values()),
                "coreStateReadCount": sum(value for key, value in summary.state_reads.items() if key not in SCRATCH_STATE_NAMES),
                "coreStateWriteCount": sum(value for key, value in summary.state_writes.items() if key not in SCRATCH_STATE_NAMES),
                "labels": ", ".join(f"{name}@{line}" for line, name in summary.labels[:20]),
                "topWrittenFamilies": top_items(summary.state_writes),
                "topReadFamilies": top_items(summary.state_reads),
                "topCoreWrittenFamilies": top_items(Counter({key: value for key, value in summary.state_writes.items() if key not in SCRATCH_STATE_NAMES})),
                "topCoreReadFamilies": top_items(Counter({key: value for key, value in summary.state_reads.items() if key not in SCRATCH_STATE_NAMES})),
            }
        )

    call_rows = []
    for summary in summaries:
        rel = summary.path.relative_to(REPO_ROOT).as_posix()
        for call in summary.calls:
            call_rows.append(
                {
                    "path": rel,
                    "area": summary.area,
                    "line": call["line"],
                    "sourceLabel": call["sourceLabel"],
                    "kind": call["kind"],
                    "target": call["target"],
                    "dynamic": call["dynamic"],
                }
            )

    state_rows = []
    for summary in summaries:
        rel = summary.path.relative_to(REPO_ROOT).as_posix()
        for family in sorted(set(summary.state_reads) | set(summary.state_writes)):
            state_rows.append(
                {
                    "path": rel,
                    "area": summary.area,
                    "family": family,
                    "reads": summary.state_reads.get(family, 0),
                    "writes": summary.state_writes.get(family, 0),
                }
            )

    evidence_rows = []
    for summary in summaries:
        if summary.path.name not in KEY_FILES:
            continue
        text, _ = read_text(summary.path)
        for line_no, raw_line in enumerate(text.splitlines(), start=1):
            line = strip_comment(raw_line).strip()
            if not line:
                continue
            if (
                LABEL_RE.match(line)
                or CALL_KIND_RE.search(line)
                or INPUT_RE.match(line)
                or any(f"{name}" in line for name in IMPORTANT_STATE_NAMES)
            ):
                evidence_rows.append(
                    {
                        "path": summary.path.relative_to(REPO_ROOT).as_posix(),
                        "area": summary.area,
                        "line": line_no,
                        "text": line,
                    }
                )

    write_tsv(
        OUT_DIR / "area-summary.tsv",
        area_rows,
        [
            "area",
            "fileCount",
            "lineCount",
            "labelCount",
            "callCount",
            "inputCount",
            "stateReadCount",
            "stateWriteCount",
            "coreStateReadCount",
            "coreStateWriteCount",
            "topWrittenFamilies",
            "topReadFamilies",
            "topCoreWrittenFamilies",
            "topCoreReadFamilies",
        ],
    )
    write_tsv(
        OUT_DIR / "file-summary.tsv",
        file_rows,
        [
            "path",
            "area",
            "encoding",
            "lineCount",
            "labelCount",
            "callCount",
            "inputCount",
            "stateReadCount",
            "stateWriteCount",
            "coreStateReadCount",
            "coreStateWriteCount",
            "labels",
            "topWrittenFamilies",
            "topReadFamilies",
            "topCoreWrittenFamilies",
            "topCoreReadFamilies",
        ],
    )
    write_tsv(
        OUT_DIR / "call-edges.tsv",
        call_rows,
        ["path", "area", "line", "sourceLabel", "kind", "target", "dynamic"],
    )
    write_tsv(
        OUT_DIR / "state-access-summary.tsv",
        state_rows,
        ["path", "area", "family", "reads", "writes"],
    )
    write_tsv(
        OUT_DIR / "key-flow-evidence.tsv",
        evidence_rows,
        ["path", "area", "line", "text"],
    )

    flow_summary = build_flow_outputs()

    summary_json = {
        "schemaVersion": "game-system-analysis/v1",
        "sourceRoot": SOURCE_ROOT.as_posix(),
        "totals": {
            "files": len(summaries),
            "lines": sum(item.lines for item in summaries),
            "labels": sum(len(item.labels) for item in summaries),
            "calls": sum(len(item.calls) for item in summaries),
            "inputs": sum(item.inputs for item in summaries),
            "stateReads": sum(sum(item.state_reads.values()) for item in summaries),
            "stateWrites": sum(sum(item.state_writes.values()) for item in summaries),
        },
        "flowGraph": flow_summary,
        "areas": area_rows,
        "outputs": [
            "area-summary.tsv",
            "file-summary.tsv",
            "call-edges.tsv",
            "state-access-summary.tsv",
            "key-flow-evidence.tsv",
            "label-index.tsv",
            "resolved-call-edges.tsv",
            "dynamic-call-patterns.tsv",
            "flow-control-actions.tsv",
            "entrypoint-summary.tsv",
            "flowgraph.dot",
        ],
    }
    (OUT_DIR / "summary.json").write_text(
        json.dumps(summary_json, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(json.dumps(summary_json["totals"], ensure_ascii=False))
    print(f"wrote {OUT_DIR.relative_to(WEB_ROOT).as_posix()}")


if __name__ == "__main__":
    main()
