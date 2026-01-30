"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  lines: string[];
}

/**
 * 상세 페이지 상단: AI 3줄 요약 카드
 */
export function SummaryCard({ lines }: SummaryCardProps) {
  return (
    <Card className="border-l-4 border-l-[var(--foreground)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-[var(--muted)]">
          AI 3줄 요약
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {lines.map((line, i) => (
          <p key={i} className="text-[var(--foreground)] leading-relaxed">
            {line}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
