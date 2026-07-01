"use client";

import React, { useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import { FileDown, FileText, Database, Shield } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function AdminReportsPage() {
  const clubs = useStore((state) => state.clubs);
  const projects = useStore((state) => state.projects);
  const users = useStore((state) => state.users);
  const [successMsg, setSuccessMsg] = useState("");

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccessMsg(`Downloaded ${filename} successfully!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleExportClubs = () => {
    const headers = ["ID", "Name", "President", "Charter Year", "Members", "Projects", "Points", "Zone", "Email"];
    const rows = clubs.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.president.replace(/"/g, '""')}"`,
      c.charterYear,
      c.memberCount,
      c.totalProjects,
      c.totalPoints,
      c.zone,
      c.email
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadCSV(csvContent, "District_3192_Clubs_Directory.csv");
  };

  const handleExportProjects = () => {
    const headers = ["ID", "Title", "Club Name", "Avenue of Service", "Impact Score", "Volunteer Hours", "Contributions", "Beneficiaries", "Status"];
    const rows = projects.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.clubName.replace(/"/g, '""')}"`,
      `"${p.avenueOfService.replace(/"/g, '""')}"`,
      p.impactScore,
      p.volunteerHours,
      p.contributions,
      p.beneficiaries,
      "Published"
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadCSV(csvContent, "District_3192_Projects_Telemetry.csv");
  };

  const handleExportLeaderboard = () => {
    const sorted = [...clubs].sort((a, b) => b.totalPoints - a.totalPoints);
    const headers = ["Rank", "Club ID", "Club Name", "Zone", "Total Projects", "Total Points"];
    const rows = sorted.map((c, idx) => [
      idx + 1,
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      c.zone,
      c.totalProjects,
      c.totalPoints
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadCSV(csvContent, "District_3192_Leaderboard_Audit.csv");
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in relative">
      
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg border border-emerald-500/30 bg-navy-dark/90 text-emerald-400 text-xs font-bold font-metadata shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-2 animate-slide-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {successMsg}
        </div>
      )}

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
            onClick={handleExportClubs}
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
            onClick={handleExportProjects}
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
            onClick={handleExportLeaderboard}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-metadata transition-colors flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Download CSV
          </button>
        </GlassPanel>
      </div>
    </div>
  );
}
