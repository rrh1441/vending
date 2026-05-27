import Link from "next/link";
import type { VenueType, Neighborhood } from "@/app/lib/seo-data";

interface RelatedPage {
  venueType: VenueType;
  neighborhood: Neighborhood;
  url: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  currentNeighborhood: string;
}

export default function RelatedPages({ pages, currentNeighborhood }: RelatedPagesProps) {
  if (pages.length === 0) return null;

  // Split into same neighborhood (other venue types) and other neighborhoods (same venue type)
  const sameNeighborhood = pages.filter((p) => p.neighborhood.name === currentNeighborhood);
  const otherNeighborhoods = pages.filter((p) => p.neighborhood.name !== currentNeighborhood);

  return (
    <section className="py-24 px-6 bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
            Explore More
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Other spots we&apos;re placing machines
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNeighborhoods.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="block border border-border p-6 hover:border-gold/50 transition-colors bg-[#f5f4e1]"
            >
              <p className="text-sm text-gold mb-2">{page.neighborhood.name}</p>
              <h3 className="font-serif text-xl mb-2">
                {page.venueType.displayName} in {page.neighborhood.name}
              </h3>
              <p className="text-muted text-sm">{page.venueType.description}</p>
            </Link>
          ))}
          {sameNeighborhood.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="block border border-border p-6 hover:border-gold/50 transition-colors bg-[#f5f4e1]"
            >
              <p className="text-sm text-gold mb-2">{page.neighborhood.name}</p>
              <h3 className="font-serif text-xl mb-2">
                {page.venueType.displayName}
              </h3>
              <p className="text-muted text-sm">{page.venueType.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
