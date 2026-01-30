/**
 * 배치용: OpenAI로 중립 요약·본문·3줄 요약·용어 풀이 생성 (서버 전용)
 */
import type { GlossaryItem } from "@/lib/types";
import type { NaverNewsItem } from "./fetch-naver";

const OPENAI_API = "https://api.openai.com/v1/chat/completions";

export interface GeneratedContent {
  ai_summary_title: string;
  neutral_body: string;
  summary_three_lines: string[];
  glossary: GlossaryItem[];
}

export async function generateWithOpenAI(
  category: string,
  articles: NaverNewsItem[]
): Promise<GeneratedContent> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY 미설정");
  }

  const articlesText = articles
    .slice(0, 5)
    .map((a, i) => `[기사${i + 1}] 제목: ${a.title}\n내용: ${a.description}`)
    .join("\n\n");

  const systemPrompt = `당신은 뉴스를 중립적으로 요약·재구성하는 AI입니다.
주어진 여러 기사 내용을 바탕으로, 한쪽 입장에 치우치지 않은 중립적인 한 편의 기사와 요약을 만들어 주세요.
응답은 반드시 아래 JSON 형식만 출력하세요. 다른 설명은 넣지 마세요.

{
  "ai_summary_title": "한 줄 요약 제목 (클릭을 유도하는 명확한 문장)",
  "neutral_body": "중립적으로 재구성한 본문 (2~4문단, 객관적 서술)",
  "summary_three_lines": ["첫 번째 요약 문장", "두 번째 요약 문장", "세 번째 요약 문장"],
  "glossary": [{"term": "용어1", "definition": "한 줄 설명"}, {"term": "용어2", "definition": "한 줄 설명"}]
}

glossary에는 본문에 나온 전문 용어·숫자·개념 중 일반인이 이해하기 어려운 것만 2~5개 넣어 주세요.`;

  const userPrompt = `카테고리: ${category}\n\n아래 기사들을 참고해서 중립 기사와 요약을 생성해 주세요.\n\n${articlesText}`;

  const res = await fetch(OPENAI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI 응답에 content 없음");
  }

  const parsed = JSON.parse(content) as GeneratedContent;
  if (!parsed.ai_summary_title || !parsed.neutral_body) {
    throw new Error("OpenAI 응답 형식 오류: ai_summary_title, neutral_body 필요");
  }
  if (!Array.isArray(parsed.summary_three_lines)) {
    parsed.summary_three_lines = [];
  }
  if (!Array.isArray(parsed.glossary)) {
    parsed.glossary = [];
  }
  return parsed;
}
