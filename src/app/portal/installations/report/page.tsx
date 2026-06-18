"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Save, Send, UploadCloud } from "lucide-react";

export default function ReportInstallationPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
      <div>
        <Link href="/portal/installations" className="inline-flex items-center gap-2 text-xs font-metadata font-bold text-slate-500 hover:text-white uppercase mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Report Installation</h1>
      </div>

      <div className="bg-navy-dark/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
        <form className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Event Name</label>
            <input className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" placeholder="e.g. 15th Club Installation" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Venue</label>
            <input className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none [color-scheme:dark]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Start Time</label>
              <input type="time" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none [color-scheme:dark]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">End Time</label>
              <input type="time" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none [color-scheme:dark]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Participants</label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Newly Inducted Members</label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Current Club Strength</label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Total Board Members</label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-4">
            <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Board Spreadsheet Link</label>
            <input type="url" className="w-full px-4 py-3 rounded-xl bg-navy-deep/60 border border-slate-800 focus:border-electric-blue/40 text-sm text-slate-200 focus:outline-none" placeholder="https://docs.google.com/spreadsheets/..." />
          </div>

          <div className="flex flex-col gap-1.5 mt-4">
            <label className="text-[10px] uppercase font-bold text-slate-500 font-metadata">Cover & Photos</label>
            <div className="border-2 border-dashed border-slate-700/80 rounded-2xl p-8 flex flex-col items-center justify-center bg-navy-deep/30 hover:bg-navy-deep/50 transition-colors cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-electric-blue mb-2 transition-colors" />
              <p className="text-xs text-slate-300 font-bold">Upload Photos</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 p-4 rounded-xl bg-navy-deep/40 border border-slate-800">
            <input type="checkbox" id="riPortal" className="w-4 h-4 rounded border-slate-600 bg-navy-deep/60 accent-electric-blue" />
            <label htmlFor="riPortal" className="text-sm text-slate-300">Current Year President Reported In RI Portal</label>
          </div>
          
          <div className="mt-4 pt-6 border-t border-slate-800/60 flex items-center justify-end gap-4">
            <button type="button" className="px-6 py-2.5 rounded-lg text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors">
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button type="submit" className="px-8 py-2.5 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow transition-all text-sm font-bold flex items-center gap-2">
              <Send className="w-4 h-4" /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
