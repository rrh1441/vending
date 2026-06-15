import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPageSlugs, getPageData, getNearbyPages } from "@/app/lib/seo-data";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export async function generateStaticParams() {
  return getAllPageSlugs();
}

// Only pre-generated, real pairs should resolve.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ venueType: string; location: string }>;
}): Promise<Metadata> {
  const { venueType, location } = await params;
  const pageData = getPageData(venueType, location);

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
  params: Promise<{ venueType: string; location: string }>;
}) {
  const { venueType, location } = await params;
  const pageData = getPageData(venueType, location);

  if (!pageData) {
    notFound();
  }

  const nearby = getNearbyPages(pageData.venueType, pageData.location);

  return (
    <main>
      <Navigation />

      {/* 1. Location + main benefit */}
      <section className="pt-40 pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
            {pageData.eyebrow}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl leading-[1.15] tracking-tight mb-6">
            {pageData.headline}
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6">
            {pageData.benefit}
          </p>
          <p className="text-lg text-muted leading-relaxed">
            We own, stock, service, and insure the machine and run the cashless payments.
            You give it a corner and an outlet, and take your choice of a revenue share or a
            flat monthly rent — no cost, no work, and we relocate it if the spot doesn&apos;t
            perform.
          </p>
        </div>
      </section>

      {/* 2. CTA */}
      <section className="px-6 pb-28">
        <div className="max-w-3xl mx-auto border-t border-border pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-2">
                Want one in your {pageData.location.name} {pageData.venueType.name.toLowerCase()}?
              </h2>
              <p className="text-muted">
                Tell us about your spot. No cost, no commitment — we&apos;ll handle the rest.
              </p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 bg-dark text-cream px-8 py-4 text-sm tracking-wide hover:bg-forest transition-colors"
            >
              Start a conversation
            </Link>
          </div>

          {nearby.length > 0 && (
            <p className="mt-12 text-sm text-muted">
              Also placing in{" "}
              {nearby.map((n, i) => (
                <span key={n.url}>
                  <Link href={n.url} className="underline hover:text-dark">
                    {n.name}
                  </Link>
                  {i < nearby.length - 1 ? ", " : ""}
                </span>
              ))}
              .
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
