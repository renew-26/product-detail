# 솔루스 TA21 상세페이지 콘텐츠 구조 플랜

**생성일:** 2026-06-28
**상태:** 개정 v2 (Architect/Critic 피드백 반영 완료)
**변경 이력:** v1 초안 -> v2 피드백 11건 전수 반영

---

## RALPLAN-DR 요약

### 원칙 (Principles)

1. **이미지 중심 스토리텔링** — 3장의 실촬 이미지가 페이지 흐름의 뼈대. 각 이미지는 한 번만 "주인공"으로 등장하되, 해당 섹션의 메시지를 시각적으로 뒷받침해야 한다.
2. **기존 컴포넌트 최대 재활용** — page.tsx에 이미 정의된 14개 컴포넌트 중 현재 미사용(FeatureIcons, ProductClassification 등)을 우선 활성화. 신규 컴포넌트 생성은 최소화.
3. **데이터 교체 우선, 구조 변경 최소** — 콘텐츠 파일 분리 후 TA21용 데이터를 import. 컴포넌트 레이아웃 변경은 꼭 필요한 경우만.
4. **사용자 비전 존중** — 유저가 제시한 4단계 페이지 플로우(Hero -> 한눈에 소개 -> 측면사진+분류 -> 패턴사진+성능아이콘)를 충실히 반영.
5. **익스포트 안정성 우선** — html2canvas PNG 익스포트에 문제를 일으킬 수 있는 요소(한글 파일 경로, SVG 레이더 차트)를 사전 제거.

### 의사결정 동인 (Decision Drivers)

1. **구현 속도** — HP71 코드베이스가 이미 완성형이므로 데이터 교체 + 렌더 순서 변경만으로 빠르게 결과물을 낼 수 있는가
2. **이미지-섹션 매핑 명확성** — 3장의 이미지가 각각 어느 섹션에서 어떤 역할을 하는지 혼동 없이 매핑되는가
3. **성능 아이콘 8개 표현** — 기존 FeatureIcons는 4개(2x2). TA21은 8개 아이콘이므로 레이아웃 수정이 필요

### 옵션 비교

#### 옵션 A: "데이터 분리 + 렌더 순서 재배치 + 최소 레이아웃 수정" (권장)

콘텐츠 데이터를 파일로 분리(hp71.ts / ta21.ts)하고, 컴포넌트의 렌더 순서를 유저 비전에 맞게 재배치. FeatureIcons를 8개 지원(4x2)하고, TireStory 내부 featureIcons 그리드를 제거하여 standalone으로 통합. 레이더 차트를 수평 바 차트로 교체.

| 장점 | 단점 |
|------|------|
| 기존 코드 90% 재활용 | FeatureIcons 관련 변경 범위가 넓음 (5개 포인트) |
| HP71 데이터 안전 보존 | 레이더 -> 바 차트 전환 작업 추가 |
| 한글 경로 사전 제거로 익스포트 안정 | 파일 리네이밍 사전 작업 필요 |
| 콘텐츠 타입 명시로 향후 확장 용이 | |

#### 옵션 B: "섹션별 신규 컴포넌트 생성"

유저 비전의 4단계를 각각 전용 컴포넌트로 새로 만듦 (TA21Hero, TA21Overview, TA21Classification, TA21Performance).

| 장점 | 단점 |
|------|------|
| TA21 전용 최적화 가능 | 기존 코드와 중복 대량 발생 |
| 레이아웃 자유도 높음 | 구현 시간 3-4배 증가 |
| HP71과 독립적 | 향후 제품 추가 시 확장성 떨어짐 |

**선택: 옵션 A** — 이미 완성도 높은 컴포넌트가 존재하므로 데이터 분리 + 최소 레이아웃 수정이 합리적. 옵션 B는 단일 제품에 과도한 투자.

---

## 컨텍스트

- **프로젝트:** Next.js 타이어 상품 상세 카드 생성기 (840px -> 1680px PNG 익스포트)
- **현재 상태:** 크루젠 HP71(SUV) 데이터가 기본값. 솔루스 TA21(세단/CUV 사계절)용 콘텐츠로 전환 필요.
- **에셋:** 3장의 실촬 이미지가 `/public/솔루스 TA21/`에 준비 완료
- **현재 렌더 순서:** Hero -> CoreSpecs -> TireStory -> BrandValues -> RentalProcess
- **미사용 컴포넌트:** ProductClassification, FeatureIcons, KeySpecs, PerformanceRadar, ComparisonTable, TechHighlights, ReviewSection, SizeOptions, CTA

