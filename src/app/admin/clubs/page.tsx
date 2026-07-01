"use client";

import React, { useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { useStore, Club } from "@/store/useStore";
import { ShieldCheck, MoreHorizontal, ExternalLink, Download } from "lucide-react";

export default function AdminClubsPage() {
  const clubs = useStore((state) => state.clubs);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedClubs = [...clubs].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    return b.totalProjects - a.totalProjects;
  });

  const filteredClubs = sortedClubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    club.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Club Management</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Manage all Rotaract clubs within District 3192.
          </p>
        </div>
        <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-navy-deep border border-slate-700 hover:border-slate-500 text-xs font-bold text-white transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export Directory
        </button>
      </div>

      <AdminDataTable<Club>
        title="District Clubs Directory"
        description="Complete list of active and inactive clubs."
        data={filteredClubs}
        searchPlaceholder="Search by name or zone..."
        onSearch={setSearchTerm}
        columns={[
          {
            header: "Club Identity",
            cell: (club) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-deep border border-slate-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                  {club.logo ? (
                    <img src={club.logo} alt={club.name} className="w-full h-full object-contain" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white leading-snug">{club.name}</span>
                  <span className="text-[10px] text-slate-500 font-metadata uppercase tracking-wider">{club.zone}</span>
                </div>
              </div>
            )
          },
          {
            header: "Members",
            accessorKey: "memberCount",
            className: "font-metadata font-bold text-electric-blue"
          },
          {
            header: "Rank",
            cell: (club) => {
              const rank = sortedClubs.findIndex(c => c.id === club.id) + 1;
              return (
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded bg-ocean-glow/10 text-ocean-glow font-metadata text-xs font-bold border border-ocean-glow/20">
                    {rank}
                  </span>
                </div>
              );
            }
          },
          {
            header: "Score",
            accessorKey: "totalPoints",
            className: "font-metadata"
          },
          {
            header: "Status",
            cell: () => (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            )
          },
          {
            header: "",
            cell: () => (
              <div className="flex items-center justify-end gap-2">
                <button className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
