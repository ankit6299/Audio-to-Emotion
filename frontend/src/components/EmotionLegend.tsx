"use client";

import { EmotionLabel } from "@/types";
import {
  EMOTION_COLORS,
  EMOTION_LABELS,
  EMOTION_ORDER,
} from "@/lib/constants";

/**
 * Compact legend mapping each of the 7 emotions to its assigned color.
 * Displayed below or beside the transcript/chart panels.
 */
export default function EmotionLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {EMOTION_ORDER.map((emotion) => (
        <div key={emotion} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: EMOTION_COLORS[emotion] }}
          />
          <span className="text-xs text-neutral-400">
            {EMOTION_LABELS[emotion]}
          </span>
        </div>
      ))}
    </div>
  );
}
