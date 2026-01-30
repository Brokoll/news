"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { HotIssue } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  IT: "IT",
  경제: "경제",
  정치: "정치",
  연예: "연예",
};

export function HotIssueCard({ issue }: { issue: HotIssue }) {
  const timeAgo = (createdAt: string) => {
    const diff = Date.now() - new Date(createdAt).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 60) return `${min}분 전`;
    const h = Math.floor(min / 60);
    return `${h}시간 전`;
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">
            {categoryLabels[issue.category] ?? issue.category}
          </span>
          <span>·</span>
          <span>{timeAgo(issue.created_at)}</span>
        </div>
        <CardTitle className="text-xl font-article font-semibold leading-snug">
          {issue.ai_summary_title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-2 text-[var(--muted)] text-sm leading-relaxed">
          {issue.summary_three_lines[0]}
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={`/${issue.id}`} className="w-full sm:w-auto">
          <Button variant="default" className="w-full sm:w-auto font-medium">
            AI 중립 리포트 읽기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
