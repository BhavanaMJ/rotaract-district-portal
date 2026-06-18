"use client";

import React from "react";
import Link from "next/link";
import { Plus, Tent } from "lucide-react";
import GlassPanel from "@/components/GlassPanel";

export default function InstallationsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Installations</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Manage your club's board installations and inductions.
          </p>
        </div>
        <Link
          href="/portal/installations/report"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-electric-blue text-navy-deep font-bold text-xs uppercase tracking-wider hover:bg-ocean-glow hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Report Installation
        </Link>
      </div>

      <GlassPanel className="p-16 text-center flex flex-col items-center justify-center border-slate-800/40 bg-navy-dark/20 min-h-[400px]">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/45 border border-slate-700/50 flex items-center justify-center text-slate-500 mb-4">
          <Tent className="w-8 h-8" />
        </div>
        <h3 className="font-headline text-xl font-bold text-white mb-2">No Installations Reported</h3>
        <p className="text-slate-400 font-body text-sm max-w-sm mb-6 leading-relaxed">
          Submit your club's installation report for the current Rotaract year.
        </p>
      </GlassPanel>
    </div>
  );
}
