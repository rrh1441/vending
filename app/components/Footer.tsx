import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link href="/">
            <img src="/salishlogo.png" alt="Salish Trading Co." className="h-8" />
          </Link>
          <p className="text-sm text-muted mt-2">Seattle, WA</p>
        </div>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Salish Trading Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
