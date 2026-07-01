"use client";

import React, { useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { useStore, Project } from "@/store/useStore";
import { Layers, MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminProjectsPage() {
  const projects = useStore((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Project Moderation</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Review, feature, and moderate all projects submitted across the district.
          </p>
        </div>
      </div>

      <AdminDataTable<Project>
        title="Project Submissions"
        description="All projects that appear on the public showcase."
        data={filteredProjects}
        searchPlaceholder="Search projects or clubs..."
        onSearch={setSearchTerm}
        columns={[
          {
            header: "Project Details",
            cell: (project) => (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-navy-deep border border-slate-700 overflow-hidden shrink-0">
                  <img src={project.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0 max-w-xs">
                  <span className="font-bold text-white leading-snug truncate">{project.title}</span>
                  <span className="text-[10px] text-slate-500 font-metadata truncate mt-0.5">{project.clubName}</span>
                </div>
              </div>
            )
          },
          {
            header: "Avenue",
            accessorKey: "avenueOfService",
            className: "text-slate-300 font-metadata text-[10px] uppercase"
          },
          {
            header: "Impact Score",
            cell: (project) => (
              <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded bg-ocean-glow/10 text-ocean-glow font-metadata font-bold border border-ocean-glow/20">
                {project.impactScore}
              </span>
            )
          },
          {
            header: "Visibility",
            cell: () => (
              <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase border bg-electric-blue/10 text-electric-blue border-electric-blue/20">
                Published
              </span>
            )
          },
          {
            header: "Actions",
            cell: () => (
              <div className="flex items-center justify-end gap-2">
                <button className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors" title="Feature Project">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors" title="Hide Project">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
