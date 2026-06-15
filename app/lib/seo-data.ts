import venueTypesData from "@/data/venue-types.json";
import neighborhoodsData from "@/data/neighborhoods.json";

// Types
export interface VenueType {
  slug: string;
  name: string;
  plural: string;
  displayName: string;
  description: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
}

export interface PageData {
  venueType: VenueType;
  neighborhood: Neighborhood;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
}

// Data accessors
export const venueTypes: VenueType[] = venueTypesData;
export const neighborhoods: Neighborhood[] = neighborhoodsData;

export function getVenueType(slug: string): VenueType | undefined {
  return venueTypes.find((v) => v.slug === slug);
}

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

// Generate all valid venue-type × neighborhood combinations
export function getAllPageSlugs(): { venueType: string; neighborhood: string }[] {
  const slugs: { venueType: string; neighborhood: string }[] = [];

  for (const venueType of venueTypes) {
    for (const neighborhood of neighborhoods) {
      slugs.push({
        venueType: venueType.slug,
        neighborhood: neighborhood.slug,
      });
    }
  }

  return slugs;
}

export function getPageData(
  venueTypeSlug: string,
  neighborhoodSlug: string
): PageData | null {
  const venueType = getVenueType(venueTypeSlug);
  const neighborhood = getNeighborhood(neighborhoodSlug);

  if (!venueType || !neighborhood) {
    return null;
  }

  const h1 = `Passive income for ${neighborhood.name} ${venueType.plural}`;

  const metaTitle = `Trading-Card Vending for ${venueType.displayName} in ${neighborhood.name}, Seattle | Salish Trading Co.`;

  const metaDescription = `Host a sealed trading-card vending machine in your ${neighborhood.name} ${venueType.name.toLowerCase()}. We own, stock, and service it — you earn a share of every sale. Zero cost, zero work.`;

  const intro = `Run a ${venueType.name.toLowerCase()} in ${neighborhood.name}? We place small, sealed trading-card vending machines in high-traffic spots across Seattle — from year-round storefronts to seasonal markets — and ${venueType.plural} are a natural fit. We own the machine, stock it with genuine sealed collectible packs, service it, insure it, and run the payments. You give it a few square feet and an outlet, and earn passive income on every sale. Most hosts take a 10–20% revenue share or a flat monthly rent — your choice. No cost, no work, and if a spot doesn't perform we simply move the machine.`;

  return {
    venueType,
    neighborhood,
    metaTitle,
    metaDescription,
    h1,
    intro,
  };
}

// Get related pages for internal linking
export function getRelatedPages(
  currentVenueType: VenueType,
  currentNeighborhood: Neighborhood,
  limit: number = 6
): { venueType: VenueType; neighborhood: Neighborhood; url: string }[] {
  const related: { venueType: VenueType; neighborhood: Neighborhood; url: string }[] = [];

  // Same venue type, other neighborhoods
  const otherNeighborhoods = neighborhoods
    .filter((n) => n.slug !== currentNeighborhood.slug)
    .slice(0, 3);

  for (const neighborhood of otherNeighborhoods) {
    related.push({
      venueType: currentVenueType,
      neighborhood,
      url: `/${currentVenueType.slug}/${neighborhood.slug}`,
    });
  }

  // Same neighborhood, other venue types
  const otherVenueTypes = venueTypes
    .filter((v) => v.slug !== currentVenueType.slug)
    .slice(0, 3);

  for (const venueType of otherVenueTypes) {
    related.push({
      venueType,
      neighborhood: currentNeighborhood,
      url: `/${venueType.slug}/${currentNeighborhood.slug}`,
    });
  }

  return related.slice(0, limit);
}

// FAQ data generator (host POV)
export function getFAQs(
  venueType: VenueType,
  neighborhood: Neighborhood
): { question: string; answer: string }[] {
  const venue = venueType.name.toLowerCase();

  return [
    {
      question: `What's the catch for my ${neighborhood.name} ${venue}?`,
      answer: `There isn't one. We own the machine, stock it, service it, insure it, and run the payments. You provide a few square feet and an outlet. You take a cut of every sale and never touch the hardware.`,
    },
    {
      question: `How much can I earn?`,
      answer: `It depends on your traffic, so we only give ranges — never a guarantee. Most hosts choose a 10–20% revenue share or a flat $100–$300 per month. We'll talk through what makes sense for your spot.`,
    },
    {
      question: `How much room does it take?`,
      answer: `Very little — about 2 ft × 2 ft of floor, roughly 5.9 ft tall, around 35 lbs. It tucks into a corner or against a wall and just needs a standard outlet.`,
    },
    {
      question: `Is this official Pokémon or Nintendo?`,
      answer: `No. Salish Trading Co. is an independent operator and is not affiliated with or endorsed by The Pokémon Company or Nintendo. We stock genuine sealed collectible trading-card packs.`,
    },
    {
      question: `Who services and stocks the machine?`,
      answer: `We do — entirely. Restocking, maintenance, payment hardware, and insurance are all on us. It's fully hands-off for you.`,
    },
    {
      question: `What does it cost me to host one in ${neighborhood.name}?`,
      answer: `Nothing. There's no cost and no work on your end. If the location underperforms, we relocate the machine, so hosting is genuinely risk-free.`,
    },
  ];
}
