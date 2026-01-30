/**
 * 배치용: 유튜브 검색 API 직접 호출 (서버 전용)
 */
const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search";

export interface YoutubeSearchItem {
  videoId: string;
  title: string;
  channelTitle: string;
}

export async function fetchYoutubeVideos(
  q: string,
  maxResults: number = 3
): Promise<YoutubeSearchItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY 미설정");
  }

  const url = new URL(YOUTUBE_SEARCH_API);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("type", "video");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const items = (data.items ?? []).filter(
    (item: { id?: { videoId?: string } }) => item.id?.videoId
  );
  return items.map((item: { id: { videoId: string }; snippet: { title: string; channelTitle: string } }) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
  }));
}
