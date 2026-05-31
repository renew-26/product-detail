"use client";

import { useState, useRef } from "react";
import { Download, Upload, Trash2, Image as ImageIcon } from "lucide-react";

// ═══════════════════════════════════════════════════════
// Brand Color System
// globals.css의 :root 변수만 수정해서 전체 리테마 가능.
// ═══════════════════════════════════════════════════════
const B = {
  // ── 다크 섹션 (Hero, TechHighlights) ──
  deepBlack: "var(--brand-deep-black)",
  surfaceDark: "var(--brand-surface-dark)",
  cardDark: "var(--brand-card-dark)",
  darkBorder: "var(--brand-border)",
  // ── 브랜드 컬러 ──
  accent: "var(--brand-accent)",
  accentSoft: "var(--brand-accent-soft)",
  up: "var(--brand-up)",
  down: "var(--brand-down)",
  highlight: "var(--brand-highlight)",
  neutral: "var(--brand-neutral)",
  // ── 다크 배경 위 텍스트 ──
  onDark: "#ffffff",
  onDarkSoft: "rgba(255,255,255,0.65)",
  onDarkMuted: "rgba(255,255,255,0.38)",
  onDarkHair: "rgba(255,255,255,0.08)",
  // ── 라이트 서피스 (대부분의 섹션) ──
  canvas: "#ffffff",
  canvasSoft: "#f7f7f7",
  canvasCard: "#fafafa",
  lightBorder: "#e8e8e8",
  lightBorderStrong: "#d0d0d0",
  ink: "#111111",
  bodyText: "#444444",
  muted: "#888888",
} as const;

// ═══════════════════════════════════════════════════════
// Default Content
// ═══════════════════════════════════════════════════════
const defaultContent = {
  brand: "KUMHO TIRE",
  modelName: "크루젠 HP71",
  tagline: "고성능 컴포트 SUV 타이어",
  description:
    "차량 타입별 최적화된 프리미엄 성능과 디자인. 첨단 기술이 집약된 주행 안정성과 저소음 컴포트.",
  category: "SUV / 사계절",

  heroImage: "/temp_img.webp" as string | null,
  productImage: null as string | null,

  carType: "suv" as string,
  season: "allseason" as string,
  grade: "premium" as string,

  quickSpecs: [
    { id: 1, code: "M+S", label: "전천후 주행" },
    { id: 2, code: "4CH", label: "수막현상 방지" },
    { id: 3, code: "5VP", label: "저소음 패턴" },
    { id: 4, code: "WET", label: "습윤 제동력" },
  ],

  recommendTitle: "이런 분들께 추천드립니다",
  recommendItems: [
    {
      id: 1,
      text: "고급형 SUV 타이어를 원하시는 분",
      image: null as string | null,
    },
    {
      id: 2,
      text: "눈·비에도 안정적인 주행을 원하시는 분",
      image: null as string | null,
    },
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
      image: null as string | null,
    },
    {
      id: 2,
      number: "02",
      title: "저소음 패턴 설계",
      description:
        "5개의 가변 피치와 접지 형상을 고려한 그루브 앵글 적용으로 정숙성을 크게 향상시킵니다.",
      image: null as string | null,
    },
    {
      id: 3,
      number: "03",
      title: "젖은 노면 제동력 그루브",
      description:
        "4개의 넓은 그루브가 젖은 노면에서 수막현상을 방지하여 제동력을 한층 강화합니다.",
      image: null as string | null,
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
    { id: 1, label: "제동력" },
    { id: 2, label: "정숙성" },
    { id: 3, label: "연비 효율성" },
    { id: 4, label: "승차감" },
  ],

  brandValues: [
    {
      id: 1,
      title: "정직한 가격",
      description:
        "온라인과 오프라인 모두 동일한 가격으로 신뢰할 수 있는 구매 환경을 제공합니다.",
    },
    {
      id: 2,
      title: "신속한 장착",
      description:
        "주문부터 장착까지 빠르게 진행되어 고객님의 소중한 시간을 아껴드립니다.",
    },
    {
      id: 3,
      title: "안심 품질 보증",
      description:
        "모든 타이어는 철저한 검수와 품질 관리를 거쳐 최고 수준의 성능을 보장합니다.",
    },
    {
      id: 4,
      title: "전문가 상담",
      description:
        "10년 이상 경력의 타이어 전문가가 차량에 꼭 맞는 제품을 안내해드립니다.",
    },
  ],
};

type Content = typeof defaultContent;

