"use client";

import { useState } from "react";
import { WhatsappLogo, Link as LinkIcon, CheckCircle } from "@phosphor-icons/react";

interface ShareBarProps {
  title: string;
}

export function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleWhatsApp = () => {
    const url = window.location.href;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-eyebrow text-[--slate-400]">Compartir</span>

      <button
        onClick={handleWhatsApp}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#25D366] text-white text-sm font-medium transition-all duration-300 hover:bg-[#1eb85c] active:scale-[0.98]"
      >
        <WhatsappLogo size={17} weight="fill" />
        WhatsApp
      </button>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[--bg-soft] text-[--slate-600] text-sm font-medium border border-[--line] transition-all duration-300 hover:border-[--brand-300] hover:text-[--brand-600] active:scale-[0.98]"
      >
        {copied ? (
          <>
            <CheckCircle size={17} weight="fill" className="text-[--safe-500]" />
            ¡Copiado!
          </>
        ) : (
          <>
            <LinkIcon size={17} weight="light" />
            Copiar link
          </>
        )}
      </button>
    </div>
  );
}
