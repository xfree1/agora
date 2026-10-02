// VOD 목업 데이터. 라이브 종료 후 전량 적재(월 13편) 가정에 맞춰 약 6개월치를 둔다.

export type Category = "academic" | "education" | "management";
export type TabKey = "all" | Category;

export const CATEGORY_TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "academic", label: "학술 심포지엄" },
  { key: "education", label: "교육 웨비나" },
  { key: "management", label: "병원경영" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  academic: "학술 심포지엄",
  education: "교육 웨비나",
  management: "병원경영",
};

// 학술 심포지엄 = 질환별, 교육 웨비나 = 유형별, 병원경영 = 분류 없음 (H-03-01)
export const DISEASES = ["순환기", "호흡기", "소화기", "내분비·대사", "근골격", "신경"] as const;
export const EDU_TYPES = ["임상 업데이트", "처방 가이드", "케이스 스터디", "5분 디테일"] as const;
export const DEPARTMENTS = ["내과", "가정의학과", "이비인후과", "소아청소년과", "정형외과", "신경과"] as const;

export interface Speaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  bio: string;
}

export interface Chapter {
  session: string;
  title: string;
  start: number; // 초
  speakerId?: string;
}

export interface Material {
  name: string;
  type: "PDF" | "PPT" | "XLS";
  size: string;
}

export interface ChatLine {
  at: number; // 영상 기준 초
  user: string;
  text: string;
}

export interface Vod {
  id: string;
  title: string;
  category: Category;
  sub?: string; // 질환 또는 교육 유형
  departments: string[];
  speakerIds: string[];
  liveAt: string; // 라이브 송출 일시 (ISO)
  duration: number; // 초
  views: number;
  bookmarks: number;
  summary: string;
  chapters: Chapter[];
  materials: Material[];
  chat: ChatLine[];
  // 데모용 초기 시청 이력 (localStorage 값이 없을 때만 사용)
  seed?: { position: number; ratio: number };
}

export const SPEAKERS: Record<string, Speaker> = {
  s1: { id: "s1", name: "김도윤", title: "교수", affiliation: "한빛대학교병원 순환기내과", bio: "고혈압·이상지질혈증 복합 관리와 심혈관 위험 평가를 연구한다. 대한 고혈압 진료지침 개정 실무위원으로 참여했다." },
  s2: { id: "s2", name: "이서연", title: "교수", affiliation: "정음대학교병원 호흡기내과", bio: "만성기침과 기관지확장증 진료를 맡고 있으며, 1차 의료기관 대상 호흡기 처방 교육을 꾸준히 진행해 왔다." },
  s3: { id: "s3", name: "박준혁", title: "교수", affiliation: "하늘대학교병원 소화기내과", bio: "위식도역류질환과 기능성 소화불량의 약물 치료 전략을 주제로 다수의 임상 연구를 발표했다." },
  s4: { id: "s4", name: "최유진", title: "원장", affiliation: "미래내과의원", bio: "개원 15년 차 내과 전문의. 만성질환 다약제 처방 조정과 외래 상담 프로세스 개선 사례를 공유해 왔다." },
  s5: { id: "s5", name: "정민호", title: "교수", affiliation: "새솔대학교병원 내분비내과", bio: "당뇨병 환자의 약제 선택과 체중 관리를 중심으로 진료하며, 연속혈당측정 데이터 활용 교육을 담당한다." },
  s6: { id: "s6", name: "한지우", title: "교수", affiliation: "한빛대학교병원 정형외과", bio: "골관절염 통증 관리와 근골격계 질환의 비수술적 치료를 연구한다." },
  s7: { id: "s7", name: "윤세라", title: "교수", affiliation: "정음대학교병원 신경과", bio: "어지럼증과 두통 클리닉을 운영하며, 1차 진료에서의 신경과 감별진단 강의를 맡고 있다." },
  s8: { id: "s8", name: "오현석", title: "대표", affiliation: "메디웨이 병원경영연구소", bio: "의원급 의료기관 경영 컨설팅 10년. 수가·인력·마케팅 운영 사례를 정리해 강의한다." },
  s9: { id: "s9", name: "강나래", title: "원장", affiliation: "봄날소아청소년과의원", bio: "소아 호흡기 감염과 보호자 상담 커뮤니케이션을 주제로 강의해 왔다." },
};

const SESSION_NAMES = ["Session 1", "Session 2", "Panel Discussion"];

