import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSection() {
  const faqs = [
    {
      question: "How often do player values update?",
      answer: "We update our fantasy baseball player values daily during the season. This ensures that recent performance trends, injuries, and role changes are reflected in the trade calculator.",
    },
    {
      question: "Do you support dynasty or keeper leagues?",
      answer: "Currently, our tool is optimized for single-season redraft leagues. Evaluating dynasty trades requires complex age and prospect-curve weighting, which we plan to add in the future.",
    },
    {
      question: "Why does the tool penalize 3-for-1 trades?",
      answer: "In a 3-for-1 trade, the team receiving three players must drop two players from their current roster to make room. Our engine factors in the replacement-level value of those lost roster spots, preventing a package of average players from mathematically equalling one superstar.",
    },
    {
      question: "Is this trade analyzer free?",
      answer: "Yes, the Fantasy Baseball Trade Analyzer is completely free to use with no account or registration required.",
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <Container className="max-w-3xl space-y-12">
        <div className="text-center">
          <SectionHeading 
            title="Frequently Asked Questions" 
            className="items-center justify-center flex flex-col"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-page-background border border-border-color rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between p-6 font-bold text-main-text cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-inset">
                {faq.question}
                <span className="ml-4 flex-shrink-0 text-primary-blue transition-transform duration-200 group-open:rotate-180">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-muted-text border-t border-border-color/50 bg-white leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
