/**
 * TypeScript interfaces matching the backend's AnalysisResult schema.
 *
 * These types are the single source of truth for the shape of data
 * exchanged between the FastAPI backend and the Next.js frontend.
 */

/** The 7 emotion labels produced by the Ekman-based classifier. */
export type EmotionLabel =
  | "anger"
  | "disgust"
  | "fear"
  | "joy"
  | "neutral"
  | "sadness"
  | "surprise";

/** A single transcript segment enriched with emotion data. */
export interface Segment {
  start: number;
  end: number;
  text: string;
  emotion: EmotionLabel;
  confidence: number;
  speaker?: string | null; // future: speaker diarization
}

/** Full analysis result returned by POST /api/analyze. */
export interface AnalysisResult {
  segments: Segment[];
  duration: number;
  dominant_emotion: EmotionLabel;
  emotion_distribution: Partial<Record<EmotionLabel, number>>;
}

/**
 * Pipeline processing stages — drives the step-strip progress indicator
 * and controls which UI elements are shown/hidden.
 */
export type PipelineStage =
  | "idle"
  | "uploading"
  | "transcribing"
  | "classifying"
  | "done"
  | "error";
