import { NextRequest, NextResponse } from "next/server";

/**
 * 유튜브 API 연동용 백엔드 라우트 틀
 * - 클라이언트에서 직접 호출하지 말고 이 API를 경유해 호출하는 것을 권장 (API 키 보호)
 * - 환경변수: YOUTUBE_API_KEY
 * - 참고: https://developers.google.com/youtube/v3/docs/search/list
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? "";
  const maxResults = searchParams.get("maxResults") ?? "5";
  const type = searchParams.get("type") ?? "video"; // video, channel, playlist

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "유튜브 API 키가 설정되지 않았습니다. .env.local에 YOUTUBE_API_KEY를 추가하세요." },
      { status: 503 }
    );
  }

  if (!q.trim()) {
    return NextResponse.json(
      { error: "q 파라미터(검색어)가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", q);
    url.searchParams.set("maxResults", maxResults);
    url.searchParams.set("type", type);
    url.searchParams.set("key", apiKey);
    // 한국어 결과 우선 시: regionCode=KR 등 추가 가능

    const res = await fetch(url.toString(), {
      next: { revalidate: 900 }, // 15분 캐시
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "유튜브 API 오류", detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("YouTube API error:", e);
    return NextResponse.json(
      { error: "유튜브 API 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
