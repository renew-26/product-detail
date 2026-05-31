# <product-detail> Claude Code Configuration

(전역 ~/.claude/CLAUDE.md를 상속받음. 아래는 프로젝트별 추가 룰)

## 이 프로젝트의 gstack 활용

- 메인 워크플로우: `/office-hours` → `/design-consultation` → 구현 → `/design-review`
- 코드 리뷰는 항상 `/review`보다 `/codex`를 먼저 (외부 시각 우선)
- 배포는 `/ship` 후 반드시 `/canary`로 모니터링

## 프로젝트 특화 컨벤션

- AI 슬롭 점수 B+ 이상 필수, A 권장
