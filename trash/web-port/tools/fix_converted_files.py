"""
변환된 TypeScript 파일 수정 스크립트
1. import 경로 수정
2. 선언되지 않은 변수 처리
3. 함수 호출 통일
"""

import re
from pathlib import Path

def fix_typescript_file(file_path: Path) -> bool:
    """TypeScript 파일 수정"""
    try:
        content = file_path.read_text(encoding='utf-8')
        original_content = content

        # 1. import 경로 수정
        content = re.sub(
            r"import \{ TrainingContext \} from '\.\./types';",
            "import type { TrainingContext, Character } from '../../runtime/types';",
            content
        )

        content = re.sub(
            r"import \{ Character \} from '\.\./\.\./\.\./types/game';",
            "",
            content
        )

        # 2. 함수 시그니처 통일
        content = re.sub(
            r"export async function (\w+)\(",
            lambda m: f"export async function {m.group(1)}(",
            content
        )

        # 3. 잘못된 return 값 제거 (void 함수에서 숫자 반환)
        content = re.sub(
            r"(\): Promise<void> \{[\s\S]*?)return 0;",
            r"\1return;",
            content
        )

        # 4. 선언되지 않은 전역 변수 찾기
        # A, I, RESULT, E, S, K, T, COUNT 등
        variables = set()
        for match in re.finditer(r'\b([A-Z_]+)\s*=', content):
            var_name = match.group(1)
            if var_name not in ['RESULT', 'ARG', 'LOCAL']:
                variables.add(var_name)

        # import 섹션 뒤에 변수 선언 추가
        if variables:
            vars_str = ', '.join(sorted(variables))
            import_section = content.split('\n\n')[0:2]
            rest = '\n\n'.join(content.split('\n\n')[2:])

            # helpers.ts에서 변수 import
            helper_import = f"import {{ {vars_str} }} from './helpers';\n"

            content = '\n\n'.join(import_section) + '\n' + helper_import + '\n' + rest

        # 변경 사항이 있으면 저장
        if content != original_content:
            file_path.write_text(content, encoding='utf-8')
            return True
        return False

    except Exception as e:
        print(f"Error fixing {file_path}: {e}")
        return False

def main():
    """메인 함수"""
    base_path = Path("e:/ERA/AV간편개조/erAV_Ho_0.022(간편개조) - 복사본/web-port/src/modules")

    fixed = 0
    total = 0

    # 모든 generated 디렉토리의 .ts 파일 처리
    for ts_file in base_path.rglob("generated/*.ts"):
        if ts_file.name == "helpers.ts":
            continue

        total += 1
        if fix_typescript_file(ts_file):
            fixed += 1
            if fixed % 50 == 0:
                print(f"Fixed {fixed}/{total} files...")

    print(f"\nTotal: {total} files")
    print(f"Fixed: {fixed} files")
    print(f"Unchanged: {total - fixed} files")

if __name__ == "__main__":
    main()
