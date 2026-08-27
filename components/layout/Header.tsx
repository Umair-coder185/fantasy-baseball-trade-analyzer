import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="bg-midnight-navy text-white sticky top-0 z-50 border-b border-deep-navy-surface shadow-sm">
      <Container className="flex items-center justify-between h-16">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className="w-8 h-8 text-primary-blue group-hover:text-light-green transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="font-extrabold text-xl tracking-tight hidden sm:block">
            TradeAnalyzer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Trade Analyzer
          </Link>
          <Link href="/fantasy-baseball-trade-values" className="text-gray-300 hover:text-white transition-colors">
            Trade Values
          </Link>
          <Link href="/methodology" className="text-gray-300 hover:text-white transition-colors">
            Methodology
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/" passHref>
            <Button size="sm" className="bg-primary-blue hover:bg-blue-600 text-white border-0">
              Analyze a Trade
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation (Native details/summary) */}
        <details className="md:hidden group relative">
          <summary className="list-none p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue rounded-md">
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6 text-gray-300 group-open:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            {/* Close Icon */}
            <svg
              className="w-6 h-6 text-gray-300 hidden group-open:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </summary>
          {/* Mobile Menu Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-deep-navy-surface border border-midnight-navy rounded-md shadow-lg overflow-hidden flex flex-col z-50">
            <Link href="/" className="px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-midnight-navy hover:text-white border-b border-midnight-navy">
              Trade Analyzer
            </Link>
            <Link href="/fantasy-baseball-trade-values" className="px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-midnight-navy hover:text-white border-b border-midnight-navy">
              Trade Values
            </Link>
            <Link href="/methodology" className="px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-midnight-navy hover:text-white border-b border-midnight-navy">
              Methodology
            </Link>
            <Link href="/about" className="px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-midnight-navy hover:text-white border-b border-midnight-navy">
              About
            </Link>
            <Link href="/blog" className="px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-midnight-navy hover:text-white border-b border-midnight-navy">
              Blog
            </Link>
            <div className="p-4 bg-midnight-navy/50">
              <Link href="/" passHref>
                <Button className="w-full bg-primary-blue hover:bg-blue-600 border-0" size="sm">
                  Analyze a Trade
                </Button>
              </Link>
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}
