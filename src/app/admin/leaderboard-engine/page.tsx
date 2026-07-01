"use client";

import React, { useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import { Trophy, Save, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_METRICS = [
  { id: "projects", name: "Total Projects", weight: 40, description: "Base score for each submitted and approved project." },
  { id: "hours", name: "Volunteer Hours", weight: 25, description: "Points awarded per volunteer hour." },
  { id: "beneficiaries", name: "Beneficiaries Reached", weight: 20, description: "Points scaling with number of beneficiaries." },
  { id: "innovation", name: "Innovation Bonus", weight: 15, description: "Manual bonus points awarded by District Admins." }
];

export default function LeaderboardEnginePage() {
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const totalWeight = metrics.reduce((acc, m) => acc + m.weight, 0);

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-electric-blue" />
            Leaderboard Engine
          </h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Configure the scoring algorithms and weightages that drive the public club leaderboard.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-navy-deep border border-slate-700 hover:border-slate-500 text-xs font-bold text-white transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" />
            Recalculate Scores
          </button>
          <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weightage Configurator */}
        <GlassPanel className="lg:col-span-2 p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline text-lg font-bold text-white">Scoring Weightages</h3>
              <p className="text-xs text-slate-400 font-metadata mt-1">Adjust the percentage impact of each metric.</p>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-bold font-metadata tracking-wider border",
              totalWeight === 100 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            )}>
              Total Weight: {totalWeight}%
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-2">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{metric.name}</h4>
                    <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider">{metric.description}</p>
                  </div>
                  <span className="text-lg font-headline font-bold text-electric-blue">{metric.weight}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={metric.weight}
                  onChange={(e) => {
                    const newMetrics = metrics.map(m => m.id === metric.id ? { ...m, weight: parseInt(e.target.value) } : m);
                    setMetrics(newMetrics);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-electric-blue"
                />
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Live Preview / Insights */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div>
            <h3 className="font-headline text-lg font-bold text-white">Impact Preview</h3>
            <p className="text-xs text-slate-400 font-metadata mt-1">How this affects the top 3 clubs</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-3 rounded-lg bg-navy-deep/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-ocean-glow/20 flex items-center justify-center text-ocean-glow font-bold text-xs">1</div>
                <span className="text-sm font-bold text-white line-clamp-1">Rotaract Club of Bengaluru Nava Chaitanya</span>
              </div>
              <span className="text-sm font-metadata font-bold text-electric-blue">12,450 pts</span>
            </div>
            
            <div className="p-3 rounded-lg bg-navy-deep/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">2</div>
                <span className="text-sm font-bold text-white line-clamp-1">Rotaract Club of Koramangala</span>
              </div>
              <span className="text-sm font-metadata font-bold text-electric-blue">11,200 pts</span>
            </div>

            <div className="p-3 rounded-lg bg-navy-deep/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">3</div>
                <span className="text-sm font-bold text-white line-clamp-1">Rotaract Club of Indiranagar</span>
              </div>
              <span className="text-sm font-metadata font-bold text-electric-blue">9,850 pts</span>
            </div>
          </div>
        </GlassPanel>

      </div>
    </div>
  );
}
