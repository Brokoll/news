import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/categories";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            AI Neutral News
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Black & White Edition · 카테고리를 선택하세요
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section>
          <h2 className="sr-only">카테고리</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CATEGORY_LIST.map(({ slug, label }) => (
              <li key={slug}>
                <Link
                  href={`/category/${slug}`}
                  className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--card-foreground)] shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-xl font-semibold">{label}</span>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {label} 핫이슈 보기 →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]">
        AI Neutral News · Black & White Edition
      </footer>
    </div>
  );
}
