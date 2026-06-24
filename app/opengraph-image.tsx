import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MaxiFletes — Fletes y Mudanzas en Morón y GBA Oeste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "linear-gradient(135deg, #0B1B4D 0%, #1a2f6b 60%, #0f2255 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Amber glow background */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,149,29,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Left content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 60px 60px 80px",
            gap: 20,
            zIndex: 2,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(247,149,29,0.15)",
              border: "1px solid rgba(247,149,29,0.35)",
              borderRadius: 100,
              padding: "6px 16px",
              width: "fit-content",
            }}
          >
            <span style={{ color: "#F7951D", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" }}>
              📍 MORÓN · GBA OESTE
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Fletes y
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              mudanzas
            </span>
            <span
              style={{
                color: "#F7951D",
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              en Morón
            </span>
          </div>

          {/* Subline */}
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 22,
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: 440,
            }}
          >
            18 años moviendo el oeste. Presupuesto gratis al instante.
          </p>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {["⭐ 4.8 en reseñas", "🛡️ Seguro incluido", "⚡ Respuesta inmediata"].map((badge) => (
              <div
                key={badge}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  padding: "8px 14px",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 14,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Right truck icon area */}
        <div
          style={{
            width: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 60,
            zIndex: 2,
          }}
        >
          {/* Truck SVG */}
          <svg
            viewBox="0 0 200 140"
            width={280}
            height={196}
            fill="none"
            style={{ opacity: 0.9 }}
          >
            {/* Truck body */}
            <rect x="4" y="30" width="120" height="80" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(247,149,29,0.7)" strokeWidth="3" />
            {/* Truck cab */}
            <path d="M124 58 L160 58 L184 90 L184 110 L124 110 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(247,149,29,0.7)" strokeWidth="3" />
            {/* Windshield */}
            <path d="M130 63 L158 63 L172 85 L130 85 Z" fill="rgba(247,149,29,0.15)" stroke="rgba(247,149,29,0.5)" strokeWidth="2" />
            {/* Wheels */}
            <circle cx="36" cy="114" r="16" fill="#0B1B4D" stroke="rgba(247,149,29,0.8)" strokeWidth="3" />
            <circle cx="36" cy="114" r="8" fill="rgba(247,149,29,0.3)" stroke="rgba(247,149,29,0.6)" strokeWidth="2" />
            <circle cx="96" cy="114" r="16" fill="#0B1B4D" stroke="rgba(247,149,29,0.8)" strokeWidth="3" />
            <circle cx="96" cy="114" r="8" fill="rgba(247,149,29,0.3)" stroke="rgba(247,149,29,0.6)" strokeWidth="2" />
            <circle cx="162" cy="114" r="16" fill="#0B1B4D" stroke="rgba(247,149,29,0.8)" strokeWidth="3" />
            <circle cx="162" cy="114" r="8" fill="rgba(247,149,29,0.3)" stroke="rgba(247,149,29,0.6)" strokeWidth="2" />
            {/* Divider line on body */}
            <line x1="4" y1="68" x2="124" y2="68" stroke="rgba(247,149,29,0.3)" strokeWidth="1.5" />
            {/* Motion lines */}
            <line x1="0" y1="74" x2="30" y2="74" stroke="rgba(247,149,29,0.4)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="0" y1="82" x2="20" y2="82" stroke="rgba(247,149,29,0.25)" strokeWidth="2" strokeDasharray="4 5" />
            <line x1="0" y1="90" x2="35" y2="90" stroke="rgba(247,149,29,0.2)" strokeWidth="1.5" strokeDasharray="5 4" />
          </svg>
        </div>

        {/* Bottom brand bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #2E5BE0 0%, #F7951D 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
