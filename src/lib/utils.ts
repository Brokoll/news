/**
 * 클래스명 병합 유틸 (Tailwind / Shadcn 스타일)
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
