import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmotionMapper — Transcript Emotion Mapper",
  description:
    "Upload a call, podcast, or meeting recording and visualize its emotional arc with AI-powered transcription and emotion classification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
