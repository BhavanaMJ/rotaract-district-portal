"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { 
  Search, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings,
  Layers,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-navy-deep/80 backdrop-blur-sm animate-fade-in">
      {/* Overlay to close */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setOpen(false)} />
      
      <div className="w-full max-w-xl mx-4 overflow-hidden rounded-xl border border-slate-700 bg-navy-dark shadow-[0_0_40px_rgba(0,0,0,0.5)] transform scale-100 animate-in fade-in zoom-in-95 duration-200">
        <Command
          className="flex flex-col w-full h-full bg-transparent"
          shouldFilter={true}
        >
          <div className="flex items-center px-4 border-b border-slate-700/60">
            <Search className="w-5 h-5 text-slate-500 shrink-0" />
            <Command.Input
              autoFocus
              className="flex-1 w-full px-4 py-4 text-sm bg-transparent outline-none text-white placeholder:text-slate-500 font-body"
              placeholder="Type a command or search..."
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-700 bg-slate-800/50 px-1.5 font-mono text-[10px] font-medium text-slate-400">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
            <Command.Empty className="py-6 text-center text-sm text-slate-400 font-metadata">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-[10px] font-metadata font-bold text-slate-500 p-2 uppercase tracking-wider">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/dashboard"))}
                className="flex items-center gap-3 px-3 py-2.5 mt-1 text-sm rounded-lg cursor-pointer aria-selected:bg-electric-blue/10 aria-selected:text-electric-blue text-slate-300 font-medium transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/clubs"))}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer aria-selected:bg-electric-blue/10 aria-selected:text-electric-blue text-slate-300 font-medium transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Manage Clubs
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/users"))}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer aria-selected:bg-electric-blue/10 aria-selected:text-electric-blue text-slate-300 font-medium transition-colors"
              >
                <Users className="w-4 h-4" />
                Manage Users
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/projects"))}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer aria-selected:bg-electric-blue/10 aria-selected:text-electric-blue text-slate-300 font-medium transition-colors"
              >
                <Layers className="w-4 h-4" />
                Project Moderation
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="text-[10px] font-metadata font-bold text-slate-500 p-2 uppercase tracking-wider mt-2 border-t border-slate-700/40 pt-4">
              <Command.Item
                onSelect={() => runCommand(() => console.log("Publish all"))}
                className="flex items-center gap-3 px-3 py-2.5 mt-1 text-sm rounded-lg cursor-pointer aria-selected:bg-ocean-glow/10 aria-selected:text-ocean-glow text-slate-300 font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                Publish All Pending Reports
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/admin/settings"))}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer aria-selected:bg-slate-700/50 aria-selected:text-white text-slate-300 font-medium transition-colors"
              >
                <Settings className="w-4 h-4" />
                System Settings
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
