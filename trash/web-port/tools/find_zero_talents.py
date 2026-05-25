# -*- coding: utf-8 -*-
import sys
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import os
from collections import Counter

CSV_DIR = r"e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\CSV"

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

    print(f"분석 대상: {len(char_files)}개 캐릭터 (처음 50개만)")
    print()

    # 50개 캐릭터의 특성 수집
    all_talents = []
    for filepath in char_files[:50]:
        talents = parse_character_csv(filepath)
        all_talents.extend(talents)

    talent_counter = Counter(all_talents)

    # 모든 특성 범위에서 0명인 것 찾기
    zero_talents = []

    # 검사할 범위들
    ranges = [
        (0, 20, "기본소질"),
        (20, 40, "성향/처녀성"),
        (40, 80, "체질/기술/솔직도"),
        (80, 100, "성벽/관계"),
        (100, 150, "민감도/신체"),
        (150, 200, "저항/특수성격"),
        (200, 230, "직업/학생"),
        (230, 280, "강화소질/신체변형"),
        (300, 340, "신분/특성"),
        (400, 450, "AV/직업"),
        (500, 550, "특수종족"),
        (600, 650, "부스트"),
    ]

    for start, end, category in ranges:
        category_zeros = []
        for talent_id in range(start, end):
            if talent_counter.get(talent_id, 0) == 0:
                category_zeros.append(talent_id)

        if category_zeros:
            zero_talents.extend([(talent_id, category) for talent_id in category_zeros])

    # 범주별로 출력
    print("=" * 80)
    print("0명인 특성 목록 (범주별)")
    print("=" * 80)

    current_category = None
    for talent_id, category in zero_talents:
        if category != current_category:
            print(f"\n[{category}]")
            current_category = category
        print(f"  {talent_id}", end="")
        if (talent_id + 1) % 10 == 0:
            print()

    print()
    print()

    # 주요 범위 요약
    print("=" * 80)
    print("주요 범위별 0명 특성 요약")
    print("=" * 80)

    for start, end, category in ranges:
        category_zeros = [t for t in range(start, end) if talent_counter.get(t, 0) == 0]
        total_in_range = end - start
        zero_count = len(category_zeros)
        percentage = (zero_count / total_in_range * 100) if total_in_range > 0 else 0

        print(f"{category:20s}: {zero_count:3d}/{total_in_range:3d} ({percentage:5.1f}%) - {category_zeros[:10]}{'...' if len(category_zeros) > 10 else ''}")

    print()
    print("=" * 80)
    print("ASSIGNABLE_TALENTS 범위 내 0명 특성 (초기 부여 불가능한 것들)")
    print("=" * 80)

    # 현재 ASSIGNABLE에 포함되어 있지만 0명인 특성 찾기
    current_assignable = [
        # COMMON
        10, 11, 12, 14, 16, 18,  # personality
        23, 24, 25, 28,  # sexualInterest
        40, 41, 44, 45,  # constitution
        60, 61, 62,  # cleanliness
        70, 71,  # honesty
        125, 128,  # pubicHair

        # UNCOMMON
        15, 17,  # personality
        20, 21, 27,  # sexualAttitude
        30, 32, 33, 34, 35, 36, 37,  # chastity
        43,  # constitution
        50, 51, 55, 56,  # skills
        72, 73,  # addiction
        79, 80,  # perversion
        101, 102, 103, 104, 105, 106, 107, 108,  # sensitivity
        111, 112, 113, 119,  # bodyTraits
        132, 133, 134, 135,  # mental

        # RARE
        10,  # timid (중복)
        63, 64,  # special
        82, 84, 86,  # relationship
        99, 100,  # bodySize
        117, 118,  # specialBody
        140, 141,  # animalPreference
        150, 151, 152,  # resistance
        160, 161, 162, 163,  # complexes

        # VERY_RARE
        121, 122,  # gender
        124,  # animalEars
        126, 127,  # appearance

        # CONDITIONAL
        0, 2,  # virginity
        220, 221, 222, 223, 224, 225,  # students
        185, 186, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212,  # jobs
        310, 311, 319, 320, 321, 322, 323, 324, 326,  # identity
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 417, 418, 421, 422, 426, 427, 428, 429, 431, 433, 434,  # avJobs
    ]

    zero_in_assignable = [t for t in current_assignable if talent_counter.get(t, 0) == 0]

    print(f"\n총 {len(zero_in_assignable)}개:")
    for i, talent_id in enumerate(zero_in_assignable):
        print(f"  {talent_id}", end="")
        if (i + 1) % 15 == 0:
            print()

    print()

if __name__ == '__main__':
    main()