// 강연 주제 목록을 받아 세션별 목차를 균등 배치한다.
function chapters(duration: number, topics: string[], speakerIds: string[]): Chapter[] {
  const step = Math.floor(duration / (topics.length + 0.4));
  return topics.map((title, i) => {
    const sessionIdx = topics.length <= 3 ? 0 : Math.min(SESSION_NAMES.length - 1, Math.floor((i / topics.length) * SESSION_NAMES.length));
    return {
      session: topics.length <= 3 ? "본 강의" : SESSION_NAMES[sessionIdx],
      title,
      start: i === 0 ? 0 : i * step,
      speakerId: speakerIds[Math.min(i, speakerIds.length - 1) % speakerIds.length],
    };
  });
}

const CHAT_POOL = [
  "오늘 강의 잘 듣겠습니다.",
  "슬라이드 자료 공유 가능할까요?",
  "외래에서 바로 적용할 수 있겠네요.",
  "고령 환자에서도 같은 기준인가요?",
  "용량 조정 기준 다시 한 번 설명 부탁드립니다.",
  "케이스가 실제 진료와 비슷해서 도움이 됩니다.",
  "급여 기준 관련 내용도 궁금합니다.",
  "좋은 강의 감사합니다.",
];
const CHAT_USERS = ["내과 김**", "가정의학과 이**", "이비인후과 박**", "내과 정**", "소아청소년과 최**", "신경과 한**"];

function chat(duration: number, seed: number): ChatLine[] {
  const count = 8;
  return Array.from({ length: count }, (_, i) => ({
    at: Math.floor((duration / (count + 1)) * (i + 0.3)),
    user: CHAT_USERS[(i + seed) % CHAT_USERS.length],
    text: CHAT_POOL[(i + seed) % CHAT_POOL.length],
  }));
}

const M = (min: number) => min * 60;

type Raw = Omit<Vod, "chapters" | "chat"> & { topics: string[] };

