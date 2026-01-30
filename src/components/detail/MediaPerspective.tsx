"use client";

import type { MediaPerspective as MediaPerspectiveType } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MediaPerspectiveProps {
  items: MediaPerspectiveType[];
}

/**
 * 언론사별 관점 차이: 보수 vs 진보 vs 중도 성향 기사 핵심 요약
 */
export function MediaPerspective({ items }: MediaPerspectiveProps) {
  if (items.length === 0) return null;

  const stanceOrder: ("보수" | "진보" | "중도")[] = ["보수", "진보", "중도"];
  const ordered = stanceOrder.map((s) => items.find((i) => i.stance === s)).filter(Boolean) as MediaPerspectiveType[];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">언론사별 관점 차이</CardTitle>
        <p className="text-sm text-[var(--muted)]">
          보수·진보·중도 성향 언론사의 핵심 요약 비교
        </p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 sm:grid-cols-3">
          {ordered.map((item) => (
            <li key={item.stance} className="border border-[var(--border)] rounded-lg p-4">
              <span className="block text-sm font-medium text-[var(--muted)]">
                {item.stance} · {item.press}
              </span>
              <p className="mt-2 text-sm text-[var(--foreground)] leading-relaxed">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
