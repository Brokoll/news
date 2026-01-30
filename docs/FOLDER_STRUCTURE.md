# AI Neutral News - 폴더 구조 제안

## 전체 구조

```
news/
├── docs/                          # 문서
│   └── FOLDER_STRUCTURE.md        # 이 파일
├── public/                        # 정적 자산
├── supabase/
│   └── migrations/                # DB 마이그레이션
│       └── 001_create_hot_issues.sql
├── src/
│   ├── app/                       # App Router
│   │   ├── layout.tsx             # 루트 레이아웃 (폰트, 테마)
│   │   ├── page.tsx               # 메인 페이지 (핫이슈 리스트)
│   │   ├── globals.css            # 전역 스타일 (B&W 테마)
│   │   ├── [id]/                  # 동적 라우트: 상세 페이지
│   │   │   └── page.tsx
│   │   └── api/                   # API Routes
│   │       ├── naver/             # 네이버 뉴스 연동
│   │       │   └── route.ts
│   │       ├── youtube/           # 유튜브 연동
│   │       │   └── route.ts
│   │       └── cron/              # 15분 배치 트리거 (선택)
│   │           └── refresh-issues/route.ts
│   ├── components/
│   │   ├── ui/                    # Shadcn 기반 UI (Button, Card 등)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── main/
│   │   │   ├── HotIssueCard.tsx   # 메인 페이지 카드
│   │   │   └── HotIssueList.tsx
│   │   └── detail/
│   │       ├── SummaryCard.tsx    # 3줄 요약 카드
│   │       ├── ArticleBody.tsx    # 본문 + 툴팁
│   │       ├── YoutubeSection.tsx
│   │       └── MediaPerspective.tsx
│   ├── lib/
│   │   ├── supabase.ts            # Supabase 클라이언트
│   │   ├── types.ts               # hot_issues 등 타입 정의
│   │   └── utils.ts               # cn() 등 유틸
│   └── data/
│       └── mock.ts                # Mock 데이터 (개발용)
├── .env.local                     # SUPABASE_URL, API 키 등 (git 제외)
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 설명

- **app**: Next.js App Router 기준. `page.tsx` = 페이지, `api/*` = 백엔드 API.
- **components**: 재사용 컴포넌트. `ui`는 Shadcn, `main`/`detail`은 도메인별.
- **lib**: Supabase 연결, 공통 타입, 유틸 함수.
- **data/mock.ts**: Supabase 연동 전까지 사용하는 가짜 데이터.
