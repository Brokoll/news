import Link from "next/link";
import { notFound } from "next/navigation";
import { getHotIssueById } from "@/lib/hot-issues";
import { SummaryCard } from "@/components/detail/SummaryCard";
import { ArticleBody } from "@/components/detail/ArticleBody";
import { YoutubeSection } from "@/components/detail/YoutubeSection";
import { MediaPerspective } from "@/components/detail/MediaPerspective";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: PageProps) {
  const { id } = await params;
  const issue = await getHotIssueById(id);
  if (!issue) notFound();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            ← 목록으로
          </Link>
          <p className="mt-2 text-sm font-medium text-[var(--muted)]">
            {issue.category}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl font-article">
            {issue.ai_summary_title}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* 상단: 3줄 요약 카드 */}
        <section className="mb-8">
          <SummaryCard lines={issue.summary_three_lines} />
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* 본문 + 관련 기사 */}
          <div>
            <section className="mb-8">
              <h2 className="sr-only">본문</h2>
              <ArticleBody
                body={issue.neutral_body}
                glossary={issue.glossary}
                className="text-base"
              />
            </section>

            {issue.related_articles.length > 0 && (
              <section className="mb-8">
                <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">
                  관련 기사
                </h3>
                <ul className="space-y-2">
                  {issue.related_articles.map((a, i) => (
                    <li key={i}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] underline hover:no-underline"
                      >
                        {a.title}
                      </a>
                      <span className="text-[var(--muted)]"> · {a.press}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* 우측: 유튜브 */}
          <aside className="lg:order-none">
            <YoutubeSection videos={issue.youtube_videos} />
          </aside>
        </div>

        {/* 하단: 언론사별 관점 차이 */}
        {issue.media_perspectives && issue.media_perspectives.length > 0 && (
          <section className="mt-10">
            <MediaPerspective items={issue.media_perspectives} />
          </section>
        )}
      </main>

      <footer className="border-t border-[var(--border)] py-6 text-center">
        <Link href="/">
          <Button variant="outline">AI 중립 리포트 더 보기</Button>
        </Link>
      </footer>
    </div>
  );
}
