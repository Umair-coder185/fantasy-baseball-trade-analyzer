import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for the Fantasy Baseball Trade Analyzer.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-navy tracking-tight">
        Privacy Policy
      </h1>
      
      <section className="space-y-4">
        <p className="text-main-text">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <h2 className="text-xl font-bold text-midnight-navy">1. Information We Collect</h2>
        <p className="text-main-text">
          We collect minimal information necessary to provide the service. We do not require you to create an account or provide personal information to use the basic trade analyzer features.
        </p>

        <h2 className="text-xl font-bold text-midnight-navy">2. How We Use Your Information</h2>
        <p className="text-main-text">
          Any data collected is used solely to improve the performance and functionality of the Trade Analyzer tool.
        </p>
      </section>
    </div>
  );
}
