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

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventType: string; location: string }>;
}): Promise<Metadata> {
  const { eventType, location } = await params;
  const pageData = getPageData(eventType, location);

  if (!pageData) {
    return {
      title: "Page Not Found",
    };
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
  params: Promise<{ eventType: string; location: string }>;
}) {
  const { eventType, location } = await params;
  const pageData = getPageData(eventType, location);

  if (!pageData) {
    notFound();
  }

  const relatedPages = getRelatedPages(pageData.eventType, pageData.location);
  const faqs = getFAQs(pageData.eventType, pageData.location);

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
            {pageData.location.area}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
            {pageData.h1}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            {pageData.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#inquire"
              className="bg-dark text-cream px-8 py-4 text-sm tracking-wide hover:bg-forest transition-colors"
            >
              Submit Inquiry
            </Link>
            <Link
              href="/#how-it-works"
              className="border border-dark px-8 py-4 text-sm tracking-wide hover:bg-dark hover:text-cream transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="py-24 px-6 bg-dark text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
              The Experience
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              Think open bar.
              <br />
              <span className="italic">But for Pok&eacute;mon cards.</span>
            </h2>
            <div className="space-y-6 text-cream/70 leading-relaxed text-lg">
              <p>
                Guests line up. They pick a pack. They rip it open. The whole room
                watches. Someone pulls a holographic Charizard and doesn&apos;t know
                what they&apos;re holding until everyone loses their mind.
              </p>
              <p>
                A grandfather pulls a rare card and suddenly he&apos;s the center of
                attention. Kids and adults end up at the same counter for the first
                time all night — all of them excited about the same thing.
              </p>
              <p>
                No cost to the guest. No prices visible. Just the pop of foil
                wrappers, the thrill of the pull, and stories they&apos;ll be telling
                for years.
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
            {pageData.location.region} Service Area
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Serving {pageData.location.name} and surrounding areas
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re based in Seattle and travel throughout the Puget Sound region
            for events. {pageData.location.name} is well within our service area.
          </p>
          {pageData.location.neighborhoods.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {pageData.location.neighborhoods.map((neighborhood) => (
                <span
                  key={neighborhood}
                  className="px-4 py-2 border border-border text-sm text-muted"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqs} location={pageData.location.name} />

      {/* CTA Section */}
      <CTASection
        eventType={pageData.eventType.shortName.toLowerCase().replace(/s$/, "")}
        location={pageData.location.name}
      />

      {/* Related Pages */}
      <RelatedPages pages={relatedPages} currentLocation={pageData.location.name} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
