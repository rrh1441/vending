import Link from "next/link";

interface CTASectionProps {
  eventType: string;
  location: string;
}

export default function CTASection({ eventType, location }: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-dark text-cream">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
          Get Started
        </p>
        <h2 className="font-serif text-3xl md:text-4xl mb-6">
          Ready to bring the card bar to your {eventType} in {location}?
        </h2>
        <p className="text-cream/70 text-lg mb-8 max-w-xl mx-auto">
          Tell us about your event. We&apos;ll design a setup that fits your venue,
          guest count, and budget.
        </p>
        <Link
          href="/#inquire"
          className="inline-block bg-gold text-dark px-8 py-4 text-sm tracking-wide hover:bg-gold/90 transition-colors font-medium"
        >
          Submit Inquiry
        </Link>
      </div>
    </section>
  );
}
