"use client";

import React, { useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { useStore, User } from "@/store/useStore";
import { UserCircle, Shield, MoreHorizontal, Mail, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const users = useStore((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Manage roles, access, and accounts across the district.
          </p>
        </div>
        <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-electric-blue text-navy-deep hover:bg-ocean-glow text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Shield className="w-4 h-4" />
          Invite User
        </button>
      </div>

      <AdminDataTable<User>
        title="District Users"
        description="All registered users, admins, and pending accounts."
        data={filteredUsers}
        searchPlaceholder="Search by name, email, or club..."
        onSearch={setSearchTerm}
        columns={[
          {
            header: "User",
            cell: (user) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <UserCircle className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-white leading-snug truncate">{user.name}</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-metadata truncate mt-0.5">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </div>
                </div>
              </div>
            )
          },
          {
            header: "Club Affiliation",
            accessorKey: "clubName",
            className: "text-slate-300 font-body text-xs"
          },
          {
            header: "Role",
            cell: (user) => {
              const isAdmin = user.role.includes("Admin");
              return (
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase border",
                  isAdmin ? "bg-electric-blue/10 text-electric-blue border-electric-blue/20" : "bg-slate-800 text-slate-300 border-slate-700"
                )}>
                  {isAdmin && <Shield className="w-3 h-3 mr-1" />}
                  {user.role}
                </span>
              );
            }
          },
          {
            header: "Status",
            cell: (user) => (
              <span className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                user.status === 'Active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                user.status === 'Pending' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
                "bg-rose-500/10 text-rose-400 border-rose-500/20"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full", 
                  user.status === 'Active' ? "bg-emerald-400 animate-pulse" : 
                  user.status === 'Pending' ? "bg-amber-400" : "bg-rose-400"
                )} />
                {user.status}
              </span>
            )
          },
          {
            header: "",
            cell: () => (
              <div className="flex items-center justify-end gap-2">
                <button className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                  <Settings2 className="w-4 h-4" />
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
