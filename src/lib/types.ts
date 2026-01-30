/**
 * AI Neutral News - Black & White Edition
 * hot_issues 및 관련 데이터 타입 정의 (Supabase 스키마와 동기화)
 */

/** 카테고리: DB CHECK 제약과 동일 */
export type Category = "IT" | "경제" | "정치" | "연예";

/** 어려운 단어 풀이 (glossary JSON) */
export interface GlossaryItem {
  term: string;
  definition: string;
}

/** 관련 기사 링크 (related_articles JSON) */
export interface RelatedArticle {
  title: string;
  url: string;
  press: string;
}

/** 유튜브 뉴스 영상 (youtube_videos JSON) */
export interface YoutubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  summary?: string;
}

/** 언론사별 관점 (상세 페이지 하단 비교용, 추후 DB 컬럼 확장 가능) */
export interface MediaPerspective {
  stance: "보수" | "진보" | "중도";
  press: string;
  summary: string;
}

/** 핫이슈 한 건 (Supabase hot_issues 테이블과 1:1) */
export interface HotIssue {
  id: string;
  category: Category;
  ai_summary_title: string;
  neutral_body: string;
  summary_three_lines: string[];
  glossary: GlossaryItem[];
  related_articles: RelatedArticle[];
  youtube_videos: YoutubeVideo[];
  /** 상세 페이지 '언론사별 관점 차이' 섹션용 (Mock/추후 DB 확장) */
  media_perspectives?: MediaPerspective[];
  created_at: string;
}
