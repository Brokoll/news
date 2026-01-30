"use client";

import type { YoutubeVideo } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface YoutubeSectionProps {
  videos: YoutubeVideo[];
}

/**
 * 관련 유튜브 뉴스 영상 플레이어 및 요약
 */
export function YoutubeSection({ videos }: YoutubeSectionProps) {
  if (videos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">관련 유튜브 뉴스</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--muted)]">등록된 영상이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const main = videos[0];
  const rest = videos.slice(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">관련 유튜브 뉴스</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="aspect-video w-full overflow-hidden rounded-md bg-[var(--border)]">
            <iframe
              title={main.title}
              src={`https://www.youtube.com/embed/${main.videoId}`}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
          <p className="mt-2 font-medium text-[var(--foreground)]">{main.title}</p>
          <p className="text-sm text-[var(--muted)]">{main.channelTitle}</p>
          {main.summary && (
            <p className="mt-1 text-sm text-[var(--muted)]">{main.summary}</p>
          )}
        </div>
        {rest.length > 0 && (
          <ul className="space-y-2 border-t border-[var(--border)] pt-4">
            {rest.map((v) => (
              <li key={v.videoId} className="text-sm">
                <a
                  href={`https://www.youtube.com/watch?v=${v.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] underline hover:no-underline"
                >
                  {v.title}
                </a>
                <span className="text-[var(--muted)]"> · {v.channelTitle}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
