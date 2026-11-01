"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileAudio, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

const ACCEPTED = ".mp3,.wav,.m4a";
const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/x-m4a",
];

/**
 * Upload modal — drag-and-drop + click-to-browse.
 * Validates file type and shows the selected filename before confirming.
 */
export default function UploadModal({ open, onClose, onFileSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File): boolean => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["mp3", "wav", "m4a"].includes(ext)) {
      setError("Unsupported file type. Please use .mp3, .wav, or .m4a.");
      return false;
    }
    setError(null);
    return true;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && validate(file)) setSelected(file);
    },
    [validate]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validate(file)) setSelected(file);
    },
    [validate]
  );

  const handleConfirm = () => {
    if (selected) {
      onFileSelect(selected);
      setSelected(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelected(null);
    setError(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#161616] p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-1 text-lg font-bold text-white">Upload Audio</h2>
        <p className="mb-6 text-sm text-neutral-400">
          Select or drag an audio file to analyze its emotional arc.
        </p>

        {/* ---- Drop zone ---- */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-14 transition ${
            dragging
              ? "border-emerald-500 bg-emerald-500/[0.06]"
              : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
          }`}
        >
          <Upload
            className={`h-8 w-8 ${
              dragging ? "text-emerald-400" : "text-neutral-500"
            }`}
          />
          <p className="text-sm text-neutral-400">
            <span className="font-medium text-white">Click to browse</span> or
            drag & drop
          </p>
          <p className="text-xs text-neutral-600">.mp3, .wav, .m4a — up to 100 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* ---- Error ---- */}
        {error && (
          <p className="mt-3 text-sm font-medium text-red-400">{error}</p>
        )}

        {/* ---- Selected file ---- */}
        {selected && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <FileAudio className="h-5 w-5 text-emerald-400" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {selected.name}
              </p>
              <p className="text-xs text-neutral-500">
                {(selected.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-neutral-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ---- Confirm button ---- */}
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="mt-6 w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Analyze This File
        </button>
      </div>
    </div>
  );
}
