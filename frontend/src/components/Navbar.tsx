"use client";

import { Search, Sun, Moon } from "lucide-react";
import { useState } from "react";

/**
 * Top navigation bar — matches the reference's layout:
 * Logo/wordmark left • search input center • sign-in + theme toggle right.
 *
 * "Sign in" and theme toggle are visual-only for this build.
 */
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* ---- Logo / Wordmark ---- */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 13a6 6 0 1 0 12 0 6 6 0 1 0-12 0" />
              <path d="M10 13a6 6 0 1 0 12 0 6 6 0 1 0-12 0" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            EmotionMapper
          </span>
        </div>

        {/* ---- Center: Search past analyses (non-functional) ---- */}
        <div className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search past analyses…"
              disabled
              className="h-10 w-80 rounded-full border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 text-sm text-neutral-400 placeholder-neutral-600 outline-none focus:border-emerald-500/40"
            />
          </div>
        </div>

        {/* ---- Right side ---- */}
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-1.5 text-sm font-medium text-neutral-300 transition hover:bg-white/[0.08]">
            Sign in
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-neutral-400 transition hover:bg-white/[0.08]"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
