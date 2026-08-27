import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FinalCTA() {
  return (
    <section className="w-full py-24 bg-page-background border-t border-border-color">
      <Container className="text-center space-y-8 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-navy tracking-tight">
          Ready to Win Your League?
        </h2>
        <p className="text-lg text-muted-text">
          Stop guessing and start dominating. Run your next trade through our engine and see exactly who comes out on top.
        </p>
        <div className="pt-4">
          <Link 
            href="#"
            className="inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-blue text-white hover:bg-blue-700 focus:ring-primary-blue h-11 px-10 py-6 text-lg"
          >
            Analyze a Trade Now
          </Link>
        </div>
      </Container>
    </section>
  );
}
