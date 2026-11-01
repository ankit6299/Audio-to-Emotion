"use client";

import { useState, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import { AnalysisResult, PipelineStage } from "@/types";
import { API_URL } from "@/lib/constants";

import Navbar from "@/components/Navbar";
import HeroBadges from "@/components/HeroBadges";
import HeroSection from "@/components/HeroSection";
import EmotionPulseCard from "@/components/EmotionPulseCard";
import StepStrip from "@/components/StepStrip";
import UploadModal from "@/components/UploadModal";
import TranscriptPanel from "@/components/TranscriptPanel";
import EmotionArcChart from "@/components/EmotionArcChart";
import EmotionLegend from "@/components/EmotionLegend";
import EmotionDistribution from "@/components/EmotionDistribution";

/**
 * Main page — composes all sections:
 * Navbar → Hero (badges, headline, CTA, pulse card) → Step strip →
 * Analysis view (transcript + chart + legend + distribution).
 *
 * State is managed locally via useState — no external state library needed
 * for this single-page flow.
 */
export default function Home() {
  // ---- State ----
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  // ---- Upload handler ----
  const handleFileSelect = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setError(null);
      setResult(null);

      try {
        // Stage 1: Uploading
        setStage("uploading");

        const formData = new FormData();
        formData.append("file", file);

        // Stage 2: Transcribing (set immediately — actual STT runs server-side)
        setStage("transcribing");

        const response = await fetch(`${API_URL}/api/analyze`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(
            body.detail || `Server error ${response.status}`
          );
        }

        // Stage 3: Classifying (brief visual state before result renders)
        setStage("classifying");

        const data: AnalysisResult = await response.json();

        // Small delay so the "Classify" step is visible in the strip.
        await new Promise((r) => setTimeout(r, 400));

        // Stage 4: Done
        setResult(data);
        setStage("done");
      } catch (err: any) {
        console.error("Analysis failed:", err);
        setError(err.message || "An unexpected error occurred.");
        setStage("error");
      }
    },
    []
  );

  // ---- "Try a Sample Clip" handler ----
  const handleSampleClick = useCallback(async () => {
    setFileName("sample-clip.mp3");
    setError(null);
    setResult(null);

    try {
      setStage("uploading");

      // Brief visual pause so the "Upload" step is visible
      await new Promise((r) => setTimeout(r, 300));
      setStage("transcribing");

      const response = await fetch(`${API_URL}/api/analyze-sample`, {
        method: "POST",
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail || `Server error ${response.status}`);
      }

      setStage("classifying");
      const data: AnalysisResult = await response.json();

      // Small delay so the "Classify" step is visible in the strip.
      await new Promise((r) => setTimeout(r, 400));

      setResult(data);
      setStage("done");
    } catch (err: any) {
      console.error("Sample analysis failed:", err);
      setError(err.message || "An unexpected error occurred.");
      setStage("error");
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* ---- Upload Modal ---- */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onFileSelect={handleFileSelect}
      />

      <main className="mx-auto max-w-[1400px] px-6 pt-24 pb-16">
        {/* ======== HERO SECTION ======== */}
        <section className="mb-8">
          {/* Badges row */}
          <div className="mb-10">
            <HeroBadges fileName={fileName} result={result} />
          </div>

          {/* Hero content + Emotion Pulse card */}
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
            <HeroSection
              onUploadClick={() => setUploadOpen(true)}
              onSampleClick={handleSampleClick}
            />
            <EmotionPulseCard result={result} />
          </div>
        </section>

        {/* ======== STEP STRIP ======== */}
        <section className="mb-12">
          <StepStrip stage={stage} />
        </section>

        {/* ======== ERROR STATE ======== */}
        {stage === "error" && error && (
          <section className="mb-8">
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="font-semibold text-red-400">Analysis Failed</p>
                <p className="mt-1 text-sm text-red-300/80">{error}</p>
                <button
                  onClick={() => setUploadOpen(true)}
                  className="mt-3 text-sm font-medium text-red-400 underline underline-offset-4 transition hover:text-red-300"
                >
                  Try another file
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ======== LOADING STATE ======== */}
        {(stage === "uploading" ||
          stage === "transcribing" ||
          stage === "classifying") && (
          <section className="mb-8">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-[#161616] py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <p className="text-sm text-neutral-400">
                {stage === "uploading" && "Uploading audio file…"}
                {stage === "transcribing" &&
                  "Transcribing with Whisper — this may take a moment…"}
                {stage === "classifying" && "Classifying emotions…"}
              </p>
              <p className="text-xs text-neutral-600">
                {fileName && `Processing: ${fileName}`}
              </p>
            </div>
          </section>
        )}

        {/* ======== ANALYSIS RESULTS ======== */}
        {stage === "done" && result && (
          <section className="space-y-6">
            {/* Legend */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#161616] px-6 py-4">
              <EmotionLegend />
            </div>

            {/* Transcript + Chart side by side */}
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <TranscriptPanel segments={result.segments} />
              <div className="space-y-6">
                <EmotionArcChart segments={result.segments} />
                <EmotionDistribution
                  distribution={result.emotion_distribution}
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
