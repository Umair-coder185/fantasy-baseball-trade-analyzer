import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-deep-navy-surface text-muted-text py-8 mt-12 text-sm text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div>&copy; {new Date().getFullYear()} Fantasy Baseball Trade Analyzer. All rights reserved.</div>
        <nav className="flex gap-6">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
