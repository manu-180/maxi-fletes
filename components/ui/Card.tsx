import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * Doble Bisel (Doppelrand): outer shell + inner core.
 * Light mode: vidrio blanco flotante sobre fondo claro.
 * Dark mode (dark=true): glass card sobre banda oscura brand-950.
 */
export function Card({ children, className, dark = false, padding = "md" }: CardProps) {
  if (dark) {
    return (
      /* Outer shell — oscuro */
      <div className={cn("rounded-[2rem] p-1.5 border border-white/10 bg-white/5", className)}>
        {/* Inner core — glass */}
        <div
          className={cn(
            "rounded-[calc(2rem-0.375rem)]",
            "bg-white/[0.03] backdrop-blur-2xl",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]",
            paddings[padding]
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    /* Outer shell — claro */
    <div className={cn("rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5", className)}>
      {/* Inner core */}
      <div
        className={cn(
          "rounded-[calc(2rem-0.375rem)] bg-white",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
          "shadow-[0_2px_8px_rgba(12,18,34,0.04),0_16px_48px_rgba(12,18,34,0.06)]",
          paddings[padding]
        )}
      >
        {children}
      </div>
    </div>
  );
}
