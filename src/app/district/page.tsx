"use client";

import React, { useState } from "react";
import WaveBackground from "@/components/WaveBackground";
import GlassPanel from "@/components/GlassPanel";
import {
  Users,
  Compass,
  Calendar,
  ChevronDown,
  ChevronUp,
  Mail,
  Award,
  Globe,
  MapPin,
} from "lucide-react";

interface Leader {
  name: string;
  role: string;
  club: string;
  email: string;
  image: string;
}

const leadershipList: Leader[] = [
  {
    name: "Rtr. Divyanshu Prasad",
    role: "District Rotaract Representative (DRR)",
    club: "Rotaract Club of Bengaluru South",
    email: "drr@rotaract3192.org",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Rtr. Sanjana Gowda",
    role: "District General Secretary",
    club: "Rotaract Club of RV College of Engineering",
    email: "secretary@rotaract3192.org",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Rtr. Haris Kidwai",
    role: "District Trainer & Adviser",
    club: "Rotaract Club of Bengaluru West",
    email: "trainer@rotaract3192.org",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Rtr. Rohan Hegde",
    role: "District Treasurer",
    club: "Rotaract Club of Indira Nagar",
    email: "treasurer@rotaract3192.org",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Rtr. Nidhi Jain",
    role: "District Public Image Chair",
    club: "Rotaract Club of Jayanagar",
    email: "publicimage@rotaract3192.org",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  },
];

const zoneDetails = [
  {
    name: "Zone 1 (Bengaluru South & Rural)",
    description: "Covers the southern metropolitan regions and surrounding rural zones like Kanakapura and Channapatna.",
    clubsCount: 14,
    clubs: ["RC Bengaluru South", "RC RV College of Engineering", "RC Jayanagar", "RC Dayananda Sagar"],
  },
  {
    name: "Zone 2 (Bengaluru East & Central)",
    description: "Focuses on the central commercial zones, tech corridors (Whitefield, Outer Ring Road), and Indiranagar.",
    clubsCount: 16,
    clubs: ["RC Indira Nagar", "RC PES University", "RC Bengaluru West", "RC Christ University"],
  },
  {
    name: "Zone 3 (Tumakuru, Kengeri & North)",
    description: "Covers highway belts, Kengeri suburbs, and outstation clubs in Tumakuru and rural Kolar.",
    clubsCount: 12,
    clubs: ["RC Tumakuru Elite", "RC Kengeri Central", "RC Kolar Gold Fields", "RC Tumakuru Town"],
  },
];

const timelineMilestones = [
  {
    month: "July 2025",
    title: "District Assembly & DRR Installation",
    description: "Over 800 Rotaractors assembled in Bengaluru to inaugurate the new Rotary year under the 'Ocean of Impact' theme.",
  },
  {
    month: "October 2025",
    title: "District Mega Blood Donation Day",
    description: "Collaborated across 30 clubs to secure 1,240 units of blood in a single day, setting a district record.",
  },
  {
    month: "January 2026",
    title: "Project Jal Dhara Deployment",
    description: "Successfully set up gravity-fed water purifiers in five remote villages, benefiting 12,000+ residents.",
  },
  {
    month: "March 2026",
    title: "Lake Restoration & Eco Corridor Initiative",
    description: "Coordinated volunteer efforts with local environmentalists to restore the offshoot canal channel in Kengeri.",
  },
  {
    month: "May 2026",
    title: "Vocational Conclave 'Ignite'",
    description: "Mentored 120 college students in project business modeling, funding three early-stage student startups.",
  },
];

const upcomingEvents = [
  {
    date: "June 20, 2026",
    title: "District Conference 'Sagar'",
    location: "Chowdiah Memorial Hall, Bengaluru",
    time: "09:00 AM - 05:00 PM",
  },
  {
    date: "July 15, 2026",
    title: "Leadership Boot Camp: Ripple 2026",
    location: "Rotary House of Friendship, Lavelle Road",
    time: "10:30 AM - 04:00 PM",
  },
  {
    date: "August 10, 2026",
    title: "Environmental Conclave: Wave Summit",
    location: "IISc Seminar Hall, Bengaluru",
    time: "02:00 PM - 06:00 PM",
  },
];

