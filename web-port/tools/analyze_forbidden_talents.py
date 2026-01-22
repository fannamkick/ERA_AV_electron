# -*- coding: utf-8 -*-
import sys
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import os
from collections import Counter

CSV_DIR = r"e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\CSV"

# FORBIDDEN_TALENTS 목록 (조교/이벤트로만 획득)
FORBIDDEN_TALENTS = [
    13, 42, 47, 52,
    74, 75, 76, 77, 78,
    81, 83, 85, 87, 88, 89, 90,
    9, 22, 26, 46, 123,
    57, 115, 131,
    130, 136, 137,
    31, 180, 181, 182, 183, 184,
    230, 231, 232, 233, 271, 272,
    430, 440,
    425, 156,
    251, 252, 253,
    91, 92, 93
]

# VERY_RARE로 분류했던 것들
VERY_RARE_CANDIDATES = [121, 122, 124, 126, 127]

def parse_character_csv(filepath):
    try:
        with open(filepath, 'rb') as f:
            header = f.read(2)

        if header == b'\xff\xfe':
            encoding = 'utf-16-le'
        elif header == b'\xfe\xff':
            encoding = 'utf-16-be'
        else:
            encoding = 'shift-jis'

        with open(filepath, 'r', encoding=encoding, errors='ignore') as f:
            lines = f.readlines()

        talents = []
        for line in lines:
            line = line.strip()
            if not line or line.startswith(';'):
                continue

            parts = [p.strip() for p in line.split(',')]
            if len(parts) < 2:
                continue

            if parts[0] == '素質':
                try:
                    talent_id = int(parts[1])
                    talents.append(talent_id)
                except ValueError:
                    pass

        return talents
    except Exception as e:
        return []

def main():
    char_files = []
    for filename in os.listdir(CSV_DIR):
        if filename.startswith('Chara') and filename.endswith('.csv') and filename != 'Chara0.csv':
            char_files.append(os.path.join(CSV_DIR, filename))

    print(f"분석 대상: {len(char_files)}개 캐릭터")
    print()

    # 50개 캐릭터의 특성 수집
    all_talents = []
    for filepath in char_files[:50]:
        talents = parse_character_csv(filepath)
        all_talents.extend(talents)

    talent_counter = Counter(all_talents)

    # FORBIDDEN_TALENTS 중 실제로 캐릭터가 가진 것 찾기
    print("=" * 80)
    print("⚠️  FORBIDDEN_TALENTS인데 실제 캐릭터가 가진 특성")
    print("=" * 80)
    found_forbidden = []
    for talent_id in FORBIDDEN_TALENTS:
        count = talent_counter.get(talent_id, 0)
        if count > 0:
            found_forbidden.append((talent_id, count))

    if found_forbidden:
        print(f"\n발견됨: {len(found_forbidden)}개")
        for talent_id, count in sorted(found_forbidden, key=lambda x: -x[1]):
            percentage = (count / 50) * 100
            print(f"  TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%) ⚠️  FORBIDDEN인데 초기 캐릭터가 보유!")
    else:
        print("\n✓ 없음 (모두 정상)")

    # VERY_RARE 후보들 확인
    print()
    print("=" * 80)
    print("VERY_RARE 후보 특성들의 실제 분포")
    print("=" * 80)
    for talent_id in VERY_RARE_CANDIDATES:
        count = talent_counter.get(talent_id, 0)
        percentage = (count / 50) * 100 if count > 0 else 0
        status = "✓" if count > 0 else "✗"
        print(f"  {status} TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%)")

    # 특정 범위 특성들 확인
    print()
    print("=" * 80)
    print("특수 범위 특성 분석")
    print("=" * 80)

    # 300번대 (신분/특성)
    print("\n[300번대 - 신분/특성]")
    for talent_id in range(300, 340):
        count = talent_counter.get(talent_id, 0)
        if count > 0:
            percentage = (count / 50) * 100
            print(f"  TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%)")

    # 400번대 (AV/직업)
    print("\n[400번대 - AV/직업]")
    for talent_id in range(400, 440):
        count = talent_counter.get(talent_id, 0)
        if count > 0:
            percentage = (count / 50) * 100
            print(f"  TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%)")

    # 200번대 (직업)
    print("\n[200번대 - 직업]")
    for talent_id in range(200, 230):
        count = talent_counter.get(talent_id, 0)
        if count > 0:
            percentage = (count / 50) * 100
            print(f"  TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%)")

    # 이벤트/조교로 획득 가능성이 높은 특성들
    print()
    print("=" * 80)
    print("🔍 의심스러운 특성 (높은 빈도 = 초기 부여 가능)")
    print("=" * 80)

    # 80-99 범위 (관계/성벽)
    print("\n[80-99 범위 - 관계/성벽]")
    for talent_id in range(80, 100):
        count = talent_counter.get(talent_id, 0)
        if count > 0:
            percentage = (count / 50) * 100
            is_forbidden = talent_id in FORBIDDEN_TALENTS
            status = "❌ FORBIDDEN" if is_forbidden else "✓ OK"
            print(f"  {status} TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%)")

if __name__ == '__main__':
    main()
