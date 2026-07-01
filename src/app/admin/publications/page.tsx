"use client";

import React, { useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { FileText, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Publication {
  id: string;
  title: string;
  category: "Newsletter" | "Press Release" | "Circular" | "Blog";
  author: string;
  date: string;
  status: "Draft" | "Published";
}

const mockPublications: Publication[] = [
  { id: "pub_1", title: "District Assembly 2026: Official Guidelines", category: "Circular", author: "DRR Team", date: "2026-06-25", status: "Published" },
  { id: "pub_2", title: "Ocean of Impact: June 2026 Edition", category: "Newsletter", author: "Editorial Board", date: "2026-06-20", status: "Published" },
  { id: "pub_3", title: "Rotaract Day Celebrations in Zone 2", category: "Blog", author: "Rtr. Ananya", date: "2026-06-15", status: "Draft" },
];

export default function AdminPublicationsPage() {
  const [pubs, setPubs] = useState<Publication[]>(mockPublications);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPubs = pubs.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Publications</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Manage official district announcements, newsletters, circulars, and media.
          </p>
        </div>
        <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Plus className="w-4 h-4" />
          Create Publication
        </button>
      </div>

      <AdminDataTable<Publication>
        title="Official Publications"
        description="Write, edit, and release documents to all district members."
        data={filteredPubs}
        searchPlaceholder="Search title or category..."
        onSearch={setSearchTerm}
        columns={[
          {
            header: "Document",
            cell: (pub) => (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-navy-deep border border-slate-800">
                  <FileText className="w-5 h-5 text-electric-blue" />
                </div>
                <span className="font-bold text-white leading-snug">{pub.title}</span>
              </div>
            )
          },
          {
            header: "Category",
            accessorKey: "category",
            className: "text-xs font-metadata uppercase text-slate-400"
          },
          {
            header: "Author",
            accessorKey: "author",
            className: "text-xs font-body"
          },
          {
            header: "Release Date",
            accessorKey: "date",
            className: "text-xs font-metadata"
          },
          {
            header: "Status",
            cell: (pub) => (
              <span className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                pub.status === 'Published' 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-slate-700/30 text-slate-400 border-slate-700/60"
              )}>
                {pub.status}
              </span>
            )
          },
          {
            header: "",
            cell: () => (
              <div className="flex items-center gap-2 justify-end">
                <button className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
