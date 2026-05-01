# Known Issues

이 문서는 세션마다 반복되는 작업 실수와 우회 규칙을 기록한다.

## PowerShell heredoc/encoding 문제

현재 기본 shell은 PowerShell이다. Bash 문법을 그대로 쓰면 자주 실패한다.

금지:

```bash
node - <<'NODE'
console.log('test')
NODE
```

PowerShell에서는 `<` redirection과 Bash heredoc이 동작하지 않는다. `Missing file specification after redirection operator`, `The '<' operator is reserved for future use` 같은 오류가 난다.

권장:

```powershell
@'
console.log('test')
'@ | node -
```

주의:
- PowerShell here-string을 쓸 때 marker 이름에 한글을 쓰지 않는다.
- 한글이 포함된 긴 inline script를 파이프로 넘기면 인코딩 문제가 날 수 있다. 가능하면 `rg`, `Get-Content -Encoding utf8`, 짧은 `node -e`, 또는 기존 script 파일을 사용한다.
- 반복 실행할 긴 script가 필요하면 임시 파일을 만들기보다 repo의 `tools/` script를 고쳐 재사용한다. 단순 확인용이면 ASCII-only inline script로 제한한다.
- Bash 예시를 PowerShell에서 실행하기 전에 redirection, heredoc, quote 문법을 PowerShell 문법으로 바꾼다.
