"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glowColor?: "blue" | "cyan" | "white" | "none";
  as?: React.ElementType;
}

export default function GlassPanel({
  children,
  className,
  hoverEffect = false,
  glowColor = "none",
  as: Component = "div",
  ...props
}: GlassPanelProps) {
  const glowStyles = {
    blue: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-ocean-glow/30",
    cyan: "hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:border-electric-blue/40",
    white: "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-slate-400/30",
    none: "",
  };

  return (
    <Component
      className={cn(
        "glass-panel rounded-2xl overflow-hidden p-6",
        hoverEffect && "hover:-translate-y-1",
        glowColor !== "none" && glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
