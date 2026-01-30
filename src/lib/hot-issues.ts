import type { HotIssue, Category } from "@/lib/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  getMockHotIssuesByCategory,
  getMockHotIssueById,
} from "@/data/mock";

/**
 * Supabase hot_issues 행을 HotIssue 타입으로 변환
 * (DB에는 media_perspectives 없음 → undefined)
 */
function rowToHotIssue(row: {
  id: string;
  category: string;
  ai_summary_title: string;
  neutral_body: string;
  summary_three_lines: string[];
  glossary: unknown;
  related_articles: unknown;
  youtube_videos: unknown;
  created_at: string;
}): HotIssue {
  return {
    id: row.id,
    category: row.category as Category,
    ai_summary_title: row.ai_summary_title,
    neutral_body: row.neutral_body,
    summary_three_lines: row.summary_three_lines ?? [],
    glossary: Array.isArray(row.glossary) ? row.glossary : [],
    related_articles: Array.isArray(row.related_articles) ? row.related_articles : [],
    youtube_videos: Array.isArray(row.youtube_videos) ? row.youtube_videos : [],
    created_at: row.created_at,
  };
}

/** 카테고리별 핫이슈 목록 (Supabase 우선, 없으면 Mock) */
export async function getHotIssuesByCategory(
  category: Category
): Promise<HotIssue[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("hot_issues")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase getHotIssuesByCategory error:", error);
      return getMockHotIssuesByCategory(category);
    }
    return (data ?? []).map(rowToHotIssue);
  }
  return getMockHotIssuesByCategory(category);
}

/** ID로 핫이슈 한 건 조회 (Supabase 우선, 없으면 Mock) */
export async function getHotIssueById(id: string): Promise<HotIssue | null> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from("hot_issues")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // no rows
        return null;
      }
      console.error("Supabase getHotIssueById error:", error);
      return getMockHotIssueById(id) ?? null;
    }
    return data ? rowToHotIssue(data) : null;
  }
  return getMockHotIssueById(id) ?? null;
}
