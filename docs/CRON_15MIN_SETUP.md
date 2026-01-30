# 15분마다 배치 실행하기 (무료)

Vercel Hobby 플랜은 cron을 **하루 1번**만 허용하므로, 15분마다 돌리려면 **외부 cron 서비스**로 API를 호출해야 합니다.

---

## 1. cron-job.org 설정 (무료)

1. **https://cron-job.org** 접속 후 회원가입/로그인
2. **Create Cronjob** 클릭
3. 아래처럼 입력:

   | 항목 | 값 |
   |------|-----|
   | **Title** | AI Neutral News 배치 (아무 이름) |
   | **Address (URL)** | `https://본인프로젝트.vercel.app/api/cron/refresh-issues` |
   | **Schedule** | Every 15 minutes (또는 `*/15 * * * *`) |
   | **Request Method** | POST |

4. **Request Headers** (CRON_SECRET 쓸 때만):
   - **Add Header** 클릭
   - Name: `Authorization`
   - Value: `Bearer 여기에_CRON_SECRET_값`

5. **Create** / **Save** 클릭

이제 15분마다 위 URL로 POST 요청이 갑니다.

---

## 2. URL 확인

Vercel 배포 후 주소는 예: `https://news-xxx.vercel.app`  
→ URL은 `https://news-xxx.vercel.app/api/cron/refresh-issues` 로 넣으면 됩니다.

---

## 3. 동작 확인

- Vercel 대시보드 → **Deployments** → 해당 배포 → **Functions** 로그에서 `/api/cron/refresh-issues` 호출 여부 확인
- Supabase **Table Editor** → `hot_issues` 에 새 행이 주기적으로 들어오는지 확인
