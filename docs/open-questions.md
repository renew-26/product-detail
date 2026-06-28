# Open Questions

## solus-ta21-content-structure - 2026-06-28 (v2 업데이트)

### 해결됨 (v2에서 결정)
- [x] 8개 성능 아이콘 SVG — **결정:** 기존 4개 SVG 재활용 + 나머지 4개는 ImageSlot fallback + 텍스트 레이블. 사용자가 원하면 이미지 업로드로 교체.
- [x] HP71 데이터 보존 방식 — **결정:** `src/content/hp71.ts`로 파일 분리하여 완전 보존. `src/content/ta21.ts`에 TA21 데이터 별도 정의.
- [x] 이미지 파일명 한글+공백 처리 — **결정:** 영문 kebab-case로 사전 리네이밍 (`/solus-ta21/solus-ta21-{1,2,3}.png`).
- [x] TireStory 레이더 차트 vs 바 차트 — **결정:** DESIGN.md 권장에 따라 수평 바 차트로 교체 (html2canvas 안정성).
- [x] ProductClassification grade:"economy" 지원 여부 — **결정:** 코드 확인 완료, line 714에 이미 구현됨. 추가 작업 불필요.

### 미해결 (실행 시 판단 필요)
- [ ] FeatureIcons 상단 트레드 이미지의 표시 방식 — 풀폭 배너형 vs 라운드 카드형 vs 배경 이미지형 중 디자인 결정 필요. 현재 계획은 풀폭 배너형.
- [ ] TireStory Block 1에서 상세사진1을 재사용할지, 텍스트만으로 구성할지 — Hero와 이미지 중복이 발생하므로 TireStory에서는 이미지 없이 바 차트 중심으로 갈 수도 있음.
- [ ] 수평 바 차트의 구체적 디자인 — 바 색상(accent vs gradient), 수치 표시 위치(바 내부 vs 우측), 바 높이 등 세부 스타일 결정 필요.
- [ ] Content 타입 분리 시 기존 page.tsx 내부의 `typeof defaultContent` 참조를 모두 찾아 교체해야 함 — 범위 확인 필요.
