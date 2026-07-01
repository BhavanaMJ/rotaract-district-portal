"use client";

import React from "react";
import GlassPanel from "@/components/GlassPanel";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, Users, Building, Activity } from "lucide-react";

const zoneData = [
  { name: "Zone 1", clubs: 15, projects: 120, members: 450 },
  { name: "Zone 2", clubs: 18, projects: 180, members: 580 },
  { name: "Zone 3", clubs: 9, projects: 150, members: 320 }
];

const avenueData = [
  { name: "Club Service", value: 35 },
  { name: "Community Service", value: 45 },
  { name: "Professional Dev", value: 20 },
  { name: "International Service", value: 15 },
  { name: "Public Image", value: 25 },
  { name: "Next Gen", value: 10 }
];

const COLORS = ["#00f0ff", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">District Analytics</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Deep-dive visual telemetry for District 3192.
          </p>
        </div>
      </div>

      {/* Analytics Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassPanel className="p-5 border-slate-800/60 bg-navy-dark/40 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Top Performing Zone</span>
            <span className="text-xl font-headline font-bold text-white">Zone 2 (180 Projects)</span>
          </div>
          <TrendingUp className="w-8 h-8 text-electric-blue opacity-30" />
        </GlassPanel>
        <GlassPanel className="p-5 border-slate-800/60 bg-navy-dark/40 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Avg. Projects per Club</span>
            <span className="text-xl font-headline font-bold text-white">10.7 Projects</span>
          </div>
          <Building className="w-8 h-8 text-emerald-400 opacity-30" />
        </GlassPanel>
        <GlassPanel className="p-5 border-slate-800/60 bg-navy-dark/40 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider font-bold">Avg. Member Engagement</span>
            <span className="text-xl font-headline font-bold text-white">82% Active</span>
          </div>
          <Users className="w-8 h-8 text-amber-400 opacity-30" />
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zone Performance Chart */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div>
            <h3 className="font-headline text-lg font-bold text-white">Zone-wise Metrics</h3>
            <p className="text-xs text-slate-400 font-metadata mt-1">Clubs, Projects, and Members across zones</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1120', borderColor: '#1e293b', borderRadius: '8px' }}
                  labelStyle={{ fontSize: '10px', color: '#64748b' }}
                />
                <Bar dataKey="projects" fill="#00f0ff" radius={[4, 4, 0, 0]} name="Projects" />
                <Bar dataKey="members" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Members" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Avenue of Service Share */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div>
            <h3 className="font-headline text-lg font-bold text-white">Avenues of Service</h3>
            <p className="text-xs text-slate-400 font-metadata mt-1">Distribution of district projects</p>
          </div>
          <div className="h-80 w-full flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={avenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {avenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0b1120', borderColor: '#1e293b', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col gap-2">
              {avenueData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-slate-300 font-body">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
