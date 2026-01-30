-- ============================================================
-- AI Neutral News - Black & White Edition
-- Supabase 테이블 스키마: hot_issues (15분 주기 배치 저장용)
-- ============================================================

-- 기존 테이블이 있으면 삭제 (개발용, 프로덕션에서는 주의)
-- DROP TABLE IF EXISTS hot_issues;

-- 핫이슈 테이블 생성
CREATE TABLE IF NOT EXISTS hot_issues (
  -- 기본 키 (UUID 권장: Supabase 기본값 사용)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 카테고리: IT, 경제, 정치, 연예
  category TEXT NOT NULL CHECK (category IN ('IT', '경제', '정치', '연예')),

  -- AI가 생성한 요약 제목 (메인 리스트 노출용)
  ai_summary_title TEXT NOT NULL,

  -- AI가 중립적으로 재구성한 본문
  neutral_body TEXT NOT NULL,

  -- 3줄 요약 (상세 페이지 상단 카드용)
  summary_three_lines TEXT[] NOT NULL DEFAULT '{}',

  -- 어려운 단어 풀이 (JSON 배열)
  -- 예: [{"term": "금리", "definition": "중앙은행이 시중 자금 조절을 위해 정하는 기준 금리"}]
  glossary JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- 관련 기사 링크 리스트 (JSON 배열)
  -- 예: [{"title": "기사 제목", "url": "https://...", "press": "언론사명"}]
  related_articles JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- 유튜브 뉴스 영상 데이터 (JSON 배열)
  -- 예: [{"videoId": "xxx", "title": "영상 제목", "channelTitle": "채널명", "summary": "AI 요약"}]
  youtube_videos JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- 생성 시간 (15분 배치 실행 시점)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스: 최신순 조회 및 카테고리 필터용
CREATE INDEX IF NOT EXISTS idx_hot_issues_created_at ON hot_issues (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hot_issues_category ON hot_issues (category);

-- RLS(Row Level Security) 활성화 (선택 사항: 공개 읽기만 허용 시)
ALTER TABLE hot_issues ENABLE ROW LEVEL SECURITY;

-- 모든 사용자에게 읽기만 허용하는 정책 예시 (익명 포함)
CREATE POLICY "Allow public read access" ON hot_issues
  FOR SELECT
  USING (true);

-- 쓰기/수정/삭제는 인증된 서비스 역할만 (배치 작업용)
-- CREATE POLICY "Service role only for insert" ON hot_issues
--   FOR INSERT WITH CHECK (auth.role() = 'service_role');

COMMENT ON TABLE hot_issues IS '15분마다 AI가 분석한 핫이슈 중립 리포트';
COMMENT ON COLUMN hot_issues.glossary IS 'JSON: [{term, definition}, ...]';
COMMENT ON COLUMN hot_issues.related_articles IS 'JSON: [{title, url, press}, ...]';
COMMENT ON COLUMN hot_issues.youtube_videos IS 'JSON: [{videoId, title, channelTitle, summary}, ...]';
