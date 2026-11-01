"use client";

import { ArrowRight } from "lucide-react";
import { PipelineStage } from "@/types";

interface Props {
  stage: PipelineStage;
}

const STEPS = [
  { id: "uploading" as const, label: "Upload" },
  { id: "transcribing" as const, label: "Transcribe" },
  { id: "classifying" as const, label: "Classify" },
  { id: "done" as const, label: "Visualize" },
];

/** Index lookup for determining which steps are complete / active. */
const STAGE_INDEX: Record<PipelineStage, number> = {
  idle: -1,
  uploading: 0,
  transcribing: 1,
  classifying: 2,
  done: 3,
  error: -1,
};

/**
 * Bottom step strip — "Upload → Transcribe → Classify → Visualize".
 * Mirrors the reference's "Pre-Price → Compare → Decide → List" bar.
 * Active step is highlighted green; completed steps are dimmed green.
 */
export default function StepStrip({ stage }: Props) {
  const activeIndex = STAGE_INDEX[stage];

  return (
    <div className="flex items-center justify-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-3">
      {STEPS.map((step, i) => {
        const isActive = i === activeIndex;
        const isComplete = i < activeIndex;
        const isFuture = i > activeIndex;

        return (
          <div key={step.id} className="flex items-center gap-1">
            <span
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : isComplete
                  ? "text-emerald-500/60"
                  : isFuture
                  ? "text-neutral-600"
                  : "text-neutral-600"
              }`}
            >
              {step.label}
              {isActive && stage !== "done" && (
                <span className="ml-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" />
              )}
            </span>
            {i < STEPS.length - 1 && (
              <ArrowRight
                className={`h-3.5 w-3.5 ${
                  isComplete ? "text-emerald-500/40" : "text-neutral-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
