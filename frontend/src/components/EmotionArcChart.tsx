"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Segment, EmotionLabel } from "@/types";
import { EMOTION_COLORS, EMOTION_LABELS, formatTime } from "@/lib/constants";

interface Props {
  segments: Segment[];
}

/**
 * Map emotion labels to a numeric "valence" value for charting.
 * Higher = more positive. This creates a meaningful Y-axis.
 */
const EMOTION_VALENCE: Record<EmotionLabel, number> = {
  anger: 1,
  disgust: 2,
  fear: 2,
  sadness: 3,
  neutral: 4,
  surprise: 5,
  joy: 6,
};

/**
 * Emotional-arc chart — an area chart plotting the emotional valence
 * over time, with each data point colored by its emotion.
 * Uses Recharts with dark-themed styling matching the design system.
 */
export default function EmotionArcChart({ segments }: Props) {
  if (segments.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-6">
        <p className="text-sm text-neutral-500">No data to chart yet.</p>
      </div>
    );
  }

  // Build chart data — one point per segment.
  const data = segments.map((seg, i) => ({
    index: i,
    time: seg.start,
    timeLabel: formatTime(seg.start),
    valence: EMOTION_VALENCE[seg.emotion as EmotionLabel] ?? 4,
    emotion: seg.emotion as EmotionLabel,
    emotionLabel: EMOTION_LABELS[seg.emotion as EmotionLabel] || seg.emotion,
    text: seg.text.slice(0, 60) + (seg.text.length > 60 ? "…" : ""),
    color: EMOTION_COLORS[seg.emotion as EmotionLabel] || EMOTION_COLORS.neutral,
  }));

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Emotional Arc
        </h3>
        <span className="text-xs text-neutral-600">
          valence over time
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="arcGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="timeLabel"
              tick={{ fontSize: 11, fill: "#525252" }}
              axisLine={false}
              tickLine={false}
              interval={"preserveStartEnd"}
            />
            <YAxis
              domain={[0, 7]}
              ticks={[1, 2, 3, 4, 5, 6]}
              tickFormatter={(v: number) => {
                const labels: Record<number, string> = {
                  1: "Anger",
                  2: "Fear",
                  3: "Sad",
                  4: "Neutral",
                  5: "Surprise",
                  6: "Joy",
                };
                return labels[v] || "";
              }}
              tick={{ fontSize: 10, fill: "#525252" }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.06)" }}
            />
            <Area
              type="monotone"
              dataKey="valence"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#arcGradient)"
              dot={({ cx, cy, payload }: any) => (
                <circle
                  key={payload.index}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={payload.color}
                  stroke="#161616"
                  strokeWidth={2}
                />
              )}
              activeDot={{
                r: 6,
                stroke: "#22c55e",
                strokeWidth: 2,
                fill: "#161616",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ---- Custom tooltip ----

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-3 py-2 text-xs shadow-xl">
      <div className="mb-1 flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: d.color }}
        />
        <span className="font-semibold text-white">{d.emotionLabel}</span>
        <span className="text-neutral-500">at {d.timeLabel}</span>
      </div>
      <p className="max-w-[220px] text-neutral-400">{d.text}</p>
    </div>
  );
}
