import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #0B1B4D 0%, #2E5BE0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" width={100} height={100} fill="none">
          <rect x="1" y="6" width="14" height="12" rx="2" fill="rgba(255,255,255,0.95)" />
          <path d="M15 9.5L19 9.5L22 13.5V18H15V9.5Z" fill="rgba(255,255,255,0.95)" />
          <circle cx="5" cy="19" r="2" fill="#F7951D" />
          <circle cx="11" cy="19" r="2" fill="#F7951D" />
          <circle cx="19" cy="19" r="2" fill="#F7951D" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
