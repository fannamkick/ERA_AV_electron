#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
전체 ERB 파일 변환 (371개)
모든 디렉토리를 순회하며 ERB → TypeScript 변환
"""

import re
from pathlib import Path
from convert_all import CompleteERBConverter

ERB_ROOT = Path(__file__).parent.parent.parent / "ERB"
OUTPUT_ROOT = Path(__file__).parent.parent / "src" / "modules"

def main():
    print("=" * 80)
    print("전체 ERB → TypeScript 변환 (371개 파일)")
    print("=" * 80)

    converter = CompleteERBConverter()

    # 모든 ERB 파일 찾기
    all_erb_files = list(ERB_ROOT.rglob("*.ERB"))
    print(f"\n발견한 ERB 파일: {len(all_erb_files)}개\n")

    # 디렉토리별 그룹화
    dir_groups = {}
    for erb_file in all_erb_files:
        # 상대 경로에서 디렉토리 추출
        rel_path = erb_file.relative_to(ERB_ROOT)
        dir_name = rel_path.parent.name if rel_path.parent.name else "root"

        if dir_name not in dir_groups:
            dir_groups[dir_name] = []
        dir_groups[dir_name].append(erb_file)

    # 디렉토리 → 모듈 이름 매핑
    dir_mapping = {
        "指導関係": "training/commands",          # 조교 커맨드 (이미 완료)
        "システム関係": "system",                  # 시스템
        "能力上昇関係": "abilities",               # 능력치 상승
        "イベント関係": "events",                  # 이벤트
        "実績関係": "achievements",               # 업적
        "訪問関係": "visits",                      # 방문
        "娼館関係": "brothel",                     # 매춘
        "クリアボーナス関係": "clear_bonus",       # 클리어 보너스
        "TIPS関係": "tips",                        # 도움말
        "ＡＶ撮影関係": "filming",                 # AV 촬영
        "ミッション関係": "missions",              # 미션
        "組み込み関数": "builtin",                 # 내장 함수
    }

    total_success = 0
    total_failed = 0
    results = {}

    for dir_name, files in sorted(dir_groups.items()):
        module_name = dir_mapping.get(dir_name, "unknown")

        print(f"\n{'='*60}")
        print(f"[DIR] {module_name} ({len(files)} files)")
        print(f"{'='*60}")

        success = 0
        failed = 0
        failed_files = []

        for erb_file in sorted(files):
            # 출력 경로 결정
            output_name = erb_file.stem.lower() + '.ts'
            output_dir = OUTPUT_ROOT / module_name / "generated"
            output_path = output_dir / output_name

            try:
                if converter.convert_file(erb_file, output_path):
                    success += 1
                    if success % 10 == 0:
                        print(f"   Progress: {success}/{len(files)}")
                else:
                    failed += 1
                    failed_files.append(erb_file.name)
            except Exception as e:
                failed += 1
                failed_files.append(erb_file.name)

        results[dir_name] = {"success": success, "failed": failed}
        total_success += success
        total_failed += failed

        print(f"\n   Result: {success} success, {failed} failed")
        if failed_files:
            print(f"   Failed files: {', '.join(failed_files)}")

    # 최종 결과
    print("\n" + "=" * 80)
    print("Complete!")
    print("=" * 80)
    print(f"\n총 성공: {total_success}개")
    print(f"총 실패: {total_failed}개")
    print(f"성공률: {total_success}/{total_success + total_failed} ({100 * total_success / (total_success + total_failed):.1f}%)")

    print("\n\nResults by directory:")
    print("-" * 80)
    for dir_name, result in results.items():
        module = dir_mapping.get(dir_name, "unknown")
        success = result['success']
        failed = result['failed']
        total = success + failed
        rate = 100 * success / total if total > 0 else 0
        print(f"  {module:20} {success:3}/{total:3} ({rate:5.1f}%)")

if __name__ == '__main__':
    main()
