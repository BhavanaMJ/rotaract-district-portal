"use client";

import React, { useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import { ClipboardList, Terminal, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLog {
  id: string;
  user: string;
  action: string;
  ip: string;
  timestamp: string;
  severity: "Info" | "Warning" | "Critical";
}

const mockLogs: AuditLog[] = [
  { id: "log_1", user: "Bhavana MJ (Super Admin)", action: "Updated leaderboard weight configuration", ip: "192.168.1.42", timestamp: "2026-07-01 12:45 PM", severity: "Warning" },
  { id: "log_2", user: "Bhavana MJ (Super Admin)", action: "Approved access request for Rtr. Jane Doe", ip: "192.168.1.42", timestamp: "2026-07-01 11:20 AM", severity: "Info" },
  { id: "log_3", user: "System Engine", action: "Automatic database cache compaction completed", ip: "localhost", timestamp: "2026-07-01 04:00 AM", severity: "Info" },
  { id: "log_4", user: "System Engine", action: "Failed admin login attempt from unregistered IP", ip: "103.45.12.98", timestamp: "2026-06-30 08:15 PM", severity: "Critical" },
];

export default function AdminAuditLogsPage() {
  const [logs] = useState<AuditLog[]>(mockLogs);

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-electric-blue" />
            Audit Logs
          </h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Real-time security telemetry and administrative activity logs.
          </p>
        </div>
      </div>

      <GlassPanel className="p-0 border-slate-800/60 bg-navy-dark/40 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-800/60 bg-navy-dark/60">
          <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-electric-blue" />
            District Telemetry Console
          </h3>
        </div>

        <div className="flex flex-col divide-y divide-slate-800/40 font-mono text-[11px] leading-relaxed">
          {logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-800/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className={cn(
                  "font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[9px] border self-start sm:self-auto",
                  log.severity === "Info" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  log.severity === "Warning" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                  "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                )}>
                  {log.severity}
                </span>
                
                <div className="flex flex-col">
                  <span className="text-slate-300 font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    {log.user}
                  </span>
                  <span className="text-slate-400 mt-0.5">{log.action}</span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end text-slate-500 text-[10px] font-metadata">
                <span>{log.timestamp}</span>
                <span className="mt-0.5">IP: {log.ip}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
