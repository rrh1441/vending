import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPageSlugs,
  getPageData,
  getRelatedPages,
  getFAQs,
} from "@/app/lib/seo-data";
import Navigation from "@/app/components/Navigation";
import HowItWorks from "@/app/components/HowItWorks";
import FAQ from "@/app/components/FAQ";
import CTASection from "@/app/components/CTASection";
import RelatedPages from "@/app/components/RelatedPages";
import Footer from "@/app/components/Footer";

// Generate all static paths at build time
export async function generateStaticParams() {
  return getAllPageSlugs();
}

// Disable dynamic params - only pre-generated pages should work
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ venueType: string; neighborhood: string }>;
}): Promise<Metadata> {
  const { venueType, neighborhood } = await params;
  const pageData = getPageData(venueType, neighborhood);

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      type: "website",
    },
  };
}

export default async function SEOPage({
  params,
}: {
  params: Promise<{ venueType: string; neighborhood: string }>;
}) {
  const { venueType, neighborhood } = await params;
  const pageData = getPageData(venueType, neighborhood);

  if (!pageData) {
    notFound();
  }

  const relatedPages = getRelatedPages(pageData.venueType, pageData.neighborhood);
  const faqs = getFAQs(pageData.venueType, pageData.neighborhood);

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
            {pageData.neighborhood.name}, Seattle
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
            {pageData.h1}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            {pageData.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#waitlist"
              className="bg-dark text-cream px-8 py-4 text-sm tracking-wide hover:bg-forest transition-colors"
            >
              Join the Host Waitlist
            </Link>
            <Link
              href="/#how-it-works"
              className="border border-dark px-8 py-4 text-sm tracking-wide hover:bg-dark hover:text-cream transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Why host Section */}
      <section className="py-24 px-6 bg-dark text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              Why host one
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              Passive income from a few square feet.
            </h2>
            <div className="space-y-6 text-cream/70 leading-relaxed text-lg">
              <p>
                A small sealed trading-card vending machine draws a crowd and gives
                your regulars a reason to linger. {pageData.venueType.description}
              </p>
              <p>
                We handle everything — the machine, the genuine sealed product, restocking,
                maintenance, insurance, and the payment hardware. You just give it a corner
                and an outlet.
              </p>
              <p>
                You earn your choice of a revenue share or a flat monthly rent. No cost, no
                work, and if the spot doesn&apos;t perform we move the machine. Hosting is
                genuinely risk-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Service Area Callout */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
            Seattle Service Area
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Placing founding-host machines in {pageData.neighborhood.name}
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re a Seattle operator selecting founding-host locations across the city
            now. {pageData.neighborhood.name} {pageData.venueType.plural} are exactly the
            kind of adult, high-dwell spots we&apos;re looking for. Early hosts get priority.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqs} subtitle={`Hosting in ${pageData.neighborhood.name}`} />

      {/* CTA Section */}
      <CTASection
        venueType={pageData.venueType.name.toLowerCase()}
        neighborhood={pageData.neighborhood.name}
      />

      {/* Related Pages */}
      <RelatedPages
        pages={relatedPages}
        currentNeighborhood={pageData.neighborhood.name}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
