"use client";

import React from "react";
import GlassPanel from "@/components/GlassPanel";
import { BrainCircuit, Sparkles, AlertTriangle, Fingerprint } from "lucide-react";

export default function AICommandCenterPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-electric-blue" />
            AI Command Center
          </h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Artificial Intelligence oversight for predictive analytics and automated moderation.
          </p>
        </div>
      </div>

      <div className="w-full p-1 rounded-xl bg-gradient-to-r from-electric-blue via-ocean-glow to-blue-500 p-[1px]">
        <GlassPanel className="p-8 border-none bg-navy-deep flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
          <div className="w-20 h-20 rounded-full bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20 relative">
            <BrainCircuit className="w-10 h-10 text-electric-blue animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-electric-blue/50 animate-ping opacity-20" />
          </div>
          
          <div className="flex flex-col gap-2 max-w-lg">
            <h2 className="text-2xl font-headline font-bold text-white tracking-tight">Intelligence Module Inactive</h2>
            <p className="text-sm text-slate-400 font-body leading-relaxed">
              The AI reporting engine is currently in architectural preparation. Future updates will introduce automated duplicate detection, report validation, and generative insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/20 flex flex-col items-center text-center gap-2">
              <Sparkles className="w-5 h-5 text-ocean-glow" />
              <span className="text-xs font-bold text-slate-300">Generative Captions</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/20 flex flex-col items-center text-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-bold text-slate-300">Fraud Detection</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/20 flex flex-col items-center text-center gap-2">
              <Fingerprint className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300">Impact Verification</span>
            </div>
          </div>
          
          <button className="mt-4 px-6 py-3 rounded-lg border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-wider opacity-50 cursor-not-allowed">
            Activation Pending
          </button>
        </GlassPanel>
      </div>
    </div>
  );
}
