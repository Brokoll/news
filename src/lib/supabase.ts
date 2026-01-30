import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Supabase 클라이언트 (브라우저·서버 공용, RLS 적용)
 * .env.local에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 설정 필요
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Supabase Admin 클라이언트 (서버 전용, RLS 우회 - 배치 INSERT용)
 * .env.local에 SUPABASE_SERVICE_ROLE_KEY 설정 필요 (Supabase 대시보드 → Settings → API)
 */
export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}
