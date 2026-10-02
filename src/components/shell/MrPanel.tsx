"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CalendarDays, ChevronsLeft, ChevronsRight, CloudSun, Coins, LayoutGrid, PlayCircle, HelpCircle, Radio } from "lucide-react";
import { useShell } from "./AppShell";
import { VODS, formatDuration } from "@/lib/vod-data";
import { summarize, useVodState } from "@/lib/vod-store";

type Tab = "point" | "content" | "alert" | "calendar";

const TABS: { key: Tab; label: string; icon: typeof Coins }[] = [
  { key: "point", label: "포인트", icon: Coins },
  { key: "content", label: "콘텐츠", icon: LayoutGrid },
  { key: "alert", label: "알림", icon: Bell },
  { key: "calendar", label: "캘린더", icon: CalendarDays },
];

// 디지털 MR 우측 패널 (CM-02). 모든 회원 화면 우측 상주, 규칙 기반 개인화.
export function MrPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const { role } = useShell();
  const [tab, setTab] = useState<Tab>("content");
  const tabs = role === "cmr" ? TABS.filter((t) => t.key !== "point") : TABS; // CMR은 포인트 탭 제외
  const active = role === "cmr" && tab === "point" ? "content" : tab;

  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] shrink-0 border-l border-line bg-white xl:flex" aria-label="디지털 MR">
      {/* 세로 탭 레일 */}
      <div className="flex w-16 flex-col items-center gap-1 border-r border-line py-4">
        <button type="button" onClick={onToggle} className="mb-2 flex size-10 items-center justify-center rounded-full" aria-label={open ? "디지털 MR 패널 접기" : "디지털 MR 패널 펼치기"} title="디지털 MR">
          <Orb size="sm" />
        </button>
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setTab(key);
              if (!open) onToggle();
            }}
            aria-pressed={open && active === key}
            className={`flex w-12 flex-col items-center gap-1 rounded-md py-2 text-[11px] font-semibold transition-colors ${
              open && active === key ? "bg-cobalt-50 text-cobalt-600" : "text-slate-500 hover:bg-slate-50 hover:text-navy-900"
            }`}
          >
            <Icon className="size-[18px]" />
            {label}
          </button>
        ))}
        <button type="button" onClick={onToggle} className="mt-auto flex size-9 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-navy-900" aria-label={open ? "패널 접기" : "패널 펼치기"}>
          {open ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="flex w-[296px] flex-col overflow-y-auto">
          <Greeting />
          <div className="flex-1 px-5 pb-6">
            {active === "content" && <ContentTab />}
            {active === "point" && <PointTab />}
            {active === "alert" && <AlertTab />}
            {active === "calendar" && <CalendarTab />}
          </div>
          <WeatherWidget />
        </div>
      )}
    </aside>
  );
}

function Orb({ size = "md" }: { size?: "sm" | "md" }) {
  // 캐릭터 미정(인물형 / 구체형 검토 중) → 구체형 자리표시
  return (
    <span
      aria-hidden
      className={`block rounded-full bg-[radial-gradient(circle_at_32%_28%,#9cc3ff_0%,#1877f2_45%,#0f2042_100%)] shadow-[0_0_0_3px_rgba(24,119,242,0.12),0_6px_16px_-4px_rgba(24,119,242,0.5)] ${
        size === "sm" ? "size-8" : "size-11"
      }`}
    />
  );
}

