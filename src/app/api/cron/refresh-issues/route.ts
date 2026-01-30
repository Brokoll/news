import { NextRequest, NextResponse } from "next/server";
import { runRefreshForCategory, runRefreshAll } from "@/lib/batch/refresh-issues";
import type { Category } from "@/lib/types";

const VALID_CATEGORIES: Category[] = ["경제", "IT", "정치", "연예"];

/**
 * 15분 배치: 네이버 뉴스 → 유튜브 → OpenAI 중립 요약 → Supabase 저장
 * 호출 시 CRON_SECRET으로 인증 필요 (Vercel Cron 또는 외부 cron에서 사용)
 */
export async function POST(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const cronSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : request.headers.get("x-cron-secret");

  if (secret && cronSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const categoryParam = searchParams.get("category");

  try {
    if (categoryParam && VALID_CATEGORIES.includes(categoryParam as Category)) {
      const result = await runRefreshForCategory(categoryParam as Category);
      return NextResponse.json({
        ok: result.success,
        results: [result],
        inserted: result.success ? 1 : 0,
      });
    }

    const results = await runRefreshAll();
    const inserted = results.filter((r) => r.success).length;
    return NextResponse.json({
      ok: inserted > 0,
      results,
      inserted,
    });
  } catch (e) {
    console.error("refresh-issues error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "배치 실행 중 오류" },
      { status: 500 }
    );
  }
}
