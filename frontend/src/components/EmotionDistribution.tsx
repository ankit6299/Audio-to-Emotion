"use client";

import { EmotionLabel } from "@/types";
import { EMOTION_COLORS, EMOTION_LABELS } from "@/lib/constants";

interface Props {
  distribution: Partial<Record<EmotionLabel, number>>;
}

/**
 * Emotion distribution summary — horizontal bar showing the percentage
 * breakdown of each emotion across all segments, styled as a compact
 * stats row matching the reference's "3 stats at bottom of card" pattern.
 */
export default function EmotionDistribution({ distribution }: Props) {
  // Sort by percentage descending.
  const sorted = Object.entries(distribution)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
    .filter(([, v]) => (v ?? 0) > 0) as [EmotionLabel, number][];

  if (sorted.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-400">
        Emotion Distribution
      </h3>

      {/* ---- Stacked bar ---- */}
      <div className="mb-5 flex h-3 overflow-hidden rounded-full bg-white/[0.04]">
        {sorted.map(([emotion, pct]) => (
          <div
            key={emotion}
            className="transition-all duration-500"
            style={{
              width: `${pct}%`,
              backgroundColor: EMOTION_COLORS[emotion],
              minWidth: pct > 0 ? "4px" : "0",
            }}
            title={`${EMOTION_LABELS[emotion]}: ${pct}%`}
          />
        ))}
      </div>

      {/* ---- Stat chips ---- */}
      <div className="flex flex-wrap gap-3">
        {sorted.map(([emotion, pct]) => (
          <div
            key={emotion}
            className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: EMOTION_COLORS[emotion] }}
            />
            <span className="text-xs font-medium text-neutral-300">
              {EMOTION_LABELS[emotion]}
            </span>
            <span className="text-xs font-bold text-white">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
