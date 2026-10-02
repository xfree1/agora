import { Suspense } from "react";
import type { Metadata } from "next";
import { VodList } from "@/components/vod/VodList";

export const metadata: Metadata = { title: "VOD 다시보기 · AGORA" };

export default function VodPage() {
  return (
    <Suspense>
      <VodList />
    </Suspense>
  );
}
