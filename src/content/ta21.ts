import type { Content } from "./types";

export const ta21Content: Content = {
  brand: "KUMHO TIRE",
  modelName: "솔루스 TA21",
  tagline: "안정적인 사계절 주행의 기준",
  description:
    "세단, CUV, 미니밴을 위한 스탠다드급 사계절 타이어. 안정적인 주행성능과 뛰어난 마일리지로 일상의 모든 도로를 편안하게.",
  category: "세단 · CUV / 사계절",

  heroImage: "/solus-ta21/solus-ta21-1.png",
  productImage: "/solus-ta21/solus-ta21-2.png",
  treadImage: "/solus-ta21/solus-ta21-3.png",

  carType: "sedan",
  season: "allseason",
  grade: "economy",

  quickSpecs: [
    { id: 1, code: "M+S", label: "사계절 인증" },
    { id: 2, code: "HM", label: "고마일리지" },
    { id: 3, code: "4S", label: "사계절 대응" },
    { id: 4, code: "DLY", label: "데일리 주행" },
  ],

  recommendTitle: "이런 분들께 추천드립니다",
  recommendItems: [
    { id: 1, text: "가성비 좋은 사계절 타이어를 찾으시는 분", image: null },
    { id: 2, text: "출퇴근·장거리 주행이 많으신 분", image: null },
  ],

  performance: [
    { label: "마일리지", value: 5 },
    { label: "핸들링", value: 4 },
    { label: "제동력", value: 4 },
    { label: "승차감", value: 4 },
    { label: "정숙성", value: 4 },
  ],

  comparison: {
    thisLabel: "솔루스 TA21",
    compLabel: "타사 동급 타이어",
    metrics: [
      { id: 1, label: "승차감", thisVal: 4.5, compVal: 4.0 },
      { id: 2, label: "정숙성", thisVal: 4.5, compVal: 4.0 },
      { id: 3, label: "마일리지", thisVal: 5.0, compVal: 4.0 },
      { id: 4, label: "건조 제동", thisVal: 4.5, compVal: 4.5 },
      { id: 5, label: "습윤 제동", thisVal: 4.5, compVal: 4.0 },
    ],
  },

  checkpoints: [
    {
      id: 1,
      number: "01",
      title: "사계절 컴파운드",
      description:
        "M+S 인증 컴파운드로 건조, 습윤, 경설 노면 모두에서 안정적인 접지력을 발휘합니다.",
      image: null,
    },
    {
      id: 2,
      number: "02",
      title: "고마일리지 설계",
      description:
        "최적화된 접지 면압 분포와 내마모 컴파운드로 오래도록 균일한 성능을 유지합니다.",
      image: null,
    },
    {
      id: 3,
      number: "03",
      title: "V자 트레드 패턴",
      description:
        "중앙 V형 그루브가 빗물을 신속히 배출하고, 블록 강성을 높여 조향 응답성을 강화합니다.",
      image: null,
    },
  ],

  reviews: {
    average: 4.6,
    totalCount: 7052,
    distribution: [
      { stars: 5, count: 5512 },
      { stars: 4, count: 846 },
      { stars: 3, count: 282 },
      { stars: 2, count: 141 },
      { stars: 1, count: 271 },
    ],
    items: [
      {
        id: 1,
        author: "세단러**",
        rating: 5,
        date: "2026.06.15",
        text: "가성비가 정말 좋습니다. 승차감도 부드럽고 소음도 적어서 만족합니다.",
      },
      {
        id: 2,
        author: "출퇴근**",
        rating: 5,
        date: "2026.05.22",
        text: "마일리지가 뛰어나고 빗길에서도 안정적이에요. 일상 주행에 딱입니다.",
      },
    ],
  },

  options: [
    { id: 1, size: "205/65R16 95H", season: "사계절" },
    { id: 2, size: "215/65R17 99V", season: "사계절" },
    { id: 3, size: "225/45R18 95V XL", season: "사계절" },
  ],

  keySpecs: [
    { id: 1, label: "차량 구분", value: "승용 세단 / CUV / 미니밴" },
    { id: 2, label: "계절 성능", value: "사계절 (M+S 인증)" },
    { id: 3, label: "특장점", value: "마일리지, 주행안정성, 승차감" },
    { id: 4, label: "하중지수", value: "99 (775kg)" },
    { id: 5, label: "속도지수", value: "V (240km/h)" },
  ],

  featureIcons: [
    {
      id: 1,
      label: "M+S",
      description: "진흙+눈 인증으로 겨울철 경설 노면 대응",
      image: null,
    },
    {
      id: 2,
      label: "모든노면주행",
      description: "건조, 습윤, 비포장 등 다양한 노면에 최적화",
      image: null,
    },
    {
      id: 3,
      label: "데일리",
      description: "출퇴근, 장거리 등 일상 주행에 최적화된 내구성",
      image: null,
    },
    {
      id: 4,
      label: "마모방지",
      description: "내마모 컴파운드로 타이어 수명 극대화",
      image: null,
    },
    {
      id: 5,
      label: "승차감",
      description: "최적화된 카카스 구조로 부드러운 승차감",
      image: null,
    },
    {
      id: 6,
      label: "정숙성",
      description: "피치 시퀀스 최적화로 패턴 소음 저감",
      image: null,
    },
    {
      id: 7,
      label: "주행안정성",
      description: "넓은 접지면과 강화된 블록으로 안정적 코너링",
      image: null,
    },
    {
      id: 8,
      label: "조향응답성",
      description: "센터 리브 강성 확보로 정확한 스티어링 응답",
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
