import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms of Service for the Fantasy Baseball Trade Analyzer.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-navy tracking-tight">
        Terms of Service
      </h1>
      
      <section className="space-y-4">
        <p className="text-main-text">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <h2 className="text-xl font-bold text-midnight-navy">1. Acceptance of Terms</h2>
        <p className="text-main-text">
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-xl font-bold text-midnight-navy">2. Disclaimer</h2>
        <p className="text-main-text">
          The trade values and analysis provided are for informational and entertainment purposes only. We are not responsible for the outcome of your fantasy baseball leagues.
        </p>
      </section>
    </div>
  );
}
