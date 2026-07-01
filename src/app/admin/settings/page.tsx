"use client";

import React from "react";
import GlassPanel from "@/components/GlassPanel";
import { Settings, Save, Globe, Lock, Bell, Palette } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Global configuration and preferences for District 3192 ecosystem.
          </p>
        </div>
        <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Settings Navigation */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-electric-blue/10 text-electric-blue font-bold text-sm text-left transition-colors border border-electric-blue/20">
            <Globe className="w-4 h-4" />
            General Details
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 font-medium text-sm text-left transition-colors">
            <Palette className="w-4 h-4" />
            Branding
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 font-medium text-sm text-left transition-colors">
            <Lock className="w-4 h-4" />
            Security & Access
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 font-medium text-sm text-left transition-colors">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
        </div>

        {/* Settings Form */}
        <GlassPanel className="md:col-span-3 p-6 md:p-8 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-8">
          
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-lg font-bold text-white">District Information</h3>
            <p className="text-xs text-slate-400 font-metadata">Update your global district identity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">District Name</label>
              <input 
                type="text" 
                defaultValue="Rotaract District 3192" 
                className="px-4 py-2.5 rounded-lg bg-navy-deep/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all font-body"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Rotary International Year</label>
              <input 
                type="text" 
                defaultValue="2023-2024" 
                className="px-4 py-2.5 rounded-lg bg-navy-deep/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all font-body"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">District DRR</label>
              <input 
                type="text" 
                defaultValue="Rtr. Jane Doe" 
                className="px-4 py-2.5 rounded-lg bg-navy-deep/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all font-body"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Contact Email</label>
              <input 
                type="email" 
                defaultValue="admin@rotaract3192.org" 
                className="px-4 py-2.5 rounded-lg bg-navy-deep/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all font-body"
              />
            </div>
          </div>

          <div className="w-full h-px bg-slate-800/60 my-2" />

          <div className="flex flex-col gap-4">
            <h3 className="font-headline text-lg font-bold text-white">Feature Flags</h3>
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-navy-deep/40">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-white">Public Leaderboard</span>
                <span className="text-xs text-slate-400 font-metadata">Show the live district rankings on the public showcase.</span>
              </div>
              <div className="w-12 h-6 rounded-full bg-electric-blue flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-navy-deep shadow-sm transform translate-x-6 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-navy-deep/40">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-white">Maintenance Mode</span>
                <span className="text-xs text-slate-400 font-metadata">Lock out club reporting portals for scheduled upgrades.</span>
              </div>
              <div className="w-12 h-6 rounded-full bg-slate-700 flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-slate-400 shadow-sm transition-transform" />
              </div>
            </div>
          </div>

        </GlassPanel>
      </div>
    </div>
  );
}
