import type { Content } from "./types";

export const hp71Content: Content = {
  brand: "KUMHO TIRE",
  modelName: "크루젠 HP71",
  tagline: "고성능 컴포트 SUV 타이어",
  description:
    "차량 타입별 최적화된 프리미엄 성능과 디자인. 첨단 기술이 집약된 주행 안정성과 저소음 컴포트.",
  category: "SUV / 사계절",

  heroImage: "/temp_img.webp",
  productImage: null,
  treadImage: null,

  carType: "suv",
  season: "allseason",
  grade: "premium",

  quickSpecs: [
    { id: 1, code: "M+S", label: "전천후 주행" },
    { id: 2, code: "4CH", label: "수막현상 방지" },
    { id: 3, code: "5VP", label: "저소음 패턴" },
    { id: 4, code: "WET", label: "습윤 제동력" },
  ],

  recommendTitle: "이런 분들께 추천드립니다",
  recommendItems: [
    { id: 1, text: "고급형 SUV 타이어를 원하시는 분", image: null },
    { id: 2, text: "눈·비에도 안정적인 주행을 원하시는 분", image: null },
  ],

  performance: [
    { label: "마일리지", value: 4 },
    { label: "핸들링", value: 4 },
    { label: "제동력", value: 5 },
    { label: "승차감", value: 5 },
    { label: "정숙성", value: 5 },
  ],

  comparison: {
    thisLabel: "크루젠 HP71",
    compLabel: "타사 동급 타이어",
    metrics: [
      { id: 1, label: "승차감", thisVal: 5.0, compVal: 4.0 },
      { id: 2, label: "정숙성", thisVal: 5.0, compVal: 4.0 },
      { id: 3, label: "건조 핸들링", thisVal: 5.0, compVal: 4.0 },
      { id: 4, label: "건조 제동", thisVal: 5.0, compVal: 4.5 },
      { id: 5, label: "습윤 제동", thisVal: 4.5, compVal: 4.0 },
    ],
  },

  checkpoints: [
    {
      id: 1,
      number: "01",
      title: "안전한 컴파운드 소재",
      description:
        "고함량 실리카 소재 컴파운드는 겨울철에도 노면과의 탄성을 유지해 안정적인 주행 성능을 제공합니다.",
      image: null,
    },
    {
      id: 2,
      number: "02",
      title: "저소음 패턴 설계",
      description:
        "5개의 가변 피치와 접지 형상을 고려한 그루브 앵글 적용으로 정숙성을 크게 향상시킵니다.",
      image: null,
    },
    {
      id: 3,
      number: "03",
      title: "젖은 노면 제동력 그루브",
      description:
        "4개의 넓은 그루브가 젖은 노면에서 수막현상을 방지하여 제동력을 한층 강화합니다.",
      image: null,
    },
  ],

  reviews: {
    average: 4.8,
    totalCount: 1247,
    distribution: [
      { stars: 5, count: 978 },
      { stars: 4, count: 186 },
      { stars: 3, count: 58 },
      { stars: 2, count: 18 },
      { stars: 1, count: 7 },
    ],
    items: [
      {
        id: 1,
        author: "드라이버**",
        rating: 5,
        date: "2026.05.10",
        text: "소음이 정말 없네요. 고속도로 장거리 주행에도 피로감이 크게 줄었습니다.",
      },
      {
        id: 2,
        author: "장거리**",
        rating: 5,
        date: "2026.04.28",
        text: "빗길 제동력이 눈에 띄게 좋아졌고 승차감도 매우 부드럽습니다.",
      },
    ],
  },

  options: [
    { id: 1, size: "225/45R17 94W XL", season: "사계절" },
    { id: 2, size: "235/55R18 100V", season: "사계절" },
    { id: 3, size: "255/50R20 109W XL", season: "사계절" },
  ],

  keySpecs: [
    { id: 1, label: "차량 구분", value: "승용 타이어" },
    { id: 2, label: "계절 성능", value: "사계절 (Mud + Snow, M+S)" },
    { id: 3, label: "특장점", value: "정숙성, 승차감, 퍼포먼스 성능" },
    { id: 4, label: "하중지수", value: "99 (775kg)" },
    { id: 5, label: "속도지수", value: "W (270km/h)" },
  ],

  featureIcons: [
    {
      id: 1,
      label: "제동력",
      description: "뛰어난 제동 성능으로 안전한 주행을 보장합니다.",
      image: null,
    },
    {
      id: 2,
      label: "정숙성",
      description: "저소음 패턴 설계로 조용하고 쾌적한 승차감을 제공합니다.",
      image: null,
    },
    {
      id: 3,
      label: "연비 효율성",
      description: "구름 저항 최소화로 연료 소비를 줄여줍니다.",
      image: null,
    },
    {
      id: 4,
      label: "승차감",
      description:
        "최적화된 컴파운드로 부드럽고 안정적인 주행감을 선사합니다.",
      image: null,
    },
  ],

  brandValues: [
    {
      id: 1,
      title: "정직한 가격",
      description:
        "온라인과 오프라인 모두 동일한 가격으로 신뢰할 수 있는 구매 환경을 제공합니다.",
      image: null,
    },
    {
      id: 2,
      title: "신속한 장착",
      description:
        "주문부터 장착까지 빠르게 진행되어 고객님의 소중한 시간을 아껴드립니다.",
      image: null,
    },
    {
      id: 3,
      title: "안심 품질 보증",
      description:
        "모든 타이어는 철저한 검수와 품질 관리를 거쳐 최고 수준의 성능을 보장합니다.",
      image: null,
    },
    {
      id: 4,
      title: "전문가 상담",
      description:
        "10년 이상 경력의 타이어 전문가가 차량에 꼭 맞는 제품을 안내해드립니다.",
      image: null,
    },
  ],
};