---

## 작업 목표

솔루스 TA21 타이어의 상세페이지 콘텐츠 구조를 확정하고, 콘텐츠 데이터를 파일로 분리한 뒤, 렌더 순서/그리드/차트를 변경하여 유저 비전에 맞는 페이지 플로우를 구현한다.

---

## 가드레일

### Must Have
- 3장의 이미지가 각각 다른 섹션에서 주역할을 수행
- 8개 성능 아이콘이 모두 표시 (4x2 그리드)
- 기존 에디터블(EditableText, ImageSlot) 기능 유지
- PNG 익스포트 정상 동작
- HP71 데이터가 `content/hp71.ts`로 보존됨

### Must NOT Have
- HP71 데이터 유실 (반드시 파일 분리로 보존)
- 한글+공백 포함 파일 경로 (영문 리네이밍 필수)
- 신규 컴포넌트 3개 이상 생성
- SVG 레이더 차트 (html2canvas 호환성 문제)

---

## 확정 페이지 플로우 (섹션 순서)

### 섹션 1: Hero (다크 배경)
- **이미지:** solus-ta21-1.png (대각선/3/4 앵글) — 리네이밍 후 경로
- **목적:** 시선을 잡는 첫인상. 브랜드 + 모델명 + 태그라인.
- **기존 컴포넌트:** `Hero` 그대로 사용
- **데이터 변경:**
  - `brand`: "KUMHO TIRE"
  - `modelName`: "솔루스 TA21"
  - `tagline`: "안정적인 사계절 주행의 기준"
  - `description`: "세단, CUV, 미니밴을 위한 스탠다드급 사계절 타이어. 안정적인 주행성능과 뛰어난 마일리지로 일상의 모든 도로를 편안하게."
  - `heroImage`: `/solus-ta21/solus-ta21-1.png`

### 섹션 2: 한눈에 소개 — TireStory (라이트 배경)
- **이미지:** solus-ta21-1.png 재사용 (소개 맥락)
- **목적:** 제품의 핵심 가치를 한 문단으로 전달 + **수평 바 차트**로 성능 시각화
- **기존 컴포넌트:** `TireStory` (레이더 차트 -> 수평 바 차트로 교체, 내부 featureIcons 그리드 제거)
- **데이터 변경:**
  - `performance`: 마일리지 5, 핸들링 4, 제동력 4, 승차감 4, 정숙성 4
  - `checkpoints` 3개 항목 TA21 맞춤:
    1. "01 — 사계절 컴파운드" / "M+S 인증 컴파운드로 건조, 습윤, 경설 노면 모두에서 안정적인 접지력을 발휘합니다."
    2. "02 — 고마일리지 설계" / "최적화된 접지 면압 분포와 내마모 컴파운드로 오래도록 균일한 성능을 유지합니다."
    3. "03 — V자 트레드 패턴" / "중앙 V형 그루브가 빗물을 신속히 배출하고, 블록 강성을 높여 조향 응답성을 강화합니다."
- **레이아웃 변경:**
  - TireStory 내부 featureIcons 그리드(line 2256-2338) 제거 -> standalone FeatureIcons 섹션으로 통합
  - SVG 오각형 레이더 차트(line 2075-2098) -> 수평 바 차트로 교체

### 섹션 3: 측면 사진 + 분류 정보 (라이트/소프트 배경)
- **이미지:** solus-ta21-2.png (측면 — KUMHO SOLUS 각인, 215/65R17 99V 표기)
- **목적:** 타이어 분류(차종/계절/등급) + 핵심 스펙을 측면 이미지와 함께 제시
- **구현 방식:** `CoreSpecs` + `ProductClassification` 조합
  - CoreSpecs: 좌측 keySpecs 리스트 / 우측 productImage (2컬럼 그리드, 코드 확인 완료 line 1678-1772)
  - 그 아래 ProductClassification으로 차종(세단)/계절(사계절)/등급(실속형) 시각화