const RAW: Raw[] = [
  { id: "v001", title: "고혈압 동반 이상지질혈증, 복합제 시대의 처방 전략", category: "academic", sub: "순환기", departments: ["내과", "가정의학과"], speakerIds: ["s1", "s4"], liveAt: "2026-09-24T19:00", duration: M(72), views: 1284, bookmarks: 212, summary: "2026년 진료지침 개정 내용을 바탕으로 고혈압과 이상지질혈증이 함께 있는 환자의 목표 수치와 복합제 선택 기준을 정리한다. 후반부에는 개원가 실제 처방 사례를 놓고 용량 조정과 순응도 관리 방안을 토론한다.", topics: ["2026 지침 개정 핵심", "심혈관 위험도별 목표 수치", "복합제 선택 기준", "개원가 처방 사례", "질의응답"], materials: [{ name: "강의 슬라이드_고혈압 복합제.pdf", type: "PDF", size: "4.2MB" }, { name: "지침 요약표.pdf", type: "PDF", size: "860KB" }], seed: { position: M(44), ratio: 0.58 } },
  { id: "v002", title: "만성기침 진료의 첫 30일: 감별과 경험적 치료", category: "academic", sub: "호흡기", departments: ["내과", "이비인후과", "가정의학과"], speakerIds: ["s2"], liveAt: "2026-09-17T19:30", duration: M(58), views: 2031, bookmarks: 340, summary: "8주 이상 지속되는 기침 환자를 처음 만났을 때 확인해야 할 경고 증상과 상기도기침증후군·천식·위식도역류 감별 순서를 다룬다. 진해거담제 선택과 재진 시점도 함께 정리한다.", topics: ["만성기침 정의와 경고 증상", "3대 원인 감별 순서", "경험적 치료와 진해거담제", "재진 시점과 의뢰 기준"], materials: [{ name: "만성기침 감별 알고리즘.pdf", type: "PDF", size: "1.1MB" }], seed: { position: M(57), ratio: 0.96 } },
  { id: "v003", title: "PPI 장기 복용 환자, 언제 어떻게 줄일 것인가", category: "academic", sub: "소화기", departments: ["내과", "가정의학과"], speakerIds: ["s3"], liveAt: "2026-09-10T19:00", duration: M(64), views: 1673, bookmarks: 255, summary: "위식도역류질환 환자의 PPI 장기 사용 근거와 감량·중단 프로토콜을 살펴본다. P-CAB 전환 시 고려할 점과 재발 시 대응까지 단계별로 정리한다.", topics: ["장기 복용 현황과 우려", "감량·중단 프로토콜", "P-CAB 전환 고려사항", "재발 대응"], materials: [{ name: "PPI 감량 프로토콜.pdf", type: "PDF", size: "2.3MB" }, { name: "환자 안내문 샘플.pdf", type: "PDF", size: "540KB" }] },
  { id: "v004", title: "당뇨병 약제 선택, 체중과 심장·신장 보호를 함께 보는 법", category: "academic", sub: "내분비·대사", departments: ["내과"], speakerIds: ["s5", "s1"], liveAt: "2026-09-03T19:00", duration: M(81), views: 1422, bookmarks: 198, summary: "SGLT2 억제제와 GLP-1 수용체 작용제의 심장·신장 보호 근거를 비교하고, 체중 관리가 필요한 환자에서의 병용 전략을 정리한다. 순환기 관점의 패널 토론을 포함한다.", topics: ["최신 약제 근거 요약", "체중 관리 관점의 선택", "심장·신장 보호 근거 비교", "병용 전략", "순환기 패널 토론", "질의응답"], materials: [{ name: "당뇨병 약제 비교표.pdf", type: "PDF", size: "1.8MB" }], seed: { position: M(12), ratio: 0.15 } },
  { id: "v005", title: "골관절염 통증, NSAIDs 이후의 선택지", category: "academic", sub: "근골격", departments: ["정형외과", "내과", "가정의학과"], speakerIds: ["s6"], liveAt: "2026-08-27T19:00", duration: M(55), views: 988, bookmarks: 120, summary: "NSAIDs 장기 사용이 어려운 고령 골관절염 환자에서 쓸 수 있는 약물·비약물 치료 옵션을 근거 수준별로 정리한다.", topics: ["NSAIDs 장기 사용의 한계", "약물 대안 비교", "주사 치료와 운동 처방", "고령 환자 처방 팁"], materials: [{ name: "골관절염 치료 옵션 요약.pdf", type: "PDF", size: "1.3MB" }] },
  { id: "v006", title: "1차 진료에서 만나는 어지럼증 감별", category: "academic", sub: "신경", departments: ["신경과", "내과", "이비인후과"], speakerIds: ["s7"], liveAt: "2026-08-20T19:30", duration: M(62), views: 1530, bookmarks: 276, summary: "말초성과 중추성 어지럼증을 진료실에서 빠르게 구분하는 문진·진찰 포인트를 영상 예시와 함께 설명한다. 응급 의뢰가 필요한 위험 신호를 정리한다.", topics: ["어지럼증 분류", "진료실 진찰 포인트", "위험 신호와 의뢰 기준", "약물 치료"], materials: [{ name: "어지럼증 진찰 체크리스트.pdf", type: "PDF", size: "720KB" }] },
  { id: "v007", title: "고령 고혈압 환자의 혈압 목표, 얼마나 낮춰야 하나", category: "academic", sub: "순환기", departments: ["내과", "가정의학과"], speakerIds: ["s1"], liveAt: "2026-08-13T19:00", duration: M(48), views: 1105, bookmarks: 164, summary: "75세 이상 환자의 혈압 목표에 관한 최근 임상 근거와 기립성 저혈압·낙상 위험을 고려한 약제 조정 원칙을 다룬다.", topics: ["고령 환자 근거 요약", "목표 혈압 설정", "기립성 저혈압 관리"], materials: [{ name: "고령 고혈압 슬라이드.pdf", type: "PDF", size: "3.0MB" }] },
  { id: "v008", title: "소아 급성 기관지염, 항생제 없이 관리하기", category: "academic", sub: "호흡기", departments: ["소아청소년과", "가정의학과"], speakerIds: ["s9", "s2"], liveAt: "2026-07-30T19:00", duration: M(52), views: 874, bookmarks: 101, summary: "소아 급성 기관지염에서 항생제가 필요한 경우와 필요 없는 경우를 구분하고, 대증 치료와 보호자 설명 방법을 정리한다.", topics: ["항생제 처방 기준", "대증 치료 선택", "보호자 설명 스크립트", "질의응답"], materials: [{ name: "보호자 안내문.pdf", type: "PDF", size: "410KB" }] },
  { id: "v009", title: "기능성 소화불량, 증상군별 맞춤 처방", category: "academic", sub: "소화기", departments: ["내과", "가정의학과"], speakerIds: ["s3", "s4"], liveAt: "2026-07-16T19:00", duration: M(66), views: 1210, bookmarks: 187, summary: "식후불편증후군과 명치통증증후군을 나눠 위장관운동촉진제·산분비억제제·신경조절제 선택 순서를 정리한다.", topics: ["로마 IV 기준 정리", "증상군별 1차 약제", "불응성 환자 접근", "개원가 사례 토론", "질의응답"], materials: [{ name: "기능성 소화불량 처방 가이드.pdf", type: "PDF", size: "1.6MB" }], seed: { position: M(30), ratio: 0.45 } },
  { id: "v010", title: "이상지질혈증 2차 예방, LDL 목표 도달률 높이기", category: "academic", sub: "내분비·대사", departments: ["내과", "가정의학과"], speakerIds: ["s5"], liveAt: "2026-06-25T19:00", duration: M(57), views: 963, bookmarks: 133, summary: "스타틴 최대 용량에도 목표에 도달하지 못하는 환자에서 에제티미브 병용과 추가 옵션을 단계별로 검토한다.", topics: ["2차 예방 목표 수치", "스타틴 강도 조정", "병용 요법 단계", "순응도 관리"], materials: [] },
  { id: "v011", title: "2026 하반기 개정 급여 기준 한 번에 정리", category: "education", sub: "임상 업데이트", departments: ["내과", "가정의학과", "이비인후과", "소아청소년과"], speakerIds: ["s4"], liveAt: "2026-09-29T13:00", duration: M(28), views: 2410, bookmarks: 512, summary: "하반기에 바뀐 주요 약제 급여 기준과 삭감 사례를 진료과별로 정리한다. 청구 전에 확인해야 할 항목을 체크리스트로 제공한다.", topics: ["주요 개정 항목", "진료과별 삭감 사례", "청구 전 체크리스트"], materials: [{ name: "급여 기준 체크리스트.xlsx", type: "XLS", size: "88KB" }, { name: "개정 요약.pdf", type: "PDF", size: "1.2MB" }] },
  { id: "v012", title: "진해거담제 처방 가이드: 성분별 차이와 병용", category: "education", sub: "처방 가이드", departments: ["내과", "이비인후과", "소아청소년과"], speakerIds: ["s2"], liveAt: "2026-09-15T13:00", duration: M(24), views: 1388, bookmarks: 260, summary: "진해제와 거담제의 작용 기전 차이, 증상별 선택과 병용 시 주의할 점을 짧게 정리한다.", topics: ["성분별 작용 기전", "증상별 선택", "병용 시 주의사항"], materials: [{ name: "진해거담제 비교표.pdf", type: "PDF", size: "640KB" }], seed: { position: M(9), ratio: 0.38 } },
  { id: "v013", title: "케이스로 보는 다약제 복용 노인 환자 처방 정리", category: "education", sub: "케이스 스터디", departments: ["내과", "가정의학과"], speakerIds: ["s4", "s1"], liveAt: "2026-09-08T13:00", duration: M(41), views: 1102, bookmarks: 205, summary: "10개 이상 약을 복용하는 고령 환자 3명의 실제 사례를 놓고 중복·상호작용·불필요 약제를 정리하는 과정을 단계별로 보여준다.", topics: ["사례 1: 고혈압·당뇨 동반", "사례 2: 수면제 장기 복용", "사례 3: 진통제 중복", "정리 원칙"], materials: [{ name: "케이스 요약지.pdf", type: "PDF", size: "920KB" }] },
  { id: "v014", title: "5분 디테일: 고혈압 복합제 용량 조정", category: "education", sub: "5분 디테일", departments: ["내과", "가정의학과"], speakerIds: ["s1"], liveAt: "2026-09-01T12:00", duration: M(5) + 20, views: 3120, bookmarks: 401, summary: "복합제 용량을 올리거나 바꿀 때의 기준을 5분 안에 정리한다.", topics: ["용량 조정 기준"], materials: [], seed: { position: M(5), ratio: 0.97 } },
  { id: "v015", title: "5분 디테일: 만성기침 환자 재진 체크포인트", category: "education", sub: "5분 디테일", departments: ["내과", "이비인후과"], speakerIds: ["s2"], liveAt: "2026-08-18T12:00", duration: M(5) + 45, views: 2650, bookmarks: 322, summary: "만성기침 환자 재진 시 확인해야 할 세 가지를 짧게 정리한다.", topics: ["재진 체크포인트"], materials: [] },
  { id: "v016", title: "위식도역류질환 최신 지견 업데이트", category: "education", sub: "임상 업데이트", departments: ["내과"], speakerIds: ["s3"], liveAt: "2026-07-22T13:00", duration: M(33), views: 905, bookmarks: 118, summary: "최근 1년간 발표된 위식도역류질환 관련 주요 연구와 진료지침 변화를 요약한다.", topics: ["주요 연구 요약", "지침 변화", "진료 적용 포인트"], materials: [{ name: "GERD 업데이트 슬라이드.pdf", type: "PDF", size: "2.7MB" }] },
  { id: "v017", title: "두통 환자 첫 진료, 예방약 시작 기준", category: "education", sub: "처방 가이드", departments: ["신경과", "내과", "가정의학과"], speakerIds: ["s7"], liveAt: "2026-07-08T13:00", duration: M(26), views: 760, bookmarks: 94, summary: "편두통 예방 치료를 시작해야 하는 기준과 1차 약제 선택, 효과 판정 시점을 정리한다.", topics: ["예방 치료 시작 기준", "1차 약제 선택", "효과 판정과 중단"], materials: [] },
  { id: "v018", title: "개원 3년 차 의원의 인력 운영과 이직률 관리", category: "management", departments: [], speakerIds: ["s8"], liveAt: "2026-09-19T20:00", duration: M(46), views: 1544, bookmarks: 288, summary: "의원급 의료기관에서 간호·행정 인력의 채용, 교육, 이직 관리를 어떻게 체계화할 수 있는지 실제 사례로 설명한다.", topics: ["인력 구성 기준", "채용과 온보딩", "이직률 관리 사례", "질의응답"], materials: [{ name: "인력 운영 템플릿.xlsx", type: "XLS", size: "120KB" }], seed: { position: M(20), ratio: 0.42 } },
  { id: "v019", title: "의원 온라인 평판 관리와 환자 리뷰 대응", category: "management", departments: [], speakerIds: ["s8"], liveAt: "2026-08-22T20:00", duration: M(38), views: 1180, bookmarks: 176, summary: "지도 앱·포털 리뷰가 신규 환자 유입에 미치는 영향과 의료법 범위 안에서 대응하는 방법을 정리한다.", topics: ["리뷰가 유입에 미치는 영향", "의료법상 유의사항", "대응 원칙과 사례"], materials: [{ name: "리뷰 대응 가이드.pdf", type: "PDF", size: "760KB" }] },
  { id: "v020", title: "건강보험 청구 실무: 자주 틀리는 코드 10가지", category: "management", departments: [], speakerIds: ["s4", "s8"], liveAt: "2026-07-25T20:00", duration: M(52), views: 2205, bookmarks: 430, summary: "의원 청구 담당자가 자주 실수하는 코드와 삭감으로 이어지는 패턴을 정리하고, 원장이 점검해야 할 항목을 제시한다.", topics: ["자주 틀리는 코드", "삭감 패턴", "원장 점검 항목", "질의응답"], materials: [{ name: "청구 코드 점검표.xlsx", type: "XLS", size: "95KB" }, { name: "강의 자료.pdf", type: "PDF", size: "1.9MB" }] },
];

export const VODS: Vod[] = RAW.map(({ topics, ...v }, i) => ({
  ...v,
  chapters: chapters(v.duration, topics, v.speakerIds),
  chat: chat(v.duration, i),
}));

export function getVod(id: string) {
  return VODS.find((v) => v.id === id);
}

export function relatedVods(vod: Vod, limit = 4) {
  const score = (v: Vod) =>
    (v.sub && v.sub === vod.sub ? 3 : 0) +
    (v.category === vod.category ? 2 : 0) +
    v.speakerIds.filter((s) => vod.speakerIds.includes(s)).length;
  return VODS.filter((v) => v.id !== vod.id)
    .map((v) => ({ v, s: score(v) }))
    .sort((a, b) => b.s - a.s || b.v.liveAt.localeCompare(a.v.liveAt))
    .slice(0, limit)
    .map(({ v }) => v);
}

export function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = String(m).padStart(h ? 2 : 1, "0");
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatDate(iso: string, withTime = false) {
  const [d, t] = iso.split("T");
  const [y, m, day] = d.split("-");
  return withTime && t ? `${y}.${m}.${day} ${t}` : `${y}.${m}.${day}`;
}

export function formatCount(n: number) {
  return n.toLocaleString("ko-KR");
}
