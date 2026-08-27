import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ArticleCTA() {
  return (
    <div className="my-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center shadow-sm">
      <h3 className="text-2xl md:text-3xl font-extrabold text-midnight-navy mb-4">
        Ready to evaluate your trades?
      </h3>
      <p className="text-main-text text-lg mb-8 max-w-xl mx-auto">
        Stop guessing and start building a championship roster. Use our free analyzer to see the math behind the trade.
      </p>
      <Link href="/">
        <Button size="lg" className="px-8 py-6 text-lg font-bold shadow-lg hover:scale-105 transition-transform">
          Analyze Your Trade Now
        </Button>
      </Link>
    </div>
  );
}
