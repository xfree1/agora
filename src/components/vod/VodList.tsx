"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Activity, Bone, Brain, ChevronDown, Droplets, FileText, HeartPulse, Lightbulb, Microscope, RotateCcw, Search, SlidersHorizontal, Stethoscope, Timer, Wind, X,
} from "lucide-react";
import { CATEGORY_TABS, DEPARTMENTS, DISEASES, EDU_TYPES, SPEAKERS, VODS, type Category, type TabKey } from "@/lib/vod-data";
import { VodCard } from "./VodCard";

const PAGE = 9;
const SCROLL_KEY = "agora.vod.scroll";

const PERIODS = [
  { key: "1m", label: "1개월", days: 31 },
  { key: "3m", label: "3개월", days: 92 },
  { key: "6m", label: "6개월", days: 183 },
] as const;
const LENGTHS = [
  { key: "short", label: "15분 미만", test: (s: number) => s < 900 },
  { key: "mid", label: "15~60분", test: (s: number) => s >= 900 && s <= 3600 },
  { key: "long", label: "60분 초과", test: (s: number) => s > 3600 },
] as const;

const SUB_ICONS: Record<string, typeof HeartPulse> = {
  순환기: HeartPulse, 호흡기: Wind, 소화기: Activity, "내분비·대사": Droplets, 근골격: Bone, 신경: Brain,
  "임상 업데이트": Microscope, "처방 가이드": FileText, "케이스 스터디": Stethoscope, "5분 디테일": Timer,
};

// 분류마다 2차 분류 정의가 다르다: 학술=질환, 교육=유형, 병원경영=없음 (H-03-01)
const SUBS: Partial<Record<Category, readonly string[]>> = { academic: DISEASES, education: EDU_TYPES };

