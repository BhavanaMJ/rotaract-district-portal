import React from "react";
import GlassPanel from "../GlassPanel";
import { cn } from "@/lib/utils";

interface AdminKPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
  glowColor?: "cyan" | "blue" | "white";
}

export default function AdminKPICard({
  title,
  value,
  icon,
  trend,
  className,
  glowColor = "cyan"
}: AdminKPICardProps) {
  return (
    <GlassPanel glowColor={glowColor} className={cn("p-5 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <p className="font-metadata text-xs font-bold text-slate-400 tracking-wider uppercase">
          {title}
        </p>
        <div className="p-2 rounded-xl bg-navy-deep/80 border border-slate-800 shadow-inner">
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <h4 className="font-headline text-3xl font-bold text-white tracking-tight">
          {value}
        </h4>
        
        {trend && (
          <div className="flex items-center gap-1.5 mt-1">
            <span 
              className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1",
                trend.isPositive !== false 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              )}
            >
              {trend.isPositive !== false ? "+" : "-"}{trend.value}%
            </span>
            <span className="text-[10px] font-metadata text-slate-500">
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
