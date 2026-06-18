"use client";

import React from "react";
import { User, Award, Layers, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Member Profile</h1>
      </div>

      <div className="bg-navy-dark/40 border border-slate-800/60 rounded-2xl overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-electric-blue/20 to-ocean-glow/20 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 rounded-2xl bg-navy-deep border border-slate-700/60 p-1 flex items-center justify-center">
              <div className="w-full h-full bg-navy-dark/80 rounded-xl flex items-center justify-center">
                <User className="w-10 h-10 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Content */}
        <div className="pt-14 pb-8 px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-headline text-2xl font-bold text-white">Rtr. Jane Doe</h2>
              <p className="text-ocean-glow font-metadata text-xs font-bold uppercase tracking-wider mt-1">President, Rotaract Club of Bengaluru South</p>
            </div>
            <button className="px-5 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="flex flex-col gap-4 text-sm text-slate-300 font-body">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>jane.doe@rotaract3192.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Zone 1, Bengaluru</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-navy-deep/60 border border-slate-800">
                <p className="text-[10px] font-metadata text-slate-500 uppercase font-bold tracking-wider">Activities Submitted</p>
                <div className="flex items-center gap-2 mt-2 text-xl font-headline font-bold text-white">
                  <Layers className="w-5 h-5 text-electric-blue" />
                  12
                </div>
              </div>
              <div className="p-4 rounded-xl bg-navy-deep/60 border border-slate-800">
                <p className="text-[10px] font-metadata text-slate-500 uppercase font-bold tracking-wider">Projects Featured</p>
                <div className="flex items-center gap-2 mt-2 text-xl font-headline font-bold text-white">
                  <Award className="w-5 h-5 text-emerald-400" />
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
