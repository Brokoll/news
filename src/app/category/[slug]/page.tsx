import Link from "next/link";
import { notFound } from "next/navigation";
import { getHotIssuesByCategory } from "@/lib/hot-issues";
import { getCategoryBySlug } from "@/lib/categories";
import { HotIssueCard } from "@/components/main/HotIssueCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const issues = await getHotIssuesByCategory(category);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            ← 카테고리로
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {category} 핫이슈
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {category} 관련 AI 중립 리포트
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {issues.length === 0 ? (
          <p className="text-[var(--muted)]">아직 이슈가 없습니다.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-1">
            {issues.map((issue) => (
              <li key={issue.id}>
                <HotIssueCard issue={issue} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]">
        AI Neutral News · Black & White Edition
      </footer>
    </div>
  );
}