- **데이터 변경:**
  - `productImage`: `/solus-ta21/solus-ta21-2.png`
  - `carType`: "sedan"
  - `season`: "allseason"
  - `grade`: "economy" (코드 확인 완료: line 714에 `{ id: "economy", label: "실속형", Icon: IconGradeBasic }` 존재)
  - `keySpecs`:
    1. 차량 구분: "승용 세단 / CUV / 미니밴"
    2. 계절 성능: "사계절 (M+S 인증)"
    3. 특장점: "마일리지, 주행안정성, 승차감"
    4. 하중지수: "99 (775kg)"
    5. 속도지수: "V (240km/h)"

### 섹션 4: 트레드 패턴 + 성능 아이콘 (소프트 배경)
- **이미지:** solus-ta21-3.png (트레드 패턴 탑다운)
- **목적:** V자 트레드 패턴의 시각적 임팩트 + 8개 성능 아이콘으로 "이 타이어가 잘하는 것" 명시
- **기존 컴포넌트:** `FeatureIcons` 수정 필요 (4개 -> 8개, 그리드 4x2)
- **레이아웃 변경:**
  - 상단: solus-ta21-3.png 이미지를 풀폭으로 배치 (트레드 패턴 강조)
  - 하단: 8개 아이콘을 4x2 그리드로 배치
- **데이터 변경:**
  - `featureIcons` 배열을 8개로 확장:
    1. M+S / "진흙+눈 인증으로 겨울철 경설 노면 대응"
    2. 모든노면주행 / "건조, 습윤, 비포장 등 다양한 노면에 최적화"
    3. 데일리 / "출퇴근, 장거리 등 일상 주행에 최적화된 내구성"
    4. 마모방지 / "내마모 컴파운드로 타이어 수명 극대화"
    5. 승차감 / "최적화된 카카스 구조로 부드러운 승차감"
    6. 정숙성 / "피치 시퀀스 최적화로 패턴 소음 저감"
    7. 주행안정성 / "넓은 접지면과 강화된 블록으로 안정적 코너링"
    8. 조향응답성 / "센터 리브 강성 확보로 정확한 스티어링 응답"
- **아이콘 조달:** 기존 4개 SVG 아이콘(IconBraking, IconQuiet, IconEfficiency, IconComfort) 외 나머지 4개는 ImageSlot fallback + 텍스트 레이블 기본값으로 대응. 사용자가 원하면 이미지 업로드로 교체 가능.

### 섹션 5: BrandValues (유지)
- 기존 BrandValues 섹션 그대로 유지 (정직한 가격, 신속한 장착, 안심 품질 보증, 전문가 상담)
- 데이터 변경 없음 (브랜드 공통 메시지)

### 섹션 6: RentalProcess (유지)
- 기존 RentalProcess 그대로 유지
- 데이터 변경 없음

---

## 태스크 플로우

> **의존 순서:** Step 0 -> Step 1 -> Step 2 -> Step 3 -> Step 4 (순차 실행 필수)

### Step 0: 사전 준비 — 파일 리네이밍 + 콘텐츠 데이터 분리
**작업 내용:**

**(a) 이미지 파일 영문 리네이밍:**
- `/public/솔루스 TA21/솔루스 TA21 상세사진1.png` -> `/public/solus-ta21/solus-ta21-1.png`
- `/public/솔루스 TA21/솔루스 TA21 상세사진2.png` -> `/public/solus-ta21/solus-ta21-2.png`
- `/public/솔루스 TA21/솔루스 TA21 상세사진3.png` -> `/public/solus-ta21/solus-ta21-3.png`
- 한글+공백 경로가 html2canvas PNG 익스포트에서 깨질 수 있으므로 사전 제거

**(b) 콘텐츠 데이터 파일 분리:**
- `Content` 타입을 명시적으로 선언 (현재 `typeof defaultContent`로 추론 중)
- `src/content/hp71.ts` — 현재 `defaultContent` 값을 그대로 추출하여 보존
- `src/content/ta21.ts` — TA21용 데이터 정의 (위 섹션별 명세에 따라)
- `src/content/types.ts` — `Content` 타입 export
- `page.tsx`의 `defaultContent`를 `import { ta21Content } from '@/content/ta21'`로 교체

