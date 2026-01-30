import { NextRequest, NextResponse } from "next/server";

/**
 * OpenAI API 연동용 백엔드 라우트 틀
 * - 클라이언트에서 직접 호출하지 말고 이 API를 경유해 호출 (API 키 보호)
 * - 환경변수: OPENAI_API_KEY
 * - 참고: https://platform.openai.com/docs/api-reference
 */

/** POST: Chat Completions (요약·중립 기사 생성 등에 활용) */
export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenAI API 키가 설정되지 않았습니다. .env.local에 OPENAI_API_KEY를 추가하세요.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON 본문이 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "OpenAI API 오류", detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("OpenAI API error:", e);
    return NextResponse.json(
      { error: "OpenAI API 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
