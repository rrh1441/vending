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

  // Dynamic SEO pages
  const seoPages: MetadataRoute.Sitemap = allPages.map((page) => ({
    url: `${BASE_URL}/${page.eventType}/${page.location}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seoPages];
}