**수용 기준:**
- [ ] `/public/solus-ta21/` 디렉토리에 영문 파일명으로 3개 이미지 존재
- [ ] 한글+공백 경로 파일이 제거됨 (또는 git mv로 이동)
- [ ] `src/content/hp71.ts`에 기존 HP71 데이터가 완전히 보존됨
- [ ] `src/content/ta21.ts`에 TA21 데이터가 정의됨
- [ ] `Content` 타입이 명시적으로 선언되고, page.tsx에서 import하여 사용
- [ ] TypeScript 컴파일 에러 없음

### Step 1: TireStory 컴포넌트 수정 — 레이더 차트 제거 + 바 차트 + featureIcons 그리드 제거
**작업 내용:**

**(a) SVG 오각형 레이더 차트 -> 수평 바 차트 교체:**
- TireStory 내부의 레이더 차트 SVG 코드(line 2075-2098 영역)를 제거
- 수평 바 차트로 교체: 각 성능 항목(마일리지, 핸들링, 제동력, 승차감, 정숙성)을 수평 바로 시각화
- html2canvas 렌더링 안정성을 위해 순수 CSS div 기반으로 구현 (SVG 사용 금지)
- DESIGN.md line 211, 273의 권장사항 준수

**(b) TireStory 내부 featureIcons 그리드 제거:**
- TireStory 내부의 `featureIcons.map` 블록(line 2256-2338) 제거
- 이 블록은 `iconComponents[idx % 4]`, `isRight = idx % 2 === 1`, `isBottom = idx >= 2`가 2x2 기준으로 하드코딩되어 있어 8개 아이콘 확장 시 그리드가 깨짐
- featureIcons 표시를 standalone FeatureIcons 섹션(Step 3)으로 통합

**수용 기준:**
- [ ] TireStory에서 SVG 레이더 차트가 제거되고 수평 바 차트가 표시됨
- [ ] 바 차트가 순수 CSS div로 구현됨 (SVG 미사용)
- [ ] 5개 성능 항목이 각각 바 + 수치로 시각화됨
- [ ] TireStory 내부에 featureIcons 그리드가 없음
- [ ] TireStory의 나머지 요소(포스터 소개, checkpoints)는 정상 동작

### Step 2: 렌더 순서를 유저 비전에 맞게 재배치
**작업 내용:**
- 현재: `Hero -> CoreSpecs -> TireStory -> BrandValues -> RentalProcess`
- 변경: `Hero -> TireStory -> CoreSpecs -> ProductClassification -> FeatureIcons -> BrandValues -> RentalProcess`
- ProductClassification과 FeatureIcons를 렌더 트리에 추가 (현재 미사용 상태)

**수용 기준:**
- [ ] 7개 섹션이 지정된 순서대로 렌더링됨
- [ ] ProductClassification에서 세단/사계절/실속형이 기본 선택됨
- [ ] 각 섹션이 화면에 표시되고 스크롤로 확인 가능

### Step 3: FeatureIcons 컴포넌트를 8개 아이콘 + 4x2 그리드로 수정
**작업 내용:**

**(a) standalone FeatureIcons 그리드 변경:**
- `gridTemplateColumns`를 `1fr 1fr`에서 `repeat(4, 1fr)`로 변경 (4x2 그리드)
- 기존 카드 기반 레이아웃(line 1828 `gap: 12`)의 카드 크기를 4열에 맞게 조정

**(b) iconComponents 4->8 확장:**
- 기존: `[IconBraking, IconQuiet, IconEfficiency, IconComfort]` (4개)
- 나머지 4개(M+S, 모든노면주행, 마모방지, 주행안정성): ImageSlot의 fallback으로 텍스트 아이콘 또는 기본 원형 아이콘 제공
- 사용자가 ImageSlot으로 커스텀 아이콘 업로드 가능 (기존 기능 활용)

**(c) 트레드 이미지 영역 신규 추가:**
- FeatureIcons 섹션 상단에 solus-ta21-3.png을 풀폭으로 배치
- ImageSlot으로 구현하여 편집 가능하게 유지

**(d) border 로직 수정 (TireStory 내부 제거 후 불필요하나, standalone에서 border 사용 시):**
- standalone FeatureIcons는 현재 카드 기반(`border: 1px solid`, `borderRadius: 12`)이므로 isRight/isBottom 이슈 없음
- 만약 border 구분선 방식으로 변경할 경우: `isRight = idx % 4 === 3`, `isBottom = idx >= 4`

