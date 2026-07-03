import React from "react";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import { PortalUserProvider } from "@/components/PortalUserProvider";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { generateSupabaseJWT } from "@/lib/jwt";

export const metadata = {
  title: "Command Center | District 3192",
  description: "Operations dashboard for Rotaract District 3192",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  // Use service-role JWT fetch (same as sync page) to bypass RLS
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const bearerToken = await generateSupabaseJWT("service_role");

  const headers = {
    apikey: apiKey,
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json",
  };

  try {
    // Fetch profile by Clerk auth_id
    const profileRes = await fetch(
      `${supabaseUrl}/rest/v1/member_profiles?auth_id=eq.${encodeURIComponent(userId)}&select=id,first_name,last_name,email,club_id&deleted_at=is.null`,
      { headers, cache: "no-store" }
    );

    if (!profileRes.ok) {
      redirect("/sync");
    }

    const profiles = await profileRes.json();
    if (!profiles || profiles.length === 0) {
      // Profile not found - go back to sync to link it
      redirect("/sync");
    }

    const profile = profiles[0];

    // Fetch roles
    const rolesRes = await fetch(
      `${supabaseUrl}/rest/v1/member_roles?member_id=eq.${profile.id}&select=role&deleted_at=is.null`,
      { headers, cache: "no-store" }
    );

    const roles = rolesRes.ok ? await rolesRes.json() : [];
    const roleName = roles?.[0]?.role || "Member";
    const fullName = [profile.first_name, profile.last_name]
      .filter(Boolean)
      .join(" ");

    const portalUser = {
      name: fullName || "Rotaractor",
      role: roleName,
    };

    return (
      <PortalUserProvider user={portalUser}>
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
      </PortalUserProvider>
    );
  } catch (err) {
    console.error("[PortalLayout] Error fetching profile:", err);
    redirect("/sync");
  }
}
