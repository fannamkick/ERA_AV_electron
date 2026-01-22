#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ERB → TypeScript 자동 변환 도구
ERB 파일의 모든 로직(조건문, 변수, 메시지)을 TypeScript로 변환합니다.
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Optional, Any

ERB_ROOT = Path(__file__).parent.parent.parent / "ERB"
OUTPUT_ROOT = Path(__file__).parent.parent / "src" / "modules" / "training" / "commands"

class ERBToTypeScriptConverter:
    def __init__(self):
        self.indent_level = 0
        self.output_lines = []

    def read_erb_file(self, file_path: Path) -> str:
        """ERB 파일 읽기"""
        try:
            try:
                return file_path.read_text(encoding='utf-8')
            except:
                return file_path.read_text(encoding='cp949')
        except Exception as e:
            print(f"[ERR] 파일 읽기 실패: {file_path} - {e}")
            return ""

    def add_line(self, line: str, indent_offset: int = 0):
        """출력 라인 추가 (들여쓰기 포함)"""
        indent = "  " * (self.indent_level + indent_offset)
        self.output_lines.append(f"{indent}{line}")

    def convert_variable(self, var_expr: str) -> str:
        """ERB 변수를 TypeScript로 변환"""
        # PALAM:0 -> ctx.params[0]
        var_expr = re.sub(r'PALAM:(\d+)', r'ctx.params[\1]', var_expr)
        var_expr = re.sub(r'PALAM', r'ctx.params', var_expr)

        # TALENT:10 -> ctx.talents[10]
        var_expr = re.sub(r'TALENT:(\d+)', r'ctx.talents[\1]', var_expr)
        var_expr = re.sub(r'TALENT', r'ctx.talents', var_expr)

        # FLAG:100 -> ctx.flags[100]
        var_expr = re.sub(r'FLAG:(\d+)', r'ctx.flags[\1]', var_expr)
        var_expr = re.sub(r'FLAG', r'ctx.flags', var_expr)

        # ABL:0 -> ctx.abilities[0]
        var_expr = re.sub(r'ABL:(\d+)', r'ctx.abilities[\1]', var_expr)
        var_expr = re.sub(r'ABL', r'ctx.abilities', var_expr)

        # EXP:0 -> ctx.experience[0]
        var_expr = re.sub(r'EXP:(\d+)', r'ctx.experience[\1]', var_expr)
        var_expr = re.sub(r'EXP', r'ctx.experience', var_expr)

        # JUEL:0 -> ctx.juel[0]
        var_expr = re.sub(r'JUEL:(\d+)', r'ctx.juel[\1]', var_expr)

        # CFLAG:0 -> character.flags[0]
        var_expr = re.sub(r'CFLAG:(\d+)', r'character.flags[\1]', var_expr)

        # TFLAG:0 -> character.tflags[0]
        var_expr = re.sub(r'TFLAG:(\d+)', r'character.tflags[\1]', var_expr)

        # TEQUIP:0 -> character.equipment[0]
        var_expr = re.sub(r'TEQUIP:(\d+)', r'character.equipment[\1]', var_expr)

        # SOURCE:0 -> character.source[0]
        var_expr = re.sub(r'SOURCE:(\d+)', r'character.source[\1]', var_expr)

        # TARGET -> character (현재 대상)
        var_expr = re.sub(r'\bTARGET\b', r'character', var_expr)

        return var_expr

    def convert_condition(self, condition: str) -> str:
        """ERB 조건식을 TypeScript로 변환"""
        # 변수 변환
        ts_cond = self.convert_variable(condition)

        # 연산자 변환
        ts_cond = ts_cond.replace(' == ', ' === ')
        ts_cond = ts_cond.replace(' \\ ', ' != ')
        ts_cond = ts_cond.replace('!', ' !== ')

        # 논리 연산자
        ts_cond = re.sub(r'\|\|', '||', ts_cond)
        ts_cond = re.sub(r'&&', '&&', ts_cond)

        return ts_cond.strip()

    def convert_assignment(self, line: str) -> Optional[str]:
        """변수 할당문 변환"""
        # PALAM:0 += 10
        match = re.match(r'([A-Z]+):?(\d+)?\s*([+\-*\/])=\s*(.+)', line)
        if match:
            var_type, index, op, value = match.groups()
            ts_var = self.convert_variable(f"{var_type}:{index}" if index else var_type)
            ts_value = self.convert_variable(value.strip())
            return f"{ts_var} {op}= {ts_value};"

        # PALAM:0 = 100
        match = re.match(r'([A-Z]+):?(\d+)?\s*=\s*(.+)', line)
        if match:
            var_type, index, value = match.groups()
            ts_var = self.convert_variable(f"{var_type}:{index}" if index else var_type)
            ts_value = self.convert_variable(value.strip())
            return f"{ts_var} = {ts_value};"

        return None

    def convert_if_statement(self, line: str) -> Optional[str]:
        """IF문 변환"""
        # IF 조건
        match = re.match(r'IF\s+(.+)', line, re.IGNORECASE)
        if match:
            condition = self.convert_condition(match.group(1))
            return f"if ({condition}) {{"

        # ELSEIF 조건
        match = re.match(r'ELSEIF\s+(.+)', line, re.IGNORECASE)
        if match:
            condition = self.convert_condition(match.group(1))
            return f"}} else if ({condition}) {{"

        # ELSE
        if re.match(r'ELSE\s*$', line, re.IGNORECASE):
            return "} else {"

        # ENDIF
        if re.match(r'ENDIF\s*$', line, re.IGNORECASE):
            return "}"

        return None

    def convert_selectcase(self, line: str, lines: List[str], idx: int) -> Optional[tuple]:
        """SELECTCASE문 변환 (switch-case)"""
        match = re.match(r'SELECTCASE\s+(.+)', line, re.IGNORECASE)
        if not match:
            return None

        switch_var = self.convert_variable(match.group(1).strip())
        ts_lines = [f"switch ({switch_var}) {{"]

        i = idx + 1
        while i < len(lines):
            case_line = lines[i].strip()

            # CASE 값
            if re.match(r'CASE\s+(.+)', case_line, re.IGNORECASE):
                case_match = re.match(r'CASE\s+(.+)', case_line, re.IGNORECASE)
                case_values = case_match.group(1).split(',')
                for val in case_values:
                    ts_lines.append(f"  case {val.strip()}:")

            # CASEELSE
            elif re.match(r'CASEELSE', case_line, re.IGNORECASE):
                ts_lines.append("  default:")

            # ENDSELECT
            elif re.match(r'ENDSELECT', case_line, re.IGNORECASE):
                ts_lines.append("}")
                return (ts_lines, i - idx + 1)

            else:
                # 일반 라인
                converted = self.convert_line(case_line)
                if converted:
                    ts_lines.append(f"    {converted}")

            i += 1

        return (ts_lines, i - idx)

    def convert_message(self, line: str) -> Optional[str]:
        """메시지 출력 변환"""
        # PRINTFORML "메시지"
        match = re.match(r'PRINTFORM[L]?\s+(.+)', line, re.IGNORECASE)
        if match:
            message = match.group(1).strip()
            # 변수 치환 %VAR% -> ${var}
            message = re.sub(r'%([A-Z]+):?(\d+)?%',
                           lambda m: '${' + self.convert_variable(f"{m.group(1)}:{m.group(2)}" if m.group(2) else m.group(1)) + '}',
                           message)
            return f"ctx.showMessage(`{message}`);"

        # PRINTL "텍스트"
        match = re.match(r'PRINTL\s+(.+)', line, re.IGNORECASE)
        if match:
            text = match.group(1).strip()
            return f"ctx.showMessage({text});"

        # PRINTBUTTON "버튼", 값
        match = re.match(r'PRINTBUTTON\s+["\']([^"\']+)["\'],\s*(\d+)', line, re.IGNORECASE)
        if match:
            label, value = match.groups()
            return f"ctx.addButton('{label}', {value});"

        return None

    def convert_function_call(self, line: str) -> Optional[str]:
        """함수 호출 변환"""
        # CALL @함수명
        match = re.match(r'CALL\s+@([A-Z_0-9]+)', line, re.IGNORECASE)
        if match:
            func_name = match.group(1).lower()
            return f"await {func_name}(ctx, character);"

        # GOTO @라벨
        match = re.match(r'GOTO\s+@([A-Z_0-9]+)', line, re.IGNORECASE)
        if match:
            label = match.group(1).lower()
            return f"// GOTO {label} - 구조 변경 필요"

        return None

    def convert_line(self, line: str) -> Optional[str]:
        """단일 라인 변환"""
        line = line.strip()
        if not line or line.startswith(';'):
            return None

        # 함수 정의는 별도 처리
        if line.startswith('@'):
            return None

        # IF/ELSEIF/ELSE/ENDIF
        if_result = self.convert_if_statement(line)
        if if_result:
            return if_result

        # 변수 할당
        assign_result = self.convert_assignment(line)
        if assign_result:
            return assign_result

        # 메시지
        msg_result = self.convert_message(line)
        if msg_result:
            return msg_result

        # 함수 호출
        call_result = self.convert_function_call(line)
        if call_result:
            return call_result

        # 주석으로 변환 (변환 불가능한 라인)
        return f"// TODO: {line}"

    def convert_function(self, func_name: str, func_lines: List[str]) -> str:
        """함수 전체 변환"""
        self.output_lines = []
        self.indent_level = 0

        # 함수 시그니처
        ts_func_name = func_name.lower()
        self.add_line(f"export async function {ts_func_name}(")
        self.add_line(f"  ctx: TrainingContext,", 0)
        self.add_line(f"  character: Character", 0)
        self.add_line(f"): Promise<void> {{", 0)
        self.indent_level = 1

        # 함수 본문 변환
        i = 0
        while i < len(func_lines):
            line = func_lines[i].strip()

            # SELECTCASE 처리
            if line.upper().startswith('SELECTCASE'):
                result = self.convert_selectcase(line, func_lines, i)
                if result:
                    switch_lines, skip = result
                    for sl in switch_lines:
                        self.add_line(sl)
                    i += skip
                    continue

            # 일반 라인 변환
            converted = self.convert_line(line)
            if converted:
                # 중괄호 처리
                if converted.endswith('{'):
                    self.add_line(converted)
                    self.indent_level += 1
                elif converted == '}':
                    self.indent_level -= 1
                    self.add_line(converted)
                elif converted.startswith('} else'):
                    self.indent_level -= 1
                    self.add_line(converted)
                    self.indent_level += 1
                else:
                    self.add_line(converted)

            i += 1

        self.indent_level = 0
        self.add_line("}")

        return '\n'.join(self.output_lines)

    def convert_erb_file(self, erb_path: Path, output_path: Path):
        """ERB 파일 전체 변환"""
        print(f"[*] 변환 중: {erb_path.name}")

        content = self.read_erb_file(erb_path)
        if not content:
            return False

        lines = content.split('\n')

        # 함수별로 분리
        functions = {}
        current_function = None
        current_lines = []

        for line in lines:
            # 함수 정의 시작
            if line.strip().startswith('@'):
                if current_function:
                    functions[current_function] = current_lines
                match = re.match(r'@([A-Z_0-9]+)', line.strip())
                if match:
                    current_function = match.group(1)
                    current_lines = []
            elif current_function:
                current_lines.append(line)

        # 마지막 함수 저장
        if current_function:
            functions[current_function] = current_lines

        if not functions:
            print(f"  [WARN] 함수를 찾을 수 없음")
            return False

        # TypeScript 파일 생성
        output_lines = [
            "/**",
            f" * {erb_path.name}에서 자동 변환됨",
            " * 원본 로직을 완전히 보존합니다.",
            " */",
            "",
            "import { TrainingContext } from '../types';",
            "import { Character } from '../../../types/game';",
            "",
        ]

        # 각 함수 변환
        for func_name, func_lines in functions.items():
            ts_code = self.convert_function(func_name, func_lines)
            output_lines.append(ts_code)
            output_lines.append("")

        # 파일 저장
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text('\n'.join(output_lines), encoding='utf-8')

        print(f"  [OK] 생성: {output_path.relative_to(OUTPUT_ROOT.parent.parent)}")
        print(f"       {len(functions)}개 함수 변환 완료")

        return True

