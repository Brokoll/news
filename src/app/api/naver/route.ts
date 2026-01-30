import { NextRequest, NextResponse } from "next/server";

/**
 * 네이버 뉴스 API 연동용 백엔드 라우트 틀
 * - 클라이언트에서 직접 호출하지 말고 이 API를 경유해 호출하는 것을 권장 (API 키 보호)
 * - 환경변수: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET
 * - 참고: https://developers.naver.com/docs/serviceapi/search/news/news.md
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? "";
  const display = searchParams.get("display") ?? "10";
  const start = searchParams.get("start") ?? "1";

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "네이버 API 키가 설정되지 않았습니다. .env.local에 NAVER_CLIENT_ID, NAVER_CLIENT_SECRET을 추가하세요." },
      { status: 503 }
    );
  }

  if (!query.trim()) {
    return NextResponse.json(
      { error: "query 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const url = new URL("https://openapi.naver.com/v1/search/news.json");
    url.searchParams.set("query", query);
    url.searchParams.set("display", display);
    url.searchParams.set("start", start);
    url.searchParams.set("sort", "sim"); // sim: 정확도순, date: 날짜순

    const res = await fetch(url.toString(), {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      next: { revalidate: 900 }, // 15분 캐시 (배치 주기와 맞춤)
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "네이버 API 오류", detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("Naver API error:", e);
    return NextResponse.json(
      { error: "네이버 API 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
