import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = constructMetadata({
  title: "About Our Fantasy Baseball Trade Analyzer",
  description: "Learn more about the team and mission behind the Fantasy Baseball Trade Analyzer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" }
      ])} />
      <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-navy tracking-tight">
          About Us
        </h1>
        <p className="text-lg text-muted-text">
          We are passionate about fantasy sports and data analytics.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-midnight-navy">Our Mission</h2>
          <p className="text-main-text">
            Our goal is to provide fantasy baseball managers with the most accurate, intuitive, and lightning-fast trade analysis tools on the market. We want to remove the emotion and guesswork from trading so you can build a championship roster.
          </p>
        </section>
      </div>
    </>
  );
}
