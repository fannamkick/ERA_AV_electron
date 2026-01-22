#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""단일 파일 변환 테스트"""

import re
from pathlib import Path
import sys
sys.path.append(str(Path(__file__).parent))

from convert_all import CompleteERBConverter

ERB_ROOT = Path(__file__).parent.parent.parent / "ERB"
OUTPUT_ROOT = Path(__file__).parent.parent / "src" / "modules" / "training" / "commands"

def test_file(filename):
    print(f"=== Testing {filename} ===")

    erb_path = ERB_ROOT / "指導関係" / filename
    if not erb_path.exists():
        print(f"ERROR: File not found: {erb_path}")
        return

    print(f"Reading file...")
    converter = CompleteERBConverter()

    # 파일 읽기
    content = converter.read_erb(erb_path)
    lines = content.split('\n')
    print(f"Total lines: {len(lines)}")

    # 함수 추출
    functions = {}
    current_func = None
    current_lines = []

    for i, line in enumerate(lines):
        if line.strip().startswith('@'):
            if current_func:
                functions[current_func] = current_lines
            match = re.match(r'@([A-Z_0-9]+)', line.strip())
            if match:
                current_func = match.group(1)
                current_lines = []
                print(f"Line {i}: Found function @{current_func}")
            else:
                print(f"Line {i}: @ found but no match: {line.strip()}")
        elif current_func:
            current_lines.append(line)

    if current_func:
        functions[current_func] = current_lines

    print(f"\nExtracted {len(functions)} functions:")
    for fname in functions.keys():
        print(f"  - {fname} ({len(functions[fname])} lines)")

    if not functions:
        print("ERROR: No functions found!")
        return

    # 변환
    output_name = erb_path.stem.lower() + '.ts'
    output_path = OUTPUT_ROOT / 'generated' / output_name

    print(f"\nConverting to: {output_path}")
    result = converter.convert_file(erb_path, output_path)

    if result:
        print("SUCCESS!")
    else:
        print("FAILED!")

if __name__ == '__main__':
    test_file("COMF50.ERB")
