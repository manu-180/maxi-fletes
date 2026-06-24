"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    /* Outer shell — double-bezel */
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.997 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5 h-full"
    >
      {/* Inner core */}
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col h-full overflow-hidden",
          "rounded-[calc(2rem-0.375rem)] bg-white",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]",
          "transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "hover:shadow-[0_20px_60px_rgba(12,18,34,0.1),0_4px_16px_rgba(12,18,34,0.06)]"
        )}
      >
        {/* Accent stripe — azul → ámbar on hover */}
        <div
          className={cn(
            "h-[3px] flex-shrink-0",
            "bg-gradient-to-r from-[--brand-500] to-[--brand-300]",
            "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover:from-[--accent-500] group-hover:to-[--accent-400]"
          )}
        />

        {/* Content */}
        <div className={cn("flex flex-col flex-1", featured ? "p-8 md:p-10" : "p-6 md:p-7")}>
          {/* Category pill */}
          <span className="inline-flex self-start rounded-full px-3 py-1 mb-4 text-[10px] font-medium uppercase tracking-[0.18em] bg-[--brand-50] text-[--brand-600] border border-[--brand-100]">
            {post.category}
          </span>

          {/* Title */}
          <h2
            className={cn(
              "font-semibold text-[--ink] leading-tight mb-3",
              "transition-colors duration-300 group-hover:text-[--brand-600]",
              featured
                ? "text-2xl md:text-3xl"
                : "text-xl"
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-[--slate-600] text-sm leading-relaxed flex-1 mb-6">
            {post.excerpt}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-4 border-t border-[--line]">
            <div className="flex items-center gap-1.5 text-xs text-[--slate-400]">
              <Clock size={13} weight="light" />
              <span>{post.readTime} min de lectura</span>
            </div>

            {/* Arrow icon — button-in-button pattern */}
            <span
              className={cn(
                "grid place-items-center w-8 h-8 rounded-full",
                "bg-[--brand-50] text-[--brand-600]",
                "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "group-hover:bg-[--brand-500] group-hover:text-white",
                "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105"
              )}
              aria-hidden
            >
              <ArrowUpRight size={14} weight="light" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
