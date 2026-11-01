"use client";

import { Activity, Clock, BarChart3, Zap } from "lucide-react";
import { AnalysisResult, EmotionLabel } from "@/types";
import {
  EMOTION_COLORS,
  EMOTION_LABELS,
  formatDuration,
} from "@/lib/constants";

interface Props {
  result: AnalysisResult | null;
}

/**
 * "Emotion Pulse" card — the right-side stats card matching the reference's
 * "Market Pulse" design: header row with caps label + "Live signals" pill
 * with pulsing green dot, a dynamic headline, and 3 bottom stat groups.
 */
export default function EmotionPulseCard({ result }: Props) {
  const dominant = result?.dominant_emotion as EmotionLabel | undefined;
  const emotionColor = dominant ? EMOTION_COLORS[dominant] : "#6b7280";

  // Dynamic headline based on the dominant emotion.
  const headline = dominant ? getHeadline(dominant) : "Awaiting Input";
  const description = dominant
    ? getDescription(dominant)
    : "Upload an audio file to see its emotional signature.";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#161616] p-6">
      {/* Subtle green glow at the top-right */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      {/* ---- Header row ---- */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
          Emotion Pulse
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live signals
        </span>
      </div>

      {/* ---- Headline metric ---- */}
      <div className="mb-6 flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${emotionColor}20` }}
        >
          <Activity className="h-6 w-6" style={{ color: emotionColor }} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{headline}</h3>
          <p className="mt-0.5 text-sm leading-relaxed text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      {/* ---- Bottom stat groups (3 columns) ---- */}
      <div className="grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-4">
        {/* Duration */}
        <StatGroup
          icon={<Clock className="h-3.5 w-3.5" />}
          label="Duration"
          value={result ? formatDuration(result.duration) : "—"}
          sub={result ? "total" : ""}
        />
        {/* Segments */}
        <StatGroup
          icon={<BarChart3 className="h-3.5 w-3.5" />}
          label="Segments"
          value={result ? String(result.segments.length) : "—"}
          sub={result ? "analyzed" : ""}
        />
        {/* Dominant emotion */}
        <StatGroup
          icon={<Zap className="h-3.5 w-3.5" style={{ color: emotionColor }} />}
          label="Dominant"
          value={dominant ? EMOTION_LABELS[dominant] : "—"}
          sub={
            dominant && result?.emotion_distribution[dominant]
              ? `${result.emotion_distribution[dominant]}%`
              : ""
          }
          valueColor={emotionColor}
        />
      </div>
    </div>
  );
}

// ---- Internal sub-component ----

function StatGroup({
  icon,
  label,
  value,
  sub,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-neutral-500">
        {icon}
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <span
        className="text-xl font-bold"
        style={{ color: valueColor || "#ffffff" }}
      >
        {value}
      </span>
      {sub && <span className="text-[11px] text-neutral-500">{sub}</span>}
    </div>
  );
}

// ---- Helpers ----

function getHeadline(emotion: EmotionLabel): string {
  const map: Record<EmotionLabel, string> = {
    anger: "Tension Rising",
    disgust: "Displeasure Detected",
    fear: "Anxiety Signals",
    joy: "Mostly Positive",
    neutral: "Balanced Tone",
    sadness: "Somber Undertones",
    surprise: "Surprise Peaks",
  };
  return map[emotion];
}

function getDescription(emotion: EmotionLabel): string {
  const map: Record<EmotionLabel, string> = {
    anger:
      "Elevated frustration detected across multiple segments of the conversation.",
    disgust:
      "Expressions of displeasure or distaste appear in the conversation.",
    fear: "Signs of anxiety or apprehension surface in the speaker's tone.",
    joy: "The conversation carries a predominantly positive and upbeat tone.",
    neutral:
      "A balanced, even-keeled tone throughout — no strong emotional shifts.",
    sadness: "A subdued, melancholic undertone runs through the conversation.",
    surprise:
      "Moments of surprise or astonishment punctuate the conversation.",
  };
  return map[emotion];
}
