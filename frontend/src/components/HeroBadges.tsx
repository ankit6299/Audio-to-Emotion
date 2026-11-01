"use client";

import { ChevronDown, Circle } from "lucide-react";
import { AnalysisResult, EmotionLabel } from "@/types";
import { EMOTION_COLORS, EMOTION_LABELS } from "@/lib/constants";

interface Props {
  fileName: string | null;
  result: AnalysisResult | null;
}

/**
 * Hero badges — top-left row matching the reference's "Last visited" pill
 * and the "Mid-Tier market" status badge.
 *
 * Mapped to: "Last analyzed — [filename]" + dominant emotion badge.
 */
export default function HeroBadges({ fileName, result }: Props) {
  const dominantEmotion = result?.dominant_emotion as EmotionLabel | undefined;
  const emotionColor = dominantEmotion
    ? EMOTION_COLORS[dominantEmotion]
    : "#6b7280";
  const emotionText = dominantEmotion
    ? EMOTION_LABELS[dominantEmotion]
    : null;

  // Build a short status phrase from the dominant emotion.
  const statusPhrase = dominantEmotion
    ? getStatusPhrase(dominantEmotion)
    : null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* ---- "Last analyzed" pill ---- */}
      <button className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm transition hover:bg-white/[0.06]">
        <Circle className="h-3 w-3 fill-emerald-500 text-emerald-500" />
        <span className="text-neutral-400">Last analyzed</span>
        <span className="font-medium text-white">
          {fileName || "No file yet"}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
      </button>

      {/* ---- Dominant emotion status badge ---- */}
      {statusPhrase && (
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: emotionColor }}
          />
          {statusPhrase}
        </div>
      )}
    </div>
  );
}

/** Map the dominant emotion to a concise human phrase. */
function getStatusPhrase(emotion: EmotionLabel): string {
  const phrases: Record<EmotionLabel, string> = {
    anger: "Frustration spike detected",
    disgust: "Displeasure signals present",
    fear: "Anxiety undertones found",
    joy: "Mostly Positive",
    neutral: "Mostly Neutral",
    sadness: "Somber tone detected",
    surprise: "Surprise signals detected",
  };
  return phrases[emotion];
}
