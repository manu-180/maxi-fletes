"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const variants: Record<ButtonVariant, string> = {
  // CTA principal — ámbar sólido, sombra tintada, sin borde
  primary:
    "bg-(--accent-500) text-(--ink) shadow-[var(--shadow-amber)] hover:brightness-[1.04] hover:-translate-y-px",
  // Secundario — superficie blanca flotante (no un outline barato pegado al texto)
  secondary:
    "bg-white text-(--ink) ring-1 ring-black/10 shadow-[var(--shadow-md)] hover:ring-(--brand-300) hover:shadow-[var(--shadow-lg)] hover:-translate-y-px",
  // Terciario — texto con halo suave
  ghost: "bg-transparent text-(--brand-600) hover:bg-(--brand-50)",
};

const sizes: Record<ButtonSize, string> = {
  sm: "pl-5 pr-2 py-2 text-sm gap-2.5",
  md: "pl-7 pr-2.5 py-3 text-[0.95rem] gap-3",
  lg: "pl-8 pr-3 py-4 text-[1.05rem] gap-3.5",
};

// Padding simétrico cuando NO hay ícono (texto centrado, respira)
const sizesNoIcon: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-[0.95rem]",
  lg: "px-9 py-4 text-[1.05rem]",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  className,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em]",
    "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    icon ? sizes[size] : sizesNoIcon[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {/* Button-in-button: ícono anidado en su propio círculo con tensión cinética */}
      {icon && (
        <span
          className={cn(
            "grid place-items-center rounded-full shrink-0",
            "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105",
            iconSizes[size],
            variant === "primary" ? "bg-(--ink)/12 text-(--ink)" : "bg-(--brand-50) text-(--brand-600)"
          )}
          aria-hidden
        >
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
