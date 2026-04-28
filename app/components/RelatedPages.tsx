import Link from "next/link";
import type { EventType, Location } from "@/app/lib/seo-data";

interface RelatedPage {
  eventType: EventType;
  location: Location;
  url: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  currentLocation: string;
}

export default function RelatedPages({ pages, currentLocation }: RelatedPagesProps) {
  if (pages.length === 0) return null;

  // Split into same location (different events) and same event (different locations)
  const sameLocation = pages.filter((p) => p.location.name === currentLocation);
  const differentLocations = pages.filter((p) => p.location.name !== currentLocation);

  return (
    <section className="py-24 px-6 bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-6">
            Explore More
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Related services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentLocations.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="block border border-border p-6 hover:border-gold/50 transition-colors bg-[#f5f4e1]"
            >
              <p className="text-sm text-gold mb-2">{page.location.region}</p>
              <h3 className="font-serif text-xl mb-2">
                {page.eventType.displayName} in {page.location.name}
              </h3>
              <p className="text-muted text-sm">{page.eventType.description}</p>
            </Link>
          ))}
          {sameLocation.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="block border border-border p-6 hover:border-gold/50 transition-colors bg-[#f5f4e1]"
            >
              <p className="text-sm text-gold mb-2">{page.location.name}</p>
              <h3 className="font-serif text-xl mb-2">
                {page.eventType.displayName}
              </h3>
              <p className="text-muted text-sm">{page.eventType.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
