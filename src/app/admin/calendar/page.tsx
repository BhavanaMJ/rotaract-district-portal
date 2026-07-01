"use client";

import React, { useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import { Calendar, Plus, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DistrictEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Assembly" | "Installation" | "Service" | "Meeting";
}

const mockEvents: DistrictEvent[] = [
  { id: "e_1", title: "Rotaract District Assembly 2026", date: "July 12, 2026", time: "09:00 AM", location: "RVCE Auditorium, Bengaluru", category: "Assembly" },
  { id: "e_2", title: "Rotaract Club of Bengaluru South 35th Installation", date: "July 18, 2026", time: "06:00 PM", location: "Grand Palace Hall, Bengaluru", category: "Installation" },
  { id: "e_3", title: "Mega Tree Plantation Drive - Zone 1", date: "July 25, 2026", time: "07:30 AM", location: "Turahalli Forest Reserve", category: "Service" },
];

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<DistrictEvent[]>(mockEvents);

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Calendar className="w-8 h-8 text-electric-blue" />
            District Calendar
          </h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Schedule assemblies, installations, visits, and large-scale collaborative events.
          </p>
        </div>
        <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Plus className="w-4 h-4" />
          Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar View Mockup */}
        <GlassPanel className="lg:col-span-2 p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
            <h3 className="font-headline text-lg font-bold text-white">July 2026</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-metadata font-bold text-slate-500 uppercase tracking-wider mb-2">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm font-metadata font-medium text-slate-400">
            {/* Empty days of previous month */}
            <div className="py-4 text-slate-700">28</div>
            <div className="py-4 text-slate-700">29</div>
            <div className="py-4 text-slate-700">30</div>
            {/* Days of July */}
            <div className="py-4 text-slate-500">1</div>
            <div className="py-4 text-slate-500">2</div>
            <div className="py-4 text-slate-500">3</div>
            <div className="py-4 text-slate-500">4</div>
            <div className="py-4 text-slate-500">5</div>
            <div className="py-4 text-slate-500">6</div>
            <div className="py-4 text-slate-500">7</div>
            <div className="py-4 text-slate-500">8</div>
            <div className="py-4 text-slate-500">9</div>
            <div className="py-4 text-slate-500">10</div>
            <div className="py-4 text-slate-500">11</div>
            {/* Event Day */}
            <div className="py-4 rounded-xl border border-electric-blue/40 bg-electric-blue/10 text-electric-blue font-bold shadow-[0_0_10px_rgba(0,240,255,0.1)] cursor-pointer">
              12
            </div>
            <div className="py-4 text-slate-500">13</div>
            <div className="py-4 text-slate-500">14</div>
            <div className="py-4 text-slate-500">15</div>
            <div className="py-4 text-slate-500">16</div>
            <div className="py-4 text-slate-500">17</div>
            {/* Event Day */}
            <div className="py-4 rounded-xl border border-pink-500/40 bg-pink-500/10 text-pink-400 font-bold cursor-pointer">
              18
            </div>
            <div className="py-4 text-slate-500">19</div>
            <div className="py-4 text-slate-500">20</div>
            <div className="py-4 text-slate-500">21</div>
            <div className="py-4 text-slate-500">22</div>
            <div className="py-4 text-slate-500">23</div>
            <div className="py-4 text-slate-500">24</div>
            {/* Event Day */}
            <div className="py-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold cursor-pointer">
              25
            </div>
            <div className="py-4 text-slate-500">26</div>
            <div className="py-4 text-slate-500">27</div>
            <div className="py-4 text-slate-500">28</div>
            <div className="py-4 text-slate-500">29</div>
            <div className="py-4 text-slate-500">30</div>
            <div className="py-4 text-slate-500">31</div>
          </div>
        </GlassPanel>

        {/* Upcoming List */}
        <GlassPanel className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-6">
          <div>
            <h3 className="font-headline text-lg font-bold text-white">Event Telemetry</h3>
            <p className="text-xs text-slate-400 font-metadata mt-1">Details for scheduled district activities</p>
          </div>

          <div className="flex flex-col gap-4">
            {events.map((e) => (
              <div key={e.id} className="p-4 rounded-xl bg-navy-deep/60 border border-slate-800 flex flex-col gap-2">
                <span className={cn(
                  "text-[9px] font-bold px-2 py-0.5 rounded border self-start uppercase tracking-wider",
                  e.category === "Assembly" ? "bg-electric-blue/10 text-electric-blue border-electric-blue/20" :
                  e.category === "Installation" ? "bg-pink-500/10 text-pink-400 border-pink-500/20" :
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                )}>
                  {e.category}
                </span>
                <h4 className="text-sm font-bold text-white">{e.title}</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-metadata">
                  <Clock className="w-3.5 h-3.5" />
                  {e.date} at {e.time}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-metadata">
                  <MapPin className="w-3.5 h-3.5" />
                  {e.location}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
