'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { authService, AuthUserProfile } from '@/services/auth.service';
import { createSupabaseClient } from '@/lib/supabase';

interface AuthContextType {
  user: any | null; // Clerk user
  session: any | null;
  profileData: AuthUserProfile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profileData: null,
  isLoading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionId } = useClerkAuth();
  
  const [profileData, setProfileData] = useState<AuthUserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const fetchProfileData = async (clerkUser: any) => {
    try {
      let data = await authService.getFullUserProfile(clerkUser.id);
      
      // Auto-provision if missing
      if (!data) {
        console.log("Profile not found by auth_id, checking email...");
        const email = clerkUser.primaryEmailAddress?.emailAddress || '';
        
        // 1. Check if a profile with this email already exists (e.g. pre-approved request)
        const { data: existingProfile } = await createSupabaseClient()
          .from('member_profiles')
          .select('id')
          .eq('email', email)
          .single();
          
        if (existingProfile) {
           console.log("Found existing profile by email, linking auth_id...");
           await createSupabaseClient()
            .from('member_profiles')
            .update({ auth_id: clerkUser.id })
            .eq('id', existingProfile.id);
        } else {
           console.log("No profile found, creating new profile...");
           const nameParts = (clerkUser.fullName || email.split('@')[0]).split(' ');
           await createSupabaseClient().from('member_profiles').insert({
             auth_id: clerkUser.id,
             first_name: nameParts[0] || 'Unknown',
             last_name: nameParts.slice(1).join(' ') || 'User',
             email: email
           });
        }
        
        // Fetch again after linking or inserting
        data = await authService.getFullUserProfile(clerkUser.id);
      }
      
      setProfileData(data);
    } catch (err) {
      console.error('Failed to fetch/provision profile', err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfileData(user);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        fetchProfileData(user).finally(() => setIsProfileLoading(false));
      } else {
        setProfileData(null);
        setIsProfileLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session: sessionId ? { id: sessionId } : null, 
        profileData, 
        isLoading: !isLoaded || isProfileLoading, 
        refreshProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
