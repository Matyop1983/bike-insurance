import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

const paths = [
  "/",
  "/about",
  "/business-insurance",
  "/personal-insurance",
  "/life-insurance",
  "/group-benefits",
  "/builders-risk",
  "/quote",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = brand.liveSite.replace(/\/$/, "");
  return paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified: "2026-09-25",
  }));
}