// ═══════════════════════════════════════════════════════
// EditableText
// ═══════════════════════════════════════════════════════
function EditableText({
  value,
  onChange,
  multiline = false,
  block = false,
  style,
  dark = false,
}: {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  block?: boolean;
  style?: React.CSSProperties;
  dark?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    onChange(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const hoverBorder = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)";
  const inputBase: React.CSSProperties = {
    ...style,
    display: block ? "block" : "inline-block",
    width: "100%",
    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${hoverBorder}`,
    outline: "none",
    fontFamily: "inherit",
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    padding: "2px 6px",
    borderRadius: 2,
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Escape" && cancel()}
          autoFocus
          rows={3}
          style={{ ...inputBase, resize: "vertical" }}
        />
      );
    }
    return (
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
        }}
        autoFocus
        style={inputBase}
      />
    );
  }

  return (
    <span
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      title="클릭하여 편집"
      style={{
        cursor: "text",
        display: block ? "block" : "inline-block",
        borderBottom: "1px dashed transparent",
        transition: "border-color 0.15s",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderBottomColor = hoverBorder;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderBottomColor =
          "transparent";
      }}
    >
      {value}
    </span>
  );
}

// ═══════════════════════════════════════════════════════
// ImageSlot
// ═══════════════════════════════════════════════════════
function ImageSlot({
  src,
  onUpload,
  onRemove,
  aspectRatio = "16/9",
  label = "이미지 업로드",
  dark = false,
}: {
  src: string | null;
  onUpload: (src: string) => void;
  onRemove: () => void;
  aspectRatio?: string;
  label?: string;
  dark?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpload(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const emptyBg = dark ? "rgba(255,255,255,0.04)" : "#f4f4f4";
  const emptyBdr = dark
    ? "1px dashed rgba(255,255,255,0.15)"
    : `1px dashed ${B.lightBorderStrong}`;
  const emptyClr = dark ? "rgba(255,255,255,0.25)" : B.muted;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        background: emptyBg,
        border: emptyBdr,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: emptyClr,
            gap: 8,
          }}
        >
          <ImageIcon size={26} />
          <span style={{ fontSize: 12 }}>{label}</span>
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SVG Icons
// ═══════════════════════════════════════════════════════
function IconSedan({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 52 24" width="36" height="17" fill={c}>
      <path d="M3,18 L3,14 L10,14 L16,8 L34,8 L41,14 L49,14 L49,18 Q49,22 45,22 Q41,22 41,18 L11,18 Q11,22 7,22 Q3,22 3,18Z" />
    </svg>
  );
}
function IconSuv({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 52 28" width="36" height="19" fill={c}>
      <path d="M3,22 L3,10 L10,4 L40,4 L48,10 L48,22 Q48,26 44,26 Q40,26 40,22 L12,22 Q12,26 8,26 Q3,26 3,22Z" />
    </svg>
  );
}
function IconTruck({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 56 28" width="38" height="19" fill={c}>
      <rect x="2" y="5" width="28" height="15" rx="1" />
      <path d="M30,9 L30,20 L44,20 L44,14 L40,9 Z" />
      <circle cx="10" cy="23" r="3.5" />
      <circle cx="22" cy="23" r="3.5" />
      <circle cx="37" cy="23" r="3.5" />
    </svg>
  );
}
function IconAllSeason({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 36 36" width="30" height="30" fill="none">
      <circle cx="11" cy="25" r="4.5" fill={c} />
      <line
        x1="11"
        y1="17"
        x2="11"
        y2="19.5"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="25"
        x2="6.5"
        y2="25"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="6.2"
        y1="20.2"
        x2="8"
        y2="22"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="15.8"
        y1="20.2"
        x2="14"
        y2="22"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="4"
        x2="25"
        y2="16"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="19"
        y1="10"
        x2="31"
        y2="10"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="20.8"
        y1="5.8"
        x2="29.2"
        y2="14.2"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="29.2"
        y1="5.8"
        x2="20.8"
        y2="14.2"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconWinter({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="14" y1="2" x2="14" y2="26" />
      <line x1="2" y1="14" x2="26" y2="14" />
      <line x1="5.5" y1="5.5" x2="22.5" y2="22.5" />
      <line x1="22.5" y1="5.5" x2="5.5" y2="22.5" />
      <line x1="11" y1="6" x2="14" y2="9" />
      <line x1="17" y1="6" x2="14" y2="9" />
      <line x1="11" y1="22" x2="14" y2="19" />
      <line x1="17" y1="22" x2="14" y2="19" />
    </svg>
  );
}
function IconSummer({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="14" cy="14" r="5" fill={c} stroke="none" />
      <line x1="14" y1="2" x2="14" y2="5" />
      <line x1="14" y1="23" x2="14" y2="26" />
      <line x1="2" y1="14" x2="5" y2="14" />
      <line x1="23" y1="14" x2="26" y2="14" />
      <line x1="5.5" y1="5.5" x2="7.6" y2="7.6" />
      <line x1="20.4" y1="20.4" x2="22.5" y2="22.5" />
      <line x1="22.5" y1="5.5" x2="20.4" y2="7.6" />
      <line x1="7.6" y1="20.4" x2="5.5" y2="22.5" />
    </svg>
  );
}
function IconGradeBasic({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
      <circle cx="14" cy="14" r="11" stroke={c} strokeWidth="2" />
      <circle cx="14" cy="14" r="6" fill={c} />
    </svg>
  );
}
function IconGradePremium({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill={c}>
      <path d="M14,3 L17,10 L25,10 L19,15 L21,22 L14,18 L7,22 L9,15 L3,10 L11,10 Z" />
    </svg>
  );
}
function IconGradeFlagship({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#aaaaaa";
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill={c}>
      <path d="M4,22 L6,12 L10,16 L14,6 L18,16 L22,12 L24,22 Z" />
      <rect x="4" y="23" width="20" height="3" rx="1" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// ProductClassification — 라이트 테마
// ═══════════════════════════════════════════════════════
function ProductClassification({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  const carTypes = [
    { id: "sedan", label: "승용 세단", Icon: IconSedan },
    { id: "suv", label: "승용 SUV", Icon: IconSuv },
    { id: "truck", label: "트럭", Icon: IconTruck },
  ];
  const seasons = [
    { id: "allseason", label: "사계절용", Icon: IconAllSeason },
    { id: "winter", label: "겨울용", Icon: IconWinter },
    { id: "summer", label: "여름용", Icon: IconSummer },
  ];
  const grades = [
    { id: "economy", label: "실속형", Icon: IconGradeBasic },
    { id: "premium", label: "고급형", Icon: IconGradePremium },
    { id: "flagship", label: "플래그십", Icon: IconGradeFlagship },
  ];

  const Row = ({
    title,
    sub,
    items,
    activeId,
    onSelect,
  }: {
    title: string;
    sub: string;
    items: {
      id: string;
      label: string;
      Icon: React.ComponentType<{ active: boolean }>;
    }[];
    activeId: string;
    onSelect: (id: string) => void;
  }) => (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: B.ink,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2.5px",
            color: B.muted,
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          {sub}
        </div>
        <div
          style={{
            width: 24,
            height: 2,
            background: B.accent,
            margin: "10px auto 0",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          border: `1px solid ${B.lightBorder}`,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {items.map((item, idx) => {
          const active = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 12px 16px",
                cursor: "pointer",
                gap: 10,
                background: active ? B.accent : B.canvas,
                borderRight:
                  idx < items.length - 1
                    ? `1px solid ${B.lightBorder}`
                    : "none",
                transition: "background 0.15s",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: active ? "rgba(255,255,255,0.2)" : B.canvasSoft,
                  border: active ? "none" : `1px solid ${B.lightBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <item.Icon active={active} />
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: active ? 700 : 400,
                  color: active ? B.onDark : B.bodyText,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      style={{
        background: B.canvasSoft,
        padding: "56px 48px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div
        style={{ maxWidth: 600, margin: "0 auto", display: "grid", gap: 40 }}
      >
        <Row
          title="차종"
          sub="CAR TYPE"
          items={carTypes}
          activeId={content.carType}
          onSelect={(id) => onUpdate({ carType: id })}
        />
        <Row
          title="계절"
          sub="SEASON"
          items={seasons}
          activeId={content.season}
          onSelect={(id) => onUpdate({ season: id })}
        />
        <Row
          title="등급"
          sub="GRADE"
          items={grades}
          activeId={content.grade}
          onSelect={(id) => onUpdate({ grade: id })}
        />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// Hero — 다크 유지 (가격 표시 제거)
// ═══════════════════════════════════════════════════════
function Hero({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      onUpdate({ heroImage: ev.target?.result as string });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <section
      style={{
        position: "relative",
        background: B.deepBlack,
        overflow: "hidden",
        minHeight: 540,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(200,16,46,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* 상단 설명 스트립 — 코너 브라켓 장식 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "20px 48px",
          textAlign: "center",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* 코너 브라켓 ┐ 우상단 */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 16,
            width: 18,
            height: 18,
            borderTop: "1.5px solid rgba(255,255,255,0.3)",
            borderRight: "1.5px solid rgba(255,255,255,0.3)",
          }}
        />
        {/* 코너 브라켓 └ 좌하단 */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 16,
            width: 18,
            height: 18,
            borderBottom: "1.5px solid rgba(255,255,255,0.3)",
            borderLeft: "1.5px solid rgba(255,255,255,0.3)",
          }}
        />
        <EditableText
          value={content.description}
          onChange={(v) => onUpdate({ description: v })}
          multiline
          block
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            fontStyle: "italic",
            lineHeight: 1.75,
            letterSpacing: "0.3px",
            wordBreak: "keep-all",
          }}
          dark
        />
      </div>

      {/* 브랜드명 */}
      <div
        style={{
          marginTop: 28,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: B.onDarkMuted,
          textAlign: "center",
        }}
      >
        <EditableText
          value={content.brand}
          onChange={(v) => onUpdate({ brand: v })}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "4px" }}
          dark
        />
      </div>

      {/* 태그라인 — 모델명 바로 위, 크게 */}
      <div
        style={{
          marginTop: 14,
          fontSize: 20,
          fontWeight: 500,
          fontStyle: "italic",
          color: B.onDarkSoft,
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        <EditableText
          value={content.tagline}
          onChange={(v) => onUpdate({ tagline: v })}
          style={{ fontSize: 20, fontWeight: 500, fontStyle: "italic" }}
          dark
        />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "center",
          marginTop: 2,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(52px, 9vw, 88px)",
            fontWeight: 900,
            lineHeight: 1,
            margin: "0",
            letterSpacing: "-3px",
            color: B.onDark,
            userSelect: "none",
            padding: "0 24px",
          }}
        >
          <EditableText
            value={content.modelName}
            onChange={(v) => onUpdate({ modelName: v })}
            block
            style={{
              fontSize: "inherit",
              fontWeight: 900,
              letterSpacing: "-3px",
            }}
            dark
          />
        </h1>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          {content.heroImage ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.heroImage}
                alt={content.modelName}
                style={{
                  maxWidth: 440,
                  width: "100%",
                  maxHeight: 340,
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                  filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  background:
                    "linear-gradient(to top, #000 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="export-ignore"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  display: "flex",
                  gap: 4,
                }}
              >
                <button
                  onClick={() => inputRef.current?.click()}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Upload size={11} /> 교체
                </button>
                <button
                  onClick={() => onUpdate({ heroImage: null })}
                  style={{
                    background: "rgba(220,38,38,0.8)",
                    color: "#fff",
                    border: "none",
                    padding: "6px 8px",
                    cursor: "pointer",
                    borderRadius: 4,
                  }}
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: 300,
                height: 220,
                border: "1px dashed rgba(255,255,255,0.12)",
                margin: "16px auto 0",
              }}
            >
              <ImageIcon size={32} color="rgba(255,255,255,0.18)" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
                제품 이미지 클릭하여 업로드
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 스튜디오 플로어 조명 효과 — 타이어가 바닥에 놓인 것처럼 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: 80,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(200,16,46,0.12) 0%, rgba(60,60,60,0.18) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// Feature Icon SVGs (outline style, 28×28)
// ═══════════════════════════════════════════════════════
function IconBraking({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="14" cy="14" r="11" />
      <circle cx="14" cy="14" r="5" />
      <line x1="14" y1="3" x2="14" y2="9" />
      <line x1="24.5" y1="8.5" x2="19.5" y2="11.5" />
      <line x1="24.5" y1="19.5" x2="19.5" y2="16.5" />
    </svg>
  );
}
function IconQuiet({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,10 L6,18 L10,18 L16,22 L16,6 L10,10 Z" />
      <path d="M20,10 Q22.5,14 20,18" />
      <path d="M22,8 Q26,14 22,20" />
    </svg>
  );
}
function IconEfficiency({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="14" cy="17" r="7" />
      <path d="M14,10 L14,5" />
      <path d="M11,5 L14,5 L14,8" />
      <line x1="14" y1="17" x2="17" y2="14" />
    </svg>
  );
}
function IconComfort({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4,17 L4,13 Q4,11 6,11 L22,11 Q24,11 24,13 L24,17 Q24,19 22,19 L6,19 Q4,19 4,17Z" />
      <circle cx="8" cy="22" r="2" />
      <circle cx="20" cy="22" r="2" />
      <path d="M4,13 Q4,10 7,10 L9,10" />
    </svg>
  );
}
// Brand Values SVG icons
function IconPrice({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="14" cy="14" r="11" />
      <line x1="14" y1="7" x2="14" y2="21" />
      <path d="M11,10 Q11,8.5 14,8.5 Q17,8.5 17,10.5 Q17,12.5 14,12.5 Q17,12.5 17,15.5 Q17,17.5 14,17.5 Q11,17.5 11,16" />
    </svg>
  );
}
function IconHourglass({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,5 L20,5 L14,14 L20,23 L8,23 L14,14 Z" />
      <line x1="8" y1="5" x2="20" y2="5" />
      <line x1="8" y1="23" x2="20" y2="23" />
    </svg>
  );
}
function IconShield({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14,4 L22,7 L22,14 Q22,20 14,24 Q6,20 6,14 L6,7 Z" />
      <polyline points="10,14 13,17 18,11" />
    </svg>
  );
}
function IconConsult({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="14" cy="10" r="4" />
      <path d="M6,23 Q6,17 14,17 Q22,17 22,23" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// KeySpecs — "핵심 성능 한눈에" 카드 (QuickSpecs 대체)
// ═══════════════════════════════════════════════════════
function KeySpecs({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section
      style={{
        background: B.canvas,
        padding: "0 48px 40px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            background: B.ink,
            borderRadius: 12,
            padding: "32px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: B.accent,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: B.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 16 16"
                width="11"
                height="11"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3,8 6.5,12 13,5" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "1px",
              }}
            >
              구매 전 꼭 확인해야 할
            </span>
          </div>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: B.onDark,
              margin: "0 0 22px",
              letterSpacing: "-0.5px",
            }}
          >
            핵심 성능을 한눈에
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {content.keySpecs.map((spec, idx) => (
              <div
                key={spec.id}
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    minWidth: 96,
                    textAlign: "center",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20,
                    padding: "5px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  <EditableText
                    value={spec.label}
                    onChange={(v) => {
                      const a = [...content.keySpecs];
                      a[idx] = { ...spec, label: v };
                      onUpdate({ keySpecs: a });
                    }}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.55)",
                    }}
                    dark
                  />
                </div>
                <div style={{ fontSize: 14, color: B.onDark }}>
                  <EditableText
                    value={spec.value}
                    onChange={(v) => {
                      const a = [...content.keySpecs];
                      a[idx] = { ...spec, value: v };
                      onUpdate({ keySpecs: a });
                    }}
                    style={{ fontSize: 14, color: B.onDark }}
                    dark
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// FeatureIcons — 2×2 기능 아이콘 그리드
// ═══════════════════════════════════════════════════════
function FeatureIcons({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  const iconComponents = [IconBraking, IconQuiet, IconEfficiency, IconComfort];
  return (
    <section
      style={{
        background: B.canvasSoft,
        padding: "56px 48px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              fontSize: 11,
              color: B.muted,
              letterSpacing: "1px",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            믿을 수 있는 품질과 성능
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: B.ink,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            <EditableText
              value={content.modelName}
              onChange={(v) => onUpdate({ modelName: v })}
              block
              style={{ fontSize: 22, fontWeight: 900, color: B.ink }}
            />
          </h2>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {content.featureIcons.map((feat, idx) => {
            const Icon = iconComponents[idx % iconComponents.length];
            return (
              <div
                key={feat.id}
                style={{
                  background: B.canvas,
                  border: `1px solid ${B.lightBorder}`,
                  borderRadius: 12,
                  padding: "28px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    border: `2px solid ${B.lightBorderStrong}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon color={B.ink} />
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: B.ink,
                    textAlign: "center",
                  }}
                >
                  <EditableText
                    value={feat.label}
                    onChange={(v) => {
                      const a = [...content.featureIcons];
                      a[idx] = { ...feat, label: v };
                      onUpdate({ featureIcons: a });
                    }}
                    style={{ fontSize: 14, fontWeight: 700, color: B.ink }}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 12,
            color: B.muted,
          }}
        >
          안전성, 쾌적함, 경제성까지 모두 갖춘 스마트한 선택!
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// BrandValues — "왜 [브랜드]인가요?" 섹션
// ═══════════════════════════════════════════════════════
function BrandValues({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  const iconComponents = [IconPrice, IconHourglass, IconShield, IconConsult];
  const iconAccent = "#f59e0b";
  return (
    <section
      style={{
        background: B.canvas,
        padding: "64px 48px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2px",
              color: B.muted,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            THE DIFFERENCE
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.ink,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            왜{" "}
            <EditableText
              value={content.brand}
              onChange={(v) => onUpdate({ brand: v })}
              style={{ fontSize: 26, fontWeight: 900, color: B.ink }}
            />
            인가요?
          </h2>
        </div>
        <div
          style={{ background: B.ink, borderRadius: 12, overflow: "hidden" }}
        >
          {content.brandValues.map((val, idx) => {
            const Icon = iconComponents[idx % iconComponents.length];
            return (
              <div
                key={val.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "24px 32px",
                  borderBottom:
                    idx < content.brandValues.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "rgba(245,158,11,0.12)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon color={iconAccent} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 900,
                      color: B.onDark,
                      marginBottom: 6,
                    }}
                  >
                    <EditableText
                      value={val.title}
                      onChange={(v) => {
                        const a = [...content.brandValues];
                        a[idx] = { ...val, title: v };
                        onUpdate({ brandValues: a });
                      }}
                      block
                      style={{ fontSize: 15, fontWeight: 900, color: B.onDark }}
                      dark
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: B.onDarkSoft,
                      lineHeight: 1.7,
                    }}
                  >
                    <EditableText
                      value={val.description}
                      onChange={(v) => {
                        const a = [...content.brandValues];
                        a[idx] = { ...val, description: v };
                        onUpdate({ brandValues: a });
                      }}
                      multiline
                      block
                      style={{ fontSize: 13, color: B.onDarkSoft }}
                      dark
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// ProductSummary — 라이트 테마, 가격 제거
// ═══════════════════════════════════════════════════════
function ProductSummary({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section
      style={{
        background: B.canvas,
        padding: "64px 48px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <ImageSlot
          src={content.productImage}
          onUpload={(src) => onUpdate({ productImage: src })}
          onRemove={() => onUpdate({ productImage: null })}
          aspectRatio="1/1"
          label="제품 이미지 (정면)"
        />
        <div>
          <div
            style={{
              display: "inline-block",
              background: B.accentSoft,
              border: `1px solid ${B.accent}`,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: B.accent,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            <EditableText
              value={content.category}
              onChange={(v) => onUpdate({ category: v })}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: B.accent,
              }}
            />
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.ink,
              margin: "0 0 10px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            <EditableText
              value={content.tagline}
              onChange={(v) => onUpdate({ tagline: v })}
              block
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: B.ink,
                letterSpacing: "-0.5px",
              }}
            />
          </h2>
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: B.bodyText,
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            <EditableText
              value={content.description}
              onChange={(v) => onUpdate({ description: v })}
              multiline
              block
              style={{ fontSize: 14, color: B.bodyText }}
            />
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                flex: 1,
                height: 48,
                background: B.accent,
                color: "#fff",
                border: "none",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              렌탈 신청하기
            </button>
            <button
              style={{
                height: 48,
                padding: "0 20px",
                background: B.canvas,
                color: B.bodyText,
                border: `1px solid ${B.lightBorder}`,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              사이즈 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// Recommend — 라이트 테마
// ═══════════════════════════════════════════════════════
function Recommend({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section
      style={{
        background: B.canvasSoft,
        padding: "64px 48px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              color: B.accent,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Recommendation
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.ink,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            <EditableText
              value={content.recommendTitle}
              onChange={(v) => onUpdate({ recommendTitle: v })}
              block
              style={{ fontSize: 26, fontWeight: 900, color: B.ink }}
            />
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${content.recommendItems.length}, 1fr)`,
            gap: 16,
          }}
        >
          {content.recommendItems.map((item, idx) => (
            <div
              key={item.id}
              style={{
                background: B.canvas,
                border: `1px solid ${B.lightBorder}`,
                padding: 24,
              }}
            >
              <ImageSlot
                src={item.image}
                onUpload={(src) => {
                  const a = [...content.recommendItems];
                  a[idx] = { ...item, image: src };
                  onUpdate({ recommendItems: a });
                }}
                onRemove={() => {
                  const a = [...content.recommendItems];
                  a[idx] = { ...item, image: null };
                  onUpdate({ recommendItems: a });
                }}
                aspectRatio="1/1"
                label="아이콘 이미지"
              />
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: B.ink,
                  lineHeight: 1.5,
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                <EditableText
                  value={item.text}
                  onChange={(v) => {
                    const a = [...content.recommendItems];
                    a[idx] = { ...item, text: v };
                    onUpdate({ recommendItems: a });
                  }}
                  multiline
                  block
                  style={{ fontSize: 15, fontWeight: 700, color: B.ink }}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// PerformanceRadar
// ═══════════════════════════════════════════════════════
function PerformanceRadar({ content }: { content: Content }) {
  const cx = 160,
    cy = 160,
    max = 5,
    radius = 100;
  const count = content.performance.length;

  const getPoint = (idx: number, value: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      lx: cx + Math.cos(angle) * (radius + 32),
      ly: cy + Math.sin(angle) * (radius + 32),
    };
  };

  const dataPoints = content.performance.map((p, i) => getPoint(i, p.value));
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const gridPolygons = [1, 2, 3, 4, 5].map((lvl) =>
    content.performance
      .map((_, i) => {
        const p = getPoint(i, lvl);
        return `${p.x},${p.y}`;
      })
      .join(" "),
  );

  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 320 }}>
      {gridPolygons.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke={B.lightBorder}
          strokeWidth="1"
        />
      ))}
      {content.performance.map((_, i) => {
        const p = getPoint(i, max);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={B.lightBorder}
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={polygon}
        fill="var(--brand-accent)"
        fillOpacity="0.12"
        stroke="var(--brand-accent)"
        strokeWidth="2"
      />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--brand-accent)" />
      ))}
      {content.performance.map((perf, i) => {
        const p = dataPoints[i];
        return (
          <text
            key={i}
            x={p.lx}
            y={p.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.5px"
            fill={B.muted}
          >
            {perf.label}
          </text>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// ComparisonTable — 라이트 테마
// ═══════════════════════════════════════════════════════
function ComparisonTable({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  const updateMetric = (
    id: number,
    patch: { label?: string; thisVal?: number; compVal?: number },
  ) => {
    onUpdate({
      comparison: {
        ...content.comparison,
        metrics: content.comparison.metrics.map((m) =>
          m.id === id ? { ...m, ...patch } : m,
        ),
      },
    });
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 1fr",
          gap: 8,
          marginBottom: 12,
          padding: "0 0 8px",
          borderBottom: `1px solid ${B.lightBorder}`,
        }}
      >
        <div />
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1px",
            color: B.accent,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          <EditableText
            value={content.comparison.thisLabel}
            onChange={(v) =>
              onUpdate({ comparison: { ...content.comparison, thisLabel: v } })
            }
            style={{ fontSize: 11, fontWeight: 700, color: B.accent }}
          />
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1px",
            color: B.muted,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          <EditableText
            value={content.comparison.compLabel}
            onChange={(v) =>
              onUpdate({ comparison: { ...content.comparison, compLabel: v } })
            }
            style={{ fontSize: 11, fontWeight: 700, color: B.muted }}
          />
        </div>
      </div>

      {content.comparison.metrics.map((m) => {
        const thisWin = m.thisVal >= m.compVal;
        return (
          <div
            key={m.id}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 1fr",
              gap: 8,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 12, color: B.bodyText }}>
              <EditableText
                value={m.label}
                onChange={(v) => updateMetric(m.id, { label: v })}
                style={{ fontSize: 12, color: B.bodyText }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 7,
                  background: "#f0f0f0",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(m.thisVal / 5) * 100}%`,
                    background: thisWin ? B.up : B.down,
                    borderRadius: 4,
                    transition: "width 0.4s",
                  }}
                />
              </div>
              <span
                title="클릭하여 편집 (0–5)"
                onClick={() => {
                  const v = prompt(
                    `이 타이어 ${m.label} 점수 (0–5)`,
                    String(m.thisVal),
                  );
                  if (v !== null) {
                    const n = parseFloat(v);
                    if (!isNaN(n))
                      updateMetric(m.id, {
                        thisVal: Math.min(5, Math.max(0, n)),
                      });
                  }
                }}
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: thisWin ? B.up : B.down,
                  minWidth: 28,
                  cursor: "pointer",
                }}
              >
                {m.thisVal.toFixed(1)}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 7,
                  background: "#f0f0f0",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(m.compVal / 5) * 100}%`,
                    background: "#c8c8c8",
                    borderRadius: 4,
                    transition: "width 0.4s",
                  }}
                />
              </div>
              <span
                title="클릭하여 편집 (0–5)"
                onClick={() => {
                  const v = prompt(
                    `비교 타이어 ${m.label} 점수 (0–5)`,
                    String(m.compVal),
                  );
                  if (v !== null) {
                    const n = parseFloat(v);
                    if (!isNaN(n))
                      updateMetric(m.id, {
                        compVal: Math.min(5, Math.max(0, n)),
                      });
                  }
                }}
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: B.muted,
                  minWidth: 28,
                  cursor: "pointer",
                }}
              >
                {m.compVal.toFixed(1)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PerformanceSection — 라이트 테마
// ═══════════════════════════════════════════════════════
function PerformanceSection({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section
      style={{
        background: B.canvas,
        padding: "64px 48px",
        borderBottom: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              color: B.accent,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Performance
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.ink,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            주요 성능 & 경쟁사 비교
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1px",
                color: B.muted,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              Performance Chart
            </div>
            <PerformanceRadar content={content} />
          </div>
          <div style={{ paddingTop: 8 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1px",
                color: B.muted,
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              경쟁사 비교
            </div>
            <ComparisonTable content={content} onUpdate={onUpdate} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// RentalProcess — 렌탈 서비스 프로세스 (4단계)
// ═══════════════════════════════════════════════════════
function RentalProcess() {
  const steps = [
    {
      num: "01",
      title: "상담 신청",
      desc: "원하는 타이어를 선택하고 온라인 또는 전화로 렌탈 신청",
      Icon: () => (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="6" width="24" height="20" rx="2" />
          <polyline points="4,12 16,19 28,12" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "심사 & 승인",
      desc: "간단한 신용 심사 후 최대 1 영업일 이내 승인 완료",
      Icon: () => (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16,4 L26,8 L26,16 Q26,24 16,28 Q6,24 6,16 L6,8 Z" />
          <polyline points="11,16 14.5,20 21,12" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "타이어 장착",
      desc: "전국 전문 장착점에서 당일 예약 가능, 숙련 기사가 직접 장착",
      Icon: () => (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="5" />
          <line x1="16" y1="5" x2="16" y2="11" />
          <line x1="16" y1="21" x2="16" y2="27" />
          <line x1="5" y1="16" x2="11" y2="16" />
          <line x1="21" y1="16" x2="27" y2="16" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "렌탈 시작",
      desc: "월 정액 납부로 타이어 걱정 없이 안전한 주행을 즐기세요",
      Icon: () => (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4,22 L4,14 L9,8 L28,8 L28,22" />
          <circle cx="10" cy="23" r="3.5" />
          <circle cx="22" cy="23" r="3.5" />
          <line x1="13.5" y1="23" x2="18.5" y2="23" />
          <line x1="4" y1="22" x2="28" y2="22" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        background: B.canvas,
        borderBottom: `1px solid ${B.lightBorder}`,
        padding: "56px 48px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* 섹션 헤더 */}
        <div
          style={{
            borderTop: `4px solid ${B.accent}`,
            paddingTop: 16,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: B.accent,
              marginBottom: 4,
            }}
          >
            RENTAL PROCESS
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: B.ink,
              letterSpacing: "-0.5px",
            }}
          >
            렌탈 서비스 이용 안내
          </div>
          <div
            style={{
              fontSize: 13,
              color: B.muted,
              marginTop: 4,
            }}
          >
            간단한 4단계로 새 타이어를 부담 없이 시작하세요
          </div>
        </div>

        {/* 스텝 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            position: "relative",
          }}
        >
          {/* 연결선 */}
          <div
            style={{
              position: "absolute",
              top: 28,
              left: "12.5%",
              right: "12.5%",
              height: 2,
              background: `linear-gradient(to right, ${B.accent}, rgba(200,16,46,0.2))`,
              zIndex: 0,
            }}
          />

          {steps.map((step, idx) => (
            <div
              key={step.num}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 12px",
                textAlign: "center",
              }}
            >
              {/* 아이콘 원형 */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: idx === 0 ? B.accent : B.canvas,
                  border: `2px solid ${idx === 0 ? B.accent : B.lightBorderStrong}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: idx === 0 ? "#fff" : B.bodyText,
                  marginBottom: 14,
                  boxShadow: idx === 0
                    ? "0 4px 16px rgba(200,16,46,0.25)"
                    : "none",
                }}
              >
                <step.Icon />
              </div>

              {/* 단계 번호 */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: idx === 0 ? B.accent : B.muted,
                  marginBottom: 4,
                }}
              >
                STEP {step.num}
              </div>

              {/* 제목 */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: B.ink,
                  marginBottom: 6,
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </div>

              {/* 설명 */}
              <div
                style={{
                  fontSize: 11,
                  color: B.muted,
                  lineHeight: 1.6,
                  wordBreak: "keep-all",
                }}
              >
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 강조 바 */}
        <div
          style={{
            marginTop: 44,
            background: B.accentSoft,
            border: `1px solid rgba(200,16,46,0.2)`,
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 4,
              height: 32,
              background: B.accent,
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: B.accent,
                marginBottom: 2,
              }}
            >
              렌탈 혜택 안내
            </div>
            <div style={{ fontSize: 12, color: B.bodyText }}>
              초기 비용 0원 · 월 정액 납부 · 계약 기간 중 무상 펑크 수리 포함 ·
              만기 시 교체 또는 반납 선택 가능
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// TechHighlights — 다크 유지 (시각적 리듬)
// ═══════════════════════════════════════════════════════
function TechHighlights({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section style={{ background: B.deepBlack }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              color: B.accent,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Technology
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.onDark,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            향상된 타이어 기술
          </h2>
        </div>
        <div style={{ display: "grid", gap: 4 }}>
          {content.checkpoints.map((cp, idx) => (
            <div
              key={cp.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                background: idx % 2 === 0 ? B.cardDark : B.surfaceDark,
                border: `1px solid ${B.darkBorder}`,
              }}
            >
              <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
                <ImageSlot
                  src={cp.image}
                  onUpload={(src) => {
                    const a = [...content.checkpoints];
                    a[idx] = { ...cp, image: src };
                    onUpdate({ checkpoints: a });
                  }}
                  onRemove={() => {
                    const a = [...content.checkpoints];
                    a[idx] = { ...cp, image: null };
                    onUpdate({ checkpoints: a });
                  }}
                  aspectRatio="4/3"
                  label="기술 이미지"
                  dark
                />
              </div>
              <div
                style={{
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: B.accent,
                    lineHeight: 1,
                    marginBottom: 12,
                    letterSpacing: "-2px",
                    opacity: 0.7,
                  }}
                >
                  {cp.number}
                </div>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 900,
                    color: B.onDark,
                    lineHeight: 1.3,
                    margin: "0 0 10px",
                  }}
                >
                  <EditableText
                    value={cp.title}
                    onChange={(v) => {
                      const a = [...content.checkpoints];
                      a[idx] = { ...cp, title: v };
                      onUpdate({ checkpoints: a });
                    }}
                    block
                    style={{ fontSize: 19, fontWeight: 900, color: B.onDark }}
                    dark
                  />
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: B.onDarkSoft,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  <EditableText
                    value={cp.description}
                    onChange={(v) => {
                      const a = [...content.checkpoints];
                      a[idx] = { ...cp, description: v };
                      onUpdate({ checkpoints: a });
                    }}
                    multiline
                    block
                    style={{ fontSize: 13, color: B.onDarkSoft }}
                    dark
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// ReviewSection — 라이트 테마
// ═══════════════════════════════════════════════════════
function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 20 20"
          width={size}
          height={size}
          fill={s <= Math.round(rating) ? "var(--brand-highlight)" : "#e0e0e0"}
        >
          <path d="M10,2 L12.4,7.3 L18,8 L14,12 L15.1,17.7 L10,15 L4.9,17.7 L6,12 L2,8 L7.6,7.3 Z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewSection({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  const r = content.reviews;
  const total = r.distribution.reduce((s, d) => s + d.count, 0);

  const updateReviewItem = (
    id: number,
    patch: Partial<(typeof r.items)[0]>,
  ) => {
    onUpdate({
      reviews: {
        ...r,
        items: r.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    });
  };

  return (
    <section
      style={{
        background: B.canvasSoft,
        padding: "64px 48px",
        borderTop: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              color: B.accent,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Reviews
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.ink,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            구매자 리뷰
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: B.canvas,
              border: `1px solid ${B.lightBorder}`,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: B.accent,
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              {r.average.toFixed(1)}
            </div>
            <StarRow rating={r.average} size={18} />
            <div style={{ fontSize: 12, color: B.muted }}>
              총{" "}
              <span style={{ color: B.bodyText, fontWeight: 700 }}>
                {r.totalCount.toLocaleString()}
              </span>
              개 리뷰
            </div>
          </div>

          <div
            style={{
              background: B.canvas,
              border: `1px solid ${B.lightBorder}`,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              justifyContent: "center",
            }}
          >
            {[...r.distribution].reverse().map((d) => (
              <div
                key={d.stars}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 36px",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: B.muted,
                    textAlign: "right",
                  }}
                >
                  {d.stars}★
                </span>
                <div
                  style={{
                    height: 6,
                    background: "#f0f0f0",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${total > 0 ? (d.count / total) * 100 : 0}%`,
                      background: B.highlight,
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span style={{ fontSize: 11, color: B.muted }}>
                  {d.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {r.items.map((item) => (
            <div
              key={item.id}
              style={{
                background: B.canvas,
                border: `1px solid ${B.lightBorder}`,
                padding: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <StarRow rating={item.rating} size={13} />
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: B.bodyText }}
                  >
                    <EditableText
                      value={item.author}
                      onChange={(v) => updateReviewItem(item.id, { author: v })}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: B.bodyText,
                      }}
                    />
                  </span>
                </div>
                <span style={{ fontSize: 11, color: B.muted }}>
                  <EditableText
                    value={item.date}
                    onChange={(v) => updateReviewItem(item.id, { date: v })}
                    style={{ fontSize: 11, color: B.muted }}
                  />
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: B.bodyText,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                <EditableText
                  value={item.text}
                  onChange={(v) => updateReviewItem(item.id, { text: v })}
                  multiline
                  block
                  style={{ fontSize: 14, color: B.bodyText }}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// SizeOptions — 라이트 테마, 가격 컬럼 제거
// ═══════════════════════════════════════════════════════
function SizeOptions({
  content,
  selectedId,
  onSelect,
}: {
  content: Content;
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <section
      style={{
        background: B.canvas,
        padding: "64px 48px",
        borderTop: `1px solid ${B.lightBorder}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              color: B.accent,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Options
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: B.ink,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            사이즈 선택
          </h2>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderTop: `2px solid ${B.ink}`,
          }}
        >
          <thead>
            <tr>
              {["사이즈", "계절"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: B.muted,
                    borderBottom: `1px solid ${B.lightBorder}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.options.map((opt) => {
              const sel = opt.id === selectedId;
              return (
                <tr
                  key={opt.id}
                  onClick={() => onSelect(opt.id)}
                  style={{
                    cursor: "pointer",
                    background: sel ? B.accentSoft : B.canvas,
                    transition: "background 0.15s",
                  }}
                >
                  <td
                    style={{
                      padding: "16px 16px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: sel ? B.accent : B.ink,
                      borderBottom: `1px solid ${B.lightBorder}`,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {opt.size}
                  </td>
                  <td
                    style={{
                      padding: "16px 16px",
                      fontSize: 13,
                      color: B.bodyText,
                      borderBottom: `1px solid ${B.lightBorder}`,
                    }}
                  >
                    {opt.season}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedId !== null && (
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <button
              style={{
                flex: 1,
                height: 50,
                background: B.accent,
                color: "#fff",
                border: "none",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              선택한 사이즈 렌탈 신청
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// CTA — 액센트 컬러 유지
// ═══════════════════════════════════════════════════════
function CTA({ content }: { content: Content }) {
  return (
    <section
      style={{
        background: B.accent,
        padding: "64px 48px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 14,
          }}
        >
          {content.brand}
        </div>
        <h2
          style={{
            fontSize: "clamp(26px, 4.5vw, 38px)",
            fontWeight: 900,
            color: "#fff",
            margin: "0 0 10px",
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}
        >
          {content.modelName}
        </h2>
        <p
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            margin: "0 0 28px",
          }}
        >
          지금 바로 렌탈 신청하고 전문 장착까지 한 번에
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              height: 50,
              padding: "0 36px",
              background: "#fff",
              color: B.accent,
              border: "none",
              fontSize: 15,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            렌탈 신청하기 ›
          </button>
          <button
            style={{
              height: 50,
              padding: "0 24px",
              background: "transparent",
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.4)",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            제품 문의하기
          </button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// Footer
// ═══════════════════════════════════════════════════════
function Footer({ content }: { content: Content }) {
  return (
    <footer
      style={{
        background: B.canvasSoft,
        padding: "32px 48px",
        borderTop: `1px solid ${B.lightBorder}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "3px",
          color: B.muted,
          marginBottom: 6,
        }}
      >
        {content.brand}
      </div>
      <div style={{ fontSize: 11, color: "#c0c0c0" }}>
        © 2026 {content.brand}. All rights reserved.
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════
// SidebarPanel — 편집 패널 (좌측 고정)
// ═══════════════════════════════════════════════════════
function SidebarPanel({
  content,
  onUpdate,
  onExport,
  exporting,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
  onExport: () => void;
  exporting: boolean;
}) {
  const inp: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #e8e8e8",
    borderRadius: 6,
    padding: "7px 10px",
    fontSize: 12,
    color: "#111",
    fontFamily: "inherit",
    outline: "none",
    background: "#fff",
  };
  const lbl: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    color: "#999",
    display: "block",
    marginBottom: 3,
    letterSpacing: "0.5px",
  };
  const sec: React.CSSProperties = {
    padding: "14px 16px",
    borderBottom: "1px solid #f0f0f0",
  };
  const secTitle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    color: "#bbb",
    textTransform: "uppercase" as const,
    letterSpacing: "1.5px",
    marginBottom: 10,
  };
  const selStyle: React.CSSProperties = { ...inp, cursor: "pointer" };

  const carTypes = [
    { id: "sedan", label: "승용 세단" },
    { id: "suv", label: "승용 SUV" },
    { id: "truck", label: "트럭" },
  ];
  const seasons = [
    { id: "allseason", label: "사계절" },
    { id: "winter", label: "겨울" },
    { id: "summer", label: "여름" },
  ];
  const grades = [
    { id: "economy", label: "실속형" },
    { id: "premium", label: "고급형" },
    { id: "flagship", label: "플래그십" },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #f0f0f0",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "#bbb",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          DETAIL PAGE BUILDER
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: "#111",
            marginBottom: 10,
          }}
        >
          편집 패널
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={onExport}
            disabled={exporting}
            style={{
              flex: 1,
              height: 36,
              background: exporting ? "#aaa" : B.accent,
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              cursor: exporting ? "wait" : "pointer",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Download size={12} /> {exporting ? "저장 중..." : "PNG 저장"}
          </button>
          <button
            style={{
              height: 36,
              padding: "0 12px",
              background: "#fff",
              color: "#555",
              border: "1px solid #e8e8e8",
              fontSize: 12,
              cursor: "pointer",
              borderRadius: 6,
              fontWeight: 600,
            }}
            onClick={() => {
              const blob = new Blob([JSON.stringify(content, null, 2)], {
                type: "application/json",
              });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `${content.modelName.replace(/\s/g, "_")}.json`;
              a.click();
            }}
          >
            JSON
          </button>
        </div>
      </div>

      {/* Scrollable fields */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {/* 기본 정보 */}
        <div style={sec}>
          <div style={secTitle}>기본 정보</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <label style={lbl}>브랜드명</label>
              <input
                style={inp}
                value={content.brand}
                onChange={(e) => onUpdate({ brand: e.target.value })}
              />
            </div>
            <div>
              <label style={lbl}>모델명</label>
              <input
                style={inp}
                value={content.modelName}
                onChange={(e) => onUpdate({ modelName: e.target.value })}
              />
            </div>
            <div>
              <label style={lbl}>태그라인</label>
              <input
                style={inp}
                value={content.tagline}
                onChange={(e) => onUpdate({ tagline: e.target.value })}
              />
            </div>
            <div>
              <label style={lbl}>설명</label>
              <textarea
                style={{ ...inp, minHeight: 64, resize: "vertical" as const }}
                value={content.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
              />
            </div>
            <div>
              <label style={lbl}>카테고리 배지</label>
              <input
                style={inp}
                value={content.category}
                onChange={(e) => onUpdate({ category: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* 분류 */}
        <div style={sec}>
          <div style={secTitle}>분류</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <label style={lbl}>차종</label>
              <select
                style={selStyle}
                value={content.carType}
                onChange={(e) => onUpdate({ carType: e.target.value })}
              >
                {carTypes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>계절</label>
              <select
                style={selStyle}
                value={content.season}
                onChange={(e) => onUpdate({ season: e.target.value })}
              >
                {seasons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>등급</label>
              <select
                style={selStyle}
                value={content.grade}
                onChange={(e) => onUpdate({ grade: e.target.value })}
              >
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 핵심 스펙 */}
        <div style={sec}>
          <div style={secTitle}>핵심 스펙</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {content.keySpecs.map((spec, idx) => (
              <div
                key={spec.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: 5,
                }}
              >
                <input
                  style={{ ...inp, fontSize: 11 }}
                  placeholder="항목"
                  value={spec.label}
                  onChange={(e) => {
                    const a = [...content.keySpecs];
                    a[idx] = { ...spec, label: e.target.value };
                    onUpdate({ keySpecs: a });
                  }}
                />
                <input
                  style={{ ...inp, fontSize: 11 }}
                  placeholder="값"
                  value={spec.value}
                  onChange={(e) => {
                    const a = [...content.keySpecs];
                    a[idx] = { ...spec, value: e.target.value };
                    onUpdate({ keySpecs: a });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 기능 아이콘 */}
        <div style={sec}>
          <div style={secTitle}>기능 아이콘 (2×2)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {content.featureIcons.map((feat, idx) => (
              <input
                key={feat.id}
                style={inp}
                placeholder={`아이콘 ${idx + 1} 이름`}
                value={feat.label}
                onChange={(e) => {
                  const a = [...content.featureIcons];
                  a[idx] = { ...feat, label: e.target.value };
                  onUpdate({ featureIcons: a });
                }}
              />
            ))}
          </div>
        </div>

        {/* 브랜드 가치 */}
        <div style={sec}>
          <div style={secTitle}>브랜드 가치</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {content.brandValues.map((val, idx) => (
              <div key={val.id}>
                <input
                  style={{ ...inp, marginBottom: 4, fontWeight: 700 }}
                  placeholder="제목"
                  value={val.title}
                  onChange={(e) => {
                    const a = [...content.brandValues];
                    a[idx] = { ...val, title: e.target.value };
                    onUpdate({ brandValues: a });
                  }}
                />
                <textarea
                  style={{
                    ...inp,
                    minHeight: 48,
                    resize: "vertical" as const,
                    fontSize: 11,
                  }}
                  placeholder="설명"
                  value={val.description}
                  onChange={(e) => {
                    const a = [...content.brandValues];
                    a[idx] = { ...val, description: e.target.value };
                    onUpdate({ brandValues: a });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 추천 대상 */}
        <div style={sec}>
          <div style={secTitle}>추천 대상</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <label style={lbl}>섹션 제목</label>
              <input
                style={inp}
                value={content.recommendTitle}
                onChange={(e) => onUpdate({ recommendTitle: e.target.value })}
              />
            </div>
            {content.recommendItems.map((item, idx) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: 5, alignItems: "flex-start" }}
              >
                <textarea
                  style={{
                    ...inp,
                    minHeight: 48,
                    resize: "vertical" as const,
                    flex: 1,
                  }}
                  value={item.text}
                  onChange={(e) => {
                    const a = [...content.recommendItems];
                    a[idx] = { ...item, text: e.target.value };
                    onUpdate({ recommendItems: a });
                  }}
                />
                <button
                  style={{
                    width: 26,
                    height: 26,
                    background: "transparent",
                    border: "1px solid #e8e8e8",
                    borderRadius: 4,
                    cursor: "pointer",
                    color: "#bbb",
                    fontSize: 11,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                  onClick={() =>
                    onUpdate({
                      recommendItems: content.recommendItems.filter(
                        (_, i) => i !== idx,
                      ),
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              style={{
                ...inp,
                background: "#f7f7f7",
                cursor: "pointer",
                textAlign: "center" as const,
                color: "#888",
                border: "1px dashed #ddd",
              }}
              onClick={() =>
                onUpdate({
                  recommendItems: [
                    ...content.recommendItems,
                    { id: Date.now(), text: "새 추천 항목", image: null },
                  ],
                })
              }
            >
              + 항목 추가
            </button>
          </div>
        </div>

        {/* 기술 포인트 */}
        <div style={sec}>
          <div style={secTitle}>기술 포인트</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {content.checkpoints.map((cp, idx) => (
              <div
                key={cp.id}
                style={{
                  paddingBottom: 10,
                  borderBottom:
                    idx < content.checkpoints.length - 1
                      ? "1px dashed #f0f0f0"
                      : "none",
                }}
              >
                <label style={{ ...lbl, marginBottom: 5 }}>
                  POINT {cp.number}
                </label>
                <input
                  style={{ ...inp, marginBottom: 4, fontWeight: 700 }}
                  value={cp.title}
                  onChange={(e) => {
                    const a = [...content.checkpoints];
                    a[idx] = { ...cp, title: e.target.value };
                    onUpdate({ checkpoints: a });
                  }}
                />
                <textarea
                  style={{
                    ...inp,
                    minHeight: 52,
                    resize: "vertical" as const,
                    fontSize: 11,
                  }}
                  value={cp.description}
                  onChange={(e) => {
                    const a = [...content.checkpoints];
                    a[idx] = { ...cp, description: e.target.value };
                    onUpdate({ checkpoints: a });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 사이즈 */}
        <div style={{ ...sec, paddingBottom: 28 }}>
          <div style={secTitle}>제품 사이즈 ({content.options.length}개)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {content.options.map((opt, idx) => (
              <div
                key={opt.id}
                style={{ display: "flex", gap: 5, alignItems: "center" }}
              >
                <input
                  style={{ ...inp, flex: 1, fontSize: 11 }}
                  value={opt.size}
                  onChange={(e) => {
                    const a = [...content.options];
                    a[idx] = { ...opt, size: e.target.value };
                    onUpdate({ options: a });
                  }}
                />
                <input
                  style={{ ...inp, width: 54, fontSize: 11 }}
                  value={opt.season}
                  onChange={(e) => {
                    const a = [...content.options];
                    a[idx] = { ...opt, season: e.target.value };
                    onUpdate({ options: a });
                  }}
                />
                <button
                  style={{
                    width: 26,
                    height: 26,
                    background: "transparent",
                    border: "1px solid #e8e8e8",
                    borderRadius: 4,
                    cursor: "pointer",
                    color: "#bbb",
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                  onClick={() =>
                    onUpdate({
                      options: content.options.filter((_, i) => i !== idx),
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              style={{
                ...inp,
                background: "#f7f7f7",
                cursor: "pointer",
                textAlign: "center" as const,
                color: "#888",
                border: "1px dashed #ddd",
              }}
              onClick={() =>
                onUpdate({
                  options: [
                    ...content.options,
                    { id: Date.now(), size: "새 사이즈", season: "사계절" },
                  ],
                })
              }
            >
              + 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════
export default function Page() {
  const [content, setContent] = useState(defaultContent);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const updateContent = (patch: Partial<Content>) =>
    setContent((prev) => ({ ...prev, ...patch }));

  const handleExportPNG = async () => {
    if (!previewRef.current) return;
    setExporting(true);

    // scrollWrapRef만 제약 해제 → outerRef(사이드바 포함)는 건드리지 않음
    const scroller = scrollWrapRef.current;
    const prevScrollOverflow = scroller?.style.overflowY ?? "";
    const prevScrollHeight = scroller?.style.height ?? "";
    const prevScrollPadding = scroller?.style.padding ?? "";
    const prevScrollJustify = scroller?.style.justifyContent ?? "";
    // 스크롤 위치 리셋: 스크롤된 상태에서 캡처하면 getBoundingClientRect 오프셋 발생
    if (scroller) scroller.scrollTop = 0;
    if (scroller) {
      scroller.style.overflowY = "visible";
      scroller.style.height = "auto";
      // padding·justify 제거: flex 컨테이너 offset이 캡처 위치를 밀어냄
      scroller.style.padding = "0";
      scroller.style.justifyContent = "flex-start";
    }

    try {
      const html2canvas = (await import("html2canvas")).default;
      const el = previewRef.current;
      // 폰트 로딩 완료 대기: 폰트 미로드 시 line-height·자간이 fallback 폰트 기준으로 렌더링됨
      await document.fonts.ready;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (el: Element) => el.classList.contains("export-ignore"),
      });
      const link = document.createElement("a");
      link.download = `${content.modelName.replace(/\s/g, "_")}_detail.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
      alert("PNG 익스포트 중 오류가 발생했습니다.");
    } finally {
      // scrollWrapRef만 복원
      if (scroller) {
        scroller.style.overflowY = prevScrollOverflow;
        scroller.style.height = prevScrollHeight;
        scroller.style.padding = prevScrollPadding;
        scroller.style.justifyContent = prevScrollJustify;
      }
      setExporting(false);
    }
  };

  return (
    <div
      ref={outerRef}
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#ebebeb",
        fontFamily:
          '"Pretendard", "Noto Sans KR", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 좌측 편집 패널 */}
      <div
        className="export-ignore"
        style={{
          width: 360,
          flexShrink: 0,
          background: "#fff",
          borderRight: "1px solid #e4e4e4",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SidebarPanel
          content={content}
          onUpdate={updateContent}
          onExport={handleExportPNG}
          exporting={exporting}
        />
      </div>

      {/* 우측 프리뷰 영역 */}
      <div
        ref={scrollWrapRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          ref={previewRef}
          style={{
            width: 600,
            background: "#fff",
            boxShadow: "0 2px 32px rgba(0,0,0,0.10)",
            flexShrink: 0,
          }}
        >
          <Hero content={content} onUpdate={updateContent} />
          <ProductClassification content={content} onUpdate={updateContent} />
          <KeySpecs content={content} onUpdate={updateContent} />
          <ProductSummary content={content} onUpdate={updateContent} />
          <FeatureIcons content={content} onUpdate={updateContent} />
          <Recommend content={content} onUpdate={updateContent} />
          <PerformanceSection content={content} onUpdate={updateContent} />
          <BrandValues content={content} onUpdate={updateContent} />
          <RentalProcess />
          <TechHighlights content={content} onUpdate={updateContent} />
          <Footer content={content} />
        </div>
      </div>
    </div>
  );
}