export function VodList() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const tab = (sp.get("tab") as TabKey) || "all";
  const sub = sp.get("sub");
  const dept = sp.get("dept");
  const sort = sp.get("sort") === "views" ? "views" : "latest";
  const period = sp.get("period");
  const len = sp.get("len");
  const spk = sp.get("spk")?.split(",").filter(Boolean) ?? [];
  const q = sp.get("q") ?? "";
  const limit = Math.max(PAGE, Number(sp.get("n")) || PAGE);

  const detailCount = (period ? 1 : 0) + (len ? 1 : 0) + spk.length;
  const [detailOpen, setDetailOpen] = useState(detailCount > 0);
  const [keyword, setKeyword] = useState(q);
  useEffect(() => setKeyword(q), [q]);

  // 필터 상태는 URL에 둔다 → 시청 화면에서 돌아와도 분류·필터 유지
  function update(patch: Record<string, string | null>, keepLimit = false) {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    if (!keepLimit) next.delete("n");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const inTab = useMemo(() => VODS.filter((v) => tab === "all" || v.category === tab), [tab]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const days = PERIODS.find((p) => p.key === period)?.days;
    const lenTest = LENGTHS.find((l) => l.key === len)?.test;
    const kw = q.trim().toLowerCase();
    return inTab
      .filter((v) => !sub || v.sub === sub)
      .filter((v) => !dept || tab === "management" || v.departments.includes(dept))
      .filter((v) => !days || now - new Date(v.liveAt).getTime() <= days * 86400_000)
      .filter((v) => !lenTest || lenTest(v.duration))
      .filter((v) => spk.length === 0 || v.speakerIds.some((s) => spk.includes(s)))
      .filter((v) => !kw || [v.title, v.summary, ...v.speakerIds.map((s) => SPEAKERS[s].name)].some((t) => t.toLowerCase().includes(kw)))
      .sort((a, b) => (sort === "views" ? b.views - a.views : b.liveAt.localeCompare(a.liveAt)));
  }, [inTab, sub, dept, period, len, sp.get("spk"), q, sort, tab]);

  const speakerOptions = useMemo(() => {
    const counts = new Map<string, number>();
    inTab.forEach((v) => v.speakerIds.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [inTab]);

  // 목록 복귀 시 스크롤 위치 복원
  const qs = sp.toString();
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) ?? "null") as { qs: string; y: number } | null;
      if (saved && saved.qs === qs) requestAnimationFrame(() => window.scrollTo(0, saved.y));
      sessionStorage.removeItem(SCROLL_KEY);
    } catch {}
  }, []);
  const rememberScroll = () => {
    try {
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ qs, y: window.scrollY }));
    } catch {}
  };

  const subs = tab !== "all" ? SUBS[tab] : undefined;
  const showDept = tab !== "management";

  const tags: { label: string; clear: () => void }[] = [
    ...(sub ? [{ label: sub, clear: () => update({ sub: null }) }] : []),
    ...(dept && showDept ? [{ label: dept, clear: () => update({ dept: null }) }] : []),
    ...(period ? [{ label: `최근 ${PERIODS.find((p) => p.key === period)?.label}`, clear: () => update({ period: null }) }] : []),
    ...(len ? [{ label: LENGTHS.find((l) => l.key === len)!.label, clear: () => update({ len: null }) }] : []),
    ...spk.map((id) => ({ label: `연자 ${SPEAKERS[id]?.name}`, clear: () => update({ spk: spk.filter((s) => s !== id).join(",") || null }) })),
    ...(q ? [{ label: `“${q}”`, clear: () => update({ q: null }) }] : []),
  ];

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-9 tracking-[-0.02em]">VOD 다시보기</h1>
          <p className="mt-1 text-sm text-slate-500">종료된 웹심포지엄과 교육 영상을 다시 봅니다.</p>
        </div>
        <form
          className="relative w-full sm:w-72"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: keyword.trim() || null });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="강의명, 연자 검색"
            aria-label="VOD 검색"
            className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-cobalt-600 focus:outline-none focus:ring-2 focus:ring-cobalt-600/20"
          />
        </form>
      </div>

      {/* 1차 분류 탭 */}
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-line" role="tablist" aria-label="VOD 분류">
        {CATEGORY_TABS.map((t) => {
          const count = t.key === "all" ? VODS.length : VODS.filter((v) => v.category === t.key).length;
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => update({ tab: t.key === "all" ? null : t.key, sub: null, spk: null })}
              className={`relative shrink-0 px-4 pb-3 pt-1 text-[15px] font-semibold transition-colors ${
                on ? "text-navy-900 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-navy-900" : "text-slate-500 hover:text-navy-900"
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs tabular-nums ${on ? "text-cobalt-600" : "text-slate-400"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* 2차 분류: 아이콘 그리드 (V1) */}
      {subs && (
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {[null, ...subs].map((s) => {
            const Icon = s ? SUB_ICONS[s] : Lightbulb;
            const count = s ? inTab.filter((v) => v.sub === s).length : inTab.length;
            const on = (sub ?? null) === s;
            return (
              <button
                key={s ?? "all"}
                type="button"
                onClick={() => update({ sub: s })}
                aria-pressed={on}
                disabled={count === 0}
                className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-colors disabled:opacity-40 ${
                  on ? "border-cobalt-600 bg-cobalt-50 text-cobalt-700" : "border-line bg-white text-slate-600 hover:border-slate-300 hover:text-navy-900"
                }`}
              >
                <Icon className="size-5" strokeWidth={1.75} />
                <span className="text-[13px] font-semibold leading-tight">{s ?? "전체"}</span>
                <span className="text-[11px] tabular-nums text-slate-400">{count}편</span>
              </button>
            );
          })}
        </div>
      )}
      {tab === "management" && (
        <p className="mt-5 rounded-lg bg-slate-100/70 px-4 py-3 text-[13px] text-slate-600">병원경영 영상은 별도 분류 없이 최신순으로 제공합니다.</p>
      )}

      {/* 필터 바: 진료과 칩 · 정렬 · 상세 필터 (H-03-02) */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {showDept && (
          <div className="flex w-full min-w-0 gap-1.5 overflow-x-auto pb-0.5 sm:w-auto sm:flex-1" role="group" aria-label="진료과">
            {[null, ...DEPARTMENTS].map((d) => {
              const on = (dept ?? null) === d;
              return (
                <button
                  key={d ?? "all"}
                  type="button"
                  aria-pressed={on}
                  onClick={() => update({ dept: d })}
                  className={`h-8 shrink-0 rounded-full border px-3 text-[13px] font-semibold transition-colors ${
                    on ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-slate-600 hover:border-slate-300 hover:text-navy-900"
                  }`}
                >
                  {d ?? "전 진료과"}
                </button>
              );
            })}
          </div>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="flex rounded-md border border-line bg-white p-0.5 text-[13px] font-semibold" role="group" aria-label="정렬">
            {(["latest", "views"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={sort === k}
                onClick={() => update({ sort: k === "latest" ? null : k })}
                className={`rounded px-2.5 py-1 ${sort === k ? "bg-slate-100 text-navy-900" : "text-slate-500 hover:text-navy-900"}`}
              >
                {k === "latest" ? "최신순" : "조회순"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setDetailOpen((o) => !o)}
            aria-expanded={detailOpen}
            className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[13px] font-semibold transition-colors ${
              detailOpen || detailCount ? "border-cobalt-600 text-cobalt-600" : "border-line bg-white text-slate-600 hover:text-navy-900"
            }`}
          >
            <SlidersHorizontal className="size-3.5" />
            상세 필터
            {detailCount > 0 && <span className="rounded-full bg-cobalt-600 px-1.5 text-[11px] leading-4 text-white">{detailCount}</span>}
            <ChevronDown className={`size-3.5 transition-transform ${detailOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {detailOpen && (
        <div className="mt-3 grid gap-5 rounded-lg border border-line bg-white p-5 shadow-card md:grid-cols-[auto_auto_1fr]">
          <FilterGroup label="업로드 기간">
            {[{ key: null, label: "전체" }, ...PERIODS].map((p) => (
              <Chip key={p.key ?? "all"} on={(period ?? null) === p.key} onClick={() => update({ period: p.key })}>
                {p.label}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="재생 시간">
            {[{ key: null, label: "전체" }, ...LENGTHS].map((l) => (
              <Chip key={l.key ?? "all"} on={(len ?? null) === l.key} onClick={() => update({ len: l.key })}>
                {l.label}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="연자">
            {speakerOptions.map(([id, n]) => {
              const on = spk.includes(id);
              return (
                <Chip key={id} on={on} onClick={() => update({ spk: (on ? spk.filter((s) => s !== id) : [...spk, id]).join(",") || null })}>
                  {SPEAKERS[id].name}
                  <span className={`ml-1 tabular-nums ${on ? "text-white/70" : "text-slate-400"}`}>{n}</span>
                </Chip>
              );
            })}
          </FilterGroup>
        </div>
      )}

      {/* 결과 헤더: 건수 · 정렬 기준 · 적용 필터 태그 */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <p className="mr-2 text-sm text-slate-600">
          총 <strong className="font-bold tabular-nums text-navy-900">{filtered.length}</strong>건 · {sort === "views" ? "조회순" : "최신순"}
        </p>
        {tags.map((t) => (
          <span key={t.label} className="inline-flex h-7 items-center gap-1 rounded-full bg-cobalt-50 pl-3 pr-1.5 text-xs font-semibold text-cobalt-700">
            {t.label}
            <button type="button" onClick={t.clear} aria-label={`${t.label} 필터 해제`} className="flex size-5 items-center justify-center rounded-full hover:bg-cobalt-100">
              <X className="size-3" />
            </button>
          </span>
        ))}
        {tags.length > 0 && (
          <button
            type="button"
            onClick={() => update({ sub: null, dept: null, period: null, len: null, spk: null, q: null })}
            className="inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs font-semibold text-slate-500 hover:text-navy-900"
          >
            <RotateCcw className="size-3" /> 초기화
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-navy-900">조건에 맞는 영상이 없습니다</p>
          <p className="mt-1 text-sm text-slate-500">필터를 줄이거나 다른 분류를 선택해 보세요.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, limit).map((v) => (
              <VodCard key={v.id} vod={v} href={`/vod/${v.id}${qs ? `?from=${encodeURIComponent(qs)}` : ""}`} onNavigate={rememberScroll} />
            ))}
          </div>
          {/* 저볼륨 전제 → 더보기 방식 (H-03-04) */}
          {filtered.length > limit && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => update({ n: String(limit + PAGE) }, true)}
                className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-white px-6 text-sm font-semibold text-navy-900 shadow-card hover:bg-slate-50"
              >
                더보기 <span className="tabular-nums text-slate-400">{Math.min(limit, filtered.length)} / {filtered.length}</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-bold text-slate-500">{label}</legend>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </fieldset>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-8 rounded-md border px-2.5 text-[13px] font-semibold transition-colors ${
        on ? "border-cobalt-600 bg-cobalt-600 text-white" : "border-line bg-white text-slate-600 hover:border-slate-300 hover:text-navy-900"
      }`}
    >
      {children}
    </button>
  );
}
