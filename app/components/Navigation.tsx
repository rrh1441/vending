import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f4e1]/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <img src="/salishlogo.png" alt="Salish Trading Co." className="h-10" />
        </Link>
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/#how-it-works" className="text-muted hover:text-dark transition-colors">
            How It Works
          </Link>
          <Link href="/#where-it-fits" className="text-muted hover:text-dark transition-colors">
            Where It Fits
          </Link>
          <Link href="/#waitlist" className="text-muted hover:text-dark transition-colors">
            Host Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
