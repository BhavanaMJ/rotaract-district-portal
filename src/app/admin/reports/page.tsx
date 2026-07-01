"use client";

import React from "react";
import GlassPanel from "@/components/GlassPanel";
import { FileDown, FileText, Database, Shield } from "lucide-react";

export default function AdminReportsPage() {
  const exportData = (type: string) => {
    alert(`Exporting ${type} as CSV/Excel...`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileDown className="w-8 h-8 text-electric-blue" />
            Report Center
          </h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Export granular database dumps, leaderboard states, and operational project lists.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* District Directory Dump */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
            <div className="p-2 rounded bg-navy-deep border border-slate-800">
              <Database className="w-5 h-5 text-electric-blue" />
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-white leading-tight">Clubs & Users Database</h3>
              <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider">Complete Directory Info</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-body leading-relaxed flex-1">
            Export a full directory of all active and inactive clubs in District 3192 including member counts, chartered years, officer list, emails, and points.
          </p>
          <button 
            onClick={() => exportData("Clubs & Users Directory")}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-metadata transition-colors flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Download CSV
          </button>
        </GlassPanel>

        {/* Project Telemetry Dump */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
            <div className="p-2 rounded bg-navy-deep border border-slate-800">
              <FileText className="w-5 h-5 text-ocean-glow" />
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-white leading-tight">Project Submissions</h3>
              <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider">Impact & Volunteer Hours</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-body leading-relaxed flex-1">
            Export a compilation of all submitted projects across the district. Contains beneficiary counts, volunteer hours, contributions, avenues of service, and descriptions.
          </p>
          <button 
            onClick={() => exportData("Project Submissions")}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-metadata transition-colors flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Download CSV
          </button>
        </GlassPanel>

        {/* Leaderboard Config Backup */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
            <div className="p-2 rounded bg-navy-deep border border-slate-800">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-white leading-tight">Leaderboard History</h3>
              <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider">Points Telemetry</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-body leading-relaxed flex-1">
            Download the point logs, historical standings, and weight config changes for audits.
          </p>
          <button 
            onClick={() => exportData("Leaderboard Standings")}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-metadata transition-colors flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Download CSV
          </button>
        </GlassPanel>
      </div>
    </div>
  );
}
