"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useShell, type Role } from "./AppShell";

interface MenuItem {
  label: string;
  href?: string;
}

// 회원 유형별 GNB 카테고리 (CM-01). 의료진: 홈/VOD/콘텐츠/제품/이벤트, CMR은 화면 정의서의 CMR 1depth 기준.
const MENUS: Record<Role, MenuItem[]> = {
  doctor: [{ label: "홈", href: "/" }, { label: "VOD", href: "/vod" }, { label: "콘텐츠" }, { label: "제품" }, { label: "이벤트" }],
  cmr: [{ label: "홈", href: "/" }, { label: "제품·질환 검색" }, { label: "E-디테일" }, { label: "자료 전달" }, { label: "캘린더" }, { label: "성과" }],
};

export function Gnb() {
  const pathname = usePathname();
  const { role, setRole, toast } = useShell();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1680px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-baseline gap-1.5" aria-label="AGORA 홈">
          <span className="text-xl font-extrabold tracking-[-0.04em] text-navy-900">AGORA</span>
          <span className="hidden text-[11px] font-semibold tracking-wide text-slate-400 sm:inline">by 안국약품</span>
        </Link>

        <nav className="-mb-px flex h-full min-w-0 flex-1 items-stretch gap-1 overflow-x-auto" aria-label="주 메뉴">
          {MENUS[role].map((m) => {
            const active = m.href ? (m.href === "/" ? pathname === "/" : pathname.startsWith(m.href)) : false;
            const cls = `relative flex shrink-0 items-center px-3 text-[15px] font-semibold transition-colors ${
              active ? "text-navy-900 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-cobalt-600" : "text-slate-500 hover:text-navy-900"
            }`;
            return m.href ? (
              <Link key={m.label} href={m.href} className={cls} aria-current={active ? "page" : undefined}>
                {m.label}
              </Link>
            ) : (
              <button key={m.label} type="button" className={cls} onClick={() => toast(`'${m.label}' 화면은 준비 중입니다`)}>
                {m.label}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className="hidden size-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-navy-900 sm:flex" aria-label="통합 검색" onClick={() => toast("통합 검색은 준비 중입니다")}>
            <Search className="size-[18px]" />
          </button>
          <button type="button" className="relative flex size-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-navy-900" aria-label="알림 3건">
            <Bell className="size-[18px]" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-red-500" />
          </button>
          {/* 데모용 회원 유형 전환. 실서비스에서는 로그인 계정 정보로 결정된다. */}
          <div className="ml-2 flex rounded-md border border-line bg-slate-50 p-0.5 text-xs font-semibold" role="group" aria-label="데모 회원 유형">
            {(["doctor", "cmr"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                aria-pressed={role === r}
                className={`rounded px-2.5 py-1 transition-colors ${role === r ? "bg-white text-navy-900 shadow-sm" : "text-slate-500 hover:text-navy-900"}`}
              >
                {r === "doctor" ? "의료진" : "CMR"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