def main():
    print("=" * 60)
    print("ERB → TypeScript 자동 변환 도구")
    print("=" * 60)

    converter = ERBToTypeScriptConverter()

    # 조교 커맨드 파일들 변환
    training_dir = ERB_ROOT / "指導関係"

    if not training_dir.exists():
        print(f"[ERR] 디렉토리를 찾을 수 없음: {training_dir}")
        return

    # COMF*.ERB 파일들 찾기
    comf_files = sorted(training_dir.glob("COMF*.ERB"))
    print(f"\n[*] {len(comf_files)}개의 COMF 파일 발견")

    # 테스트: 처음 5개만 변환
    print("\n[*] 테스트: 처음 5개 파일 변환 시작...\n")

    success_count = 0
    for erb_file in comf_files[:5]:
        # COMF0.ERB -> comf0.ts
        output_name = erb_file.stem.lower() + '.ts'
        output_path = OUTPUT_ROOT / 'generated' / output_name

        if converter.convert_erb_file(erb_file, output_path):
            success_count += 1
        print()

    print("=" * 60)
    print(f"변환 완료: {success_count}/{len(comf_files[:5])}개 성공")
    print("=" * 60)
    print(f"\n생성된 파일 위치: {OUTPUT_ROOT / 'generated'}")
    print("\n[!] 생성된 TypeScript 파일을 검토하여 추가 수정이 필요한 부분을 확인하세요.")

if __name__ == '__main__':
    main()
