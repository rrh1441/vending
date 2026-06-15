import venueTypesData from "@/data/venue-types.json";
import locationsData from "@/data/locations.json";

// Types
export interface VenueType {
  slug: string;
  name: string;
  plural: string;
  displayName: string;
  description: string;
  benefit: string;
  locations: string[];
}

export interface Location {
  slug: string;
  name: string;
  region: string;
}

export interface PageData {
  venueType: VenueType;
  location: Location;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  benefit: string;
}

// Data accessors
export const venueTypes: VenueType[] = venueTypesData;
export const locations: Location[] = locationsData;

export function getVenueType(slug: string): VenueType | undefined {
  return venueTypes.find((v) => v.slug === slug);
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

// Generate only real venue-type × location pairs — each venue type carries an
// explicit list of the places that actually have it. No blind cross-product.
export function getAllPageSlugs(): { venueType: string; location: string }[] {
  const slugs: { venueType: string; location: string }[] = [];

  for (const venueType of venueTypes) {
    for (const locationSlug of venueType.locations) {
      if (getLocation(locationSlug)) {
        slugs.push({ venueType: venueType.slug, location: locationSlug });
      }
    }
  }

  return slugs;
}

export function getPageData(
  venueTypeSlug: string,
  locationSlug: string
): PageData | null {
  const venueType = getVenueType(venueTypeSlug);
  const location = getLocation(locationSlug);

  if (!venueType || !location) {
    return null;
  }

  // Only real pairs are valid pages.
  if (!venueType.locations.includes(location.slug)) {
    return null;
  }

  const where = `${location.name}, ${location.region}`;

  const eyebrow = where;

  const headline = `Passive income for ${location.name} ${venueType.plural}.`;

  const metaTitle = `Trading-Card Vending for ${venueType.displayName} in ${location.name} | Salish Trading Co.`;

  const metaDescription = `Host a sealed trading-card vending machine at your ${location.name} ${venueType.name.toLowerCase()}. We own, stock, service, and insure it — you earn a share of every sale. No cost, no work.`;

  return {
    venueType,
    location,
    metaTitle,
    metaDescription,
    eyebrow,
    headline,
    benefit: venueType.benefit,
  };
}

// Nearby pages for light internal linking: same venue type, other locations.
export function getNearbyPages(
  venueType: VenueType,
  currentLocation: Location,
  limit: number = 4
): { name: string; url: string }[] {
  return venueType.locations
    .filter((slug) => slug !== currentLocation.slug)
    .map((slug) => getLocation(slug))
    .filter((l): l is Location => Boolean(l))
    .slice(0, limit)
    .map((l) => ({
      name: l.name,
      url: `/${venueType.slug}/${l.slug}`,
    }));
}
