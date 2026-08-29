import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export interface StoreProfile {
  id?: string;
  user_id?: string;
  store_name: string;
  owner_name: string;
  phone?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  storeProfile: StoreProfile | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (
    email: string,
    password: string,
    storeName: string,
    ownerName: string,
    phone?: string
  ) => Promise<{ error: Error | null; data?: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; data?: any }>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (
    email: string
  ) => Promise<{ error: Error | null }>;
  updatePassword: (
    newPassword: string
  ) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [storeProfile, setStoreProfile] = useState<StoreProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchStoreProfile(userId: string) {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching store profile:", error.message);
      }

      if (data) {
        setStoreProfile(data);
      } else {
        // Fallback to user metadata if database record hasn't synced yet
        const currentUser = (await supabase.auth.getUser()).data.user;
        const meta = currentUser?.user_metadata;
        setStoreProfile({
          store_name: meta?.store_name || "My Repair Shop",
          owner_name: meta?.owner_name || currentUser?.email?.split("@")[0] || "Owner",
          phone: meta?.phone || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch store profile:", err);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }

        if (currentSession?.user) {
          await fetchStoreProfile(currentSession.user.id);
        }
      } catch (err) {
        console.error("Init auth error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!isMounted) return;

        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          await fetchStoreProfile(newSession.user.id);
        } else {
          setStoreProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signUp(
    email: string,
    password: string,
    storeName: string,
    ownerName: string,
    phone?: string
  ) {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not set."
        ),
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          store_name: storeName,
          owner_name: ownerName,
          phone: phone || "",
        },
      },
    });

    if (error) {
      return { error };
    }

    if (data.user) {
      // Explicitly insert into stores table in case the DB trigger isn't installed or delayed
      try {
        const { error: storeError } = await supabase.from("stores").upsert(
          {
            user_id: data.user.id,
            store_name: storeName,
            owner_name: ownerName,
            phone: phone || "",
          },
          { onConflict: "user_id" }
        );

        if (storeError) {
          console.warn("Manual store creation notice:", storeError.message);
        }
      } catch (e) {
        console.warn("Manual store creation exception:", e);
      }

      setStoreProfile({
        store_name: storeName,
        owner_name: ownerName,
        phone: phone || "",
        user_id: data.user.id,
      });
    }

    return { error: null, data };
  }

  async function signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "Supabase environment variables are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local"
        ),
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error };

    if (data.user) {
      await fetchStoreProfile(data.user.id);
    }

    return { error: null, data };
  }

  async function signOut() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setStoreProfile(null);
  }

  async function resetPasswordForEmail(email: string) {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          "Supabase environment variables are missing."
        ),
      };
    }

    const redirectUrl = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    return { error };
  }

  async function updatePassword(newPassword: string) {
    if (!isSupabaseConfigured) {
      return {
        error: new Error("Supabase environment variables are missing."),
      };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    return { error };
  }

  async function refreshProfile() {
    if (user) {
      await fetchStoreProfile(user.id);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        storeProfile,
        loading,
        isConfigured: isSupabaseConfigured,
        signUp,
        signIn,
        signOut,
        resetPasswordForEmail,
        updatePassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
