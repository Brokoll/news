import type { Category } from "@/lib/types";

/** URL 슬러그 ↔ 카테고리 매핑 (한글 노출, URL은 영문) */
export const CATEGORY_SLUGS: Record<string, Category> = {
  economy: "경제",
  it: "IT",
  politics: "정치",
  entertainment: "연예",
} as const;

export const CATEGORY_LIST: { slug: keyof typeof CATEGORY_SLUGS; label: Category }[] = [
  { slug: "economy", label: "경제" },
  { slug: "it", label: "IT" },
  { slug: "politics", label: "정치" },
  { slug: "entertainment", label: "연예" },
];

export function getCategoryBySlug(slug: string): Category | null {
  return CATEGORY_SLUGS[slug] ?? null;
}

export function getSlugByCategory(category: Category): string | null {
  const entry = CATEGORY_LIST.find((c) => c.label === category);
  return entry ? entry.slug : null;
}
