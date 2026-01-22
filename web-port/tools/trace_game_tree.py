"""
게임 전체 트리 구조 추적
- 모든 TS 파일에서 함수 정의와 호출 추출
- 변수 읽기/쓰기 추적
- 완전한 트리 구조 생성
"""

import re
import json
import os
from pathlib import Path
from collections import defaultdict

class GameTreeAnalyzer:
    def __init__(self, src_dir):
        self.src_dir = Path(src_dir)
        self.functions = {}  # 함수명 -> {file, line, calls, reads, writes}
        self.call_graph = defaultdict(list)  # caller -> [callees]
        self.variable_map = defaultdict(lambda: {'reads': [], 'writes': []})

    def analyze_file(self, filepath):
        """단일 TS 파일 분석"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')

        current_function = None
        rel_path = filepath.relative_to(self.src_dir.parent)

        for line_num, line in enumerate(lines, 1):
            # 함수 정의: export async function funcName(
            func_match = re.match(r'export\s+(?:async\s+)?function\s+(\w+)\s*\(', line)
            if func_match:
                func_name = func_match.group(1)
                current_function = func_name
                self.functions[func_name] = {
                    'file': str(rel_path),
                    'line': line_num,
                    'calls': [],
                    'reads': [],
                    'writes': []
                }

                # 특수 처리: eventcom은 모든 com0-127 함수를 디스패치할 수 있음
                if func_name == 'eventcom':
                    # com0-127 함수 추가 (실제로는 엔진이 RESULT 값에 따라 디스패치)
                    for i in range(128):
                        com_func = f'com{i}'
                        self.functions[func_name]['calls'].append(com_func)
                        self.call_graph[func_name].append(com_func)

                # show_usercom은 암묵적으로 eventcom을 호출함 (유저 입력 후)
                if func_name == 'show_usercom':
                    self.functions[func_name]['calls'].append('eventcom')
                    self.call_graph[func_name].append('eventcom')
                    self.functions[func_name]['calls'].append('eventcomend')
                    self.call_graph[func_name].append('eventcomend')

                continue

            if not current_function:
                continue

            # 함수 호출: await funcName(
            call_matches = re.finditer(r'await\s+(\w+)\s*\(', line)
            for match in call_matches:
                called_func = match.group(1)
                if called_func not in self.functions[current_function]['calls']:
                    self.functions[current_function]['calls'].append(called_func)
                    self.call_graph[current_function].append(called_func)

            # TODO 주석에서 시스템 명령어 추출 (BEGIN TRAIN, BEGIN SHOP 등)
            todo_match = re.search(r'//\s*TODO:\s*BEGIN\s+(\w+)', line)
            if todo_match and current_function:
                phase = todo_match.group(1).lower()
                # TRAIN → eventtrain, SHOP → eventshop 등
                system_func = f'event{phase}' if phase != 'shop' else 'usershop'

                # 특수 처리: BEGIN TRAIN은 훈련 시스템 전체를 의미
                if phase == 'train':
                    # 훈련 시스템의 핵심 함수들 추가
                    train_funcs = ['eventtrain', 'show_status', 'show_usercom']
                    for tf in train_funcs:
                        if tf not in self.functions[current_function]['calls']:
                            self.functions[current_function]['calls'].append(tf)
                            self.call_graph[current_function].append(tf)
                elif phase == 'turnend':
                    if 'eventturnend' not in self.functions[current_function]['calls']:
                        self.functions[current_function]['calls'].append('eventturnend')
                        self.call_graph[current_function].append('eventturnend')
                elif phase == 'ablup':
                    if 'ability_up' not in self.functions[current_function]['calls']:
                        self.functions[current_function]['calls'].append('ability_up')
                        self.call_graph[current_function].append('ability_up')

            # 변수 읽기/쓰기: ctx.abilities[0], character.source[17] 등
            # 쓰기 패턴: variable[index] = value
            write_matches = re.finditer(r'(ctx\.[\w]+|character\.[\w]+)\[([^\]]+)\]\s*[=+\-*/]=', line)
            for match in write_matches:
                var_name = match.group(1)
                index = match.group(2)
                var_key = f"{var_name}[{index}]"

                write_info = {
                    'function': current_function,
                    'file': str(rel_path),
                    'line': line_num
                }

                if write_info not in self.variable_map[var_key]['writes']:
                    self.variable_map[var_key]['writes'].append(write_info)
                    self.functions[current_function]['writes'].append({
                        'var': var_name,
                        'index': index,
                        'line': line_num
                    })

            # 읽기 패턴: if (variable[index] 또는 variable[index] >= 5
            read_matches = re.finditer(r'(ctx\.[\w]+|character\.[\w]+)\[([^\]]+)\](?!\s*[=+\-*/]=)', line)
            for match in read_matches:
                var_name = match.group(1)
                index = match.group(2)
                var_key = f"{var_name}[{index}]"

                read_info = {
                    'function': current_function,
                    'file': str(rel_path),
                    'line': line_num
                }

                if read_info not in self.variable_map[var_key]['reads']:
                    self.variable_map[var_key]['reads'].append(read_info)

                    # 중복 체크
                    existing = [r for r in self.functions[current_function]['reads']
                               if r['var'] == var_name and r['index'] == index]
                    if not existing:
                        self.functions[current_function]['reads'].append({
                            'var': var_name,
                            'index': index,
                            'line': line_num
                        })

    def analyze_all(self):
        """모든 TS 파일 분석"""
        ts_files = list(self.src_dir.rglob('**/*.ts'))
        print(f"Found {len(ts_files)} TypeScript files")

        for i, filepath in enumerate(ts_files, 1):
            if i % 50 == 0:
                print(f"Processing {i}/{len(ts_files)}...")
            self.analyze_file(filepath)

        print(f"\nAnalysis complete:")
        print(f"  Functions: {len(self.functions)}")
        print(f"  Call edges: {sum(len(calls) for calls in self.call_graph.values())}")
        print(f"  Variables tracked: {len(self.variable_map)}")

    def build_tree(self, root_func, visited=None, call_stack=None):
        """재귀적으로 트리 구조 생성 (무제한 depth, 순환 참조 감지)"""
        if visited is None:
            visited = set()
        if call_stack is None:
            call_stack = []

        # 순환 참조 감지: 현재 호출 스택에 이미 있으면 참조 표시
        if root_func in call_stack:
            return {
                'name': root_func,
                'reference': True,  # 상위 레벨 참조
                'children': []
            }

        # 이미 방문했으면 중복 방지 (같은 레벨)
        if root_func in visited:
            return {
                'name': root_func,
                'reference': True,  # 같은 레벨 참조
                'children': []
            }

        visited.add(root_func)
        call_stack.append(root_func)

        func_info = self.functions.get(root_func, {})
        children = []

        for called in func_info.get('calls', []):
            child_tree = self.build_tree(called, visited.copy(), call_stack.copy())
            children.append(child_tree)

        call_stack.pop()

        return {
            'name': root_func,
            'file': func_info.get('file', 'unknown'),
            'line': func_info.get('line', 0),
            'children': children
        }

    def save_json(self, output_path):
        """JSON 저장"""
        data = {
            'functions': self.functions,
            'call_graph': dict(self.call_graph),
            'variable_map': dict(self.variable_map)
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"\nSaved to: {output_path}")

def generate_markdown(analyzer, output_path):
    """마크다운 문서 생성"""

    md = "# 게임 완전 트리 구조\n\n"
    md += f"**생성 일시**: {__import__('datetime').datetime.now().isoformat()}\n\n"

    md += "## 통계\n\n"
    md += f"- 총 함수: {len(analyzer.functions)}개\n"
    md += f"- 총 호출 관계: {sum(len(calls) for calls in analyzer.call_graph.values())}개\n"
    md += f"- 추적된 변수: {len(analyzer.variable_map)}개\n\n"

    # 메인 메뉴 트리
    md += "## 1. 메인 메뉴 구조 (shop_main)\n\n"
    main_menu_funcs = [
        ('usershop', '메인 메뉴 핸들러'),
        ('before_train', '[100] 훈련'),
        ('chara_buy_new', '[101] 인재 확보'),
        ('yuukaku_top', '[103] 창관 영업'),
        ('av_top', '[104] AV촬영'),
        ('ability_up', '[112] 능력치업'),
    ]

    for func_name, description in main_menu_funcs:
        if func_name in analyzer.functions:
            md += f"### {description}\n\n"
            md += f"**함수**: `{func_name}`\n"
            md += f"**파일**: `{analyzer.functions[func_name]['file']}`\n"
            md += f"**호출**: {len(analyzer.functions[func_name]['calls'])}개 함수\n\n"

            # 직접 호출하는 함수들
            if analyzer.functions[func_name]['calls']:
                md += "**직접 호출**:\n"
                for called in analyzer.functions[func_name]['calls'][:10]:
                    md += f"- `{called}`\n"
                if len(analyzer.functions[func_name]['calls']) > 10:
                    md += f"- ... 외 {len(analyzer.functions[func_name]['calls']) - 10}개\n"
                md += "\n"

    # 훈련 시스템 트리 (무제한 depth)
    md += "## 2. 훈련 시스템 트리 (완전 추적)\n\n"
    md += "```\n"
    md += format_tree_text(analyzer.build_tree('before_train'), 0)
    md += "```\n\n"

    # AV 촬영 트리 (무제한 depth)
    md += "## 3. AV 촬영 시스템 트리 (완전 추적)\n\n"
    md += "```\n"
    md += format_tree_text(analyzer.build_tree('av_top'), 0)
    md += "```\n\n"

    # 창관 영업 트리 (무제한 depth)
    md += "## 4. 창관 영업 시스템 트리 (완전 추적)\n\n"
    md += "```\n"
    md += format_tree_text(analyzer.build_tree('yuukaku_top'), 0)
    md += "```\n\n"

    # 능력치업 트리 (무제한 depth)
    md += "## 5. 능력치업 시스템 트리 (완전 추적)\n\n"
    md += "```\n"
    md += format_tree_text(analyzer.build_tree('ability_up'), 0)
    md += "```\n\n"

    # 변수 사용 통계
    md += "## 6. 주요 변수 사용 통계\n\n"
    var_stats = []
    for var_name, usage in analyzer.variable_map.items():
        var_stats.append({
            'name': var_name,
            'reads': len(usage['reads']),
            'writes': len(usage['writes']),
            'total': len(usage['reads']) + len(usage['writes'])
        })

    var_stats.sort(key=lambda x: x['total'], reverse=True)

    md += "| 변수 | 읽기 | 쓰기 | 합계 |\n"
    md += "|------|------|------|------|\n"
    for stat in var_stats[:30]:
        md += f"| `{stat['name']}` | {stat['reads']} | {stat['writes']} | {stat['total']} |\n"
    md += "\n"

    # 함수별 변수 사용 섹션
    md += "## 7. 함수별 변수 사용 (주요 함수)\n\n"

    key_functions = ['eventtrain', 'com0', 'com11', 'av_calc', 'eventturnend', 'ability_up']
    for func_name in key_functions:
        if func_name in analyzer.functions:
            func = analyzer.functions[func_name]
            md += f"### {func_name} ({func['file']}:{func['line']})\n\n"

            if func['reads']:
                md += "**읽기**:\n"
                for read in func['reads'][:10]:
                    md += f"- `{read['var']}[{read['index']}]` (line {read['line']})\n"
                if len(func['reads']) > 10:
                    md += f"- ... 외 {len(func['reads']) - 10}개\n"
                md += "\n"

            if func['writes']:
                md += "**쓰기**:\n"
                for write in func['writes'][:10]:
                    md += f"- `{write['var']}[{write['index']}]` (line {write['line']})\n"
                if len(func['writes']) > 10:
                    md += f"- ... 외 {len(func['writes']) - 10}개\n"
                md += "\n"

    # 변수별 상세 추적
    md += "## 8. 변수별 상세 추적 (Top 10)\n\n"
    for stat in var_stats[:10]:
        var_name = stat['name']
        usage = analyzer.variable_map[var_name]

        md += f"### {var_name}\n\n"
        md += f"**사용 횟수**: 읽기 {stat['reads']}회, 쓰기 {stat['writes']}회\n\n"

        if usage['writes']:
            md += "**쓰기 위치** (최대 5개):\n"
            for write in usage['writes'][:5]:
                md += f"- `{write['function']}` ({write['file']}:{write['line']})\n"
            if len(usage['writes']) > 5:
                md += f"- ... 외 {len(usage['writes']) - 5}곳\n"
            md += "\n"

        if usage['reads']:
            md += "**읽기 위치** (최대 5개):\n"
            for read in usage['reads'][:5]:
                md += f"- `{read['function']}` ({read['file']}:{read['line']})\n"
            if len(usage['reads']) > 5:
                md += f"- ... 외 {len(usage['reads']) - 5}곳\n"
            md += "\n"

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

    print(f"Markdown saved to: {output_path}")

def format_tree_text(tree, depth):
    """트리를 텍스트로 포맷 (무제한 depth, 순환 참조는 표시만)"""
    indent = "  " * depth
    result = f"{indent}{tree['name']}"

    # 참조인 경우 (순환/중복)
    if tree.get('reference'):
        result += " → 참조\n"
        return result

    # 파일 정보
    if tree.get('file'):
        result += f" ({tree['file']}:{tree['line']})\n"
    else:
        result += "\n"

    # 자식 노드 재귀
    for child in tree.get('children', []):
        result += format_tree_text(child, depth + 1)

    return result

if __name__ == '__main__':
    src_dir = Path(__file__).parent.parent / 'src' / 'modules'

    print("게임 트리 구조 분석 시작...")
    analyzer = GameTreeAnalyzer(src_dir)
    analyzer.analyze_all()

    # JSON 저장
    json_path = Path(__file__).parent.parent / 'docs' / 'game_structure.json'
    json_path.parent.mkdir(exist_ok=True)
    analyzer.save_json(json_path)

    # 마크다운 생성
    md_path = Path(__file__).parent.parent / 'docs' / 'GAME_TREE.md'
    generate_markdown(analyzer, md_path)

    print("\n✓ 완료!")
