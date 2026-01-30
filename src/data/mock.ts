/**
 * Mock 데이터 - Supabase 연동 전 개발용
 * hot_issues 테이블 구조와 동일한 형식
 */
import type { HotIssue, Category } from "@/lib/types";

export const mockHotIssues: HotIssue[] = [
  {
    id: "1",
    category: "경제",
    ai_summary_title: "금리 동결 속 원·달러 환율, 수출 기업 실적에 어떤 영향?",
    neutral_body:
      "한국은행이 기준금리를 동결한 가운데 원·달러 환율이 일정 구간에서 움직이고 있다. 금리는 중앙은행이 시중 자금 조절을 위해 정하는 기준 금리로, 올라가면 대출 비용이 늘어나고 환율에도 영향을 준다. 수출 기업은 원화 가치가 떨어지면 달러 기준 매출이 원화로 환산될 때 이익이 늘어날 수 있어, 단기적으로는 긍정적일 수 있다. 반면 원자재 수입 비용이 커지는 등 부담이 따를 수 있어, 장기적으로는 환율 안정이 중요하다는 지적이 나온다.",
    summary_three_lines: [
      "한국은행이 기준금리를 유지한 상태에서 원·달러 환율이 일정 수준을 유지하고 있다.",
      "수출 기업은 원화 약세 시 달러 매출의 원화 환산 이익이 늘 수 있으나, 수입 원자재 비용 증가 등 리스크가 있다.",
      "전문가들은 환율 변동성 관리와 수급 균형이 중요하다고 강조한다.",
    ],
    glossary: [
      { term: "금리", definition: "중앙은행이 시중 자금 조절을 위해 정하는 기준 금리" },
      { term: "원·달러 환율", definition: "1달러를 사기 위해 필요한 원화 금액" },
    ],
    related_articles: [
      { title: "한국은행 금리 동결…", url: "https://example.com/1", press: "A뉴스" },
      { title: "원·달러 환율 전망", url: "https://example.com/2", press: "B일보" },
    ],
    youtube_videos: [
      {
        videoId: "dQw4w9WgXcQ",
        title: "금리와 환율, 한 번에 이해하기",
        channelTitle: "경제채널",
        summary: "기준금리 동결과 환율 변동의 관계를 쉽게 정리한 영상입니다.",
      },
    ],
    media_perspectives: [
      { stance: "보수", press: "C뉴스", summary: "금리 인하 서두르지 말고 물가 안정 우선해야 한다." },
      { stance: "진보", press: "D일보", summary: "성장 둔화 우려에 금리 인하 논의를 시작해야 한다." },
      { stance: "중도", press: "E방송", summary: "금리 동결 유지하되 데이터에 따라 유연히 대응해야 한다." },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "1-2",
    category: "경제",
    ai_summary_title: "주가 급등·급락, 개인 투자자 손절 전략은?",
    neutral_body:
      "최근 국내외 주식 시장 변동성이 커지면서 개인 투자자들의 손절 전략에 대한 관심이 높아지고 있다. 손절이란 손실이 더 커지기 전에 보유 종목을 매도하는 행위를 말한다. 전문가들은 감정에 휩쓸리지 않고 미리 정한 기준에 따라 행동하는 것이 중요하다고 조언한다. 단기 변동성과 장기 추세를 구분해 판단할 필요가 있다는 의견도 나온다.",
    summary_three_lines: [
      "주식 시장 변동성 확대에 따라 개인 투자자의 손절·리스크 관리 관심이 높아졌다.",
      "전문가들은 미리 정한 원칙에 따른 행동과 감정 배제를 권한다.",
      "단기 변동과 장기 추세를 구분해 판단하는 것이 중요하다는 지적이 있다.",
    ],
    glossary: [
      { term: "손절", definition: "손실이 더 커지기 전에 보유 종목을 매도하는 행위" },
    ],
    related_articles: [
      { title: "주가 변동성 확대", url: "https://example.com/e1", press: "경제뉴스" },
      { title: "개인 투자 전략", url: "https://example.com/e2", press: "증권일보" },
    ],
    youtube_videos: [{ videoId: "dQw4w9WgXcQ", title: "손절이란?", channelTitle: "투자채널", summary: "손절의 개념과 전략을 소개합니다." }],
    media_perspectives: [
      { stance: "보수", press: "A경제", summary: "과도한 개입보다 시장 자율에 맡겨야 한다." },
      { stance: "진보", press: "B경제", summary: "소액 투자자 보호를 위한 제도 보완이 필요하다." },
      { stance: "중도", press: "C경제", summary: "투자자 교육과 시장 감시를 병행해야 한다." },
    ],
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: "1-3",
    category: "경제",
    ai_summary_title: "물가 상승률 2%대 진입, 금리와 부동산에 미치는 영향",
    neutral_body:
      "소비자물가 상승률이 2%대에 진입하면서 금리 전망과 부동산 시장에 대한 관심이 커지고 있다. 물가가 안정되면 금리 인하 가능성이 높아지고, 금리가 내려가면 대출 비용이 줄어 부동산 수요에 영향을 줄 수 있다. 반대로 물가가 다시 올라가면 금리 동결 또는 인상 논의가 나올 수 있어, 향후 물가 지표를 주시할 필요가 있다는 분석이 나온다.",
    summary_three_lines: [
      "물가 상승률 2%대 진입에 따라 금리 인하 기대와 부동산 영향론이 대두했다.",
      "금리 하락 시 대출 비용 감소로 부동산 수요 변동 가능성이 거론된다.",
      "물가 추이에 따른 금리 정책 전망을 주시해야 한다는 의견이 있다.",
    ],
    glossary: [
      { term: "소비자물가", definition: "일반 소비자가 구매하는 상품·서비스의 가격 변동을 나타내는 지표" },
    ],
    related_articles: [
      { title: "물가 2%대 진입", url: "https://example.com/e3", press: "통계뉴스" },
      { title: "금리 전망", url: "https://example.com/e4", press: "금융일보" },
    ],
    youtube_videos: [],
    media_perspectives: [
      { stance: "보수", press: "D경제", summary: "물가 안정 전에 금리 인하는 시기상조다." },
      { stance: "진보", press: "E경제", summary: "서민 부담 완화를 위해 점진적 금리 인하를 검토해야 한다." },
      { stance: "중도", press: "F경제", summary: "데이터에 기반한 신중한 금리 정책이 필요하다." },
    ],
    created_at: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: "2",
    category: "IT",
    ai_summary_title: "AI 챗봇 규제, EU AI법과 국내 대응 방향은?",
    neutral_body:
      "유럽연합(EU)이 세계 최초로 포괄적인 인공지능(AI) 규제법을 통과시켰다. 고위험 AI 사용에 대한 허가와 금지 사항을 담고 있어, 글로벌 기업들의 준수 여부가 관심사다. 국내에서는 AI 챗봇과 생성형 AI에 대한 법적·윤리적 기준을 마련하는 논의가 진행 중이다. 생성형 AI는 텍스트·이미지 등을 만들어 내는 AI로, 허위 정보 유포나 저작권 문제가 이슈가 되고 있다. 전문가들은 혁신과 안전의 균형을 맞추는 규제가 필요하다고 입을 모은다.",
    summary_three_lines: [
      "EU가 포괄적 AI 규제법을 통과시켰고, 고위험 AI에 대한 허가·금지 조항이 포함되어 있다.",
      "국내에서는 생성형 AI·챗봇에 대한 법적·윤리 기준 마련 논의가 이어지고 있다.",
      "혁신과 안전의 균형을 위한 규제 설계가 중요하다는 의견이 지배적이다.",
    ],
    glossary: [
      { term: "생성형 AI", definition: "텍스트·이미지·음성 등을 새로 만들어 내는 인공지능" },
      { term: "EU AI법", definition: "유럽연합이 제정한 인공지능 이용·개발에 대한 규제 법률" },
    ],
    related_articles: [
      { title: "EU AI법 최종 승인", url: "https://example.com/3", press: "F뉴스" },
      { title: "국내 AI 규제 방향", url: "https://example.com/4", press: "G일보" },
    ],
    youtube_videos: [
      {
        videoId: "dQw4w9WgXcQ",
        title: "EU AI법 5분 요약",
        channelTitle: "IT뉴스",
        summary: "EU AI법의 핵심 조항과 국내 영향도를 요약했습니다.",
      },
    ],
    media_perspectives: [
      { stance: "보수", press: "H뉴스", summary: "과도한 규제는 AI 산업 경쟁력을 해칠 수 있다." },
      { stance: "진보", press: "I일보", summary: "인권·안전을 위한 선제적 규제가 필요하다." },
      { stance: "중도", press: "J방송", summary: "단계적 도입과 사후 평가를 병행하는 방식이 적절하다." },
    ],
    created_at: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: "2-2",
    category: "IT",
    ai_summary_title: "반도체 수급 불안, 국산화와 공급망 재편 논의",
    neutral_body:
      "글로벌 반도체 수급 불안이 지속되면서 국산화와 공급망 재편에 대한 논의가 활발하다. 반도체는 전자기기의 핵심 부품으로, 수요 대비 공급이 부족할 때 가격이 오르고 제품 출하가 지연될 수 있다. 일부 국가는 자국 내 생산을 늘리거나 우방국과의 공급망을 강화하는 정책을 추진하고 있다. 전문가들은 단기 수급과 장기 투자 균형이 중요하다고 강조한다.",
    summary_three_lines: [
      "반도체 수급 불안에 따라 국산화·공급망 재편 논의가 이어지고 있다.",
      "각국이 자국 생산 확대·우방 공급망 강화 정책을 추진 중이다.",
      "단기 수급 대응과 장기 투자 균형이 중요하다는 의견이 나온다.",
    ],
    glossary: [
      { term: "반도체", definition: "전기 전도성이 조건에 따라 달라지는 물질로, 전자기기의 핵심 부품" },
      { term: "공급망", definition: "원자재·부품·제품이 공급자에서 소비자까지 이어지는 흐름" },
    ],
    related_articles: [
      { title: "반도체 국산화 현황", url: "https://example.com/it1", press: "IT뉴스" },
      { title: "공급망 재편", url: "https://example.com/it2", press: "산업일보" },
    ],
    youtube_videos: [{ videoId: "dQw4w9WgXcQ", title: "반도체 한 번에 이해하기", channelTitle: "IT채널", summary: "반도체 수급과 공급망을 쉽게 설명합니다." }],
    media_perspectives: [
      { stance: "보수", press: "G뉴스", summary: "시장 원리에 맡기고 정부는 인프라 지원에 집중해야 한다." },
      { stance: "진보", press: "H뉴스", summary: "전략 산업으로 지정해 적극 투자·규제 완화가 필요하다." },
      { stance: "중도", press: "I뉴스", summary: "핵심 품목만 선별 지원하고 나머지는 시장에 맡겨야 한다." },
    ],
    created_at: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: "2-3",
    category: "IT",
    ai_summary_title: "클라우드·메타버스 규제, 개인정보와 플랫폼 책임",
    neutral_body:
      "클라우드 서비스와 메타버스 플랫폼이 확대되면서 개인정보 보호와 플랫폼 책임에 대한 규제 논의가 뜨겁다. 클라우드는 데이터를 인터넷 상의 원격 서버에 저장·처리하는 방식을 말하고, 메타버스는 가상 공간에서 사람들이 활동하는 환경을 이른다. 데이터 유출·초개인화 광고·가상 자산 분쟁 등 새로운 이슈에 대해 법적 기준을 어떻게 둘지에 대해 찬반이 엇갈린다.",
    summary_three_lines: [
      "클라우드·메타버스 확대로 개인정보·플랫폼 책임 규제 논의가 활발하다.",
      "데이터 유출·가상 자산 분쟁 등에 대한 법적 기준 정립이 요구된다.",
      "혁신과 이용자 보호의 균형을 맞추는 규제가 필요하다는 의견이 지배적이다.",
    ],
    glossary: [
      { term: "클라우드", definition: "데이터를 인터넷 상의 원격 서버에 저장·처리하는 방식" },
      { term: "메타버스", definition: "가상 공간에서 사람들이 활동하는 디지털 환경" },
    ],
    related_articles: [
      { title: "클라우드 규제 동향", url: "https://example.com/it3", press: "디지털뉴스" },
      { title: "메타버스 법적 쟁점", url: "https://example.com/it4", press: "테크일보" },
    ],
    youtube_videos: [],
    media_perspectives: [
      { stance: "보수", press: "J뉴스", summary: "과도한 규제는 플랫폼 성장을 저해할 수 있다." },
      { stance: "진보", press: "K뉴스", summary: "이용자 권리 보호를 위한 선제적 규제가 필요하다." },
      { stance: "중도", press: "L뉴스", summary: "핵심 리스크만 규제하고 나머지는 자율에 맡겨야 한다." },
    ],
    created_at: new Date(Date.now() - 1500000).toISOString(),
  },
  {
    id: "3",
    category: "정치",
    ai_summary_title: "선거 개혁 논의, 비례대표제 개편 찬반은?",
    neutral_body:
      "선거제도 개혁을 놓고 비례대표제 개편 방안에 대한 논의가 계속되고 있다. 비례대표제는 정당의 득표 비율에 따라 의석을 배분하는 제도로, 소수 정당의 의회 진출을 쉽게 하는 효과가 있다. 연동형 비례대표제는 지역구와 비례대표 의석을 일부 연동해 정당 득표율을 의석에 더 반영하려는 방식이다. 찬성 측은 유권자 의사가 의석에 더 잘 반영된다고 하고, 반대 측은 정당 중심 정치가 강해지거나 혼란이 커질 수 있다고 우려한다.",
    summary_three_lines: [
      "비례대표제·연동형 비례제 개편을 둘러싼 찬반 논의가 이어지고 있다.",
      "찬성 측은 유권자 의사 반영, 반대 측은 정당 중심·혼란 우려를 제기한다.",
      "국민 합의와 단계적 실험이 필요하다는 제안이 나온다.",
    ],
    glossary: [
      { term: "비례대표제", definition: "정당의 득표 비율에 따라 의석을 배분하는 선거 제도" },
      { term: "연동형 비례대표제", definition: "지역구와 비례 의석을 연동해 정당 득표율을 의석에 더 반영하는 방식" },
    ],
    related_articles: [
      { title: "비례제 개편안 비교", url: "https://example.com/5", press: "K뉴스" },
      { title: "연동형 비례제란", url: "https://example.com/6", press: "L일보" },
    ],
    youtube_videos: [],
    media_perspectives: [
      { stance: "보수", press: "M뉴스", summary: "현행 제도를 유지하면서 소폭 개선하는 것이 안정적이다." },
      { stance: "진보", press: "N일보", summary: "연동형 비례제 확대로 유권자 의사를 더 반영해야 한다." },
      { stance: "중도", press: "O방송", summary: "여론 수렴과 실험적 도입을 통해 점진적으로 개선하는 것이 좋다." },
    ],
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "3-2",
    category: "정치",
    ai_summary_title: "외교·안보 정책, 한미일 협력과 북한 대응",
    neutral_body:
      "한미일 3국 협력 강화와 북한 대응 방안을 둘러싼 논의가 이어지고 있다. 한미일은 한·미·일 3국을 가리키며, 안보·경제 등에서 공동 대응을 강화하는 움직임이 있다. 북한의 군사 도발과 핵·미사일 개발에 대한 대응 방안으로 제재 유지·대화 재개·국방력 강화 등 다양한 입장이 제시되고 있다. 전문가들은 동맹 결속과 대화 창구 유지의 균형이 필요하다고 말한다.",
    summary_three_lines: [
      "한미일 협력 강화와 북한 대응 방안을 둘러싼 논의가 계속되고 있다.",
      "제재 유지·대화 재개·국방력 강화 등 다양한 대응론이 제기된다.",
      "동맹 결속과 대화 창구 유지의 균형이 필요하다는 분석이 나온다.",
    ],
    glossary: [
      { term: "한미일", definition: "한국·미국·일본 3국을 가리키는 말" },
    ],
    related_articles: [
      { title: "한미일 정상회담", url: "https://example.com/p1", press: "외교뉴스" },
      { title: "북한 대응 전략", url: "https://example.com/p2", press: "안보일보" },
    ],
    youtube_videos: [{ videoId: "dQw4w9WgXcQ", title: "한미일 협력 5분 정리", channelTitle: "정치채널", summary: "한미일 협력과 북한 이슈를 요약합니다." }],
    media_perspectives: [
      { stance: "보수", press: "M뉴스", summary: "동맹 강화와 억제력 확보가 우선이어야 한다." },
      { stance: "진보", press: "N뉴스", summary: "대화와 제재를 병행하는 유연한 접근이 필요하다." },
      { stance: "중도", press: "O뉴스", summary: "억제와 대화 창구를 동시에 유지해야 한다." },
    ],
    created_at: new Date(Date.now() - 2100000).toISOString(),
  },
  {
    id: "3-3",
    category: "정치",
    ai_summary_title: "예산안·국회 개혁, 지출 우선순위와 의회 효율화",
    neutral_body:
      "정부 예산안 편성과 국회 개혁 논의가 겹치면서 지출 우선순위와 의회 운영 효율화에 대한 의견이 엇갈린다. 예산안은 한 해 동안 국가가 쓸 돈의 계획을 담은 문서로, 복지·국방·인프라 등 항목별 배분을 두고 논란이 있다. 국회에서는 상임위 구성·법안 처리 속도·청년 의원 참여 확대 등 개혁 방안이 제안되고 있다. 전문가들은 재정 건전성과 필요한 지출의 균형, 그리고 국회의 시민 대표성 강화가 중요하다고 강조한다.",
    summary_three_lines: [
      "예산안 편성과 국회 개혁을 둘러싼 지출 우선순위·의회 효율화 논의가 이어지고 있다.",
      "복지·국방·인프라 배분과 상임위·법안 처리 등 개혁안이 제시되고 있다.",
      "재정 건전성과 필요 지출의 균형, 국회 대표성 강화가 중요하다는 의견이 나온다.",
    ],
    glossary: [
      { term: "예산안", definition: "한 해 동안 국가가 쓸 돈의 계획을 담은 문서" },
      { term: "상임위", definition: "국회 상임위원회. 특정 분야 법안·예산을 심사하는 위원회" },
    ],
    related_articles: [
      { title: "내년도 예산안 요약", url: "https://example.com/p3", press: "정치뉴스" },
      { title: "국회 개혁안 비교", url: "https://example.com/p4", press: "의회일보" },
    ],
    youtube_videos: [],
    media_perspectives: [
      { stance: "보수", press: "P뉴스", summary: "재정 건전성 우선, 불필요한 지출은 줄여야 한다." },
      { stance: "진보", press: "Q뉴스", summary: "복지·성장 투자 확대와 국회 민주화가 필요하다." },
      { stance: "중도", press: "R뉴스", summary: "균형 재정과 핵심 분야 투자를 함께 추진해야 한다." },
    ],
    created_at: new Date(Date.now() - 2400000).toISOString(),
  },
];

/** ID로 한 건 조회 (상세 페이지용) */
export function getMockHotIssueById(id: string): HotIssue | undefined {
  return mockHotIssues.find((issue) => issue.id === id);
}

/** 카테고리별 이슈 목록 (최신순) */
export function getMockHotIssuesByCategory(category: Category): HotIssue[] {
  return mockHotIssues
    .filter((issue) => issue.category === category)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
