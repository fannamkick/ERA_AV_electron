#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ERB 파일 구조 분석 도구
모든 ERB 파일을 스캔하여 함수, 변수, 호출 관계를 추출합니다.
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Set, Any
from collections import defaultdict

# ERB 파일 경로
ERB_ROOT = Path(__file__).parent.parent.parent / "ERB"

class ERBAnalyzer:
    def __init__(self):
        self.files_data = {}
        self.all_functions = set()
        self.all_variables = defaultdict(set)
        self.call_graph = defaultdict(set)

    def analyze_file(self, file_path: Path) -> Dict[str, Any]:
        """단일 ERB 파일 분석"""
        try:
            # UTF-8 시도, 실패하면 CP949
            try:
                content = file_path.read_text(encoding='utf-8')
            except:
                content = file_path.read_text(encoding='cp949')
        except Exception as e:
            print(f"[ERR] 파일 읽기 실패: {file_path} - {e}")
            return None

        data = {
            'path': str(file_path.relative_to(ERB_ROOT.parent)),
            'size': len(content),
            'lines': len(content.split('\n')),
            'functions': [],
            'calls': {},
            'variables': defaultdict(set),
            'csv_references': set(),
            'ui_texts': {
                'buttons': [],
                'messages': []
            }
        }

        current_function = None

        for line_num, line in enumerate(content.split('\n'), 1):
            line = line.strip()

            # 함수 정의 (@LABEL)
            if line.startswith('@'):
                match = re.match(r'@([A-Z_0-9]+)', line)
                if match:
                    func_name = '@' + match.group(1)
                    data['functions'].append(func_name)
                    current_function = func_name
                    data['calls'][func_name] = set()
                    self.all_functions.add(func_name)

            # 함수 호출 (CALL, GOTO, RESTART, JUMP)
            if current_function:
                for pattern in [r'CALL\s+(@[A-Z_0-9]+)', r'GOTO\s+(@[A-Z_0-9]+)',
                               r'RESTART\s+(@[A-Z_0-9]+)', r'JUMP\s+(@[A-Z_0-9]+)']:
                    matches = re.findall(pattern, line)
                    for called in matches:
                        data['calls'][current_function].add(called)
                        self.call_graph[current_function].add(called)

            # 변수 사용 (PALAM, TALENT, FLAG, ABL, EXP, JUEL 등)
            for var_type in ['PALAM', 'TALENT', 'FLAG', 'ABL', 'EXP', 'JUEL',
                            'MARK', 'SOURCE', 'TFLAG', 'CFLAG', 'TCVAR', 'TEQUIP']:
                # 배열 인덱스 패턴
                matches = re.findall(rf'{var_type}:(\d+)', line)
                for idx in matches:
                    data['variables'][var_type].add(int(idx))
                    self.all_variables[var_type].add(int(idx))

                # 일반 변수 참조
                if re.search(rf'\b{var_type}\b', line):
                    if var_type not in data['variables']:
                        data['variables'][var_type] = set()

            # CSV 파일 참조
            csv_matches = re.findall(r'([A-Za-z0-9_]+\.csv)', line, re.IGNORECASE)
            for csv in csv_matches:
                data['csv_references'].add(csv)

            # UI 텍스트 (PRINTBUTTON, PRINTFORM)
            if 'PRINTBUTTON' in line:
                # PRINTBUTTON "텍스트", 123
                match = re.search(r'PRINTBUTTON\s+["\']([^"\']+)["\']', line)
                if match:
                    data['ui_texts']['buttons'].append(match.group(1))

            if 'PRINTFORM' in line or 'PRINTFORML' in line:
                # 간단한 메시지 추출
                match = re.search(r'PRINTFORM[L]?\s+(.+)', line)
                if match:
                    msg = match.group(1).strip()
                    if len(msg) < 100:  # 너무 긴 건 제외
                        data['ui_texts']['messages'].append(msg)

        # set을 list로 변환 (JSON 직렬화를 위해)
        data['calls'] = {k: list(v) for k, v in data['calls'].items()}
        data['variables'] = {k: sorted(list(v)) for k, v in data['variables'].items()}
        data['csv_references'] = sorted(list(data['csv_references']))

        return data

    def analyze_all(self) -> Dict[str, Any]:
        """모든 ERB 파일 분석"""
        print(f"[*] ERB 디렉토리: {ERB_ROOT}")
        print("[*] ERB 파일 스캔 중...")

        erb_files = list(ERB_ROOT.rglob("*.ERB"))
        print(f"[OK] {len(erb_files)}개의 ERB 파일 발견")

        for idx, file_path in enumerate(erb_files, 1):
            if idx % 10 == 0:
                print(f"   분석 중... {idx}/{len(erb_files)}")

            data = self.analyze_file(file_path)
            if data:
                rel_path = str(file_path.relative_to(ERB_ROOT.parent))
                self.files_data[rel_path] = data

        print(f"[OK] 분석 완료: {len(self.files_data)}개 파일")

        # 전체 요약 생성
        summary = {
            'total_files': len(self.files_data),
            'total_functions': len(self.all_functions),
            'total_lines': sum(f['lines'] for f in self.files_data.values()),
            'total_size': sum(f['size'] for f in self.files_data.values()),
            'all_functions': sorted(list(self.all_functions)),
            'variables_summary': {
                var: {
                    'count': len(indices),
                    'max_index': max(indices) if indices else 0,
                    'indices': sorted(list(indices))
                }
                for var, indices in self.all_variables.items()
            },
            'files': self.files_data
        }

        return summary

    def generate_dependency_map(self, summary: Dict) -> Dict[str, Any]:
        """기능별 의존성 맵 생성"""
        print("\n[*] 의존성 분석 중...")

        dependencies = {}

        # 조교 시스템 분석
        training_files = [
            f for f in summary['files'].keys()
            if '指導関係' in f or 'COMF' in f or 'COMABLE' in f
        ]

        dependencies['training_system'] = {
            'description': '조교 시스템 (커맨드 실행 및 가용성)',
            'required_files': sorted(training_files),
            'total_lines': sum(summary['files'][f]['lines'] for f in training_files),
            'total_size': sum(summary['files'][f]['size'] for f in training_files),
            'dependencies': ['parameter_system', 'talent_system', 'flag_system']
        }

        # 파라미터 시스템
        if 'PALAM' in summary['variables_summary']:
            dependencies['parameter_system'] = {
                'description': '파라미터 시스템 (쾌락, 고통, 욕정 등)',
                'required_indices': summary['variables_summary']['PALAM']['indices'],
                'total_parameters': summary['variables_summary']['PALAM']['count']
            }

        # 재능 시스템
        if 'TALENT' in summary['variables_summary']:
            dependencies['talent_system'] = {
                'description': '재능/소질 시스템',
                'required_indices': summary['variables_summary']['TALENT']['indices'],
                'total_talents': summary['variables_summary']['TALENT']['count']
            }

        # 플래그 시스템
        if 'FLAG' in summary['variables_summary']:
            dependencies['flag_system'] = {
                'description': '플래그 시스템',
                'required_indices': summary['variables_summary']['FLAG']['indices'],
                'total_flags': summary['variables_summary']['FLAG']['count']
            }

        # 능력치 시스템
        ability_files = [
            f for f in summary['files'].keys()
            if '能力上昇関係' in f
        ]

        if ability_files:
            dependencies['ability_system'] = {
                'description': '능력치 상승 시스템',
                'required_files': sorted(ability_files),
                'total_lines': sum(summary['files'][f]['lines'] for f in ability_files)
            }

        print(f"[OK] {len(dependencies)}개의 기능 모듈 식별")

        return dependencies

