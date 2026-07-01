"use client";

import React, { useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import { Megaphone, Plus, Bell, Clock, Send, Eye, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  sender: string;
  date: string;
  targetAudience: "All Clubs" | "Presidents Only" | "Secretaries Only";
}

const mockAnnouncements: Announcement[] = [
  { id: "a_1", title: "Quarterly Reports Due by July 15th", content: "All club secretaries are requested to submit the quarterly project and membership status reports via the operations portal before July 15th, 2026. Late submissions will experience leaderboard penalty points.", sender: "District Secretary", date: "2 days ago", targetAudience: "Secretaries Only" },
  { id: "a_2", title: "Theme Announcement for District Assembly", content: "We are excited to announce 'Ocean of Impact' as the main guiding theme for our upcoming district assembly. Prepare your presentation slides utilizing the official brand kits available in settings.", sender: "DRR Team", date: "4 days ago", targetAudience: "All Clubs" },
];

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form states
  const [title, setTitle] = useState("");
  const [sender, setSender] = useState("DRR Team");
  const [targetAudience, setTargetAudience] = useState<"All Clubs" | "Presidents Only" | "Secretaries Only">("All Clubs");
  const [content, setContent] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newAnnouncement: Announcement = {
      id: `a_${Date.now()}`,
      title,
      sender,
      targetAudience,
      content,
      date: "Just now"
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setTitle("");
    setContent("");
    setIsModalOpen(false);
    
    // Show success message
    setSuccessMsg("Announcement broadcasted successfully!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-12 animate-fade-in relative">
      
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg border border-emerald-500/30 bg-navy-dark/90 text-emerald-400 text-xs font-bold font-metadata shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-2 animate-slide-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {successMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-electric-blue" />
            District Announcements
          </h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Broadcast emergency alerts, circular releases, and operational guidelines directly to club offices.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 flex items-center gap-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Broadcast Announcement
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((item) => (
          <GlassPanel key={item.id} className="p-6 border-slate-800/60 bg-navy-dark/40 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-navy-deep border border-slate-800">
                  <Bell className="w-4 h-4 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-white leading-tight">{item.title}</h3>
                  <span className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider">{item.sender} • {item.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider",
                  item.targetAudience === "All Clubs" ? "bg-electric-blue/10 text-electric-blue border-electric-blue/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                )}>
                  {item.targetAudience}
                </span>
                
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-body leading-relaxed">{item.content}</p>

            <div className="flex items-center gap-2 self-end">
              <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold font-metadata transition-colors flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> View Analytics
              </button>
              <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold font-metadata transition-colors flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Re-Send
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <GlassPanel className="w-full max-w-lg p-6 bg-navy-dark border-slate-700 relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-electric-blue" />
                New Announcement
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-metadata font-bold uppercase tracking-wider text-slate-500">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Submissions extended for Annual awards"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-navy-deep border border-slate-800 focus:border-electric-blue/40 text-xs text-white focus:outline-none placeholder-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-metadata font-bold uppercase tracking-wider text-slate-500">Sender Identity</label>
                  <input 
                    type="text" 
                    required
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-navy-deep border border-slate-800 focus:border-electric-blue/40 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-metadata font-bold uppercase tracking-wider text-slate-500">Target Audience</label>
                  <select 
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="px-3 py-2 rounded-lg bg-navy-deep border border-slate-800 focus:border-electric-blue/40 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="All Clubs">All Clubs</option>
                    <option value="Presidents Only">Presidents Only</option>
                    <option value="Secretaries Only">Secretaries Only</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-metadata font-bold uppercase tracking-wider text-slate-500">Message Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Enter publication notes or announcement text..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-navy-deep border border-slate-800 focus:border-electric-blue/40 text-xs text-white focus:outline-none resize-none placeholder-slate-600"
                />
              </div>

              <button 
                type="submit"
                className="w-full mt-2 py-2.5 rounded-lg bg-electric-blue hover:bg-ocean-glow text-navy-deep text-xs font-bold font-metadata transition-colors shadow-lg"
              >
                Send Broadcast
              </button>
            </form>
          </GlassPanel>
        </div>
      )}

    </div>
  );
}
