"use client";

import React from "react";
import { Bell, Lock, PaintBucket } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 text-sm font-body mt-1">
          Manage your account preferences and notification settings.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Account Settings */}
        <section className="bg-navy-dark/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60">
            <div className="p-2 rounded-lg bg-navy-deep border border-slate-700/60">
              <Lock className="w-4 h-4 text-electric-blue" />
            </div>
            <h2 className="font-headline text-xl font-bold text-white">Account & Security</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Change Password</p>
                <p className="text-xs text-slate-400 mt-1">Update your account password securely.</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors">
                Update
              </button>
            </div>
            <div className="h-px w-full bg-slate-800/60" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                <p className="text-xs text-slate-400 mt-1">Add an extra layer of security.</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-navy-dark/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60">
            <div className="p-2 rounded-lg bg-navy-deep border border-slate-700/60">
              <Bell className="w-4 h-4 text-ocean-glow" />
            </div>
            <h2 className="font-headline text-xl font-bold text-white">Notifications</h2>
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-bold text-white">Email Digests</p>
                <p className="text-xs text-slate-400 mt-1">Receive weekly summaries of district activities.</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-navy-deep/60 accent-electric-blue" defaultChecked />
            </label>
            <div className="h-px w-full bg-slate-800/60" />
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-bold text-white">Approval Alerts</p>
                <p className="text-xs text-slate-400 mt-1">Get notified when your reports are approved or featured.</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-navy-deep/60 accent-electric-blue" defaultChecked />
            </label>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="bg-navy-dark/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60">
            <div className="p-2 rounded-lg bg-navy-deep border border-slate-700/60">
              <PaintBucket className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="font-headline text-xl font-bold text-white">Appearance</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-bold text-white mb-3">Theme Selection</p>
              <div className="flex gap-4">
                <button className="flex items-center justify-center px-6 py-2.5 rounded-lg border border-electric-blue/50 bg-electric-blue/10 text-electric-blue font-bold text-xs transition-colors">
                  Dark (Ocean)
                </button>
                <button className="flex items-center justify-center px-6 py-2.5 rounded-lg border border-slate-700 bg-navy-deep/50 text-slate-400 font-bold text-xs hover:text-white transition-colors cursor-not-allowed opacity-50" disabled>
                  Light Mode (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
