#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
생성된 파일의 import 경로 수정
types.ts -> runtime/types.ts
"""

from pathlib import Path

GENERATED_DIR = Path(__file__).parent.parent / "src" / "modules" / "training" / "commands" / "generated"

def fix_imports():
    print("=" * 60)
    print("Import 경로 수정")
    print("=" * 60)

    count = 0
    for ts_file in GENERATED_DIR.glob("*.ts"):
        content = ts_file.read_text(encoding='utf-8')

        # 기존 import 찾기
        old_import = "import { TrainingContext } from '../types';\nimport { Character } from '../../../types/game';"
        new_import = "import { TrainingContext, Character } from '../../runtime/types';"

        if old_import in content:
            content = content.replace(old_import, new_import)
            ts_file.write_text(content, encoding='utf-8')
            count += 1

    print(f"\n수정 완료: {count}개 파일")

if __name__ == '__main__':
    fix_imports()
