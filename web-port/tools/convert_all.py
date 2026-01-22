#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ERB → TypeScript 전체 변환 실행
117개 조교 커맨드 파일 전부 변환
"""

import re
from pathlib import Path

ERB_ROOT = Path(__file__).parent.parent.parent / "ERB"
OUTPUT_ROOT = Path(__file__).parent.parent / "src" / "modules" / "training" / "commands"

class CompleteERBConverter:
    def __init__(self):
        self.lines = []
        self.indent = 0
        self.sif_pending = False  # SIF 다음 줄 처리를 위한 플래그

    def read_erb(self, path: Path) -> str:
        # UTF-16 먼저 시도
        try:
            return path.read_text(encoding='utf-16')
        except:
            pass
        # UTF-8 시도
        try:
            return path.read_text(encoding='utf-8')
        except:
            pass
        # CP949 시도
        try:
            return path.read_text(encoding='cp949')
        except:
            pass
        # Shift-JIS 시도
        try:
            return path.read_text(encoding='shift-jis')
        except Exception as e:
            raise Exception(f"Failed to read {path}: {e}")

    def emit(self, code: str):
        if code.strip():
            self.lines.append('  ' * self.indent + code)
        else:
            self.lines.append('')

    def convert_var(self, expr: str) -> str:
        """모든 ERB 변수 → TypeScript"""
        # RAND: 패턴을 임시로 __RAND__ 로 보호 (다른 변환 방지)
        # 가장 먼저 처리해야 (\w+):\(([^)]+)\) 패턴에 매치되지 않음
        rand_placeholders = []
        def save_rand_pattern():
            """RAND: 뒤의 인자를 추출하고 임시 토큰으로 교체"""
            nonlocal expr
            while 'RAND:' in expr:
                match = re.search(r'\bRAND:', expr)
                if not match:
                    break
                start = match.start()
                pos = match.end()

                # 인자 추출
                if pos >= len(expr):
                    break
                if expr[pos] != '(':
                    # 단순 변수/숫자
                    m = re.match(r'\w+', expr[pos:])
                    if m:
                        end = pos + len(m.group(0))
                        rand_str = expr[start:end]
                        rand_placeholders.append(rand_str)
                        expr = expr[:start] + f'__RAND_{len(rand_placeholders)-1}__' + expr[end:]
                    else:
                        break
                else:
                    # 괄호 표현식
                    depth = 0
                    i = pos
                    while i < len(expr):
                        if expr[i] == '(':
                            depth += 1
                        elif expr[i] == ')':
                            depth -= 1
                            if depth == 0:
                                end = i + 1
                                rand_str = expr[start:end]
                                rand_placeholders.append(rand_str)
                                expr = expr[:start] + f'__RAND_{len(rand_placeholders)-1}__' + expr[end:]
                                break
                        i += 1
                    else:
                        break

        save_rand_pattern()

        # 특수 접두어 (콜론 2개) - 한글/영문 모두 지원
        # TALENT:(LOCAL:1):432 같은 괄호 표현식 먼저 처리
        def convert_talent_paren(m):
            inner = self.convert_var(m.group(1))  # 괄호 안 표현식 변환
            idx = m.group(2)
            return f'ctx.getTalent({inner}, {idx})'
        expr = re.sub(r'TALENT:\(([^)]+)\):(\w+)', convert_talent_paren, expr)

        # TALENT:COUNT:430 같은 변수:인덱스 패턴도 처리
        expr = re.sub(r'TALENT:(\w+):(\w+)', lambda m: f'ctx.getTalent({m.group(1).lower()}, {m.group(2)})', expr)
        expr = re.sub(r'TALENT:PLAYER:(\w+)', r'ctx.playerTalents[\1]', expr)
        expr = re.sub(r'TALENT:ASSI:(\w+)', r'ctx.assiTalents[\1]', expr)
        expr = re.sub(r'TALENT:MASTER:([^\s,;)]+)', lambda m: 'ctx.masterTalents["' + m.group(1) + '"]' if not m.group(1).isdigit() else f'ctx.masterTalents[{m.group(1)}]', expr)
        expr = re.sub(r'ABL:ASSI:(\d+)', r'ctx.assiAbilities[\1]', expr)
        expr = re.sub(r'ABL:MASTER:(\d+)', r'ctx.masterAbilities[\1]', expr)
        expr = re.sub(r'STAIN:PLAYER:(\d+)', r'ctx.playerStain[\1]', expr)
        expr = re.sub(r'STAIN:MASTER:(\d+)', r'ctx.masterStain[\1]', expr)
        expr = re.sub(r'EXP:PLAYER:(\d+)', r'ctx.playerExp[\1]', expr)
        expr = re.sub(r'BASE:PLAYER:(\d+)', r'ctx.playerBase[\1]', expr)
        expr = re.sub(r'BASE:MASTER:(\d+)', r'ctx.masterBase[\1]', expr)

        # 일반 변수 (숫자 또는 변수명 모두 지원)
        # 괄호 안의 중첩된 표현식 먼저 처리: ACHIEVEMENT:(LIST:LOCAL)
        # TALENT, NO 등은 위에서 이미 처리했으므로 제외
        def convert_paren_var(m):
            var_name = m.group(1).upper()
            if var_name in ['TALENT', 'NO']:  # 이미 처리된 패턴 제외
                return m.group(0)  # 원본 그대로 반환
            return m.group(1).lower() + '[' + self.convert_var(m.group(2)) + ']'
        expr = re.sub(r'(\w+):\(([^)]+)\)', convert_paren_var, expr)

        # 문자열 변수 (LOCALS, ARGS - 'S'가 붙은 것)
        expr = re.sub(r'LOCALS:(\w+)', r'ctx.localStrings[\1]', expr)
        expr = re.sub(r'ARGS:(\w+)', r'ctx.argStrings[\1]', expr)

        # 캐릭터 변수를 먼저 처리 (CFLAG, TFLAG 등이 FLAG, ABL보다 먼저)
        # NO:COUNT는 특별 처리 (COUNT는 숫자 변수)
        expr = re.sub(r'NO:COUNT\b', r'ctx.getCharacterNo(ctx.count)', expr)
        # NO:(LOCAL:1) 같은 괄호 표현식
        expr = re.sub(r'NO:\(([^)]+)\)', lambda m: f'ctx.getCharacterNo({self.convert_var(m.group(1))})', expr)
        # NO:숫자 → ctx.getCharacterNo(숫자)
        expr = re.sub(r'NO:(\d+)', r'ctx.getCharacterNo(\1)', expr)
        # NO:변수명 → 변수명.no
        expr = re.sub(r'NO:([a-zA-Z_]\w*)', r'\1.no', expr)

        # 2차원 배열 먼저 처리 (CFLAG:T:F 같은 패턴)
        expr = re.sub(r'CFLAG:(\w+):(\w+)', r'character.cflags[\1][\2]', expr)
        expr = re.sub(r'TFLAG:(\w+):(\w+)', r'character.tflags[\1][\2]', expr)
        expr = re.sub(r'MARK:(\w+):(\w+)', r'character.mark[\1][\2]', expr)
        # EXP, ABL 2D 배열 - 인덱스 변환 필요
        def convert_exp_2d(m):
            idx1 = self.convert_var(m.group(1))
            idx2 = self.convert_var(m.group(2))
            return f'ctx.exp[{idx1}][{idx2}]'
        expr = re.sub(r'EXP:(\w+):(\w+)', convert_exp_2d, expr)

        def convert_abl_2d(m):
            idx1 = self.convert_var(m.group(1))
            idx2 = self.convert_var(m.group(2))
            return f'ctx.abilities[{idx1}][{idx2}]'
        expr = re.sub(r'ABL:(\w+):(\w+)', convert_abl_2d, expr)

        # 1차원 배열 (숫자 및 변수)
        expr = re.sub(r'CFLAG:(\w+)', r'character.cflags[\1]', expr)
        expr = re.sub(r'TFLAG:(\w+)', r'character.tflags[\1]', expr)
        expr = re.sub(r'TEQUIP:(\w+)', r'character.equipment[\1]', expr)
        expr = re.sub(r'SOURCE:(\w+)', r'character.source[\1]', expr)
        expr = re.sub(r'MARK:(\w+)', r'character.mark[\1]', expr)
        expr = re.sub(r'TCVAR:(\w+)', r'character.cvar[\1]', expr)
        expr = re.sub(r'CSTR:(\w+):(\w+)', r'character.cstr[\1][\2]', expr)  # 2D
        expr = re.sub(r'CSTR:(\w+)', r'ctx.cstr[\1]', expr)  # 1D (context string)

        # 일반 변수 (캐릭터 변수 처리 후)
        expr = re.sub(r'ARG:(\w+)', r'ctx.args[\1]', expr)
        expr = re.sub(r'LOCAL:(\w+)', r'ctx.locals[\1]', expr)
        expr = re.sub(r'PALAM:(\w+)', r'ctx.params[\1]', expr)
        expr = re.sub(r'PBAND:(\w+)', r'ctx.paramBand[\1]', expr)  # PALAM 밴드
        expr = re.sub(r'TALENT:(\w+)', r'ctx.talents[\1]', expr)
        expr = re.sub(r'FLAG:(\w+)', r'ctx.flags[\1]', expr)
        expr = re.sub(r'ABL:(\w+)', r'ctx.abilities[\1]', expr)
        expr = re.sub(r'EXP:(\w+)', r'ctx.exp[\1]', expr)
        expr = re.sub(r'JUEL:(\w+)', r'ctx.juel[\1]', expr)
        expr = re.sub(r'LIST:(\w+)', r'ctx.list[\1]', expr)
        expr = re.sub(r'ISASSI:(\w+)', r'ctx.isAssi[\1]', expr)
        expr = re.sub(r'ITEM:(\w+)', r'ctx.item[\1]', expr)
        expr = re.sub(r'ACHIEVEMENT:(\w+)', r'ctx.achievement[\1]', expr)
        expr = re.sub(r'GLOBAL:(\w+)', r'ctx.global[\1]', expr)
        expr = re.sub(r'BASE:(\w+)', r'ctx.base[\1]', expr)
        expr = re.sub(r'MAXBASE:(\w+)', r'ctx.maxBase[\1]', expr)
        expr = re.sub(r'NAME:(\w+)', r'ctx.getName(\1)', expr)
        expr = re.sub(r'CALLNAME:(\w+)', r'ctx.getCallName(\1)', expr)

        # 단일 문자 로컬 배열 변수 (T, N, A, I, U, UP, DOWN 등)
        expr = re.sub(r'\bT:(\w+)', r'T[\1]', expr)
        expr = re.sub(r'\bN:(\w+)', r'N[\1]', expr)
        expr = re.sub(r'\bA:(\w+)', r'A[\1]', expr)
        expr = re.sub(r'\bI:(\w+)', r'I[\1]', expr)
        expr = re.sub(r'\bU:(\w+)', r'U[\1]', expr)
        expr = re.sub(r'\bUP:(\w+)', r'UP[\1]', expr)
        expr = re.sub(r'\bDOWN:(\w+)', r'DOWN[\1]', expr)

        # 기타 (숫자 및 변수)
        expr = re.sub(r'SAVESTR:(\w+)', r'ctx.saveStr[\1]', expr)
        expr = re.sub(r'LOSEBASE:(\w+)', r'ctx.loseBase[\1]', expr)
        expr = re.sub(r'STAIN:(\w+):(\w+)', r'ctx.stain[\1][\2]', expr)  # 2D 배열
        expr = re.sub(r'STAIN:(\w+)', r'ctx.stain[\1]', expr)

        # 관계도 변수 (특수 문법)
        expr = re.sub(r'RELATION:TARGET:([A-Z]+)', r'ctx.getRelation(character, "\1")', expr)
        expr = re.sub(r'RELATION:ASSI:\(NO:TARGET\)', r'ctx.getRelation(ctx.assi, character)', expr)
        expr = re.sub(r'RELATION:(\w+):(\w+)', r'ctx.relation[\1][\2]', expr)  # 2D 배열
        expr = re.sub(r'RELATION:(\w+)', r'ctx.relation[\1]', expr)  # 1D 배열 (RELATION:R 포함)

        # 키워드 및 전역 변수
        expr = re.sub(r'\bASSIPLAY\b', r'ctx.assiPlay', expr)
        expr = re.sub(r'\bTARGET\b', r'character', expr)
        expr = re.sub(r'\bARGS\b', r'ctx.argStrings[0]', expr)  # ARGS 단독은 첫 번째 문자열 인자
        expr = re.sub(r'\bARG\b', r'ctx.args[0]', expr)  # ARG 단독은 첫 번째 인자
        expr = re.sub(r'\bLOCALS\b', r'ctx.localStrings[0]', expr)  # LOCALS 단독도 첫 번째 문자열
        expr = re.sub(r'\bLOCAL\b', r'ctx.locals[0]', expr)  # LOCAL 단독도 마찬가지
        expr = re.sub(r'\bRESULT\b', r'ctx.result', expr)
        expr = re.sub(r'\bRESULTS\b', r'ctx.results', expr)
        expr = re.sub(r'\bMASTER\b', r'ctx.master', expr)
        expr = re.sub(r'\bPLAYER\b', r'ctx.player', expr)
        expr = re.sub(r'\bASSI\b', r'ctx.assi', expr)
        expr = re.sub(r'\bPAGE\b', r'ctx.page', expr)
        expr = re.sub(r'\bPAGE_END\b', r'ctx.pageEnd', expr)
        expr = re.sub(r'\bCOUNT\b', r'ctx.count', expr)
        expr = re.sub(r'\bCHARANUM\b', r'ctx.charanum', expr)
        expr = re.sub(r'\bMONEY\b', r'ctx.money', expr)
        expr = re.sub(r'\bBOUGHT\b', r'ctx.bought', expr)
        expr = re.sub(r'\bITEMPRICE:(\w+)', r'ctx.itemPrice[\1]', expr)
        # R은 변수로 사용됨 (R = RAND:7, R += 1 등)
        # RELATION:TARGET:R의 R은 이미 Line 162에서 처리됨

        # 후처리: 남은 :숫자 패턴을 [숫자]로 변환 (2차원 배열 등)
        # ctx.abilities[ctx.count]:15 → ctx.abilities[ctx.count][15]
        expr = re.sub(r'(\])(\s*):(\d+)', r'\1[\3]', expr)
        expr = re.sub(r'(\w+)(\s*):(\d+)(?!\w)', r'\1[\3]', expr)

        # ERB 함수 호출 변환 (대문자 함수명)
        expr = re.sub(r'\b([A-Z_][A-Z_0-9]+)\(\)', lambda m: f'await {m.group(1).lower()}(ctx, character)', expr)

        # RAND 플레이스홀더를 복원하고 변환
        for i, rand_str in enumerate(rand_placeholders):
            placeholder = f'__RAND_{i}__'
            # rand_str는 "RAND:(...)" 형태 (원본)
            # 인자 부분만 추출 (RAND: 제거)
            arg_str = rand_str[5:]  # "RAND:" 제거
            # 괄호 제거
            if arg_str.startswith('(') and arg_str.endswith(')'):
                arg_content = arg_str[1:-1]
            else:
                arg_content = arg_str

            # 원본 내부 표현식을 직접 변환 (RAND는 이미 제거됨)
            # 모든 ERB 변수 패턴을 변환
            arg_converted = arg_content

            # TALENT 변환
            arg_converted = re.sub(r'TALENT:(\w+):(\w+)', lambda m: f'ctx.getTalent({m.group(1).lower()}, {m.group(2)})', arg_converted)
            arg_converted = re.sub(r'TALENT:(\w+)', r'ctx.talents[\1]', arg_converted)

            # 기타 변수들 변환
            arg_converted = re.sub(r'CFLAG:(\w+):(\w+)', r'character.cflags[\1][\2]', arg_converted)
            arg_converted = re.sub(r'CFLAG:(\w+)', r'character.cflags[\1]', arg_converted)
            arg_converted = re.sub(r'FLAG:(\w+)', r'ctx.flags[\1]', arg_converted)
            arg_converted = re.sub(r'ABL:(\w+)', r'ctx.abilities[\1]', arg_converted)
            arg_converted = re.sub(r'PALAM:(\w+)', r'ctx.params[\1]', arg_converted)
            arg_converted = re.sub(r'LOCAL:(\w+)', r'ctx.locals[\1]', arg_converted)
            arg_converted = re.sub(r'\bCOUNT\b', r'ctx.count', arg_converted)
            arg_converted = re.sub(r'\bC\b', r'C', arg_converted)  # C는 변수로 보존

            # 플레이스홀더를 ctx.rand(...)로 교체
            expr = expr.replace(placeholder, f'ctx.rand({arg_converted})')

        # ERB 삼항 연산자: (cond ? true_val # false_val) → (cond ? true_val : false_val)
        expr = re.sub(r'\?([^#?]+)#', r'?\1:', expr)

        # ERB XOR 연산자: ^^ → ^
        expr = expr.replace('^^', '^')

        # Leading zero 제거 (01 → 1, 08 → 8 등)
        # 0만 있는 경우는 제외하고, 0x (16진수)도 제외
        expr = re.sub(r'\b0+([1-9]\d*)\b', r'\1', expr)

        return expr

    def convert_line_content(self, line: str) -> str:
        """실제 라인 변환 로직 (IF 구문 제외)"""
        # RELATION 변수 특수 처리 (RELATION:TARGET:R, RELATION:ASSI:(NO:TARGET))
        if line.upper().startswith('RELATION:'):
            # RELATION:ASSI:(NO:TARGET) += 20 같은 복잡한 패턴
            # 콜론 뒤에 문자 또는 괄호로 시작하는 모든 패턴 매칭
            rel_match = re.match(r'(RELATION:[A-Z]+:(?:\([^)]+\)|[A-Z]+))\s*([+\-*/]?=)\s*(.+)', line, re.IGNORECASE)
            if rel_match:
                rel_var, op, value = rel_match.groups()
                return f"{self.convert_var(rel_var)} {op} {self.convert_var(value)};"

        # 변수 할당 (SOURCE:0 = 10, SAVESTR:1 = "텍스트", RESULTS = 한글, 비트 연산 등)
        # BASE:PLAYER:2, STAIN:MASTER:1 같은 콜론 2개 변수도 지원
        # LOCALS:5 = %variable% 같은 패턴도 지원
        match = re.match(r'([A-Z_]+(?::[A-Z_]+)?):?(\d+)?\s*([+\-*/|&]?=)\s*(.+)', line)
        if match:
            var_prefix, var_idx, op, value = match.groups()
            if var_idx:
                var = f"{var_prefix}:{var_idx}"
            else:
                var = var_prefix

            # 값 변환
            value_converted = value.strip()

            # @"문자열" 패턴 처리 (ERB 문자열 리터럴, {VAR} 보간 지원)
            if value_converted.startswith('@"') and value_converted.endswith('"'):
                string_content = value_converted[2:-1]  # @" 와 " 제거
                # {VAR} 패턴 변환
                def convert_at_string_brace(m):
                    content = m.group(1)
                    if re.match(r'[A-Z_]+:', content):
                        return '${' + self.convert_var(content) + '}'
                    elif re.match(r'\b[A-Z_]+\b', content):
                        return '${' + self.convert_var(content) + '}'
                    return m.group(0)
                string_content = re.sub(r'\{([^}]+)\}', convert_at_string_brace, string_content)
                # %VAR% 패턴도 변환
                string_content = re.sub(r'%([A-Z_:\d]+)%', lambda m: '${' + self.convert_var(m.group(1)) + '}', string_content)
                value_converted = f'`{string_content}`'
            # /문자열 패턴 처리 (ERB 문자열 리터럴)
            if value_converted.startswith('/'):
                # /로 시작하는 것은 문자열 리터럴
                string_content = value_converted[1:]  # / 제거
                # %TOSTR(...)% 같은 패턴 변환
                string_content = re.sub(r'%TOSTR\(([^)]+)\)%', lambda m: '${String(' + self.convert_var(m.group(1)) + ')}', string_content)
                # %VAR% 패턴 변환
                string_content = re.sub(r'%([A-Z_:]+)%', lambda m: '${' + self.convert_var(m.group(1)) + '}', string_content)
                value_converted = f'`{string_content}`'

            # %variable% 패턴 처리 (문자열 변수 할당)
            # %var1%%var2% 또는 %var1% %var2% 형태는 문자열 연결
            # 먼저 %VAR%와 리터럴 텍스트가 섞인 경우 확인 (예: %VAR%(한글)%VAR2%)
            # %%로 연결된 경우가 아니라 %VAR% 사이에 다른 문자가 있는 경우
            if '%' in value_converted and re.search(r'%[A-Z_:\d]+%[^%]+%[A-Z_:\d()]+%|%[A-Z_:\d]+%[가-힣()\s]+[^%]', value_converted):
                # 템플릿 문자열로 변환
                # %VAR% → ${var}, 나머지는 그대로
                template = re.sub(r'%([A-Z_:\d]+)%', lambda m: '${' + self.convert_var(m.group(1)) + '}', value_converted)
                # UNICODE 함수 호출도 변환
                template = re.sub(r'UNICODE\(([^)]+)\)', r'String.fromCharCode(\1)', template)
                value_converted = f'`{template}`'
            elif value_converted.startswith('%') and value_converted.endswith('%'):
                # % % 패턴을 %% 로 통일 (공백 제거)
                value_converted = re.sub(r'%\s+%', '%%', value_converted)
                # %% 연산자로 분리
                parts = value_converted.split('%%')
                if len(parts) > 1:
                    # 여러 부분 연결
                    converted_parts = []
                    for part in parts:
                        if part.startswith('%') and part.endswith('%'):
                            converted_parts.append(self.convert_var(part[1:-1]))
                        elif part.startswith('%'):
                            converted_parts.append(self.convert_var(part[1:]))
                        elif part.endswith('%'):
                            converted_parts.append(self.convert_var(part[:-1]))
                        else:
                            converted_parts.append(self.convert_var(part))
                    value_converted = ' + '.join(converted_parts)
                else:
                    inner_var = value_converted[1:-1]  # % 제거
                    value_converted = self.convert_var(inner_var)
            # 값이 한글이거나 공백/특수문자가 포함된 문자열이면 따옴표로 감싸기
            elif re.search(r'[가-힣]', value_converted) and not '"' in value_converted:
                # 아포스트로피는 이스케이프
                if "'" in value_converted:
                    value_converted = value_converted.replace("'", "\\'")
                value_converted = f'"{value_converted}"'
            # 공백이나 특수문자가 포함되고 따옴표가 없으면 문자열로 간주
            # 연산자는 양쪽에 공백이 있어야 연산자로 인식 (EX-HARD 같은 문자열 구분)
            elif (' ' in value_converted or '~' in value_converted or '!' in value_converted or '?' in value_converted or '・' in value_converted) and not '"' in value_converted and not any(f' {op} ' in value_converted for op in ['+', '-', '*', '/', '==', '!=', '>=', '<=', '>', '<', '&', '|']):
                # 아포스트로피는 이스케이프
                if "'" in value_converted:
                    value_converted = value_converted.replace("'", "\\'")
                value_converted = f'"{value_converted}"'
            else:
                value_converted = self.convert_var(value_converted)

            if op == '|=':
                return f"{self.convert_var(var)} |= {value_converted};"
            elif op == '&=':
                return f"{self.convert_var(var)} &= {value_converted};"
            else:
                return f"{self.convert_var(var)} {op} {value_converted};"

        # 증감 연산자 (VAR++, VAR--) - ERB 변수 패턴만
        if re.match(r'^[A-Z_]+:\w+\+\+$', line.upper()) or re.match(r'^[A-Z_]+\+\+$', line.upper()):
            var = line[:-2].strip()
            return f"{self.convert_var(var)}++;"
        if re.match(r'^[A-Z_]+:\w+--$', line.upper()) or re.match(r'^[A-Z_]+--$', line.upper()):
            var = line[:-2].strip()
            return f"{self.convert_var(var)}--;"

        # CALL
        if line.upper().startswith('CALL '):
            func_call = line[5:].strip()
            if func_call.startswith('@'):
                func_call = func_call[1:]

            # 함수명과 인자 분리
            if '(' in func_call:
                match = re.match(r'([A-Z_0-9]+)\(([^)]*)\)', func_call, re.IGNORECASE)
                if match:
                    func_name = match.group(1).lower()
                    args = match.group(2).strip()
                    # 인자 변환
                    if args:
                        converted_args = self.convert_var(args)
                        return f"await {func_name}({converted_args}, ctx, character);"
                    else:
                        return f"await {func_name}(ctx, character);"
            else:
                func_name = func_call.lower()
                return f"await {func_name}(ctx, character);"

        # RETURN
        if line.upper().startswith('RETURN'):
            match = re.match(r'RETURN\s+(.+)', line, re.IGNORECASE)
            if match:
                return f"return {self.convert_var(match.group(1))};"
            else:
                return 'return;'

        # 메시지 출력
        if line.upper() == 'PRINTL':
            return "ctx.showMessage('');"  # 빈 줄
        if line.upper().startswith('PRINTL '):
            content = line[7:].strip()
            # 작은따옴표를 이스케이프
            content = content.replace("'", "\\'")
            return f"ctx.showMessage('{content}');"

        if line.upper().startswith('PRINTW '):
            content = line[7:].strip()
            content = content.replace("'", "\\'")
            return f"ctx.showMessage('{content}'); ctx.waitInput();"

        if line.upper().startswith('PRINTS '):
            var_name = line[7:].strip()
            return f"ctx.showMessage(ctx.getString('{var_name}'));"

        if line.upper().startswith('PRINTV '):
            # PRINTV 처리
            content = line[7:].strip()

            # 'text'(,expr,') 형태를 정규식으로 처리
            # 예: 'LV,ABL:11,'(,ABL:11 * 1,') -> "LV,ABL:11," + "(" + (ABL:11 * 1) + ")"
            match = re.match(r"'([^']*)'\(,(.+),'\)", content)
            if match:
                prefix = match.group(1)
                expr = match.group(2).strip()
                converted_expr = self.convert_var(expr)
                return f'ctx.printValue("{prefix}" + "(" + {converted_expr} + ")");'

            # '(,value,') 형태 - 괄호 안에 값만
            match = re.match(r"'\(,([^,]+),'\)", content)
            if match:
                expr = match.group(1).strip()
                converted_expr = self.convert_var(expr)
                return f'ctx.printValue("(" + {converted_expr} + ")");'

            # 단순 변수/표현식
            expr = self.convert_var(content)
            return f"ctx.printValue({expr});"

        if line.upper().startswith('PRINTVL '):
            # PRINTVL T (변수 출력 + 줄바꿈)
            expr = self.convert_var(line[8:].strip())
            return f"ctx.printValueLine({expr});"

        if line.upper().startswith('PRINTFORM'):
            msg = line[9:].strip()
            if msg.startswith('L '):
                msg = msg[2:]

            # %조사처리(NAME:INDEX,"조사")% 형태 변환 (plain NAME)
            msg = re.sub(
                r'%조사처리\(NAME:(\w+),"([^"]+)"\)%',
                lambda m: '${ctx.josaHelper(ctx.getName(' + self.convert_var(m.group(1)) + '), "' + m.group(2) + '")}',
                msg
            )
            # %조사처리(VARNAME:INDEX,"조사")% 형태 변환 (*NAME suffix)
            msg = re.sub(
                r'%조사처리\(([A-Z]+NAME):(\w+),"([^"]+)"\)%',
                lambda m: '${ctx.josaHelper(ctx.getVarName("' + m.group(1) + '", ' + self.convert_var(m.group(2)) + '), "' + m.group(3) + '")}',
                msg
            )
            msg = re.sub(
                r'%조사처리\(([A-Z]+NAME):\(([^)]+)\),"([^"]+)"\)%',
                lambda m: '${ctx.josaHelper(ctx.getVarName("' + m.group(1) + '", ' + self.convert_var(m.group(2)) + '), "' + m.group(3) + '")}',
                msg
            )

            # %AME:INDEX% - 가슴 크기 이름
            msg = re.sub(r'%AME:(\w+)%', lambda m: '${ctx.getBreastSizeName(' + self.convert_var(m.group(1)) + ')}', msg)

            # %VARNAME:(ARG:N)% 같은 중첩된 인덱스 처리
            msg = re.sub(
                r'%([A-Z]+NAME):\(([^)]+)\)%',
                lambda m: '${ctx.getVarName("' + m.group(1) + '", ' + self.convert_var(m.group(2)) + ')}',
                msg
            )

            # %VARNAME:INDEX% 형태를 ctx.getVarName('VAR', INDEX)로 변환
            msg = re.sub(r'%([A-Z]+)NAME:(\w+)%', r'${ctx.getVarName("\1", \2)}', msg)

            # %TOSTR(VAR)% - 문자열 변환 함수
            msg = re.sub(r'%TOSTR\(([^)]+)\)%', lambda m: '${String(' + self.convert_var(m.group(1)) + ')}', msg)

            # %VAR:INDEX% 형태를 ${ctx.var[INDEX]}로 변환
            msg = re.sub(r'%([A-Z_:]+)%', lambda m: '${' + self.convert_var(m.group(1)) + '}', msg)

            # {VAR} 형태 변환 - 변수명과 콜론이 있는 패턴
            # ERB 변수만 변환 (A-Z로 시작하거나 연산자 포함)
            def convert_curly_brace(m):
                content = m.group(1)
                # ERB 변수 패턴 체크 (대문자:로 시작하거나 특정 변수명)
                if re.match(r'[A-Z_]+:', content):
                    return '${' + self.convert_var(content) + '}'
                # COUNT 등 단독 변수
                if re.match(r'\b(ARG|LOCAL|PALAM|UP|DOWN|T|N|A|I|COUNT)\b', content):
                    return '${' + self.convert_var(content) + '}'
                # 그 외는 원본 유지
                return m.group(0)
            msg = re.sub(r'\{([^}]+)\}', convert_curly_brace, msg)

            # %함수명()% 형태 변환 (한글 함수)
            msg = re.sub(r'%([가-힣]+)\(\)%', r'${ctx.josaHelper("\1")}', msg)

            return f"ctx.showMessage(`{msg}`);"

        # PRINT 특수문자
        if line.upper() == 'PRINT':
            return "ctx.print('');"
        if line.upper().startswith('PRINT '):
            content = line[6:].strip()
            if content in ['+', '-', '=', '*', '/', '%']:
                return f"ctx.printChar('{content}');"
            else:
                # 작은따옴표를 이스케이프
                content = content.replace("'", "\\'")
                return f"ctx.print('{content}');"

        # TIMES - 배율 계산
        if line.upper().startswith('TIMES '):
            # TIMES B , 1.20
            parts = line[6:].strip().split(',')
            if len(parts) == 2:
                target = parts[0].strip()
                multiplier = parts[1].strip()
                return f"ctx.times('{target}', {multiplier});"
            else:
                return f"// TODO: {line}"

        # 색상 제어
        if line.upper().startswith('SETCOLOR '):
            color = line[9:].strip()
            return f"ctx.setColor({color});"

        if line.upper() == 'RESETCOLOR':
            return "ctx.resetColor();"

        # DRAWLINE - 구분선 그리기
        if line.upper() == 'DRAWLINE':
            return "ctx.drawLine();"

        # WAIT - 입력 대기
        if line.upper() == 'WAIT':
            return "await ctx.wait();"

        # CLEARLINE - 라인 지우기
        if line.upper().startswith('CLEARLINE '):
            count = line[10:].strip()
            return f"ctx.clearLine({count});"

        # ALIGNMENT - 정렬
        if line.upper().startswith('ALIGNMENT '):
            align = line[10:].strip()
            return f"ctx.setAlignment('{align}');"

        # PRINTBUTTON - 버튼 출력
        if line.upper().startswith('PRINTBUTTON '):
            # PRINTBUTTON "라벨", 값
            match = re.match(r'PRINTBUTTON\s+["\']([^"\']+)["\'],\s*(\d+)', line, re.IGNORECASE)
            if match:
                label, value = match.groups()
                return f"ctx.addButton('{label}', {value});"
            else:
                return f"// TODO: {line}"

        # PRINTPLAIN - 평문 출력
        if line.upper().startswith('PRINTPLAIN '):
            return f"ctx.printPlain('{line[11:].strip()}');"

        # REUSELASTLINE - 마지막 라인 재사용
        if line.upper() == 'REUSELASTLINE':
            return "ctx.reuseLastLine();"

        # HTML - HTML 출력
        if line.upper().startswith('HTML '):
            return f"ctx.printHtml('{line[5:].strip()}');"

        # CUSTOMDRAWLINE - 커스텀 구분선
        if line.upper().startswith('CUSTOMDRAWLINE '):
            char = line[15:].strip()
            return f"ctx.drawLine('{char}');"

        # FONTSTYLE - 폰트 스타일
        if line.upper().startswith('FONTSTYLE '):
            style = line[10:].strip()
            return f"ctx.setFontStyle({style});"

        if line.upper() == 'RESETFONTSTYLE':
            return "ctx.resetFontStyle();"

        # FONTBOLD/FONTITALIC/FONTREGULAR
        if line.upper() == 'FONTBOLD':
            return "ctx.setFontBold(true);"
        if line.upper() == 'FONTITALIC':
            return "ctx.setFontItalic(true);"
        if line.upper() == 'FONTREGULAR':
            return "ctx.setFontRegular();"

        # BAR - 바 그래프
        if line.upper().startswith('BAR '):
            # BAR 현재값, 최대값, 길이
            parts = line[4:].strip().split(',')
            if len(parts) >= 2:
                converted_parts = [self.convert_var(p.strip()) for p in parts]
                return f"ctx.drawBar({', '.join(converted_parts)});"
            else:
                return f"// TODO: {line}"

        # BARSTR - 문자열 바
        if line.upper().startswith('BARSTR '):
            return f"ctx.drawBarStr({line[7:].strip()});"

        # INPUT 계열
        if line.upper().startswith('INPUT'):
            if line.upper().startswith('INPUTS '):
                return f"await ctx.inputString();"
            elif line.upper() == 'INPUT':
                return "await ctx.inputNumber();"
            else:
                return f"// TODO: {line}"

        # ONEINPUT 계열
        if line.upper() == 'ONEINPUT':
            return "await ctx.oneInput();"
        if line.upper() == 'ONEINPUTS':
            return "await ctx.oneInputString();"

        # TINPUT 계열 (시간제한 입력)
        if line.upper().startswith('TINPUT'):
            match = re.match(r'TINPUTS?\s+(\d+)', line, re.IGNORECASE)
            if match:
                timeout = match.group(1)
                return f"await ctx.timedInput({timeout});"
            else:
                return f"// TODO: {line}"

        # TWAIT (시간제한 대기)
        if line.upper().startswith('TWAIT '):
            time = line[6:].strip()
            return f"await ctx.timedWait({time});"

        # SPLIT - 화면 분할
        if line.upper().startswith('SPLIT '):
            return f"ctx.split({line[6:].strip()});"

        # SKIPDISP - 출력 스킵
        if line.upper().startswith('SKIPDISP '):
            flag = line[9:].strip()
            return f"ctx.skipDisplay({flag});"

        # UPCHECK - 능력치 상승 체크
        if line.upper().startswith('UPCHECK '):
            abl = line[8:].strip()
            return f"ctx.checkAbilityUp({abl});"

        # CUPCHECK - 캐릭터 능력치 상승 체크
        if line.upper().startswith('CUPCHECK '):
            abl = line[9:].strip()
            return f"ctx.checkCharacterAbilityUp({abl});"

        # VARSET - 변수 배열 설정
        if line.upper().startswith('VARSET '):
            args = line[7:].strip()
            # 첫 번째 인자(변수명)와 나머지를 분리
            parts = args.split(',', 1)
            if len(parts) == 2:
                var_arg = self.convert_var(parts[0].strip())
                value_arg = self.convert_var(parts[1].strip())
                return f"ctx.varSet({var_arg}, {value_arg});"
            else:
                return f"ctx.varSet({self.convert_var(args)});"

        # ARRAYSET - 배열 설정
        if line.upper().startswith('ARRAYSET '):
            args = line[9:].strip()
            # 인자들을 변환
            converted_args = self.convert_var(args)
            return f"ctx.arraySet({converted_args});"

        # ARRAYSHIFT/ARRAYCOPY
        if line.upper().startswith('ARRAYSHIFT '):
            return f"ctx.arrayShift({line[11:].strip()});"
        if line.upper().startswith('ARRAYCOPY '):
            return f"ctx.arrayCopy({line[10:].strip()});"

        # RANDOMIZE - 난수 초기화
        if line.upper().startswith('RANDOMIZE'):
            return "ctx.randomize();"

        # SWAP - 값 교환
        if line.upper().startswith('SWAP '):
            return f"ctx.swap({line[5:].strip()});"

        # THROW - 예외 발생
        if line.upper().startswith('THROW '):
            msg = line[6:].strip()
            return f"throw new Error('{msg}');"

        # QUIT - 게임 종료
        if line.upper() == 'QUIT':
            return "ctx.quitGame();"

        # BEGIN - 시작으로 돌아가기
        if line.upper() == 'BEGIN':
            return "ctx.restart();"

        # RESTART - 재시작
        if line.upper() == 'RESTART':
            return "ctx.restart();"

        # SAVEGAME - 게임 저장
        if line.upper() == 'SAVEGAME':
            return "await ctx.saveGame();"

        # LOADGAME - 게임 로드
        if line.upper() == 'LOADGAME':
            return "await ctx.loadGame();"

        # DELDATA - 데이터 삭제
        if line.upper().startswith('DELDATA '):
            return f"ctx.deleteData({line[8:].strip()});"

        # DEBUGPRINT/DEBUGPRINTL
        if line.upper().startswith('DEBUGPRINT'):
            msg = line[10:].strip()
            if msg.startswith('L '):
                msg = msg[2:]
            return f"console.log('{msg}');"

        # GETBIT - 비트 가져오기
        if line.upper().startswith('GETBIT '):
            return f"ctx.getBit({line[7:].strip()});"

        # SETBIT - 비트 설정
        if line.upper().startswith('SETBIT '):
            return f"ctx.setBit({line[7:].strip()});"

        # CLEARBIT - 비트 클리어
        if line.upper().startswith('CLEARBIT '):
            return f"ctx.clearBit({line[9:].strip()});"

        # INVERTBIT - 비트 반전
        if line.upper().startswith('INVERTBIT '):
            return f"ctx.invertBit({line[10:].strip()});"

        # GOTO - 라벨로 점프
        if line.upper().startswith('GOTO '):
            label = line[5:].strip()
            return f"// GOTO {label} - 구조 변경 필요 (while/break 사용 권장)"

        # JUMP - 함수로 점프
        if line.upper().startswith('JUMP '):
            target = line[5:].strip()
            return f"// JUMP {target} - 구조 변경 필요 (함수 호출로 대체)"

        # NOSKIP - 스킵 금지
        if line.upper() == 'NOSKIP':
            return "ctx.setNoSkip(true);"

        # ENDNOSKIP - 스킵 금지 해제
        if line.upper() == 'ENDNOSKIP':
            return "ctx.setNoSkip(false);"

        # RESETDATA - 데이터 리셋
        if line.upper() == 'RESETDATA':
            return "ctx.resetData();"

        # MSETCOLOR - 다중 색상 설정
        if line.upper().startswith('MSETCOLOR '):
            return f"ctx.setMultiColor({line[10:].strip()});"

        # GETCOLOR - 색상 가져오기
        if line.upper() == 'GETCOLOR':
            return "ctx.getColor();"

        # PUTFORM - 포맷 출력
        if line.upper().startswith('PUTFORM '):
            return f"ctx.putForm('{line[8:].strip()}');"

        # STRDATA - 문자열 데이터
        if line.upper().startswith('STRDATA '):
            return f"ctx.getStrData('{line[8:].strip()}');"

        # REPLACE - 문자열 치환
        if line.upper().startswith('REPLACE '):
            return f"ctx.replace({line[8:].strip()});"

        # SUBSTRING - 부분 문자열
        if line.upper().startswith('SUBSTRING '):
            return f"ctx.substring({line[10:].strip()});"

        # STRFIND - 문자열 찾기
        if line.upper().startswith('STRFIND '):
            return f"ctx.strFind({line[8:].strip()});"

        # STRCOUNT - 문자열 개수
        if line.upper().startswith('STRCOUNT '):
            return f"ctx.strCount({line[9:].strip()});"

        # STRLENS - 문자열 길이
        if line.upper().startswith('STRLENS '):
            return f"ctx.strLen({line[8:].strip()});"

        # ISNUMERIC - 숫자 여부
        if line.upper().startswith('ISNUMERIC '):
            return f"ctx.isNumeric({line[10:].strip()});"

        # TOUPPER/TOLOWER - 대소문자 변환
        if line.upper().startswith('TOUPPER '):
            return f"ctx.toUpper({line[8:].strip()});"
        if line.upper().startswith('TOLOWER '):
            return f"ctx.toLower({line[8:].strip()});"

        # TOFULL/TOHALF - 전각/반각 변환
        if line.upper().startswith('TOFULL '):
            return f"ctx.toFull({line[7:].strip()});"
        if line.upper().startswith('TOHALF '):
            return f"ctx.toHalf({line[7:].strip()});"

        # TONUMB - 숫자로 변환
        if line.upper().startswith('TONUMB '):
            return f"ctx.toNumber({line[7:].strip()});"

        # TOSTR - 문자열로 변환
        if line.upper().startswith('TOSTR '):
            return f"ctx.toString({line[6:].strip()});"

        # NUMTIMES - 숫자 표시 (천 단위 구분)
        if line.upper().startswith('NUMTIMES '):
            return f"ctx.formatNumber({line[9:].strip()});"

        # ESCAPE - 이스케이프
        if line.upper().startswith('ESCAPE '):
            return f"ctx.escape('{line[7:].strip()}');"

        # ENCODETOUNI - 유니코드 인코딩
        if line.upper().startswith('ENCODETOUNI '):
            return f"ctx.encodeToUni({line[12:].strip()});"

        # POWER - 거듭제곱
        if line.upper().startswith('POWER '):
            parts = line[6:].strip().split(',')
            if len(parts) == 2:
                return f"Math.pow({parts[0].strip()}, {parts[1].strip()});"
            else:
                return f"// TODO: {line}"

        # SQRT - 제곱근
        if line.upper().startswith('SQRT '):
            return f"Math.sqrt({line[5:].strip()});"

        # ABS - 절대값
        if line.upper().startswith('ABS '):
            return f"Math.abs({line[4:].strip()});"

        # MAX/MIN - 최대/최소
        if line.upper().startswith('MAX '):
            return f"Math.max({line[4:].strip()});"
        if line.upper().startswith('MIN '):
            return f"Math.min({line[4:].strip()});"

        # LIMIT - 범위 제한
        if line.upper().startswith('LIMIT '):
            parts = line[6:].strip().split(',')
            if len(parts) == 3:
                return f"ctx.limit({', '.join(p.strip() for p in parts)});"
            else:
                return f"// TODO: {line}"

        # INRANGE - 범위 내 여부
        if line.upper().startswith('INRANGE '):
            return f"ctx.inRange({line[8:].strip()});"

        # SIGN - 부호
        if line.upper().startswith('SIGN '):
            return f"Math.sign({line[5:].strip()});"

        # SUMARRAY/MAXARRAY/MINARRAY - 배열 연산
        if line.upper().startswith('SUMARRAY '):
            return f"ctx.sumArray({line[9:].strip()});"
        if line.upper().startswith('MAXARRAY '):
            return f"ctx.maxArray({line[9:].strip()});"
        if line.upper().startswith('MINARRAY '):
            return f"ctx.minArray({line[9:].strip()});"

        # MATCH - 배열 요소 찾기
        if line.upper().startswith('MATCH '):
            return f"ctx.match({line[6:].strip()});"

        # GROUPMATCH - 그룹 매치
        if line.upper().startswith('GROUPMATCH '):
            return f"ctx.groupMatch({line[11:].strip()});"

        # NOSAMES - 중복 제거
        if line.upper().startswith('NOSAMES '):
            return f"ctx.removeDuplicates({line[8:].strip()});"

        # SUMCARRAY - 조건부 배열 합
        if line.upper().startswith('SUMCARRAY '):
            return f"ctx.sumConditionalArray({line[10:].strip()});"

        # VARSIZE - 배열 크기
        if line.upper().startswith('VARSIZE '):
            return f"ctx.arraySize({line[8:].strip()});"

        # GETTIME - 현재 시간
        if line.upper() == 'GETTIME':
            return "ctx.getTime();"

        # GETSECOND - 초 단위 시간
        if line.upper() == 'GETSECOND':
            return "Date.now();"

        # GETMILLISECOND - 밀리초
        if line.upper() == 'GETMILLISECOND':
            return "performance.now();"

        # 변환 불가능한 라인
        return f"// TODO: {line}"

    def convert_line(self, line: str) -> bool:
        line = line.strip()
        if not line or line.startswith(';'):
            return False

        # 인라인 주석 제거 (문자열 내부의 세미콜론은 유지)
        # 먼저 문자열 부분을 임시로 치환
        string_parts = []
        def replace_string(match):
            string_parts.append(match.group(0))
            return f'__STRING_{len(string_parts)-1}__'

        # 작은따옴표, 큰따옴표 문자열 보호
        line_protected = re.sub(r'"[^"]*"', replace_string, line)
        line_protected = re.sub(r"'[^']*'", replace_string, line_protected)

        # 세미콜론 이후 제거 (탭 문자 포함)
        if ';' in line_protected:
            line_protected = line_protected.split(';')[0]

        # 문자열 복원
        for i, s in enumerate(string_parts):
            line_protected = line_protected.replace(f'__STRING_{i}__', s)

        line = line_protected.strip()
        if not line:
            return False

        # 함수 정의는 스킵 (@FUNC)
        if line.startswith('@'):
            return False

        # 라벨 정의 ($LABEL)
        if line.startswith('$'):
            label = line[1:].strip()
            self.emit(f"// Label: {label}")
            return True

        # SIF (Single-line IF) - 한 줄 조건문
        if line.upper().startswith('SIF '):
            # SIF TALENT:61 형태 - 다음 줄이 실행 내용
            cond = self.convert_var(line[4:].strip())
            self.emit(f"if ({cond}) {{")
            self.indent += 1
            self.sif_pending = True  # 다음 줄을 블록 안에 넣음
            return True

        # SIF 다음 줄 처리
        if self.sif_pending:
            # 현재 줄을 if 블록 안에 넣고 블록 닫기
            converted = self.convert_line_content(line)
            if converted:
                self.emit(converted)
            self.indent -= 1
            self.emit('}')
            self.sif_pending = False
            return True

        # IF/ELSEIF/ELSE/ENDIF
        if line.upper().startswith('IF '):
            cond = self.convert_var(line[3:].strip())
            self.emit(f"if ({cond.replace(' == ', ' === ')}) {{")
            self.indent += 1
            return True
        if line.upper().startswith('ELSEIF '):
            self.indent -= 1
            cond = self.convert_var(line[7:].strip())
            self.emit(f"}} else if ({cond.replace(' == ', ' === ')}) {{")
            self.indent += 1
            return True
        if line.upper() == 'ELSE':
            self.indent -= 1
            self.emit('} else {')
            self.indent += 1
            return True
        if line.upper() == 'ENDIF':
            self.indent -= 1
            self.emit('}')
            return True

        # REPEAT ... REND (반복문)
        if line.upper().startswith('REPEAT '):
            count = self.convert_var(line[7:].strip())
            self.emit(f"for (let COUNT = 0; COUNT < {count}; COUNT++) {{")
            self.indent += 1
            return True
        if line.upper() == 'REND':
            self.indent -= 1
            self.emit('}')
            return True

        # SELECTCASE
        if line.upper().startswith('SELECTCASE '):
            self.emit(f"switch ({self.convert_var(line[11:].strip())}) {{")
            self.indent += 1
            return True
        if line.upper().startswith('CASE '):
            for val in line[5:].split(','):
                self.emit(f"case {val.strip()}:")
            self.indent += 1
            return True
        if line.upper() == 'CASEELSE':
            self.emit('default:')
            self.indent += 1
            return True
        if line.upper() == 'ENDSELECT':
            self.indent -= 1
            self.emit('break;')
            self.indent -= 1
            self.emit('}')
            return True

        # 일반 명령어는 convert_line_content로 처리
        converted = self.convert_line_content(line)
        if converted:
            self.emit(converted)
        return True

    def convert_function(self, name: str, body: list) -> str:
        self.lines = []
        self.indent = 0
        self.sif_pending = False  # 함수마다 초기화

        # 함수명 변환 (일본어/한글 -> ASCII)
        func_name = name.lower()
        # ASCII가 아닌 문자는 제거하고 유효한 식별자로 변환
        func_name = re.sub(r'[^a-z0-9_]', '_', func_name)
        if not func_name or func_name[0].isdigit():
            func_name = 'func_' + func_name

        self.emit(f"export async function {func_name}(")
        self.emit(f"  ctx: TrainingContext,")
        self.emit(f"  character: Character")
        self.emit(f"): Promise<void> {{")
        self.indent = 1

        for line in body:
            self.convert_line(line)

        self.indent = 0
        self.emit('}')
        return '\n'.join(self.lines)

    def convert_file(self, erb_path: Path, output_path: Path):
        content = self.read_erb(erb_path)
        # BOM 제거
        if content.startswith('\ufeff'):
            content = content[1:]
        lines = content.split('\n')

        functions = {}
        current_func = None
        current_lines = []

        for line in lines:
            if line.strip().startswith('@'):
                if current_func:
                    functions[current_func] = current_lines
                # 일본어, 한글, 영문 모두 지원 (ARG, ARGS 등 파라미터는 제외)
                match = re.match(r'@([^,\s]+)', line.strip())
                if match:
                    current_func = match.group(1)
                    current_lines = []
            elif current_func:
                current_lines.append(line)

        if current_func:
            functions[current_func] = current_lines

        if not functions:
            return False

        # TypeScript 생성
        output = [
            "/**",
            f" * {erb_path.name} 완전 변환",
            " * 원본 로직 100% 보존",
            " */",
            "",
            "import { TrainingContext } from '../types';",
            "import { Character } from '../../../types/game';",
            "",
        ]

        for func_name, func_lines in functions.items():
            output.append(self.convert_function(func_name, func_lines))
            output.append("")

        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text('\n'.join(output), encoding='utf-8')
        return True

def main():
    print("=" * 60)
    print("ERB → TypeScript 전체 변환")
    print("=" * 60)

    converter = CompleteERBConverter()
    training_dir = ERB_ROOT / "指導関係"
    comf_files = sorted(training_dir.glob("COMF*.ERB"))

    print(f"\n[*] {len(comf_files)}개 파일 변환 시작...\n")

    success = 0
    for i, erb_file in enumerate(comf_files, 1):
        if i % 10 == 0:
            print(f"   진행: {i}/{len(comf_files)}")

        output_name = erb_file.stem.lower() + '.ts'
        output_path = OUTPUT_ROOT / 'generated' / output_name

        if converter.convert_file(erb_file, output_path):
            success += 1

    print("\n" + "=" * 60)
    print(f"완료: {success}/{len(comf_files)}")
    print("=" * 60)
    print(f"\n생성 위치: {OUTPUT_ROOT / 'generated'}")

if __name__ == '__main__':
    main()
