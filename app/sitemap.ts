import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/navigation";
import { getProjectSlugs } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/odoo",
    "/education",
    "/contact"
  ];

  const projectRoutes = getProjectSlugs().map((slug) => `/projects/${slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.7
  }));
}
