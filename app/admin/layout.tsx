import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel — MaxiFletes",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[--bg-soft]" style={{ fontFamily: "var(--font-body)" }}>
      {children}
    </div>
  );
}
