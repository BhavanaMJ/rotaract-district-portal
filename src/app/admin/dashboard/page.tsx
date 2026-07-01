"use client";

import React from "react";
import AdminKPICard from "@/components/admin/AdminKPICard";
import GlassPanel from "@/components/GlassPanel";
import { 
  Building2, 
  Layers, 
  Users, 
  Clock, 
  Heart, 
  CheckCircle2, 
  Award,
  Activity
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { useShallow } from "zustand/react/shallow";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const performanceData = [
  { name: 'Jan', projects: 120, volunteers: 400 },
  { name: 'Feb', projects: 180, volunteers: 600 },
  { name: 'Mar', projects: 250, volunteers: 850 },
  { name: 'Apr', projects: 210, volunteers: 700 },
  { name: 'May', projects: 290, volunteers: 950 },
  { name: 'Jun', projects: 380, volunteers: 1200 },
];

export default function AdminDashboardPage() {
  const { stats, clubs } = useStore(useShallow((state) => ({
    stats: state.stats,
    clubs: state.clubs
  })));

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Mission Control</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            District 3192 overall operational overview and telemetry.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-navy-deep border border-slate-700 hover:border-slate-500 text-xs font-bold text-white transition-colors shadow-sm">
            Download Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            Publish All Pending
          </button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminKPICard 
          title="Total Clubs" 
          value={clubs.length} 
          icon={<Building2 className="w-5 h-5 text-electric-blue" />}
          trend={{ value: 2.4, label: "from last month" }}
        />
        <AdminKPICard 
          title="Total Projects" 
          value={stats.totalProjects.toLocaleString()} 
          icon={<Layers className="w-5 h-5 text-ocean-glow" />}
          trend={{ value: 14.5, label: "from last month" }}
          glowColor="blue"
        />
        <AdminKPICard 
          title="Total Volunteers" 
          value={stats.totalVolunteers.toLocaleString()} 
          icon={<Users className="w-5 h-5 text-emerald-400" />}
          trend={{ value: 8.2, label: "from last month" }}
          glowColor="white"
        />
        <AdminKPICard 
          title="Volunteer Hours" 
          value={stats.volunteerHours.toLocaleString()} 
          icon={<Clock className="w-5 h-5 text-amber-400" />}
          trend={{ value: 12.1, label: "from last month" }}
          glowColor="white"
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminKPICard 
          title="Beneficiaries" 
          value={stats.totalBeneficiaries.toLocaleString()} 
          icon={<Heart className="w-5 h-5 text-rose-400" />}
        />
        <AdminKPICard 
          title="Funds Raised" 
          value={`₹${stats.contributions.toLocaleString()}`} 
          icon={<Award className="w-5 h-5 text-emerald-500" />}
        />
        <AdminKPICard 
          title="Pending Reviews" 
          value="142" 
          icon={<CheckCircle2 className="w-5 h-5 text-orange-400" />}
        />
        <AdminKPICard 
          title="System Health" 
          value="99.9%" 
          icon={<Activity className="w-5 h-5 text-electric-blue" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Main Trend Chart */}
        <GlassPanel className="lg:col-span-2 p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div>
            <h3 className="font-headline text-lg font-bold text-white">District Velocity</h3>
            <p className="text-xs text-slate-400 font-metadata mt-1">Project and volunteer trajectory over 6 months</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1120', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: '10px', color: '#64748b' }}
                />
                <Area type="monotone" dataKey="volunteers" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolunteers)" />
                <Area type="monotone" dataKey="projects" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorProjects)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Live Feed */}
        <GlassPanel className="p-0 border-slate-800/60 bg-navy-dark/40 flex flex-col overflow-hidden h-96 lg:h-auto">
          <div className="p-5 border-b border-slate-800/60 bg-navy-dark/60 sticky top-0 z-10">
            <h3 className="font-headline text-lg font-bold text-white">Live Telemetry Feed</h3>
            <p className="text-[10px] text-slate-400 font-metadata uppercase tracking-wider mt-1">Real-time Activity</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-4">
            {/* Feed Item 1 */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-800/80 last:before:hidden">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-navy-deep border-2 border-electric-blue flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-metadata font-bold text-electric-blue">Just Now</span>
                <p className="text-xs text-white font-body leading-snug">
                  <span className="font-bold">Rotaract Club of Bengaluru</span> submitted a new project: <span className="text-slate-300 italic">"Mega Blood Donation Camp"</span>
                </p>
              </div>
            </div>
            
            {/* Feed Item 2 */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-800/80 last:before:hidden">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-navy-deep border-2 border-emerald-500/50 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-metadata font-bold text-slate-500">14 mins ago</span>
                <p className="text-xs text-slate-300 font-body leading-snug">
                  <span className="font-bold text-white">Super Admin</span> approved access request for <span className="text-slate-300 italic">Rtr. Jane Doe</span>
                </p>
              </div>
            </div>

            {/* Feed Item 3 */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-800/80 last:before:hidden">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-navy-deep border-2 border-slate-700 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-metadata font-bold text-slate-500">1 hr ago</span>
                <p className="text-xs text-slate-300 font-body leading-snug">
                  <span className="font-bold text-white">Rotaract Club of Koramangala</span> updated their club profile.
                </p>
              </div>
            </div>
            
            {/* Feed Item 4 */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-800/80 last:before:hidden">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-navy-deep border-2 border-amber-500/50 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-metadata font-bold text-slate-500">3 hrs ago</span>
                <p className="text-xs text-slate-300 font-body leading-snug">
                  <span className="font-bold text-white">System</span> flagged a potentially duplicate report in <span className="text-slate-300 italic">Zone 2</span>.
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
      
    </div>
  );
}
