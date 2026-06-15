import type { MetadataRoute } from "next";
import { getAllPageSlugs } from "@/app/lib/seo-data";

const BASE_URL = "https://salishtradingco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPages = getAllPageSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Dynamic SEO pages (real venue type × location pairs only)
  const seoPages: MetadataRoute.Sitemap = allPages.map((page) => ({
    url: `${BASE_URL}/${page.venueType}/${page.location}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seoPages];
}
