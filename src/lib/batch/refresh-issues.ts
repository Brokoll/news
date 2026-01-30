/**
 * 15분 배치: 카테고리별 네이버 뉴스 수집 → 유튜브 검색 → OpenAI 중립 요약 생성 → Supabase 저장
 */
import type { Category } from "@/lib/types";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase";
import { fetchNaverNews } from "./fetch-naver";
import { fetchYoutubeVideos } from "./fetch-youtube";
import { generateWithOpenAI } from "./generate-with-openai";

/** 카테고리별 검색 쿼리 (네이버/유튜브 공통) */
const CATEGORY_QUERIES: Record<Category, string> = {
  경제: "경제 뉴스",
  IT: "IT 기술 뉴스",
  정치: "정치 뉴스",
  연예: "연예 뉴스",
};

export interface RefreshResult {
  category: Category;
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * 한 카테고리에 대해: 뉴스 수집 → OpenAI 생성 → DB INSERT
 */
export async function runRefreshForCategory(
  category: Category
): Promise<RefreshResult> {
  const query = CATEGORY_QUERIES[category];

  try {
    // 1. 네이버 뉴스 수집
    const articles = await fetchNaverNews(query, 5);
    if (articles.length === 0) {
      return { category, success: false, error: "네이버 뉴스 결과 없음" };
    }

    // 2. 유튜브 관련 영상 검색
    let youtubeVideos: { videoId: string; title: string; channelTitle: string; summary?: string }[] = [];
    try {
      const videos = await fetchYoutubeVideos(query, 3);
      youtubeVideos = videos.map((v) => ({
        videoId: v.videoId,
        title: v.title,
        channelTitle: v.channelTitle,
        summary: undefined,
      }));
    } catch (e) {
      console.warn("YouTube fetch failed for", category, e);
    }

    // 3. OpenAI로 중립 요약·본문·3줄 요약·용어 풀이 생성
    const generated = await generateWithOpenAI(category, articles);

    // 4. 관련 기사 링크 (제목, url, press는 도메인 추출 또는 "언론사")
    const related_articles = articles.slice(0, 5).map((a) => ({
      title: a.title,
      url: a.link,
      press: a.originallink ? new URL(a.originallink).hostname.replace("www.", "") : "언론사",
    }));

    // 5. Supabase INSERT (service role 필요)
    if (!isSupabaseAdminConfigured() || !supabaseAdmin) {
      return { category, success: false, error: "Supabase Service Role 키 미설정" };
    }

    const { data: row, error } = await supabaseAdmin.from("hot_issues").insert({
      category,
      ai_summary_title: generated.ai_summary_title,
      neutral_body: generated.neutral_body,
      summary_three_lines: generated.summary_three_lines,
      glossary: generated.glossary,
      related_articles,
      youtube_videos: youtubeVideos,
    }).select("id")
      .single();

    if (error) {
      return { category, success: false, error: error.message };
    }

    return {
      category,
      success: true,
      id: row?.id,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { category, success: false, error: message };
  }
}

/**
 * 모든 카테고리(경제, IT, 정치, 연예)에 대해 배치 실행
 */
export async function runRefreshAll(): Promise<RefreshResult[]> {
  const categories: Category[] = ["경제", "IT", "정치", "연예"];
  const results: RefreshResult[] = [];

  for (const category of categories) {
    const result = await runRefreshForCategory(category);
    results.push(result);
  }

  return results;
}
