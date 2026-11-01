"use client";

import { Upload, Play } from "lucide-react";

interface Props {
  onUploadClick: () => void;
  onSampleClick: () => void;
}

/**
 * Hero section — large headline, subtitle, and two CTA buttons.
 * Mirrors the reference's "Know your position. Sell with confidence." layout
 * but adapted for emotion analysis copy.
 */
export default function HeroSection({ onUploadClick, onSampleClick }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* ---- Green caps label ---- */}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
        Audio Emotion Intelligence
      </p>

      {/* ---- Headline ---- */}
      <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
        Hear the tone.
        <br />
        See the shift.
      </h1>

      {/* ---- Subtitle ---- */}
      <p className="max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
        Upload a call, podcast, or meeting recording and watch its emotional arc
        unfold — before you have to listen to a second of it.
      </p>

      {/* ---- CTA buttons ---- */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={onUploadClick}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-[0.98]"
        >
          <Upload className="h-4 w-4" />
          Upload Audio
        </button>
        <button
          onClick={onSampleClick}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-3 text-sm font-semibold text-neutral-300 transition hover:bg-white/[0.08] active:scale-[0.98]"
        >
          <Play className="h-4 w-4" />
          Try a Sample Clip
        </button>
      </div>
    </div>
  );
}
