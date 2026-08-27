import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description: "Get in touch with the Fantasy Baseball Trade Analyzer team for support or inquiries.",
  path: "/contact",
  noIndex: true,
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-navy tracking-tight">
        Contact Us
      </h1>
      
      <section className="space-y-4">
        <p className="text-main-text">
          Have a question, feedback, or a feature request? We would love to hear from you.
        </p>
        <p className="text-main-text">
          Email us at: <a href="mailto:support@tradeanalyzer.placeholder.com" className="text-primary-blue hover:underline">support@tradeanalyzer.placeholder.com</a>
        </p>
      </section>
    </div>
  );
}
