import React from "react";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-midnight-navy via-[#0f2845] to-[#0a1829] text-white py-20 lg:py-32 overflow-hidden border-b border-[#1c3858]">
      {/* Restrained SVG Decoration - Field Motif */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center items-center">
        <svg
          viewBox="0 0 800 800"
          className="w-[800px] h-[800px] text-light-green"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* Diamond shape */}
          <path d="M400 100 L700 400 L400 700 L100 400 Z" strokeDasharray="8 8" />
          {/* Bases */}
          <rect x="385" y="85" width="30" height="30" transform="rotate(45 400 100)" fill="currentColor" />
          <rect x="685" y="385" width="30" height="30" transform="rotate(45 700 400)" fill="currentColor" />
          <rect x="85" y="385" width="30" height="30" transform="rotate(45 100 400)" fill="currentColor" />
          {/* Home plate */}
          <path d="M385 700 L415 700 L415 715 L400 730 L385 715 Z" fill="currentColor" />
        </svg>
      </div>

      <Container className="relative z-10 text-center flex flex-col items-center max-w-4xl space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center rounded-full border border-primary-blue/30 bg-primary-blue/10 px-3 py-1 text-sm font-bold text-primary-blue">
          <span className="flex h-2 w-2 rounded-full bg-light-green mr-2"></span>
          FREE FANTASY BASEBALL TOOL
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Fantasy Baseball <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-[#60a5fa] drop-shadow-sm">Trade Analyzer</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
          Use our fantasy baseball trade calculator to compare deals using league-aware player values, multi-player adjustments, and real-time Roto or Points scoring.
        </p>

        {/* Trust Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm font-semibold text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-ballpark-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Free to use
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-ballpark-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            No signup
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-ballpark-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Fast trade grades
          </div>
        </div>
      </Container>
    </section>
  );
}