def main():
    print("=" * 60)
    print("ERB 파일 구조 분석 도구")
    print("=" * 60)

    analyzer = ERBAnalyzer()

    # 모든 파일 분석
    summary = analyzer.analyze_all()

    # 의존성 맵 생성
    dependencies = analyzer.generate_dependency_map(summary)

    # 결과 저장
    output_dir = Path(__file__).parent.parent / "analysis"
    output_dir.mkdir(exist_ok=True)

    # erb_structure.json
    structure_file = output_dir / "erb_structure.json"
    with open(structure_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"\n[OK] 구조 분석 결과 저장: {structure_file}")

    # feature_dependencies.json
    dep_file = output_dir / "feature_dependencies.json"
    with open(dep_file, 'w', encoding='utf-8') as f:
        json.dump(dependencies, f, ensure_ascii=False, indent=2)
    print(f"[OK] 의존성 맵 저장: {dep_file}")

    # 요약 출력
    print("\n" + "=" * 60)
    print("[SUMMARY] 분석 요약")
    print("=" * 60)
    print(f"총 파일 수: {summary['total_files']}")
    print(f"총 함수 수: {summary['total_functions']}")
    print(f"총 라인 수: {summary['total_lines']:,}")
    print(f"총 크기: {summary['total_size'] / 1024:.1f} KB")
    print(f"\n변수 사용 현황:")
    for var, info in summary['variables_summary'].items():
        print(f"  {var}: {info['count']}개 (최대 인덱스: {info['max_index']})")

    print(f"\n기능 모듈:")
    for feature, info in dependencies.items():
        print(f"  {feature}: {info['description']}")
        if 'total_lines' in info:
            print(f"    → {info['total_lines']:,} 라인")

    print("\n" + "=" * 60)

if __name__ == '__main__':
    main()
