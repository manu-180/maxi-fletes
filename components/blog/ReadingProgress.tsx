"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-(--line)"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-(--brand-500) to-(--accent-500)"
        style={{
          width: `${progress}%`,
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
