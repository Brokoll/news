/**
 * 배치용: 네이버 뉴스 API 직접 호출 (서버 전용)
 */
const NAVER_API = "https://openapi.naver.com/v1/search/news.json";

export interface NaverNewsItem {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
  originallink?: string;
}

export interface NaverNewsResponse {
  items?: NaverNewsItem[];
  total?: number;
  start?: number;
  display?: number;
}

/** HTML 태그 제거 (네이버 응답에 포함됨) */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export async function fetchNaverNews(
  query: string,
  display: number = 5
): Promise<NaverNewsItem[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("NAVER_CLIENT_ID, NAVER_CLIENT_SECRET 미설정");
  }

  const url = new URL(NAVER_API);
  url.searchParams.set("query", query);
  url.searchParams.set("display", String(display));
  url.searchParams.set("sort", "date");

  const res = await fetch(url.toString(), {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Naver API error: ${res.status} ${text}`);
  }

  const data: NaverNewsResponse = await res.json();
  const items = data.items ?? [];
  return items.map((item) => ({
    title: stripHtml(item.title),
    link: item.link,
    description: stripHtml(item.description ?? ""),
    pubDate: item.pubDate,
    originallink: item.originallink,
  }));
}
