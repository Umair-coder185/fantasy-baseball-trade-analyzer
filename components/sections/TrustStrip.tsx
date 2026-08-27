import React from "react";
import { Container } from "@/components/ui/Container";

export function TrustStrip() {
  return (
    <section className="w-full bg-white border-y border-border-color py-8">
      <Container className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-midnight-navy">Instant</div>
          <div className="text-sm font-bold text-muted-text uppercase tracking-wider">Trade Evaluation</div>
        </div>
        <div className="hidden md:block w-px h-12 bg-border-color"></div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-primary-blue">Daily</div>
          <div className="text-sm font-bold text-muted-text uppercase tracking-wider">Data Updates</div>
        </div>
        <div className="hidden md:block w-px h-12 bg-border-color"></div>
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-ballpark-green">100%</div>
          <div className="text-sm font-bold text-muted-text uppercase tracking-wider">Free to Use</div>
        </div>
      </Container>
    </section>
  );
}
