"use client";

import React, { useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { UserCheck, Shield, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessRequest {
  id: string;
  name: string;
  email: string;
  clubName: string;
  requestedRole: string;
  submissionDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialRequests: AccessRequest[] = [
  {
    id: "req_1",
    name: "Rtr. Rohan Kamath",
    email: "rohan.kamath@rvce.edu.in",
    clubName: "Rotaract Club of RV College of Engineering",
    requestedRole: "President",
    submissionDate: "2026-06-30T10:00:00Z",
    status: "Pending"
  },
  {
    id: "req_2",
    name: "Rtr. Ananya Sharma",
    email: "ananya.sharma@southrotaract.org",
    clubName: "Rotaract Club of Bengaluru South",
    requestedRole: "President",
    submissionDate: "2026-06-29T14:30:00Z",
    status: "Pending"
  },
  {
    id: "req_3",
    name: "Rtr. Vikram Aditya",
    email: "vikram@indiranagarrotaract.org",
    clubName: "Rotaract Club of Indira Nagar",
    requestedRole: "Secretary",
    submissionDate: "2026-06-28T09:15:00Z",
    status: "Pending"
  }
];

export default function AdminAccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAction = (id: string, name: string, newStatus: "Approved" | "Rejected") => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    setSuccessMsg(`Officer ${name} has been ${newStatus.toLowerCase()}!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const pendingRequests = requests.filter(req => 
    req.status === "Pending" &&
    (req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     req.clubName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-12 animate-fade-in relative">
      
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg border border-emerald-500/30 bg-navy-dark/90 text-emerald-400 text-xs font-bold font-metadata shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-2 animate-slide-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {successMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">Access Requests</h1>
          <p className="text-slate-400 text-sm font-body mt-1">
            Review and approve credentials for new club officers.
          </p>
        </div>
      </div>

      <AdminDataTable<AccessRequest>
        title="Pending Registrations"
        description="Verify identities before granting system permissions."
        data={pendingRequests}
        searchPlaceholder="Search by name or club..."
        onSearch={setSearchTerm}
        columns={[
          {
            header: "Officer Info",
            cell: (req) => (
              <div className="flex flex-col">
                <span className="font-bold text-white leading-snug">{req.name}</span>
                <span className="text-[10px] text-slate-500 font-metadata">{req.email}</span>
              </div>
            )
          },
          {
            header: "Club",
            accessorKey: "clubName",
            className: "text-xs font-body"
          },
          {
            header: "Requested Role",
            cell: (req) => (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 font-metadata text-[10px] font-bold uppercase">
                <Shield className="w-3 h-3 text-slate-500" />
                {req.requestedRole}
              </span>
            )
          },
          {
            header: "Submitted",
            cell: (req) => (
              <span className="text-xs font-metadata text-slate-400">
                {new Date(req.submissionDate).toLocaleDateString()}
              </span>
            )
          },
          {
            header: "Actions",
            cell: (req) => (
              <div className="flex items-center gap-2 justify-end">
                <button 
                  onClick={() => handleAction(req.id, req.name, "Approved")}
                  className="p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors flex items-center gap-1.5 text-xs font-bold font-metadata"
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Approve
                </button>
                <button 
                  onClick={() => handleAction(req.id, req.name, "Rejected")}
                  className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors flex items-center gap-1.5 text-xs font-bold font-metadata"
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
