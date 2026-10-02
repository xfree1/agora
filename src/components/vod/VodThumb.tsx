import type { Vod } from "@/lib/vod-data";
import { CATEGORY_LABEL, SPEAKERS } from "@/lib/vod-data";

// 썸네일 이미지 자리. 실제 썸네일 등록 전까지 분류별 그래픽으로 대체한다.
// 학술 = 네이비 베이스 + 질환별 포인트 색, 교육 = 틸 계열, 병원경영 = 슬레이트 계열
const TONES: Record<string, string> = {
  순환기: "from-navy-900 via-navy-800 to-[#8c2f4a]",
  호흡기: "from-navy-900 via-navy-800 to-[#1f6fb2]",
  소화기: "from-navy-900 via-navy-800 to-[#9a5b25]",
  "내분비·대사": "from-navy-900 via-navy-800 to-[#5b3fa0]",
  근골격: "from-navy-900 via-navy-800 to-[#2f6b4f]",
  신경: "from-navy-900 via-navy-800 to-[#2d5d8a]",
  "임상 업데이트": "from-[#0b3b47] via-[#0f5e63] to-teal-600",
  "처방 가이드": "from-[#0b3b47] via-[#105a6e] to-[#1a7f9c]",
  "케이스 스터디": "from-[#0b3b47] via-[#14524a] to-[#2b8a6e]",
  "5분 디테일": "from-[#0b3b47] via-[#0f5e63] to-[#3aa39a]",
  병원경영: "from-[#2a2f45] via-[#3d4466] to-[#5b6390]",
};

export function VodThumb({ vod, large = false, hideLabel = false }: { vod: Vod; large?: boolean; hideLabel?: boolean }) {
  const speaker = SPEAKERS[vod.speakerIds[0]];
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${TONES[vod.sub ?? "병원경영"]}`}>
      <div aria-hidden className="absolute -right-10 -top-12 size-48 rounded-full border border-white/10" />
      <div aria-hidden className="absolute -right-2 top-10 size-28 rounded-full border border-white/10" />
      <div className={`absolute inset-0 flex flex-col justify-between ${large ? "p-8" : "p-4"}`}>
        <span className={`font-semibold tracking-wide text-white/60 ${large ? "text-sm" : "text-[11px]"} ${hideLabel ? "invisible" : ""}`}>
          AGORA · {CATEGORY_LABEL[vod.category]}
        </span>
        <div>
          <p className={`font-bold leading-tight tracking-tight text-white ${large ? "text-4xl" : "text-xl"}`}>{vod.sub ?? "병원경영"}</p>
          <p className={`mt-1 truncate font-medium text-white/70 ${large ? "text-base" : "text-xs"}`}>
            {speaker.name} {speaker.title}
          </p>
        </div>
      </div>
    </div>
  );
}
