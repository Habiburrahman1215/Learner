"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Offline-first note: the Supabase client is created lazily and never at
 * module top-level, so an offline cold start does not throw. Everything the
 * learner needs works without it; it is used only to sync.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createBrowserClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}

export const supabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export interface Profile {
  id: string;
  display_name: string;
  handle: string | null;
  avatar: string;
  goal: string;
  xp: number;
  level: number;
  streak: number;
  answers: number;
  correct: number;
  minutes: number;
  created_at?: string;
  updated_at?: string;
}

export interface LeaderRow {
  display_name: string;
  handle: string | null;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  answers: number;
  correct: number;
}
