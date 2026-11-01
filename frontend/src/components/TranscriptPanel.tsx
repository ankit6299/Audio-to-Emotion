"use client";

import { Segment, EmotionLabel } from "@/types";
import {
  EMOTION_COLORS,
  EMOTION_BG_COLORS,
  EMOTION_LABELS,
  formatTime,
} from "@/lib/constants";

interface Props {
  segments: Segment[];
}

/**
 * Color-coded transcript panel — each segment is rendered as a tinted chip
 * with the timestamp prefixed. Background color maps to the segment's
 * dominant emotion, matching the universal emotion→color scheme.
 */
export default function TranscriptPanel({ segments }: Props) {
  if (segments.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-6">
        <p className="text-sm text-neutral-500">No transcript segments yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Transcript
        </h3>
        <span className="text-xs text-neutral-600">
          {segments.length} segments
        </span>
      </div>

      {/* Scrollable transcript */}
      <div className="max-h-[480px] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {segments.map((seg, i) => {
          const emotion = seg.emotion as EmotionLabel;
          const bgColor = EMOTION_BG_COLORS[emotion] || EMOTION_BG_COLORS.neutral;
          const borderColor = EMOTION_COLORS[emotion] || EMOTION_COLORS.neutral;
          const label = EMOTION_LABELS[emotion] || emotion;

          return (
            <div
              key={i}
              className="group flex gap-3 rounded-xl p-3 transition hover:bg-white/[0.02]"
              style={{ backgroundColor: bgColor }}
            >
              {/* Timestamp */}
              <span
                className="mt-0.5 shrink-0 text-xs font-mono font-medium"
                style={{ color: borderColor }}
              >
                {formatTime(seg.start)}
              </span>

              {/* Text + emotion badge */}
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-neutral-200">
                  {seg.text}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      color: borderColor,
                      backgroundColor: `${borderColor}15`,
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: borderColor }}
                    />
                    {label}
                  </span>
                  <span className="text-[10px] text-neutral-600">
                    {(seg.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
