"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface PortalUser {
  name: string;
  role: string;
}

interface PortalUserContextType {
  user: PortalUser | null;
}

const PortalUserContext = createContext<PortalUserContextType | undefined>(undefined);

export function PortalUserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: PortalUser | null;
}) {
  return (
    <PortalUserContext.Provider value={{ user }}>
      {children}
    </PortalUserContext.Provider>
  );
}

export function usePortalUser() {
  const context = useContext(PortalUserContext);
  if (context === undefined) {
    throw new Error("usePortalUser must be used within a PortalUserProvider");
  }
  return context;
}
