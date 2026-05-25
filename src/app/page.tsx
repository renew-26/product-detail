"use client";

import { useState, useRef } from "react";
import { Download, Upload, Trash2, Image as ImageIcon } from "lucide-react";

// ============================================
// Design Tokens
// ============================================
const tokens = {
  colors: {
    canvas: "#ffffff",
    surfaceSoft: "#f7f7f7",
    surfaceCard: "#fafafa",
    surfaceStrong: "#ebebeb",
    surfaceDark: "#1a2129",
    surfaceDarkElevated: "#262e38",
    hairline: "#e6e6e6",
    hairlineStrong: "#cccccc",
    ink: "#262626",
    body: "#3c3c3c",
    muted: "#6b6b6b",
    primary: "#1c69d4",
    primaryActive: "#0653b6",
    onPrimary: "#ffffff",
    onDark: "#ffffff",
    onDarkSoft: "#bbbbbb",
  },
};

// ============================================
// Default content
// ============================================
const defaultContent = {
  brand: "KUMHO TIRE",
  modelName: "크루젠 HP71",
  tagline: "고성능 컴포트 SUV 타이어",
  description:
    "차량 타입별 최적화된 프리미엄 성능과 디자인, 첨단 기술이 집약된 주행 안정성과 저소음 컴포트 성능",
  category: "SUV",
  heroImage: "/temp_img.webp" as string | null,
  productImage: null as string | null,
  recommendTitle: "이런 분들에게 추천드립니다",
  recommendBadge: "크루젠 HP71",
  recommendItems: [
    {
      id: 1,
      text: "고급형 SUV 타이어를 찾고 계시는 분",
      image: null as string | null,
    },
    {
      id: 2,
      text: "눈 오거나 비 오는 날에도 안정적인 타이어를 찾으시는 분",
      image: null as string | null,
    },
  ],
  specs: [
    { id: 1, label: "차량 타입", value: "컴포트", sub: "그랜드 투어링" },
    { id: 2, label: "상품 등급", value: "고급형", sub: "프리미엄 라인" },
    { id: 3, label: "계절성", value: "사계절", sub: "4-Season" },
  ],
  features: [
    { id: 1, value: "M+S", label: "모든 노면 주행" },
    { id: 2, value: "4-CH", label: "수막 현상 방지" },
    { id: 3, value: "5VP", label: "저소음 패턴" },
    { id: 4, value: "WET", label: "젖은 길 제동력" },
  ],
  performance: [
    { label: "MILEAGE", value: 1 },
    { label: "HANDLING", value: 4 },
    { label: "BRAKING", value: 5 },
    { label: "COMFORT", value: 5 },
    { label: "QUIETNESS", value: 5 },
  ],
  checkpoints: [
    {
      id: 1,
      number: "01",
      title: "언제든 안전한 컴파운드 소재",
      description:
        "고함량 실리카 소재 컴파운드는 겨울철에도 노면과의 탄성을 유지해 안정적인 주행 성능을 보여줍니다.",
      image: null as string | null,
    },
    {
      id: 2,
      number: "02",
      title: "저소음 패턴 설계",
      description:
        "5개의 가변 피치와 접지 형상을 고려한 그루브 앵글 적용으로 정숙성을 향상시켜줍니다.",
      image: null as string | null,
    },
    {
      id: 3,
      number: "03",
      title: "젖은 길 제동력 강화 그루브",
      description:
        "4개의 넓은 그루브는 젖은 노면 주행 시 수막현상을 방지해 제동력을 강화해줍니다.",
      image: null as string | null,
    },
  ],
  options: [
    { id: 1, size: "225/45R17", season: "사계절", price: "199,000" },
    { id: 2, size: "235/55R18", season: "사계절", price: "249,000" },
    { id: 3, size: "255/50R20", season: "사계절", price: "329,000" },
  ],
  carType: "suv" as string,
  season: "allseason" as string,
  grade: "premium" as string,
};

type Content = typeof defaultContent;

