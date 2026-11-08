import type { MetadataRoute } from "next";
import { COLUMNS, SITE_URL } from "../content/columns";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/column`, changeFrequency: "weekly", priority: 0.8 },
    ...COLUMNS.map((c) => ({ url: `${SITE_URL}/column/${c.slug}`, lastModified: c.date.replaceAll(".", "-"), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/privacy`, priority: 0.2 },
    { url: `${SITE_URL}/terms`, priority: 0.2 },
    { url: `${SITE_URL}/tokushoho`, priority: 0.2 },
  ];
}