**(e) 섹션 헤더 텍스트 변경:**
- "이 타이어가 잘하는 8가지"

**수용 기준:**
- [ ] 8개 아이콘이 4x2 그리드로 균일하게 표시됨 (4열 x 2행)
- [ ] 상단에 solus-ta21-3.png(트레드 패턴)이 풀폭으로 표시됨
- [ ] 각 아이콘에 label + description 표시
- [ ] 기존 4개 아이콘에는 SVG 아이콘, 나머지 4개에는 fallback 아이콘 표시
- [ ] EditableText/ImageSlot 에디팅 기능 정상 동작

### Step 4: PNG 익스포트 및 전체 통합 검증
**작업 내용:**
- 영문 경로 이미지 3장이 모두 브라우저에서 정상 렌더링되는지 확인
- html2canvas 익스포트 테스트 (1680px PNG)
- 수평 바 차트가 PNG에 정상 렌더링되는지 확인
- 전체 7개 섹션이 익스포트 이미지에 포함되는지 확인
- 에디터블 기능(텍스트 편집, 이미지 업로드) 동작 확인

**수용 기준:**
- [ ] 3장의 이미지가 모두 브라우저에서 정상 렌더링
- [ ] PNG 익스포트 시 모든 섹션 + 이미지 포함
- [ ] 수평 바 차트가 PNG에 정확히 렌더됨 (SVG 사용 안 했으므로 안정적이어야 함)
- [ ] 익스포트 이미지 해상도 1680px 폭 유지
- [ ] 이미지 잘림/오프셋 없음
- [ ] TypeScript 컴파일 에러 없음

---

## 이미지-섹션 매핑 요약

| 이미지 | 원본 파일명 | 리네이밍 후 | 주 사용 섹션 | 역할 |
|--------|-----------|------------|-------------|------|
| 상세사진1 (대각선) | 솔루스 TA21 상세사진1.png | solus-ta21-1.png | Hero + TireStory | 드라마틱 히어로 + 소개 |
| 상세사진2 (측면) | 솔루스 TA21 상세사진2.png | solus-ta21-2.png | CoreSpecs | 스펙 리스트 옆 제품 이미지 |
| 상세사진3 (트레드) | 솔루스 TA21 상세사진3.png | solus-ta21-3.png | FeatureIcons | 트레드 패턴 강조 + 성능 아이콘 |

---

## 성능 아이콘 8개 조직

| # | 코드 | 라벨 | 설명 | 아이콘 소스 | 카테고리 |
|---|------|------|------|-----------|---------|
| 1 | M+S | M+S | 진흙+눈 인증, 경설 노면 대응 | ImageSlot fallback | 노면 대응 |
| 2 | ALL | 모든노면주행 | 건조/습윤/비포장 최적화 | ImageSlot fallback | 노면 대응 |
| 3 | DLY | 데일리 | 출퇴근/장거리 일상 주행 내구성 | ImageSlot fallback | 용도 |
| 4 | WER | 마모방지 | 내마모 컴파운드, 수명 극대화 | ImageSlot fallback | 내구성 |
| 5 | CMF | 승차감 | 최적화된 카카스, 부드러운 승차감 | IconComfort (기존) | 컴포트 |
| 6 | QIT | 정숙성 | 피치 시퀀스 최적화, 소음 저감 | IconQuiet (기존) | 컴포트 |
| 7 | STB | 주행안정성 | 넓은 접지면, 안정적 코너링 | IconBraking (기존) | 퍼포먼스 |
| 8 | RSP | 조향응답성 | 센터 리브 강성, 정확한 스티어링 | IconEfficiency (기존) | 퍼포먼스 |

**그리드 배치 (4x2):**
```
[ M+S        ] [ 모든노면주행 ] [ 데일리     ] [ 마모방지   ]
[ 승차감     ] [ 정숙성      ] [ 주행안정성  ] [ 조향응답성 ]
```
상단 행 = 노면 대응 + 용도 (ImageSlot fallback) / 하단 행 = 컴포트 + 퍼포먼스 (기존 SVG 아이콘)

---

## 컴포넌트 재사용 vs 수정 분석 (v2 — 현실적 재산정)