export default function DistrictPage() {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const toggleZone = (index: number) => {
    setActiveZone(activeZone === index ? null : index);
  };

  return (
    <div className="relative min-h-screen pb-24 px-6 md:px-8">
      {/* Animated waves background */}
      <WaveBackground intensity={0.4} particleCount={20} />

      <div className="max-w-7xl mx-auto pt-12">
        {/* Editorial Header */}
        <div className="mb-16">
          <span className="font-metadata text-xs font-bold text-electric-blue uppercase tracking-widest">
            Administration & Governance
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mt-2">
            Rotaract District 3192
          </h1>
          <p className="font-body text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Welcome to District 3192. Serving as the administrative anchor, we direct, support, 
            and synthesize activities across clubs to drive structural social progress.
          </p>
        </div>

        {/* ================= SECTION 1: ABOUT DISTRICT ================= */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">
              Who We Are
            </h2>
            <p className="text-slate-300 font-body leading-relaxed text-sm md:text-base">
              Rotaract District 3192 consists of numerous clubs located across academic 
              institutions, urban suburbs, and rural communities. We are part of Rotaract, 
              a global youth-led service organization sponsored by Rotary International.
            </p>
            <p className="text-slate-400 font-body leading-relaxed text-sm">
              We empower university students and young professionals to tackle local 
              and global challenges. Our members coordinate large-scale community service, 
              foster international collaboration, and cultivate professional leadership. 
              By operating under a unified standard, we transform individual drops of action 
              into a powerful wave of progress.
            </p>
          </div>
          
          <div className="lg:col-span-5">
            <GlassPanel className="p-8 border-slate-800/60 bg-navy-dark/30 text-center flex flex-col gap-4">
              <Compass className="w-12 h-12 text-electric-blue mx-auto mb-2" />
              <h3 className="font-headline text-xl font-bold text-white">Geographic Jurisdiction</h3>
              <p className="text-xs text-slate-400 font-body leading-relaxed">
                Our district governs clubs operating in Bengaluru Urban, Bengaluru Rural, Ramanagara, Channapatna, Tumakuru, and Kolar districts.
              </p>
              <div className="flex justify-center gap-6 mt-4 font-metadata text-xs font-bold text-white">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ocean-glow" />
                  <span>3 Zones</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-ocean-glow" />
                  <span>42+ Active Clubs</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* ================= SECTION 2: DISTRICT LEADERSHIP ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10 pb-3 border-b border-slate-800/40 max-w-sm">
            <Users className="w-6 h-6 text-electric-blue" />
            <h2 className="font-headline text-2xl font-bold text-white">
              District Council 2025-26
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {leadershipList.map((leader, index) => (
              <GlassPanel
                key={index}
                hoverEffect
                glowColor="blue"
                className="flex flex-col items-center text-center p-5 relative overflow-hidden group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-700 bg-navy-medium p-0.5 shadow-md mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-headline text-sm font-bold text-white line-clamp-1">
                  {leader.name}
                </h3>
                <p className="text-[10px] text-electric-blue font-metadata font-bold mt-1 line-clamp-2 min-h-[30px] leading-tight">
                  {leader.role}
                </p>
                <p className="text-[9px] text-slate-500 font-metadata font-bold mt-2 truncate w-full">
                  {leader.club}
                </p>
                
                <a
                  href={`mailto:${leader.email}`}
                  className="mt-4 p-2 rounded-full bg-navy-dark border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all focus:outline-none"
                  title={`Email ${leader.name}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* ================= SECTION 3: ZONES ================= */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Zones expanding Accordion */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-800/40">
              <Compass className="w-6 h-6 text-electric-blue" />
              <h2 className="font-headline text-2xl font-bold text-white">
                Zone Classifications
              </h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {zoneDetails.map((zone, idx) => {
                const isOpen = activeZone === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800/60 overflow-hidden bg-navy-dark/30 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleZone(idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-800/20"
                    >
                      <div>
                        <h3 className="font-headline text-md font-bold text-white">
                          {zone.name}
                        </h3>
                        <p className="text-[10px] font-metadata text-slate-500 font-bold mt-0.5 uppercase">
                          {zone.clubsCount} Active Clubs
                        </p>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 border-t border-slate-800/40 text-xs leading-relaxed font-body">
                        <p className="text-slate-400 mb-4">{zone.description}</p>
                        <p className="font-metadata font-bold uppercase text-[9px] text-slate-500 mb-2">
                          Key Clubs:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {zone.clubs.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2.5 py-1 rounded bg-navy-deep/80 border border-slate-800/60 text-slate-300 font-metadata text-[10px]"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline milestones */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-800/40">
              <Award className="w-6 h-6 text-electric-blue" />
              <h2 className="font-headline text-2xl font-bold text-white">
                District Timeline
              </h2>
            </div>

            <div className="relative border-l border-slate-800/80 ml-2 pl-6 flex flex-col gap-8">
              {timelineMilestones.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-electric-blue ring-4 ring-navy-deep" />
                  
                  <span className="font-metadata text-[10px] font-bold text-electric-blue uppercase">
                    {m.month}
                  </span>
                  <h3 className="font-headline text-sm font-bold text-white mt-1">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-body mt-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: CALENDAR ================= */}
        <section>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-800/40 max-w-sm">
            <Calendar className="w-6 h-6 text-electric-blue" />
            <h2 className="font-headline text-2xl font-bold text-white">
              District Calendar
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {upcomingEvents.map((evt, idx) => (
              <GlassPanel
                key={idx}
                hoverEffect
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-navy-dark/20 border-slate-800/60"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-electric-blue/5 border border-electric-blue/15 text-electric-blue min-w-[70px]">
                    <span className="font-metadata text-xs font-black uppercase">
                      {evt.date.split(",")[0].split(" ")[0]}
                    </span>
                    <span className="font-metadata text-md font-black">
                      {evt.date.split(",")[0].split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline text-base font-bold text-white">
                      {evt.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-metadata">
                      <span>{evt.location}</span>
                      <span>•</span>
                      <span>{evt.time}</span>
                    </div>
                  </div>
                </div>
                
                <span className="px-3 py-1.5 rounded-full bg-navy-dark border border-slate-800 text-[10px] font-metadata font-bold text-slate-400 uppercase">
                  Upcoming
                </span>
              </GlassPanel>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
