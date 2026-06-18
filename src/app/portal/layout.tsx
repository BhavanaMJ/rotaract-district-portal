import React from "react";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

export const metadata = {
  title: "Command Center | District 3192",
  description: "Operations dashboard for Rotaract District 3192",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-deep text-slate-200 font-body">
      {/* Sidebar is fixed on the left (w-64) */}
      <Sidebar />

      {/* Main content area offset by sidebar width on desktop */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        <TopNavigation />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
