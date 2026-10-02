import Link from "next/link";

// 메인(C-04)은 다음 단계 구현 대상. 현재는 VOD 진입 안내만 둔다.
export default function Home() {
  return (
    <div className="mx-auto mt-16 max-w-lg rounded-xl border border-line bg-white p-8 shadow-card">
      <p className="text-xs font-bold tracking-wider text-cobalt-600">C-04 메인 · 준비 중</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">지식이 모이고, 새로운 가치가 시작되는 곳</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">메인 화면은 다음 단계에서 구현합니다. 지금은 VOD 다시보기 화면을 확인할 수 있습니다.</p>
      <Link href="/vod" className="mt-6 inline-flex h-10 items-center rounded-md bg-cobalt-600 px-4 text-sm font-semibold text-white hover:bg-cobalt-700">
        VOD 다시보기로 이동
      </Link>
    </div>
  );
}
