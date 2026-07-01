"use client";

import React from "react";
import GlassPanel from "@/components/GlassPanel";
import { Clock, CheckCircle2, XCircle, Search, Filter, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const mockActivities = [
  { id: "act_1", type: "Community Service", club: "Rotaract Club of Bengaluru", title: "Blood Donation Camp", date: "Oct 12, 2023", status: "Pending", priority: "High" },
  { id: "act_2", type: "Professional Development", club: "Rotaract Club of Koramangala", title: "Leadership Seminar", date: "Oct 10, 2023", status: "Pending", priority: "Normal" },
  { id: "act_3", type: "Club Service", club: "Rotaract Club of Indiranagar", title: "Charter Day Celebration", date: "Oct 08, 2023", status: "Approved", priority: "Normal" },
];

export default function AdminActivitiesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Activity Review</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Review and approve club activity reports before they hit the public showcase.
          </p>
        </div>
      </div>

      {/* Review Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <GlassPanel className="p-4 border-slate-800/60 bg-navy-dark/40 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Pending Review</p>
            <p className="text-2xl font-headline font-bold text-white mt-1">24</p>
          </div>
          <Clock className="w-8 h-8 text-amber-500 opacity-20" />
        </GlassPanel>
        <GlassPanel className="p-4 border-slate-800/60 bg-navy-dark/40 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Approved Today</p>
            <p className="text-2xl font-headline font-bold text-emerald-400 mt-1">12</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-20" />
        </GlassPanel>
        <GlassPanel className="p-4 border-slate-800/60 bg-navy-dark/40 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Flagged / Revisions</p>
            <p className="text-2xl font-headline font-bold text-rose-400 mt-1">3</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-rose-500 opacity-20" />
        </GlassPanel>
      </div>

      <GlassPanel className="p-0 border-slate-800/60 bg-navy-dark/40 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-800/60 bg-navy-dark/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-headline text-lg font-bold text-white">Submission Queue</h3>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-electric-blue transition-colors" />
              <input type="text" placeholder="Search activities..." className="pl-9 pr-4 py-2 rounded-lg bg-navy-deep/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:border-electric-blue/50 w-full sm:w-64 font-body" />
            </div>
            <button className="p-2 rounded-lg bg-navy-deep/80 border border-slate-700/60 hover:bg-slate-800 text-slate-400">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-slate-800/40">
          {mockActivities.map((act) => (
            <div key={act.id} className="p-5 hover:bg-slate-800/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border",
                    act.status === 'Pending' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  )}>
                    {act.status}
                  </span>
                  {act.priority === 'High' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border bg-rose-500/10 text-rose-400 border-rose-500/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Priority
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500 font-metadata">{act.date}</span>
                </div>
                <h4 className="text-lg font-bold text-white font-headline group-hover:text-electric-blue transition-colors">{act.title}</h4>
                <p className="text-xs text-slate-400 font-metadata">{act.club} • {act.type}</p>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button className="px-4 py-2 rounded-lg bg-navy-deep border border-slate-700 hover:border-slate-500 text-xs font-bold text-white transition-colors">
                  Review
                </button>
                {act.status === 'Pending' && (
                  <button className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-colors">
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
