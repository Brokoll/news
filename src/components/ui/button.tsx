"use client";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

/**
 * 블랙 앤 화이트 강조 버튼 (메인 CTA: AI 중립 리포트 읽기)
 */
export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 focus-visible:ring-[var(--foreground)] h-11 px-6 py-2",
        variant === "outline" &&
          "border border-[var(--border)] bg-transparent hover:bg-[var(--border)] h-11 px-6 py-2",
        variant === "ghost" && "hover:bg-[var(--border)] h-11 px-6 py-2",
        className
      )}
      {...props}
    />
  );
}
