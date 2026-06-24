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
  primary: "bg-[--accent-500] text-[--ink] hover:bg-[--accent-600]",
  secondary: "bg-transparent border border-[--brand-500] text-[--brand-600] hover:bg-[--brand-50]",
  ghost: "bg-transparent text-[--brand-600] hover:bg-[--brand-50]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-3",
  lg: "px-8 py-4 text-lg gap-3",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-9 w-9",
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
    "group inline-flex items-center rounded-full font-semibold",
    "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {/* Button-in-button: ícono anidado en su propio círculo */}
      {icon && (
        <span
          className={cn(
            "grid place-items-center rounded-full",
            "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105",
            iconSizes[size],
            variant === "primary" ? "bg-black/10" : "bg-[--brand-50]"
          )}
          aria-hidden
        >
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
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
