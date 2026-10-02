"use client";

import Link from "next/link";
import { Bookmark, CheckCircle2, Eye } from "lucide-react";
import type { Vod } from "@/lib/vod-data";
import { SPEAKERS, formatCount, formatDate, formatDuration } from "@/lib/vod-data";
import { summarize, toggleBookmark, useVodState } from "@/lib/vod-store";
import { VodThumb } from "./VodThumb";
import { useShell } from "../shell/AppShell";

export function VodCard({ vod, href, onNavigate }: { vod: Vod; href: string; onNavigate?: () => void }) {
  const { progress, bookmarks } = useVodState();
  const { toast } = useShell();
  const s = summarize(vod, progress[vod.id]);
  const marked = bookmarks.includes(vod.id);
  const speakers = vod.speakerIds.map((id) => SPEAKERS[id]);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition-shadow hover:border-slate-300 hover:shadow-card-hover">
      <div className="relative aspect-video">
        <VodThumb vod={vod} hideLabel={s.status !== "none"} />
        {/* 상태 배지 (H-03-03) */}
        {s.status === "done" && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-white/95 px-1.5 py-0.5 text-[11px] font-bold text-teal-700">
            <CheckCircle2 className="size-3" /> 시청 완료
          </span>
        )}
        {s.status === "watching" && (
          <span className="absolute left-3 top-3 rounded bg-cobalt-600 px-1.5 py-0.5 text-[11px] font-bold text-white">시청 중 {Math.round(s.ratio * 100)}%</span>
        )}
        <span className="absolute bottom-2.5 right-2.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white">{formatDuration(vod.duration)}</span>
        {s.status !== "none" && (
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
            <span className={`block h-full ${s.status === "done" ? "bg-teal-500" : "bg-cobalt-600"}`} style={{ width: `${Math.round(s.ratio * 100)}%` }} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5">
          {vod.sub && <span className="rounded border border-teal-100 bg-teal-50 px-1.5 py-0.5 text-[11px] font-semibold text-teal-700">{vod.sub}</span>}
          <span className="truncate text-[11px] font-medium text-slate-400">{vod.departments.slice(0, 2).join(" · ") || "전 진료과"}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-[15px] font-bold leading-[22px] tracking-tight text-navy-900 group-hover:text-cobalt-600">
          <Link href={href} onClick={onNavigate} className="after:absolute after:inset-0">
            {vod.title}
          </Link>
        </h3>
        <p className="mt-2 truncate text-[13px] text-slate-600">
          <span className="font-semibold text-navy-900">{speakers[0].name}</span> {speakers[0].title} · {speakers[0].affiliation}
          {speakers.length > 1 && <span className="text-slate-400"> 외 {speakers.length - 1}명</span>}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-3 text-xs tabular-nums text-slate-400">
          <span>{formatDate(vod.liveAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" /> {formatCount(vod.views)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bookmark className="size-3.5" /> {formatCount(vod.bookmarks + (marked ? 1 : 0))}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => toast(toggleBookmark(vod.id) ? "북마크에 저장했습니다" : "북마크를 해제했습니다")}
        aria-pressed={marked}
        aria-label={marked ? "북마크 해제" : "북마크"}
        className="absolute right-2.5 top-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
      >
        <Bookmark className={`size-4 ${marked ? "fill-white" : ""}`} />
      </button>
    </article>
  );
}
