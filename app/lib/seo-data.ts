import eventTypesData from "@/data/event-types.json";
import locationsData from "@/data/locations.json";

// Types
export interface EventType {
  slug: string;
  eventType: string;
  angle: string;
  displayName: string;
  shortName: string;
  description: string;
}

export interface Location {
  slug: string;
  name: string;
  region: string;
  area: string;
  neighborhoods: string[];
}

export interface PageData {
  eventType: EventType;
  location: Location;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
}

// Data accessors
export const eventTypes: EventType[] = eventTypesData;
export const locations: Location[] = locationsData;

export function getEventType(slug: string): EventType | undefined {
  return eventTypes.find((e) => e.slug === slug);
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

// Generate all valid page combinations
export function getAllPageSlugs(): { eventType: string; location: string }[] {
  const slugs: { eventType: string; location: string }[] = [];

  for (const eventType of eventTypes) {
    for (const location of locations) {
      slugs.push({
        eventType: eventType.slug,
        location: location.slug,
      });
    }
  }

  return slugs;
}

// Content generation helpers
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatEventTypeName(eventType: string): string {
  return eventType
    .split("-")
    .map(capitalizeFirst)
    .join(" ");
}

export function getPageData(eventTypeSlug: string, locationSlug: string): PageData | null {
  const eventType = getEventType(eventTypeSlug);
  const location = getLocation(locationSlug);

  if (!eventType || !location) {
    return null;
  }

  const formattedEventType = formatEventTypeName(eventType.eventType);

  // Generate dynamic content based on the event type and location
  const h1 = `${eventType.displayName} in ${location.name}`;

  const metaTitle = `${eventType.displayName} in ${location.name} | Salish Trading Co.`;

  const metaDescription = generateMetaDescription(eventType, location);

  const intro = generateIntro(eventType, location);

  return {
    eventType,
    location,
    title: h1,
    metaTitle,
    metaDescription,
    h1,
    intro,
  };
}

function generateMetaDescription(eventType: EventType, location: Location): string {
  const templates: Record<string, string> = {
    wedding: `Looking for unique ${eventType.displayName.toLowerCase()} in ${location.name}? Salish Trading Co. brings a Pok\u00e9mon card bar experience to your reception. Guests rip packs and keep what they pull.`,
    "bar-mitzvah": `Make your bar mitzvah unforgettable with ${eventType.displayName.toLowerCase()} in ${location.name}. A Pok\u00e9mon card bar that kids and adults will love.`,
    "bat-mitzvah": `Unique ${eventType.displayName.toLowerCase()} in ${location.name}. A Pok\u00e9mon card bar experience that makes your celebration stand out.`,
    "sweet-16": `Looking for ${eventType.displayName.toLowerCase()} in ${location.name}? Give them the party their whole feed will be posting from with our Pok\u00e9mon card bar.`,
    corporate: `${eventType.displayName} in ${location.name} that actually brings the team together. A Pok\u00e9mon card bar experience for company events and team building.`,
    birthday: `Unique ${eventType.displayName.toLowerCase()} in ${location.name}. A Pok\u00e9mon card bar where guests rip packs and keep what they pull.`,
  };

  return templates[eventType.eventType] ||
    `${eventType.displayName} in ${location.name}. Salish Trading Co. brings a unique Pok\u00e9mon card bar experience to your event.`;
}

function generateIntro(eventType: EventType, location: Location): string {
  const baseIntros: Record<string, string> = {
    wedding: `Planning a wedding in ${location.name}? Forget the photo booth your guests have seen a hundred times. Picture this instead: a counter stacked with sealed Pok\u00e9mon packs at your reception. Guests walk up, pick a pack, rip it open, and keep whatever they pull. The whole room watches. Someone pulls a rare holographic card and suddenly they're the center of attention. Uncles and nieces, new in-laws, the friend who didn't know anyone — all of them gathered around the same counter, talking about the same thing.`,
    "bar-mitzvah": `Looking for ${eventType.displayName.toLowerCase()} in ${location.name}? We bring a hosted Pok\u00e9mon card bar to your celebration. Kids line up to rip packs. Adults fight for a turn. Someone pulls a rare card and the whole room loses their mind. It's the centerpiece of the party that everyone will actually remember.`,
    "bat-mitzvah": `Make your bat mitzvah in ${location.name} unforgettable. We set up a Pok\u00e9mon card bar where guests pick a pack, rip it open, and keep what they pull. No cost to the guest. No prices visible. Just the pop of foil wrappers, the thrill of the pull, and stories they'll be telling for years.`,
    "sweet-16": `Planning a Sweet 16 in ${location.name}? Give them the party their whole feed will be posting from. We bring a Pok\u00e9mon card bar where guests rip packs and keep what they pull. Rare cards get passed around. Stories get told. The party photos practically take themselves.`,
    corporate: `Looking for ${eventType.displayName.toLowerCase()} in ${location.name}? We bring team building that doesn't feel forced. The whole office around one counter, ripping Pok\u00e9mon packs, finally having fun together. Someone pulls a rare card and suddenly they're the hero of the company event.`,
    birthday: `Planning a birthday party in ${location.name}? We bring a Pok\u00e9mon card bar experience that works for any age. Guests pick a pack, rip it open, and keep whatever they pull. Kids love it. Adults get competitive. Everyone leaves with real cards and real stories.`,
  };

  return baseIntros[eventType.eventType] ||
    `Looking for ${eventType.displayName.toLowerCase()} in ${location.name}? Salish Trading Co. brings a unique experience to your event: a hosted Pok\u00e9mon card bar where guests rip packs and keep what they pull.`;
}

// Get related pages for internal linking
export function getRelatedPages(
  currentEventType: EventType,
  currentLocation: Location,
  limit: number = 6
): { eventType: EventType; location: Location; url: string }[] {
  const related: { eventType: EventType; location: Location; url: string }[] = [];

  // Same event type, different locations (prioritize same region)
  const sameRegionLocations = locations
    .filter((l) => l.slug !== currentLocation.slug && l.region === currentLocation.region);
  const otherLocations = locations
    .filter((l) => l.slug !== currentLocation.slug && l.region !== currentLocation.region);

  for (const location of [...sameRegionLocations, ...otherLocations].slice(0, 3)) {
    related.push({
      eventType: currentEventType,
      location,
      url: `/${currentEventType.slug}/${location.slug}`,
    });
  }

  // Same location, different event types
  const relatedEventTypes = eventTypes
    .filter((e) => e.slug !== currentEventType.slug)
    .slice(0, 3);

  for (const eventType of relatedEventTypes) {
    related.push({
      eventType,
      location: currentLocation,
      url: `/${eventType.slug}/${currentLocation.slug}`,
    });
  }

  return related.slice(0, limit);
}

// FAQ data generator
export function getFAQs(eventType: EventType, location: Location): { question: string; answer: string }[] {
  const eventName = eventType.displayName.toLowerCase();
  const locationName = location.name;

  return [
    {
      question: `How does the Pok\u00e9mon card bar work at a ${eventType.shortName.toLowerCase().replace(/s$/, "")} in ${locationName}?`,
      answer: `We show up with a counter stacked with sealed Pok\u00e9mon packs and a dedicated host to run the experience. Guests walk up, pick a pack, rip it open, and keep whatever they pull. No cost to the guest, no prices visible. We handle setup and teardown — you don't lift a thing.`,
    },
    {
      question: `What Pok\u00e9mon packs do you bring to events in ${locationName}?`,
      answer: `We offer a curated selection of modern sets, premium vintage packs, or a custom mix. Everything is sealed and authenticated. We'll work with you to choose packs that fit your budget and wow factor — from accessible modern sets to premium vintage pulls.`,
    },
    {
      question: `How many guests can the card bar serve at my ${locationName} event?`,
      answer: `We scale to fit your guest count. Whether you're hosting an intimate gathering of 50 or a large celebration of 200+, we'll design the setup to match your venue and ensure everyone gets a chance to rip.`,
    },
    {
      question: `Do you travel to ${location.region} for events?`,
      answer: `Yes! We're based in Seattle and regularly serve events throughout ${location.region}, including ${locationName}. We handle all logistics — just tell us where and when.`,
    },
    {
      question: `What makes this different from a photo booth?`,
      answer: `Photo booths give guests a strip of photos they'll lose in a week. We give them the thrill of the pull, a real collectible card to take home, and a story they'll tell for years. It's interactive entertainment that brings every generation to the same counter.`,
    },
    {
      question: `How do I book Salish Trading Co. for my ${locationName} event?`,
      answer: `Submit an inquiry through our website. Tell us about your event, your approximate date, and guest count. We'll reach out to discuss details and design a package that fits your celebration.`,
    },
  ];
}