// ============================================
// Image Upload Slot
// ============================================
function ImageSlot({
  src,
  onUpload,
  onRemove,
  aspectRatio = "16/9",
  label = "이미지 업로드",
}: {
  src: string | null;
  onUpload: (src: string) => void;
  onRemove: () => void;
  aspectRatio?: string;
  label?: string;
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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        background: tokens.colors.surfaceCard,
        border: `1px dashed ${tokens.colors.hairlineStrong}`,
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
          <div
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
                background: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                padding: "6px 8px",
                cursor: "pointer",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Upload size={12} />
              교체
            </button>
            <button
              onClick={onRemove}
              style={{
                background: "rgba(220,38,38,0.9)",
                color: "white",
                border: "none",
                padding: "6px 8px",
                cursor: "pointer",
              }}
            >
              <Trash2 size={12} />
            </button>
          </div>
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
            color: tokens.colors.muted,
            gap: 8,
          }}
        >
          <ImageIcon size={28} />
          <span style={{ fontSize: 12 }}>{label}</span>
        </button>
      )}
    </div>
  );
}

// ============================================
// Classification Icons
// ============================================
function IconSedan({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#b8b8b8";
  return (
    <svg viewBox="0 0 52 24" width="36" height="17" fill={c}>
      <path d="M3,18 L3,14 L10,14 L16,8 L34,8 L41,14 L49,14 L49,18 Q49,22 45,22 Q41,22 41,18 L11,18 Q11,22 7,22 Q3,22 3,18Z" />
    </svg>
  );
}

function IconSuv({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#b8b8b8";
  return (
    <svg viewBox="0 0 52 28" width="36" height="19" fill={c}>
      <path d="M3,22 L3,10 L10,4 L40,4 L48,10 L48,22 Q48,26 44,26 Q40,26 40,22 L12,22 Q12,26 8,26 Q3,26 3,22Z" />
    </svg>
  );
}

function IconTruck({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#b8b8b8";
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
  const c = active ? "#fff" : "#b8b8b8";
  return (
    <svg viewBox="0 0 36 36" width="30" height="30" fill="none">
      {/* Sun (bottom-left) */}
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
      {/* Snowflake (top-right) */}
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
  const c = active ? "#fff" : "#b8b8b8";
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
      <line x1="6" y1="11" x2="9" y2="14" />
      <line x1="6" y1="17" x2="9" y2="14" />
      <line x1="22" y1="11" x2="19" y2="14" />
      <line x1="22" y1="17" x2="19" y2="14" />
    </svg>
  );
}

function IconSummer({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#b8b8b8";
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
  const c = active ? "#fff" : "#b8b8b8";
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
      <circle cx="14" cy="14" r="11" stroke={c} strokeWidth="2" />
      <circle cx="14" cy="14" r="6" fill={c} />
    </svg>
  );
}

function IconGradePremium({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#b8b8b8";
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill={c}>
      <path d="M14,3 L17,10 L25,10 L19,15 L21,22 L14,18 L7,22 L9,15 L3,10 L11,10 Z" />
    </svg>
  );
}

function IconGradeFlagship({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#b8b8b8";
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill={c}>
      <path d="M4,22 L6,12 L10,16 L14,6 L18,16 L22,12 L24,22 Z" />
      <rect x="4" y="23" width="20" height="3" rx="1" />
    </svg>
  );
}

// ============================================
// ProductClassification
// ============================================
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

  const SectionTitle = ({ title, sub }: { title: string; sub: string }) => (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <h3
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: tokens.colors.ink,
          margin: "0 0 2px",
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "2.5px",
          color: tokens.colors.muted,
          textTransform: "uppercase",
        }}
      >
        {sub}
      </div>
      <div
        style={{
          width: 32,
          height: 2,
          background: tokens.colors.hairlineStrong,
          margin: "10px auto 0",
        }}
      />
    </div>
  );

  const OptionRow = ({
    items,
    activeId,
    onSelect,
  }: {
    items: {
      id: string;
      label: string;
      Icon: React.ComponentType<{ active: boolean }>;
    }[];
    activeId: string;
    onSelect: (id: string) => void;
  }) => (
    <div
      style={{
        border: `2px solid ${tokens.colors.primary}`,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
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
              padding: "24px 12px 20px",
              cursor: "pointer",
              borderRight:
                idx < items.length - 1
                  ? `1px solid ${tokens.colors.hairline}`
                  : "none",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: active ? tokens.colors.primary : "transparent",
                border: active
                  ? "none"
                  : `2px solid ${tokens.colors.hairlineStrong}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <item.Icon active={active} />
            </div>
            <span
              style={{
                fontSize: 15,
                fontWeight: active ? 700 : 400,
                color: active ? tokens.colors.ink : tokens.colors.muted,
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section style={{ background: tokens.colors.canvas, padding: "64px 48px" }}>
      <div
        style={{ maxWidth: 600, margin: "0 auto", display: "grid", gap: 48 }}
      >
        <div>
          <SectionTitle title="차종" sub="CAR TYPE" />
          <OptionRow
            items={carTypes}
            activeId={content.carType}
            onSelect={(id) => onUpdate({ carType: id })}
          />
        </div>
        <div>
          <SectionTitle title="계절" sub="SEASON" />
          <OptionRow
            items={seasons}
            activeId={content.season}
            onSelect={(id) => onUpdate({ season: id })}
          />
        </div>
        <div>
          <SectionTitle title="상품 등급" sub="GRADE" />
          <OptionRow
            items={grades}
            activeId={content.grade}
            onSelect={(id) => onUpdate({ grade: id })}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// Section Components
// ============================================
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
        background: "#000000",
        color: tokens.colors.onDark,
        overflow: "hidden",
        minHeight: 640,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Brand label */}
      <div
        style={{
          marginTop: 56,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
        }}
      >
        {content.brand}
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 10,
          fontSize: 20,
          fontWeight: 300,
          color: "rgba(255,255,255,0.6)",
          textAlign: "center",
          letterSpacing: "0.3px",
        }}
      >
        {content.tagline}
      </div>

      {/* Model name — large, behind the product image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "center",
          marginTop: 4,
        }}
      >
        <h1
          style={{
            fontSize: 88,
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-2px",
            color: "#ffffff",
            userSelect: "none",
          }}
        >
          {content.modelName}
        </h1>

        {/* Product image — floats over the title text */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 60,
            marginBottom: 60,
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
                  maxWidth: 520,
                  width: "100%",
                  maxHeight: 380,
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                  filter: "drop-shadow(0 24px 64px rgba(0,0,0,0.7))",
                }}
              />
              {/* Ground reflection fade */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  background:
                    "linear-gradient(to top, #000 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Controls */}
              <div
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
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    color: "white",
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
                  <Upload size={12} /> 교체
                </button>
                <button
                  onClick={() => onUpdate({ heroImage: null })}
                  style={{
                    background: "rgba(220,38,38,0.8)",
                    color: "white",
                    border: "none",
                    padding: "6px 8px",
                    cursor: "pointer",
                    borderRadius: 4,
                  }}
                >
                  <Trash2 size={12} />
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
                width: 320,
                height: 240,
                border: "1px dashed rgba(255,255,255,0.15)",
                margin: "16px auto 0",
              }}
            >
              <ImageIcon size={36} color="rgba(255,255,255,0.2)" />
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.5px",
                }}
              >
                제품 이미지 클릭하여 업로드
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade to black */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to top, #000 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}

function ProductOverview({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section style={{ background: tokens.colors.canvas, padding: "80px 48px" }}>
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
          label="제품 이미지"
        />
        <div>
          <div
            style={{
              display: "inline-block",
              background: tokens.colors.surfaceDark,
              color: tokens.colors.onDark,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "1px",
              marginBottom: 24,
            }}
          >
            {content.category}
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.15,
              color: tokens.colors.ink,
              margin: "0 0 16px",
            }}
          >
            {content.tagline}
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.55,
              color: tokens.colors.body,
              margin: 0,
            }}
          >
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function Recommend({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section
      style={{ background: tokens.colors.surfaceSoft, padding: "80px 48px" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: tokens.colors.ink,
            textAlign: "center",
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          {content.recommendTitle}
        </h2>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              background: tokens.colors.surfaceDark,
              color: tokens.colors.onDark,
              padding: "8px 24px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            {content.recommendBadge}
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {content.recommendItems.map((item, idx) => (
            <div
              key={item.id}
              style={{ background: tokens.colors.canvas, padding: 24 }}
            >
              <ImageSlot
                src={item.image}
                onUpload={(src) => {
                  const items = [...content.recommendItems];
                  items[idx] = { ...item, image: src };
                  onUpdate({ recommendItems: items });
                }}
                onRemove={() => {
                  const items = [...content.recommendItems];
                  items[idx] = { ...item, image: null };
                  onUpdate({ recommendItems: items });
                }}
                aspectRatio="1/1"
                label="아이콘 이미지"
              />
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: tokens.colors.ink,
                  lineHeight: 1.4,
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecGrid({ content }: { content: Content }) {
  return (
    <section style={{ background: tokens.colors.canvas, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: tokens.colors.primary,
              marginBottom: 12,
            }}
          >
            Specifications
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: tokens.colors.ink,
              margin: 0,
            }}
          >
            제품 사양
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: `1px solid ${tokens.colors.hairline}`,
            borderLeft: `1px solid ${tokens.colors.hairline}`,
          }}
        >
          {content.specs.map((spec) => (
            <div
              key={spec.id}
              style={{
                padding: "32px 24px",
                borderRight: `1px solid ${tokens.colors.hairline}`,
                borderBottom: `1px solid ${tokens.colors.hairline}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: tokens.colors.muted,
                  marginBottom: 12,
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: tokens.colors.ink,
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                {spec.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: tokens.colors.body,
                }}
              >
                {spec.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ content }: { content: Content }) {
  return (
    <section
      style={{ background: tokens.colors.surfaceCard, padding: "80px 48px" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: tokens.colors.ink,
            margin: "0 0 48px",
            textAlign: "center",
          }}
        >
          주요 성능
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: tokens.colors.hairline,
          }}
        >
          {content.features.map((feat) => (
            <div
              key={feat.id}
              style={{
                background: tokens.colors.canvas,
                padding: "32px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: tokens.colors.primary,
                  lineHeight: 1,
                  marginBottom: 12,
                  letterSpacing: "0.5px",
                }}
              >
                {feat.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: tokens.colors.body,
                  lineHeight: 1.4,
                }}
              >
                {feat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerformanceChart({ content }: { content: Content }) {
  const cx = 200,
    cy = 200,
    max = 5,
    radius = 130;
  const count = content.performance.length;

  const getPoint = (idx: number, value: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      labelX: cx + Math.cos(angle) * (radius + 30),
      labelY: cy + Math.sin(angle) * (radius + 30),
    };
  };

  const dataPoints = content.performance.map((p, i) => getPoint(i, p.value));
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const gridPolygons = [1, 2, 3, 4, 5].map((level) =>
    content.performance
      .map((_, i) => {
        const p = getPoint(i, level);
        return `${p.x},${p.y}`;
      })
      .join(" "),
  );

  return (
    <section style={{ background: tokens.colors.canvas, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: tokens.colors.ink,
            margin: "0 0 48px",
          }}
        >
          성능 한눈에 보기
        </h2>
        <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: 400 }}>
          {gridPolygons.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke={tokens.colors.hairline}
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
                stroke={tokens.colors.hairline}
                strokeWidth="1"
              />
            );
          })}
          <polygon
            points={polygonPoints}
            fill={tokens.colors.primary}
            fillOpacity="0.15"
            stroke={tokens.colors.primary}
            strokeWidth="2"
          />
          {dataPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={tokens.colors.primary}
            />
          ))}
          {content.performance.map((perf, i) => {
            const p = dataPoints[i];
            return (
              <text
                key={i}
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="700"
                letterSpacing="1.5px"
                fill={tokens.colors.ink}
              >
                {perf.label}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function Checkpoints({
  content,
  onUpdate,
}: {
  content: Content;
  onUpdate: (p: Partial<Content>) => void;
}) {
  return (
    <section
      style={{
        background: tokens.colors.surfaceDark,
        color: tokens.colors.onDark,
        padding: "80px 48px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: tokens.colors.primary,
              marginBottom: 12,
            }}
          >
            Technology
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: tokens.colors.onDark,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            향상된 타이어 기술
          </h2>
        </div>
        <div style={{ display: "grid", gap: 48 }}>
          {content.checkpoints.map((cp, idx) => (
            <div
              key={cp.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                alignItems: "center",
                background: tokens.colors.surfaceDarkElevated,
                padding: 24,
              }}
            >
              <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
                <ImageSlot
                  src={cp.image}
                  onUpload={(src) => {
                    const arr = [...content.checkpoints];
                    arr[idx] = { ...cp, image: src };
                    onUpdate({ checkpoints: arr });
                  }}
                  onRemove={() => {
                    const arr = [...content.checkpoints];
                    arr[idx] = { ...cp, image: null };
                    onUpdate({ checkpoints: arr });
                  }}
                  aspectRatio="4/3"
                  label="포인트 이미지"
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: 700,
                    color: tokens.colors.primary,
                    lineHeight: 1,
                    marginBottom: 16,
                    letterSpacing: "-2px",
                  }}
                >
                  {cp.number}
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: tokens.colors.onDark,
                    lineHeight: 1.25,
                    margin: "0 0 16px",
                  }}
                >
                  {cp.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: tokens.colors.onDarkSoft,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {cp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OptionTable({
  content,
  selectedId,
  onSelect,
}: {
  content: Content;
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <section style={{ background: tokens.colors.canvas, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: tokens.colors.ink,
            margin: "0 0 48px",
            textAlign: "center",
          }}
        >
          구매 옵션
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderTop: `2px solid ${tokens.colors.ink}`,
          }}
        >
          <thead>
            <tr>
              {["사이즈", "계절", "가격"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: tokens.colors.muted,
                    borderBottom: `1px solid ${tokens.colors.hairline}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.options.map((opt) => {
              const selected = opt.id === selectedId;
              return (
                <tr
                  key={opt.id}
                  onClick={() => onSelect(opt.id)}
                  style={{
                    cursor: "pointer",
                    background: selected ? "#e8f0fb" : "transparent",
                    borderLeft: selected
                      ? `3px solid ${tokens.colors.primary}`
                      : "3px solid transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <td
                    style={{
                      padding: "20px 16px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: selected
                        ? tokens.colors.primary
                        : tokens.colors.ink,
                      borderBottom: `1px solid ${tokens.colors.hairline}`,
                    }}
                  >
                    {opt.size}
                  </td>
                  <td
                    style={{
                      padding: "20px 16px",
                      fontSize: 14,
                      fontWeight: 300,
                      color: tokens.colors.body,
                      borderBottom: `1px solid ${tokens.colors.hairline}`,
                    }}
                  >
                    {opt.season}
                  </td>
                  <td
                    style={{
                      padding: "20px 16px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: tokens.colors.primary,
                      borderBottom: `1px solid ${tokens.colors.hairline}`,
                    }}
                  >
                    ₩ {opt.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CTA({ content }: { content: Content }) {
  return (
    <section
      style={{
        background: tokens.colors.surfaceDark,
        color: tokens.colors.onDark,
        padding: "80px 48px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: tokens.colors.onDark,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          {content.modelName}을(를) 만나보세요
        </h2>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            color: tokens.colors.onDarkSoft,
            margin: "0 0 32px",
          }}
        >
          지금 바로 구매하고 장착까지 한 번에
        </p>
        <button
          style={{
            background: tokens.colors.canvas,
            color: tokens.colors.ink,
            padding: "14px 32px",
            height: 48,
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          지금 구매하기 ›
        </button>
      </div>
    </section>
  );
}

function Footer({ content }: { content: Content }) {
  return (
    <footer
      style={{
        background: tokens.colors.surfaceSoft,
        padding: "48px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: tokens.colors.ink,
          marginBottom: 8,
        }}
      >
        {content.brand}
      </div>
      <div
        style={{ fontSize: 12, fontWeight: 300, color: tokens.colors.muted }}
      >
        © 2026 {content.brand}. All rights reserved.
      </div>
    </footer>
  );
}

// ============================================
// Main Page
// ============================================
export default function Page() {
  const [content, setContent] = useState(defaultContent);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateContent = (patch: Partial<Content>) =>
    setContent((prev) => ({ ...prev, ...patch }));

  const handleExportPNG = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${content.modelName.replace(/\s/g, "_")}_detail.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
      alert("PNG 익스포트 중 오류가 발생했습니다.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.colors.surfaceStrong,
        fontFamily:
          '"Pretendard", "Noto Sans KR", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Floating export button */}
      <button
        onClick={handleExportPNG}
        disabled={exporting}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 50,
          background: exporting ? tokens.colors.muted : tokens.colors.primary,
          color: tokens.colors.onPrimary,
          border: "none",
          padding: "12px 20px",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.5px",
          cursor: exporting ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          transition: "background 0.15s",
        }}
      >
        <Download size={15} />
        {exporting ? "저장 중..." : "PNG 저장"}
      </button>

      {/* Detail page */}
      <div
        ref={previewRef}
        style={{
          background: tokens.colors.canvas,
          fontFamily:
            '"Pretendard", "Noto Sans KR", system-ui, -apple-system, sans-serif',
        }}
      >
        <Hero content={content} onUpdate={updateContent} />
        <ProductClassification content={content} onUpdate={updateContent} />
        <ProductOverview content={content} onUpdate={updateContent} />
        <Recommend content={content} onUpdate={updateContent} />
        <SpecGrid content={content} />
        <Features content={content} />
        <PerformanceChart content={content} />
        <Checkpoints content={content} onUpdate={updateContent} />
        <OptionTable
          content={content}
          selectedId={selectedOptionId}
          onSelect={setSelectedOptionId}
        />
        <CTA content={content} />
        <Footer content={content} />
      </div>
    </div>
  );
}
