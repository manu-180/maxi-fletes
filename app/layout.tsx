import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AppBar } from "@/components/layout/AppBar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { LocalBusinessSchema } from "@/lib/schema/LocalBusinessSchema";
import { SiteChrome } from "@/components/layout/SiteChrome";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://maxifletes.com.ar"),
  title: {
    default: "MaxiFletes — Fletes y Mudanzas en Morón | GBA Oeste",
    template: "%s | MaxiFletes Morón",
  },
  description:
    "18 años moviendo el oeste. Fletes y mudanzas en Morón, Castelar, Haedo, El Palomar y todo GBA Oeste. Pedí tu presupuesto gratis al instante.",
  keywords: ["fletes morón", "mudanzas morón", "fletes GBA oeste", "mudanzas castelar", "fletes haedo"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "MaxiFletes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-[--bg] text-[--ink]">
        <SiteChrome
          appBar={<AppBar />}
          footer={<Footer />}
          floatingActions={<FloatingActions />}
        >
          {children}
        </SiteChrome>

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