| 컴포넌트 | 현재 상태 | TA21 계획 | 변경 포인트 | 변경 수준 |
|----------|----------|----------|------------|----------|
| Hero | 렌더링 중 | 그대로 사용 | 데이터만 교체 | LOW |
| TireStory | 렌더링 중 | 레이더->바 차트 교체 + featureIcons 그리드 제거 | (a) SVG 레이더 차트 -> CSS 수평 바 차트, (b) 내부 featureIcons.map 블록 제거 | HIGH |
| CoreSpecs | 렌더링 중 | 그대로 사용 | 데이터만 교체 (2컬럼 레이아웃: 좌 keySpecs / 우 productImage 확인 완료) | LOW |
| ProductClassification | 미사용 | 렌더 트리에 추가 | 데이터만 교체 (grade:"economy" 지원 확인 완료 — line 714) | LOW |
| FeatureIcons | 미사용 | 렌더 트리에 추가 + 대폭 수정 | (a) 그리드 2x2->4x2, (b) iconComponents 4->8 확장, (c) 트레드 이미지 영역 신규, (d) 섹션 헤더 변경 | HIGH |
| BrandValues | 렌더링 중 | 그대로 유지 | 변경 없음 | NONE |
| RentalProcess | 렌더링 중 | 그대로 유지 | 변경 없음 | NONE |

**신규 파일:** 3개 (`src/content/types.ts`, `src/content/hp71.ts`, `src/content/ta21.ts`)
**대폭 수정 컴포넌트:** 2개 (TireStory, FeatureIcons)
**데이터 교체만:** 3개 (Hero, CoreSpecs, ProductClassification)
**변경 없음:** 2개 (BrandValues, RentalProcess)

---

## 성공 기준 (측정 가능)

1. 브라우저에서 7개 섹션이 유저 비전 순서대로 렌더링됨 (Hero -> TireStory -> CoreSpecs -> ProductClassification -> FeatureIcons -> BrandValues -> RentalProcess)
2. 3장의 이미지가 영문 경로(`/solus-ta21/solus-ta21-{1,2,3}.png`)로 정상 로드됨 (Network 탭에서 200 응답)
3. 8개 성능 아이콘이 4x2 그리드로 균일한 셀 크기로 표시됨
4. TireStory의 성능 시각화가 수평 바 차트로 표시되고, SVG 레이더 차트가 없음
5. HP71 데이터가 `src/content/hp71.ts`에 완전히 보존됨 (diff로 검증: 기존 defaultContent 값과 일치)
6. PNG 익스포트(1680px)에서 전체 7개 섹션 + 3장 이미지 + 바 차트가 포함됨
7. TypeScript 컴파일 에러 없음 (`npx tsc --noEmit` 통과)

---

## ADR (Architecture Decision Record)

**Decision:** 콘텐츠 데이터 파일 분리 + 기존 컴포넌트 재활용 + TireStory 차트 교체 + FeatureIcons 그리드 확장으로 TA21 콘텐츠 구조 구현

**Drivers:** 구현 속도, HP71 데이터 보존 안전성, html2canvas 익스포트 안정성, 코드 중복 최소화

**Alternatives Considered:**
- 옵션 B(전용 컴포넌트 신규 생성) — 불필요한 중복과 3-4배 구현 시간 소요로 기각
- TireStory 내부에 featureIcons 그리드를 8개 대응으로 수정하는 방안 — 그리드 로직 분산(standalone + 내부) 문제로 기각, standalone으로 통합이 유지보수에 유리

**Why Chosen:**
- 콘텐츠 파일 분리로 HP71/TA21 데이터가 안전하게 공존
- 레이더->바 차트 전환으로 DESIGN.md 권장사항 준수 + html2canvas 안정성 확보
- featureIcons를 standalone으로 통합하여 그리드 로직 단일화
- grade:"economy"가 이미 코드에 구현되어 있어 추가 작업 불필요

**Consequences:**
- FeatureIcons가 가변 개수를 지원하게 되어 향후 제품 추가 시에도 유연
- TireStory가 더 단순해짐 (차트 + 스토리 블록만 담당)
- 콘텐츠 데이터가 타입 안전하게 관리됨

**Follow-ups:**
- 다제품 지원 시 UI에서 제품 선택 드롭다운 추가 검토
- ImageSlot fallback 아이콘을 전용 SVG로 교체하는 디자인 작업 (우선순위 낮음)
