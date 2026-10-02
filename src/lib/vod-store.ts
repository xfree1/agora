"use client";

import { useSyncExternalStore } from "react";
import { VODS, type Vod } from "./vod-data";

// 시청 진도·북마크를 브라우저에 보관한다. 실서비스에서는 서버 API로 대체되는 자리.

export const BUCKET_SEC = 10; // 진도 집계 단위. 실제 재생된 구간만 버킷으로 기록한다.
export const COMPLETE_RATIO = 0.9; // 시청 완료 기준 (H-03 미결: 90%)
export const POINT_RATIO = 0.5; // 포인트 적립 기준 (포인트 정책 기본안: 50%)
export const POINT_AMOUNT = 100;

export interface StoredProgress {
  position: number;
  buckets: number[];
  updatedAt: number;
}

interface State {
  progress: Record<string, StoredProgress>;
  bookmarks: string[];
}

const KEY = "agora.vod.v1";
const EMPTY: State = { progress: {}, bookmarks: [] };

let cache: State | null = null;
const listeners = new Set<() => void>();

function seeded(): State {
  const progress: Record<string, StoredProgress> = {};
  for (const v of VODS) {
    if (!v.seed) continue;
    const total = Math.ceil(v.duration / BUCKET_SEC);
    const n = Math.round(total * v.seed.ratio);
    progress[v.id] = { position: v.seed.position, buckets: Array.from({ length: n }, (_, i) => i), updatedAt: 0 };
  }
  return { progress, bookmarks: ["v011", "v002"] };
}

function read(): State {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as State) : seeded();
  } catch {
    cache = seeded();
  }
  return cache;
}

function write(next: State) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 저장 실패 시 메모리 상태만 유지
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useVodState(): State {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export type WatchStatus = "none" | "watching" | "done";

export function summarize(vod: Vod, p?: StoredProgress) {
  const total = Math.ceil(vod.duration / BUCKET_SEC);
  const ratio = p ? Math.min(1, new Set(p.buckets).size / total) : 0;
  const status: WatchStatus = ratio >= COMPLETE_RATIO ? "done" : p && (p.position > 0 || ratio > 0) ? "watching" : "none";
  return { ratio, status, position: p?.position ?? 0, pointEarned: ratio >= POINT_RATIO };
}

export function saveProgress(id: string, position: number, newBuckets: Iterable<number>) {
  const s = read();
  const prev = s.progress[id];
  const merged = new Set(prev?.buckets ?? []);
  for (const b of newBuckets) merged.add(b);
  write({
    ...s,
    progress: { ...s.progress, [id]: { position, buckets: [...merged].sort((a, b) => a - b), updatedAt: Date.now() } },
  });
}

export function toggleBookmark(id: string) {
  const s = read();
  const has = s.bookmarks.includes(id);
  write({ ...s, bookmarks: has ? s.bookmarks.filter((b) => b !== id) : [...s.bookmarks, id] });
  return !has;
}
