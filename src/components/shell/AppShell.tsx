"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Gnb } from "./Gnb";
import { MrPanel } from "./MrPanel";

export type Role = "doctor" | "cmr";

interface ShellCtx {
  role: Role;
  setRole: (r: Role) => void;
  toast: (msg: string) => void;
}

const Ctx = createContext<ShellCtx | null>(null);

export function useShell() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useShell must be used inside AppShell");
  return c;
}

const ROLE_KEY = "agora.role";

// VOD는 의료진 전용. CMR·링크 수신자·비회원은 메뉴 비노출 + URL 직접 접근 시 안내 (H-03 화면 공통 규칙)
const DOCTOR_ONLY = ["/vod"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRoleState] = useState<Role>("doctor");
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 시청 화면은 플레이어 폭 확보를 위해 우측 패널을 레일로 접어서 시작한다.
  const isWatch = /^\/vod\/[^/]+/.test(pathname);
  const [panelOpen, setPanelOpen] = useState(!isWatch);
  useEffect(() => setPanelOpen(!isWatch), [isWatch]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ROLE_KEY);
      if (saved === "doctor" || saved === "cmr") setRoleState(saved);
    } catch {}
  }, []);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    try {
      window.localStorage.setItem(ROLE_KEY, r);
    } catch {}
  }, []);

  const toast = useCallback((msg: string) => {
    setMessage(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  const blocked = role === "cmr" && DOCTOR_ONLY.some((p) => pathname.startsWith(p));

  return (
    <Ctx.Provider value={{ role, setRole, toast }}>
      <div className="min-h-dvh bg-canvas">
        <Gnb />
        <div className="mx-auto flex max-w-[1680px]">
          <main className="min-w-0 flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8">{blocked ? <NoAccess /> : children}</main>
          <MrPanel open={panelOpen} onToggle={() => setPanelOpen((o) => !o)} />
        </div>
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-all duration-200 ${message ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        >
          {message && <div className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">{message}</div>}
        </div>
      </div>
    </Ctx.Provider>
  );
}

function NoAccess() {
  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl border border-line bg-white p-8 text-center shadow-card">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Lock className="size-5" />
      </div>
      <h1 className="mt-4 text-lg font-bold text-navy-900">의료진 전용 메뉴입니다</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">VOD 다시보기는 의료진 회원만 이용할 수 있습니다. CMR 계정에서는 제공되지 않습니다.</p>
      <Link href="/" className="mt-6 inline-flex h-10 items-center rounded-md bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-navy-800">
        홈으로
      </Link>
    </div>
  );
}