function Greeting() {
  const { role } = useShell();
  // 방문 이력 기반 인사말 분기 (첫 방문 / 오랜만 / 평시) — 데모는 '오랜만' 분기
  const name = role === "cmr" ? "박지훈 CMR님" : "김하늘 원장님";
  return (
    <div className="border-b border-line px-5 py-5">
      <div className="flex items-center gap-3">
        <Orb />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-cobalt-600">Digital MR</p>
          <p className="text-[15px] font-bold leading-snug text-navy-900">{name}, 오랜만이에요.</p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-5 text-slate-600">지난 방문 이후 새 VOD 3편이 올라왔고, 오늘 19:00에 웹심포지엄이 있습니다.</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-5 text-xs font-bold text-slate-500">{children}</h3>;
}

function ContentTab() {
  const { progress } = useVodState();
  const watching = VODS.map((v) => ({ v, s: summarize(v, progress[v.id]), at: progress[v.id]?.updatedAt ?? 0 }))
    .filter(({ s }) => s.status === "watching")
    .sort((a, b) => b.at - a.at)
    .slice(0, 3);

  return (
    <>
      <SectionTitle>오늘의 요약</SectionTitle>
      <ul className="space-y-1.5">
        {[
          { icon: Radio, label: "오늘 19:00 웹심포지엄", sub: "만성 기침 환자의 단계별 접근", tone: "text-red-500 bg-red-50" },
          { icon: HelpCircle, label: "오늘의 퀴즈", sub: "1문항 · 참여 시 +50P", tone: "text-teal-600 bg-teal-50" },
          { icon: LayoutGrid, label: "브랜드관 업데이트", sub: "신규 카드뉴스 2건", tone: "text-cobalt-600 bg-cobalt-50" },
        ].map(({ icon: Icon, label, sub, tone }) => (
          <li key={label}>
            <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-slate-50">
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-md ${tone}`}>
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-navy-900">{label}</span>
                <span className="block truncate text-xs text-slate-500">{sub}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* 이어보기 등 개인화 요소는 우측 패널에만 배치 (C-04-04) */}
      <SectionTitle>이어보기</SectionTitle>
      {watching.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-3 py-4 text-center text-xs text-slate-500">시청 중인 영상이 없습니다</p>
      ) : (
        <ul className="space-y-2">
          {watching.map(({ v, s }) => (
            <li key={v.id}>
              <Link href={`/vod/${v.id}`} className="group block rounded-lg border border-line p-3 hover:border-slate-300">
                <span className="line-clamp-2 text-[13px] font-semibold leading-5 text-navy-900 group-hover:text-cobalt-600">{v.title}</span>
                <span className="mt-2 flex items-center gap-2">
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full bg-cobalt-600" style={{ width: `${Math.round(s.ratio * 100)}%` }} />
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium tabular-nums text-slate-500">
                    <PlayCircle className="size-3" />
                    {formatDuration(s.position)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function PointTab() {
  return (
    <>
      <div className="mt-5 rounded-xl bg-navy-900 p-4 text-white">
        <p className="text-xs text-white/60">보유 포인트</p>
        <p className="mt-1 text-2xl font-bold tabular-nums">12,450P</p>
        <div className="mt-3 flex items-center justify-between text-xs text-white/70">
          <span>Silver 등급</span>
          <span>연속 출석 5일</span>
        </div>
      </div>
      <SectionTitle>최근 적립</SectionTitle>
      <ul className="divide-y divide-line text-[13px]">
        {[
          ["VOD 시청 50% 달성", "+100P", "09.30"],
          ["출석 체크", "+10P", "09.30"],
          ["오늘의 퀴즈", "+50P", "09.29"],
          ["웹심포지엄 라이브 참여", "+300P", "09.24"],
        ].map(([label, p, d]) => (
          <li key={label + d} className="flex items-center justify-between py-2.5">
            <span className="text-slate-700">{label}</span>
            <span className="text-right">
              <span className="block font-semibold tabular-nums text-teal-600">{p}</span>
              <span className="block text-[11px] tabular-nums text-slate-400">{d}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function AlertTab() {
  return (
    <>
      <SectionTitle>새 알림 3</SectionTitle>
      <ul className="space-y-2 text-[13px]">
        {[
          ["예약 알림", "오늘 19:00 웹심포지엄이 1시간 뒤 시작합니다."],
          ["답변 도착", "전문가에게 질문에 답변이 등록되었습니다."],
          ["VOD 업로드", "‘2026 하반기 개정 급여 기준’ 다시보기가 열렸습니다."],
        ].map(([t, d]) => (
          <li key={t} className="rounded-lg border border-line p-3">
            <p className="text-xs font-bold text-cobalt-600">{t}</p>
            <p className="mt-1 leading-5 text-slate-700">{d}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function CalendarTab() {
  return (
    <>
      <SectionTitle>예정된 웹심포지엄</SectionTitle>
      <ul className="space-y-2 text-[13px]">
        {[
          ["10.02 (금) 19:00", "만성 기침 환자의 단계별 접근", true],
          ["10.08 (목) 19:00", "고혈압 진료지침 개정 해설", false],
          ["10.15 (목) 19:30", "위식도역류질환 장기 관리", false],
        ].map(([d, t, today]) => (
          <li key={String(t)} className="flex gap-3 rounded-lg border border-line p-3">
            <span className={`mt-0.5 h-auto w-1 shrink-0 rounded-full ${today ? "bg-red-500" : "bg-slate-200"}`} />
            <span>
              <span className="block text-xs font-semibold tabular-nums text-slate-500">{d}</span>
              <span className="mt-0.5 block font-semibold leading-5 text-navy-900">{t}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

// 정보 위젯 — 미션 영역과 시각적으로 구분 (CM-02-05)
function WeatherWidget() {
  return (
    <div className="m-4 mt-0 flex items-center gap-3 rounded-xl bg-gradient-to-br from-sky-50 to-slate-50 px-4 py-3 ring-1 ring-sky-100">
      <CloudSun className="size-8 text-sky-500" />
      <div className="text-[13px]">
        <p className="font-bold text-navy-900">서울 강남구 18°</p>
        <p className="text-xs text-slate-500">맑음 · 오후 퇴근길 우산 불필요</p>
      </div>
    </div>
  );
}
