"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import GlassPanel from "@/components/GlassPanel";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-bold text-white tracking-tight">District Administration</h1>
        <p className="text-slate-400 text-sm font-body mt-1">
          Approve activities, manage rankings, and provision access requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Access Requests */}
        <GlassPanel className="p-0 border-slate-800/60 overflow-hidden bg-navy-dark/20">
          <div className="p-5 border-b border-slate-800/60 bg-navy-dark/60 flex items-center justify-between">
            <h2 className="font-headline text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-electric-blue" /> Pending Access Requests
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">2 Pending</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {/* Mock Request 1 */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-navy-deep/40 hover:bg-navy-dark transition-colors">
              <div>
                <h4 className="font-headline font-bold text-sm text-white">Rotaract Club of Koramangala</h4>
                <p className="text-xs text-slate-400 font-metadata mt-1">Rtr. John Smith - President</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Mock Request 2 */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-navy-deep/40 hover:bg-navy-dark transition-colors">
              <div>
                <h4 className="font-headline font-bold text-sm text-white">Rotaract Club of Whitefield</h4>
                <p className="text-xs text-slate-400 font-metadata mt-1">Rtr. Alice Wong - Secretary</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Publication Management */}
        <GlassPanel className="p-0 border-slate-800/60 overflow-hidden bg-navy-dark/20">
          <div className="p-5 border-b border-slate-800/60 bg-navy-dark/60">
            <h2 className="font-headline text-lg font-bold text-white flex items-center gap-2">
              Publication Queue
            </h2>
          </div>
          <div className="p-12 text-center flex flex-col items-center">
            <p className="text-slate-400 font-body text-sm leading-relaxed mb-4">
              All submitted activities requesting showcase feature are currently up to date.
            </p>
            <button className="px-5 py-2 rounded-lg bg-navy-deep border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors">
              View Publication History
            </button>
          </div>
        </GlassPanel>

      </div>
    </div>
  );
}
