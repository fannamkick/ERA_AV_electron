#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
실제 캐릭터 CSV 파일 분석 스크립트
특성(TALENT) 사용 빈도 통계
"""

import os
import sys
from collections import Counter, defaultdict

# Windows 콘솔 인코딩 설정
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# CSV 디렉토리 경로
CSV_DIR = r"e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\CSV"

def parse_character_csv(filepath):
    """캐릭터 CSV 파일 파싱"""
    try:
        # BOM 확인 후 인코딩 결정
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

        data = {
            'base': {},
            'abl': {},
            'exp': {},
            'talent': [],
            'juel': {},
            'cflag': {},
            'cstr': {}
        }

        for line in lines:
            line = line.strip()
            if not line or line.startswith(';'):
                continue

            parts = [p.strip() for p in line.split(',')]
            if len(parts) < 2:
                continue

            category = parts[0]

            # BASE 데이터
            if category == '基礎':
                if len(parts) >= 3:
                    try:
                        key = int(parts[1])
                        value = int(parts[2])
                        data['base'][key] = value
                    except ValueError:
                        pass

            # 能力 (ABL)
            elif category == '能力':
                if len(parts) >= 3:
                    try:
                        key = int(parts[1])
                        value = int(parts[2])
                        data['abl'][key] = value
                    except ValueError:
                        pass

            # 経験 (EXP)
            elif category == '経験':
                if len(parts) >= 3:
                    try:
                        key = int(parts[1])
                        value = int(parts[2])
                        data['exp'][key] = value
                    except ValueError:
                        pass

            # 素質 (TALENT)
            elif category == '素質':
                if len(parts) >= 2:
                    try:
                        talent_id = int(parts[1])
                        data['talent'].append(talent_id)
                    except ValueError:
                        pass

            # 珠 (JUEL)
            elif category == '珠':
                if len(parts) >= 3:
                    try:
                        key = int(parts[1])
                        value = int(parts[2])
                        data['juel'][key] = value
                    except ValueError:
                        pass

            # フラグ (CFLAG)
            elif category == 'フラグ':
                if len(parts) >= 3:
                    try:
                        key = int(parts[1])
                        value = int(parts[2])
                        data['cflag'][key] = value
                    except ValueError:
                        pass

            # CSTR
            elif category == 'CSTR':
                if len(parts) >= 3:
                    try:
                        key = int(parts[1])
                        value = parts[2]
                        data['cstr'][key] = value
                    except ValueError:
                        pass

        return data

    except Exception as e:
        print(f"Error parsing {filepath}: {e}", file=sys.stderr)
        return None

def main():
    # 모든 캐릭터 파일 찾기
    char_files = []
    for filename in os.listdir(CSV_DIR):
        if filename.startswith('Chara') and filename.endswith('.csv') and filename != 'Chara0.csv':
            char_files.append(os.path.join(CSV_DIR, filename))

    print(f"총 {len(char_files)}개 캐릭터 파일 발견")
    print("=" * 80)
    print()

    # 모든 캐릭터 파싱
    characters = []
    for filepath in char_files[:50]:  # 처음 50개
        filename = os.path.basename(filepath)
        data = parse_character_csv(filepath)
        if data:
            characters.append((filename, data))

    print(f"{len(characters)}개 캐릭터 분석 완료")
    print()

    # 통계 수집
    talent_counter = Counter()
    base_fields = defaultdict(int)
    abl_fields = defaultdict(int)
    exp_fields = defaultdict(int)

    talent_counts = []  # 캐릭터별 특성 개수
    virgin_count = 0

    for filename, data in characters:
        # TALENT 통계
        for talent_id in data['talent']:
            talent_counter[talent_id] += 1
        talent_counts.append(len(data['talent']))

        # 처녀 여부
        if 0 in data['talent']:
            virgin_count += 1

        # BASE 필드 사용
        for key in data['base'].keys():
            base_fields[key] += 1

        # ABL 필드 사용
        for key in data['abl'].keys():
            abl_fields[key] += 1

        # EXP 필드 사용
        for key in data['exp'].keys():
            exp_fields[key] += 1

    # 특성 사용 빈도 TOP 30
    print("=" * 80)
    print("특성(TALENT) 사용 빈도 TOP 30")
    print("=" * 80)
    for talent_id, count in talent_counter.most_common(30):
        percentage = (count / len(characters)) * 100
        print(f"TALENT {talent_id:3d}: {count:2d}명 ({percentage:5.1f}%)")

    print()
    print("=" * 80)
    print("캐릭터별 특성 개수 통계")
    print("=" * 80)
    avg_talents = sum(talent_counts) / len(talent_counts)
    print(f"평균: {avg_talents:.1f}개")
    print(f"최소: {min(talent_counts)}개")
    print(f"최대: {max(talent_counts)}개")
    print(f"처녀 비율: {virgin_count}/{len(characters)} ({virgin_count/len(characters)*100:.1f}%)")

    print()
    print("=" * 80)
    print("BASE 필드 사용 빈도")
    print("=" * 80)
    for key in sorted(base_fields.keys())[:15]:
        count = base_fields[key]
        percentage = (count / len(characters)) * 100
        print(f"BASE {key:2d}: {count:2d}명 ({percentage:5.1f}%)")

    print()
    print("=" * 80)
    print("ABL 필드 사용 빈도 (0이 아닌 값)")
    print("=" * 80)
    for key in sorted(abl_fields.keys())[:20]:
        count = abl_fields[key]
        percentage = (count / len(characters)) * 100
        print(f"ABL {key:2d}: {count:2d}명 ({percentage:5.1f}%)")

    print()
    print("=" * 80)
    print("EXP 필드 사용 빈도 (0이 아닌 값)")
    print("=" * 80)
    for key in sorted(exp_fields.keys())[:20]:
        count = exp_fields[key]
        percentage = (count / len(characters)) * 100
        print(f"EXP {key:3d}: {count:2d}명 ({percentage:5.1f}%)")

    # 상세 캐릭터 예시 (첫 5개)
    print()
    print("=" * 80)
    print("캐릭터 상세 예시 (처음 5개)")
    print("=" * 80)
    for filename, data in characters[:5]:
        print(f"\n{filename}")
        print(f"  특성({len(data['talent'])}개): {sorted(data['talent'])}")
        print(f"  BASE 필드: {len(data['base'])}개")
        print(f"  ABL 필드: {len(data['abl'])}개")
        print(f"  EXP 필드: {len(data['exp'])}개")
        if 0 in data['talent']:
            print(f"  처녀: O")
        else:
            print(f"  처녀: X")

if __name__ == '__main__':
    main()
