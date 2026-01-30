"use client";

import type { GlossaryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  body: string;
  glossary: GlossaryItem[];
  className?: string;
}

/**
 * 본문 + 전문 용어 마우스 오버 시 툴팁(설명) 표시
 * glossary에 있는 단어를 찾아 툴팁으로 래핑
 */
export function ArticleBody({ body, glossary, className }: ArticleBodyProps) {
  if (glossary.length === 0) {
    return (
      <article className={cn("font-article text-[var(--foreground)] leading-relaxed", className)}>
        {body}
      </article>
    );
  }

  const termMap = new Map(glossary.map((g) => [g.term, g.definition]));
  const parts: { text: string; definition?: string }[] = [];
  let remaining = body;
  const sortedTerms = [...glossary].sort((a, b) => b.term.length - a.term.length);

  while (remaining.length > 0) {
    let found = false;
    for (const { term } of glossary) {
      const idx = remaining.indexOf(term);
      if (idx === -1) continue;
      if (idx > 0) {
        parts.push({ text: remaining.slice(0, idx) });
      }
      parts.push({ text: term, definition: termMap.get(term) });
      remaining = remaining.slice(idx + term.length);
      found = true;
      break;
    }
    if (!found) {
      parts.push({ text: remaining });
      break;
    }
  }

  return (
    <article className={cn("font-article text-[var(--foreground)] leading-relaxed", className)}>
      {parts.map((part, i) =>
        part.definition ? (
          <span
            key={i}
            className="border-b border-dotted border-[var(--muted)] cursor-help"
            title={part.definition}
          >
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </article>
  );
}
