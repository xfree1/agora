import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VODS, getVod, relatedVods } from "@/lib/vod-data";
import { VodWatch } from "@/components/vod/VodWatch";

export function generateStaticParams() {
  return VODS.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const vod = getVod((await params).id);
  return { title: vod ? `${vod.title} · AGORA` : "AGORA" };
}

export default async function VodWatchPage({ params }: { params: Promise<{ id: string }> }) {
  const vod = getVod((await params).id);
  if (!vod) notFound();
  return (
    <Suspense>
      <VodWatch vod={vod} related={relatedVods(vod)} />
    </Suspense>
  );
}
