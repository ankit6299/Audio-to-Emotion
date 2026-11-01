/**
 * Shared constants — emotion-to-color mapping, API URL, and helper utilities.
 *
 * This is the single place to change colors so the transcript chips,
 * arc chart, legend, badges, and distribution stats all stay in sync.
 */

import { EmotionLabel } from "@/types";

// ------------------------------------------------------------------
// API
// ------------------------------------------------------------------
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ------------------------------------------------------------------
// Emotion → Color mapping (hex values for inline styles & Recharts)
// ------------------------------------------------------------------
export const EMOTION_COLORS: Record<EmotionLabel, string> = {
  anger: "#ef4444",
  disgust: "#84cc16",
  fear: "#a855f7",
  joy: "#eab308",
  neutral: "#6b7280",
  sadness: "#3b82f6",
  surprise: "#f97316",
};

/** Softer background tints for transcript chips (20% opacity). */
export const EMOTION_BG_COLORS: Record<EmotionLabel, string> = {
  anger: "rgba(239,68,68,0.15)",
  disgust: "rgba(132,204,22,0.15)",
  fear: "rgba(168,85,247,0.15)",
  joy: "rgba(234,179,8,0.15)",
  neutral: "rgba(107,114,128,0.10)",
  sadness: "rgba(59,130,246,0.15)",
  surprise: "rgba(249,115,22,0.15)",
};

/** Human-readable labels with initial caps. */
export const EMOTION_LABELS: Record<EmotionLabel, string> = {
  anger: "Anger",
  disgust: "Disgust",
  fear: "Fear",
  joy: "Joy",
  neutral: "Neutral",
  sadness: "Sadness",
  surprise: "Surprise",
};

/** All emotion keys in a stable order for legends / charts. */
export const EMOTION_ORDER: EmotionLabel[] = [
  "joy",
  "surprise",
  "neutral",
  "fear",
  "sadness",
  "disgust",
  "anger",
];

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

/** Format seconds into mm:ss. */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Format duration into a human-readable string like "2m 34s". */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}
