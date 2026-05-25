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
    { id: 1, text: "고급형 SUV 타이어를 찾고 계시는 분", image: null as string | null },
    { id: 2, text: "눈 오거나 비 오는 날에도 안정적인 타이어를 찾으시는 분", image: null as string | null },
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
    { label: "MILEAGE", value: 4 },
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
      description: "고함량 실리카 소재 컴파운드는 겨울철에도 노면과의 탄성을 유지해 안정적인 주행 성능을 보여줍니다.",
      image: null as string | null,
    },
    {
      id: 2,
      number: "02",
      title: "저소음 패턴 설계",
      description: "5개의 가변 피치와 접지 형상을 고려한 그루브 앵글 적용으로 정숙성을 향상시켜줍니다.",
      image: null as string | null,
    },
    {
      id: 3,
      number: "03",
      title: "젖은 길 제동력 강화 그루브",
      description: "4개의 넓은 그루브는 젖은 노면 주행 시 수막현상을 방지해 제동력을 강화해줍니다.",
      image: null as string | null,
    },
  ],
  options: [
    { id: 1, size: "225/45R17", season: "사계절", price: "199,000" },
    { id: 2, size: "235/55R18", season: "사계절", price: "249,000" },
    { id: 3, size: "255/50R20", season: "사계절", price: "329,000" },
  ],
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
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 4 }}>
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
              style={{ background: "rgba(220,38,38,0.9)", color: "white", border: "none", padding: "6px 8px", cursor: "pointer" }}
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
// Section Components
// ============================================
function Hero({ content, onUpdate }: { content: Content; onUpdate: (p: Partial<Content>) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpdate({ heroImage: ev.target?.result as string });
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
      <div style={{ position: "relative", width: "100%", textAlign: "center", marginTop: 4 }}>
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
          <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />

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
                  background: "linear-gradient(to top, #000 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Controls */}
              <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 4 }}>
                <button
                  onClick={() => inputRef.current?.click()}
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "white", border: "none", padding: "6px 10px", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 4, borderRadius: 4 }}
                >
                  <Upload size={12} /> 교체
                </button>
                <button
                  onClick={() => onUpdate({ heroImage: null })}
                  style={{ background: "rgba(220,38,38,0.8)", color: "white", border: "none", padding: "6px 8px", cursor: "pointer", borderRadius: 4 }}
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
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px" }}>제품 이미지 클릭하여 업로드</span>
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

      {/* CTA buttons */}
      <div style={{ position: "relative", zIndex: 4, display: "flex", gap: 12, justifyContent: "center", paddingBottom: 52, marginTop: 8 }}>
        <button
          style={{
            background: tokens.colors.primary,
            color: tokens.colors.onPrimary,
            padding: "14px 36px",
            height: 48,
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          구매하기
        </button>
        <button
          style={{
            background: "transparent",
            color: tokens.colors.onDark,
            padding: "14px 32px",
            height: 48,
            border: "1px solid rgba(255,255,255,0.25)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          자세히 보기 ›
        </button>
      </div>
    </section>
  );
}

function ProductOverview({ content, onUpdate }: { content: Content; onUpdate: (p: Partial<Content>) => void }) {
  return (
    <section style={{ background: tokens.colors.canvas, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <ImageSlot
          src={content.productImage}
          onUpload={(src) => onUpdate({ productImage: src })}
          onRemove={() => onUpdate({ productImage: null })}
          aspectRatio="1/1"
          label="제품 이미지"
        />
        <div>
          <div style={{ display: "inline-block", background: tokens.colors.surfaceDark, color: tokens.colors.onDark, padding: "6px 14px", fontSize: 12, fontWeight: 700, letterSpacing: "1px", marginBottom: 24 }}>
            {content.category}
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, color: tokens.colors.ink, margin: "0 0 16px" }}>
            {content.tagline}
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.55, color: tokens.colors.body, margin: 0 }}>
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function Recommend({ content, onUpdate }: { content: Content; onUpdate: (p: Partial<Content>) => void }) {
  return (
    <section style={{ background: tokens.colors.surfaceSoft, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.ink, textAlign: "center", margin: "0 0 16px", lineHeight: 1.2 }}>
          {content.recommendTitle}
        </h2>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: tokens.colors.surfaceDark, color: tokens.colors.onDark, padding: "8px 24px", fontSize: 13, fontWeight: 700, letterSpacing: "1px" }}>
            {content.recommendBadge}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {content.recommendItems.map((item, idx) => (
            <div key={item.id} style={{ background: tokens.colors.canvas, padding: 24 }}>
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
              <p style={{ fontSize: 16, fontWeight: 700, color: tokens.colors.ink, lineHeight: 1.4, marginTop: 16, marginBottom: 0 }}>
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
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: tokens.colors.primary, marginBottom: 12 }}>
            Specifications
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.ink, margin: 0 }}>제품 사양</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: `1px solid ${tokens.colors.hairline}`, borderLeft: `1px solid ${tokens.colors.hairline}` }}>
          {content.specs.map((spec) => (
            <div key={spec.id} style={{ padding: "32px 24px", borderRight: `1px solid ${tokens.colors.hairline}`, borderBottom: `1px solid ${tokens.colors.hairline}`, textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: tokens.colors.muted, marginBottom: 12 }}>{spec.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: tokens.colors.ink, lineHeight: 1.1, marginBottom: 8 }}>{spec.value}</div>
              <div style={{ fontSize: 13, fontWeight: 300, color: tokens.colors.body }}>{spec.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ content }: { content: Content }) {
  return (
    <section style={{ background: tokens.colors.surfaceCard, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.ink, margin: "0 0 48px", textAlign: "center" }}>주요 성능</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: tokens.colors.hairline }}>
          {content.features.map((feat) => (
            <div key={feat.id} style={{ background: tokens.colors.canvas, padding: "32px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.primary, lineHeight: 1, marginBottom: 12, letterSpacing: "0.5px" }}>{feat.value}</div>
              <div style={{ fontSize: 13, fontWeight: 300, color: tokens.colors.body, lineHeight: 1.4 }}>{feat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerformanceChart({ content }: { content: Content }) {
  const cx = 200, cy = 200, max = 5, radius = 130;
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
    content.performance.map((_, i) => { const p = getPoint(i, level); return `${p.x},${p.y}`; }).join(" ")
  );

  return (
    <section style={{ background: tokens.colors.canvas, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.ink, margin: "0 0 48px" }}>성능 한눈에 보기</h2>
        <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: 400 }}>
          {gridPolygons.map((pts, i) => <polygon key={i} points={pts} fill="none" stroke={tokens.colors.hairline} strokeWidth="1" />)}
          {content.performance.map((_, i) => { const p = getPoint(i, max); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={tokens.colors.hairline} strokeWidth="1" />; })}
          <polygon points={polygonPoints} fill={tokens.colors.primary} fillOpacity="0.15" stroke={tokens.colors.primary} strokeWidth="2" />
          {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill={tokens.colors.primary} />)}
          {content.performance.map((perf, i) => {
            const p = dataPoints[i];
            return <text key={i} x={p.labelX} y={p.labelY} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="700" letterSpacing="1.5px" fill={tokens.colors.ink}>{perf.label}</text>;
          })}
        </svg>
      </div>
    </section>
  );
}

function Checkpoints({ content, onUpdate }: { content: Content; onUpdate: (p: Partial<Content>) => void }) {
  return (
    <section style={{ background: tokens.colors.surfaceDark, color: tokens.colors.onDark, padding: "80px 48px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: tokens.colors.primary, marginBottom: 12 }}>Technology</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.onDark, margin: 0, lineHeight: 1.2 }}>향상된 타이어 기술</h2>
        </div>
        <div style={{ display: "grid", gap: 48 }}>
          {content.checkpoints.map((cp, idx) => (
            <div key={cp.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", background: tokens.colors.surfaceDarkElevated, padding: 24 }}>
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
                <div style={{ fontSize: 64, fontWeight: 700, color: tokens.colors.primary, lineHeight: 1, marginBottom: 16, letterSpacing: "-2px" }}>{cp.number}</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.onDark, lineHeight: 1.25, margin: "0 0 16px" }}>{cp.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: tokens.colors.onDarkSoft, lineHeight: 1.6, margin: 0 }}>{cp.description}</p>
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
        <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.ink, margin: "0 0 48px", textAlign: "center" }}>구매 옵션</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", borderTop: `2px solid ${tokens.colors.ink}` }}>
          <thead>
            <tr>
              {["사이즈", "계절", "가격"].map((h) => (
                <th key={h} style={{ padding: "16px", textAlign: "left", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: tokens.colors.muted, borderBottom: `1px solid ${tokens.colors.hairline}` }}>
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
                    borderLeft: selected ? `3px solid ${tokens.colors.primary}` : "3px solid transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "20px 16px", fontSize: 16, fontWeight: 700, color: selected ? tokens.colors.primary : tokens.colors.ink, borderBottom: `1px solid ${tokens.colors.hairline}` }}>
                    {opt.size}
                  </td>
                  <td style={{ padding: "20px 16px", fontSize: 14, fontWeight: 300, color: tokens.colors.body, borderBottom: `1px solid ${tokens.colors.hairline}` }}>
                    {opt.season}
                  </td>
                  <td style={{ padding: "20px 16px", fontSize: 16, fontWeight: 700, color: tokens.colors.primary, borderBottom: `1px solid ${tokens.colors.hairline}` }}>
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
    <section style={{ background: tokens.colors.surfaceDark, color: tokens.colors.onDark, padding: "80px 48px", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.onDark, margin: "0 0 16px", lineHeight: 1.2 }}>
          {content.modelName}을(를) 만나보세요
        </h2>
        <p style={{ fontSize: 16, fontWeight: 300, color: tokens.colors.onDarkSoft, margin: "0 0 32px" }}>
          지금 바로 구매하고 장착까지 한 번에
        </p>
        <button style={{ background: tokens.colors.canvas, color: tokens.colors.ink, padding: "14px 32px", height: 48, border: "none", fontSize: 14, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer" }}>
          지금 구매하기 ›
        </button>
      </div>
    </section>
  );
}

function Footer({ content }: { content: Content }) {
  return (
    <footer style={{ background: tokens.colors.surfaceSoft, padding: "48px", textAlign: "center" }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "1.5px", color: tokens.colors.ink, marginBottom: 8 }}>
        {content.brand}
      </div>
      <div style={{ fontSize: 12, fontWeight: 300, color: tokens.colors.muted }}>
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
        fontFamily: '"Pretendard", "Noto Sans KR", system-ui, -apple-system, sans-serif',
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
          fontFamily: '"Pretendard", "Noto Sans KR", system-ui, -apple-system, sans-serif',
        }}
      >
        <Hero content={content} onUpdate={updateContent} />
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
