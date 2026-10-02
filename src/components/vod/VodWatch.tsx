"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft, Bookmark, Check, CheckCircle2, ChevronDown, Coins, Download, Eye, FileSpreadsheet, FileText, Lock, Pause, Play, RotateCcw, RotateCw, Share2, Volume2,
} from "lucide-react";
import type { Vod } from "@/lib/vod-data";
import { CATEGORY_LABEL, SPEAKERS, formatCount, formatDate, formatDuration } from "@/lib/vod-data";
import { BUCKET_SEC, COMPLETE_RATIO, POINT_AMOUNT, POINT_RATIO, saveProgress, summarize, toggleBookmark, useVodState } from "@/lib/vod-store";
import { useShell } from "../shell/AppShell";
import { VodThumb } from "./VodThumb";
import { VodCard } from "./VodCard";

const TICK_MS = 250;
const SPEEDS = [1, 1.25, 1.5, 2];

type SideTab = "toc" | "files" | "chat";

export function VodWatch({ vod, related }: { vod: Vod; related: Vod[] }) {
  const sp = useSearchParams();
  const from = sp.get("from");
  const backHref = from ? `/vod?${from}` : "/vod";
  const { toast } = useShell();
  const { progress, bookmarks } = useVodState();
  const stored = progress[vod.id];
  const s = summarize(vod, stored);
  const marked = bookmarks.includes(vod.id);

  // --- 플레이어 (목업: 실제 영상 대신 타이머로 재생을 흉내 낸다) ---
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const pending = useRef(new Set<number>());
  const posRef = useRef(0);
  posRef.current = position;
  const startedRef = useRef(false);
  startedRef.current = started;

  const flush = () => {
    // 재생을 시작하지 않은 채 나가면 기존 이어보기 위치를 덮어쓰지 않는다
    if (!startedRef.current) return;
    saveProgress(vod.id, Math.floor(posRef.current), pending.current);
    pending.current = new Set();
  };

  useEffect(() => {
    if (!playing) return;
    let ticks = 0;
    const id = setInterval(() => {
      setPosition((p) => {
        const next = Math.min(vod.duration, p + (TICK_MS / 1000) * speed);
        // 연속 재생된 구간만 진도 버킷에 기록 (건너뛴 구간은 미집계)
        for (let b = Math.floor(p / BUCKET_SEC); b <= Math.floor(next / BUCKET_SEC); b++) pending.current.add(b);
        if (next >= vod.duration) setPlaying(false);
        return next;
      });
      if (++ticks % 4 === 0) flush();
    }, TICK_MS);
    return () => {
      clearInterval(id);
      flush();
    };
  }, [playing, speed, vod.id]);

  useEffect(() => () => flush(), []);

  // 50% 도달 순간 포인트 적립 알림
  const earnedRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (!stored) return;
    if (earnedRef.current === false && s.pointEarned) toast(`시청 50% 달성 · ${POINT_AMOUNT}P 적립되었습니다`);
    earnedRef.current = s.pointEarned;
  }, [s.pointEarned, stored, toast]);

  const canResume = !started && s.position > 10 && s.status !== "done";
  const start = (at: number) => {
    setPosition(at);
    setStarted(true);
    setPlaying(true);
  };
  const seek = (to: number) => {
    flush();
    setPosition(Math.max(0, Math.min(vod.duration, to)));
    if (!started) setStarted(true);
  };

  const watchedRanges = useMemo(() => {
    const set = new Set([...(stored?.buckets ?? [])]);
    const sorted = [...set].sort((a, b) => a - b);
    const ranges: [number, number][] = [];
    for (const b of sorted) {
      const last = ranges[ranges.length - 1];
      if (last && b === last[1] + 1) last[1] = b;
      else ranges.push([b, b]);
    }
    return ranges.map(([a, b]) => [a * BUCKET_SEC, Math.min(vod.duration, (b + 1) * BUCKET_SEC)] as const);
  }, [stored, vod.duration]);

  const currentChapter = vod.chapters.reduce((idx, c, i) => (position >= c.start ? i : idx), 0);

  // --- 우측 탭 ---
  const [side, setSide] = useState<SideTab>("toc");
  const [showSummary, setShowSummary] = useState(false);
  const [openBio, setOpenBio] = useState<string | null>(null);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("?")[0]);
      toast("링크를 복사했습니다");
    } catch {
      toast("링크 복사에 실패했습니다");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px]">
      <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-navy-900">
        <ArrowLeft className="size-4" /> 목록으로
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          {/* 플레이어 (CM-04 공통 플레이어 자리) */}
          <div className="overflow-hidden rounded-lg bg-navy-950 shadow-card">
            <div className="relative aspect-video">
              <div className={`absolute inset-0 transition-opacity ${playing ? "opacity-40" : "opacity-100"}`}>
                <VodThumb vod={vod} large />
              </div>
              {playing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="rounded-md bg-black/40 px-4 py-2 text-sm font-semibold text-white/90">{vod.chapters[currentChapter].title}</p>
                </div>
              )}

              {!started && (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-950/40">
                  {canResume ? (
                    <div className="w-[min(92%,360px)] rounded-xl bg-white p-5 text-center shadow-xl">
                      <p className="text-sm font-semibold text-navy-900">
                        지난번 <span className="tabular-nums text-cobalt-600">{formatDuration(s.position)}</span>까지 보셨습니다
                      </p>
                      <div className="mt-4 flex gap-2">
                        <button type="button" onClick={() => start(0)} className="h-10 flex-1 rounded-md border border-line text-sm font-semibold text-slate-600 hover:bg-slate-50">
                          처음부터
                        </button>
                        <button type="button" onClick={() => start(s.position)} className="h-10 flex-1 rounded-md bg-cobalt-600 text-sm font-semibold text-white hover:bg-cobalt-700">
                          이어보기
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => start(0)}
                      aria-label="재생"
                      className="flex size-16 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-xl transition-transform hover:scale-105"
                    >
                      <Play className="ml-1 size-7 fill-current" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 컨트롤 바 */}
            <div className="px-4 pb-3 pt-2 text-white">
              <div className="relative h-5">
                <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/15">
                  {watchedRanges.map(([a, b]) => (
                    <span key={a} className="absolute inset-y-0 bg-white/35" style={{ left: `${(a / vod.duration) * 100}%`, width: `${((b - a) / vod.duration) * 100}%` }} />
                  ))}
                  <span className="absolute inset-y-0 left-0 rounded-full bg-cobalt-600" style={{ width: `${(position / vod.duration) * 100}%` }} />
                  {vod.chapters.slice(1).map((c) => (
                    <span key={c.start} className="absolute inset-y-0 w-0.5 bg-navy-950" style={{ left: `${(c.start / vod.duration) * 100}%` }} />
                  ))}
                </div>
                <input
                  type="range"
                  min={0}
                  max={vod.duration}
                  step={1}
                  value={Math.floor(position)}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="재생 위치"
                  className="seek absolute inset-0 w-full cursor-pointer"
                />
              </div>
              <div className="mt-1 flex items-center gap-1">
                <IconBtn label={playing ? "일시정지" : "재생"} onClick={() => (started ? setPlaying((p) => !p) : start(canResume ? s.position : 0))}>
                  {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
                </IconBtn>
                <IconBtn label="10초 뒤로" onClick={() => seek(position - 10)}>
                  <RotateCcw className="size-[18px]" />
                </IconBtn>
                <IconBtn label="10초 앞으로" onClick={() => seek(position + 10)}>
                  <RotateCw className="size-[18px]" />
                </IconBtn>
                <IconBtn label="음량">
                  <Volume2 className="size-[18px]" />
                </IconBtn>
                <span className="ml-2 text-[13px] tabular-nums text-white/80">
                  {formatDuration(position)} <span className="text-white/40">/ {formatDuration(vod.duration)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])}
                  className="ml-auto rounded px-2 py-1 text-[13px] font-semibold tabular-nums text-white/80 hover:bg-white/10"
                  aria-label="재생 속도"
                >
                  {speed}x
                </button>
              </div>
            </div>
          </div>

          {/* 진도 · 포인트 (H-04-04) */}
          <ProgressCard ratio={s.ratio} />

          {/* 정보 영역 (H-04-01) */}
          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-navy-900 px-1.5 py-0.5 text-[11px] font-bold text-white">다시보기</span>
              <span className="text-[13px] font-semibold text-slate-500">{CATEGORY_LABEL[vod.category]}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold leading-8 tracking-[-0.02em] sm:text-[26px] sm:leading-[34px]">{vod.title}</h1>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] tabular-nums text-slate-500">
                <span>라이브 {formatDate(vod.liveAt, true)}</span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="size-3.5" />
                  조회 {formatCount(vod.views)}
                </span>
                <span>{Math.round(vod.duration / 60)}분</span>
              </p>
              {/* 액션 (H-04-02) */}
              <div className="flex gap-2">
                <ActionBtn on={marked} onClick={() => toast(toggleBookmark(vod.id) ? "북마크에 저장했습니다" : "북마크를 해제했습니다")}>
                  <Bookmark className={`size-4 ${marked ? "fill-current" : ""}`} /> 북마크
                </ActionBtn>
                <ActionBtn onClick={share}>
                  <Share2 className="size-4" /> 공유
                </ActionBtn>
                <ActionBtn
                  onClick={() => setSide("files")}
                  disabled={vod.materials.length === 0}
                >
                  <Download className="size-4" /> 자료 {vod.materials.length}
                </ActionBtn>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[vod.sub, ...vod.departments].filter(Boolean).map((t) => (
                <span key={t} className="rounded border border-teal-100 bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-line bg-white p-5 shadow-card">
              <h2 className="text-sm font-bold text-slate-500">연자</h2>
              <ul className="mt-3 divide-y divide-line">
                {vod.speakerIds.map((id) => {
                  const sp = SPEAKERS[id];
                  const open = openBio === id;
                  return (
                    <li key={id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-navy-800">{sp.name.slice(0, 1)}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-bold text-navy-900">
                            {sp.name} <span className="text-[13px] font-medium text-slate-500">{sp.title}</span>
                          </p>
                          <p className="truncate text-[13px] text-slate-500">{sp.affiliation}</p>
                        </div>
                        <button type="button" onClick={() => setOpenBio(open ? null : id)} aria-expanded={open} className="inline-flex shrink-0 items-center gap-0.5 text-[13px] font-semibold text-cobalt-600 hover:underline">
                          연자 소개 보기 <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {open && <p className="ml-[52px] mt-2 text-[13px] leading-6 text-slate-600">{sp.bio}</p>}
                    </li>
                  );
                })}
              </ul>

              <h2 className="mt-6 text-sm font-bold text-slate-500">강연 소개</h2>
              <p className={`mt-2 text-[15px] leading-7 text-slate-700 ${showSummary ? "" : "line-clamp-2"}`}>{vod.summary}</p>
              <button type="button" onClick={() => setShowSummary((v) => !v)} className="mt-1 text-[13px] font-semibold text-slate-500 hover:text-navy-900">
                {showSummary ? "접기" : "더보기"}
              </button>
            </div>
          </section>
        </div>

        {/* 우측 탭: 목차 / 자료 / 채팅 (H-04-03) */}
        <aside className="flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card lg:sticky lg:top-20 lg:h-[calc(100dvh-6.5rem)]">
          <div className="flex border-b border-line" role="tablist">
            {(
              [
                ["toc", "목차"],
                ["files", `자료 ${vod.materials.length}`],
                ["chat", "채팅"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={side === k}
                onClick={() => setSide(k)}
                className={`relative flex-1 py-3 text-sm font-semibold ${side === k ? "text-navy-900 after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:bg-navy-900" : "text-slate-500 hover:text-navy-900"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {side === "toc" && <Toc vod={vod} current={currentChapter} buckets={stored?.buckets} onSeek={(t) => (started ? seek(t) : start(t))} />}
            {side === "files" && <Files vod={vod} onDownload={(n) => toast(`‘${n}’ 다운로드를 시작합니다`)} />}
            {side === "chat" && <Chat vod={vod} position={position} />}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold tracking-tight">연관 심포지엄</h2>
            <Link href={vod.category === "academic" ? "/vod?tab=academic" : `/vod?tab=${vod.category}`} className="text-sm font-semibold text-cobalt-600 hover:underline">
              연관 심포지엄 더보기
            </Link>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((v) => (
              <VodCard key={v.id} vod={v} href={`/vod/${v.id}${from ? `?from=${encodeURIComponent(from)}` : ""}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProgressCard({ ratio }: { ratio: number }) {
  const pct = Math.round(ratio * 100);
  const earned = ratio >= POINT_RATIO;
  const done = ratio >= COMPLETE_RATIO;
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center sm:gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-bold text-navy-900">
            시청 진도 <span className="tabular-nums text-cobalt-600">{pct}%</span>
          </p>
          <p className="text-xs text-slate-400">실제 재생한 구간만 반영</p>
        </div>
        <div className="relative mt-2 h-2 rounded-full bg-slate-100">
          <span className={`absolute inset-y-0 left-0 rounded-full ${done ? "bg-teal-500" : "bg-cobalt-600"}`} style={{ width: `${pct}%` }} />
          <Marker at={POINT_RATIO} label="포인트" />
          <Marker at={COMPLETE_RATIO} label="완료" />
        </div>
        <div className="h-4" />
      </div>
      <div className="flex shrink-0 gap-2 sm:w-56 sm:flex-col">
        <Status ok={earned} icon={Coins} text={earned ? `${POINT_AMOUNT}P 적립 완료` : `${Math.round(POINT_RATIO * 100 - pct)}% 더 보면 ${POINT_AMOUNT}P`} />
        <Status ok={done} icon={CheckCircle2} text={done ? "시청 완료" : `시청 완료까지 ${Math.round(COMPLETE_RATIO * 100 - pct)}%`} />
      </div>
    </div>
  );
}

function Marker({ at, label }: { at: number; label: string }) {
  return (
    <span className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${at * 100}%` }}>
      <span className="h-2 w-0.5 bg-white" />
      <span className="mt-1 text-[10px] font-semibold tabular-nums text-slate-400">
        {label} {Math.round(at * 100)}%
      </span>
    </span>
  );
}

function Status({ ok, icon: Icon, text }: { ok: boolean; icon: typeof Coins; text: string }) {
  return (
    <p className={`flex flex-1 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold ${ok ? "bg-teal-50 text-teal-700" : "bg-slate-50 text-slate-500"}`}>
      <Icon className="size-3.5 shrink-0" /> {text}
    </p>
  );
}

function Toc({ vod, current, buckets, onSeek }: { vod: Vod; current: number; buckets?: number[]; onSeek: (t: number) => void }) {
  const set = new Set(buckets ?? []);
  const groups = vod.chapters.reduce<{ session: string; items: { c: Vod["chapters"][number]; i: number }[] }[]>((acc, c, i) => {
    const g = acc[acc.length - 1];
    if (g && g.session === c.session) g.items.push({ c, i });
    else acc.push({ session: c.session, items: [{ c, i }] });
    return acc;
  }, []);

  const chapterWatched = (i: number) => {
    const startB = Math.floor(vod.chapters[i].start / BUCKET_SEC);
    const endB = Math.ceil((vod.chapters[i + 1]?.start ?? vod.duration) / BUCKET_SEC);
    let n = 0;
    for (let b = startB; b < endB; b++) if (set.has(b)) n++;
    return n / Math.max(1, endB - startB) >= COMPLETE_RATIO;
  };

  return (
    <div className="p-2">
      {groups.map((g) => (
        <div key={g.session} className="mb-2">
          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{g.session}</p>
          <ul>
            {g.items.map(({ c, i }) => {
              const on = i === current;
              const watched = chapterWatched(i);
              return (
                <li key={c.start}>
                  <button type="button" onClick={() => onSeek(c.start)} className={`flex w-full gap-3 rounded-md px-3 py-2.5 text-left ${on ? "bg-cobalt-50" : "hover:bg-slate-50"}`}>
                    <span className={`w-12 shrink-0 pt-px text-xs font-semibold tabular-nums ${on ? "text-cobalt-600" : "text-slate-400"}`}>{formatDuration(c.start)}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold leading-5 ${on ? "text-cobalt-700" : "text-navy-900"}`}>{c.title}</span>
                      {c.speakerId && <span className="mt-0.5 block text-xs text-slate-500">{SPEAKERS[c.speakerId].name} {SPEAKERS[c.speakerId].title}</span>}
                    </span>
                    {watched && <Check className="mt-0.5 size-4 shrink-0 text-teal-600" aria-label="시청함" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Files({ vod, onDownload }: { vod: Vod; onDownload: (name: string) => void }) {
  if (vod.materials.length === 0) return <p className="px-6 py-16 text-center text-sm text-slate-500">제공되는 자료가 없습니다</p>;
  return (
    <ul className="divide-y divide-line">
      {vod.materials.map((m) => {
        const Icon = m.type === "XLS" ? FileSpreadsheet : FileText;
        return (
          <li key={m.name} className="flex items-center gap-3 px-4 py-3.5">
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-md ${m.type === "XLS" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
              <Icon className="size-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-navy-900">{m.name}</span>
              <span className="text-xs tabular-nums text-slate-400">
                {m.type} · {m.size}
              </span>
            </span>
            <button type="button" onClick={() => onDownload(m.name)} aria-label={`${m.name} 다운로드`} className="flex size-9 items-center justify-center rounded-md border border-line text-slate-500 hover:bg-slate-50 hover:text-navy-900">
              <Download className="size-4" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// 라이브 당시 채팅을 재생 위치에 맞춰 보여준다. 다시보기에서는 입력 불가.
function Chat({ vod, position }: { vod: Vod; position: number }) {
  const visible = vod.chat.filter((c) => c.at <= position);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ block: "nearest" }), [visible.length]);
  return (
    <div className="flex h-full flex-col">
      <p className="border-b border-line bg-slate-50 px-4 py-2 text-xs text-slate-500">라이브 당시 채팅 · 재생 위치에 맞춰 표시됩니다</p>
      <ul className="flex-1 space-y-3 p-4">
        {visible.length === 0 && <li className="py-10 text-center text-sm text-slate-400">재생하면 라이브 채팅이 표시됩니다</li>}
        {visible.map((c) => (
          <li key={c.at} className="text-sm">
            <span className="mr-2 text-xs font-semibold text-slate-500">{c.user}</span>
            <span className="mr-2 text-[11px] tabular-nums text-slate-300">{formatDuration(c.at)}</span>
            <p className="mt-0.5 leading-6 text-slate-700">{c.text}</p>
          </li>
        ))}
        <div ref={endRef} />
      </ul>
      <div className="flex items-center gap-2 border-t border-line p-3">
        <Lock className="size-3.5 text-slate-400" />
        <span className="text-xs text-slate-400">다시보기에서는 채팅을 입력할 수 없습니다</span>
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex size-9 items-center justify-center rounded-md text-white/85 hover:bg-white/10 hover:text-white">
      {children}
    </button>
  );
}

function ActionBtn({ on, onClick, disabled, children }: { on?: boolean; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-[13px] font-semibold transition-colors disabled:opacity-40 ${
        on ? "border-cobalt-600 bg-cobalt-50 text-cobalt-700" : "border-line bg-white text-slate-600 hover:bg-slate-50 hover:text-navy-900"
      }`}
    >
      {children}
    </button>
  );
}
