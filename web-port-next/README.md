# erAV Web Port Next

`web-port-next`는 기존 `web-port` 실험을 이어 붙이지 않고 새로 만드는 웹포트 런타임이다.

## 기준

- 원본 ERB/CSV는 증거 자료로만 사용한다.
- 런타임 상태는 도메인 소유권을 기준으로 관리한다.
- 레거시 family/index는 어댑터와 검증 사전에만 둔다.
- UI는 ERB 입출력 흐름을 직접 흉내 내지 않는다.
- 유료 AI 호출은 사용자가 명시적으로 승인하기 전까지 실행하지 않는다.

## 명령

```bash
npm run dev
npm run collect:catalog
npm run typecheck
npm run build
```

## 문서

- `docs/README.md`
- `docs/PROGRESS_STATUS.ko.md`
- `docs/SESSION_HANDOFF.ko.md`
- `docs/NEW_PORT_MILESTONES.ko.md`
- `docs/DOMAIN_REINTERPRETATION.ko.md`
- `docs/GAME_DOMAIN_SYSTEM.md`
- `docs/MODULE_SYSTEM.ko.md`
