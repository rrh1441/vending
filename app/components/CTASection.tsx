import Link from "next/link";

interface CTASectionProps {
  venueType: string;
  neighborhood: string;
}

export default function CTASection({ venueType, neighborhood }: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-dark text-cream">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
          Get Started
        </p>
        <h2 className="font-serif text-3xl md:text-4xl mb-6">
          Want one in your {neighborhood} {venueType}?
        </h2>
        <p className="text-cream/70 text-lg mb-8 max-w-xl mx-auto">
          Join the founding-host waitlist. We&apos;ll be in touch to walk through the
          space, the split, and timing. No cost, no commitment.
        </p>
        <Link
          href="/#waitlist"
          className="inline-block bg-gold text-cream px-8 py-4 text-sm tracking-wide hover:bg-gold/90 transition-colors font-medium"
        >
          Join the Host Waitlist
        </Link>
      </div>
    </section>
  );
}
