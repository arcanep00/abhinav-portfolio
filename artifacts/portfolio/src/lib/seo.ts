import { siteConfig } from "@/data/profile";
import { profile } from "@/data/profile";

const defaultTitle = `${profile.name} | Python Backend Engineer — Django, FastAPI & Odoo ERP`;
const defaultDescription =
  "Portfolio of Abhinav Pandey, a Python Backend Engineer specializing in Django, FastAPI, REST APIs, PostgreSQL, Redis, Celery, and Odoo ERP development.";

export function createMetadata({
  title,
  description = defaultDescription,
  path = "",
  keywords = []
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
}) {
  const pageTitle = title ? `${title} | ${profile.name}` : defaultTitle;
  const url = `${siteConfig.url}${path}`;
  const allKeywords = [
    "Python Backend Engineer",
    "Django Developer",
    "FastAPI Developer",
    "REST API Developer",
    "Odoo ERP Developer",
    "PostgreSQL",
    "Abhinav Pandey",
    ...keywords
  ];

  return {
    title: pageTitle,
    description,
    keywords: allKeywords,
    url
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Python Backend Engineer",
    email: profile.email,
    telephone: profile.phone.replace(/\s/g, ""),
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN"
    },
    knowsAbout: [
      "Python",
      "Django",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Odoo ERP",
      "Backend Development"
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "ABES Institute of Technology"
    },
    worksFor: {
      "@type": "Organization",
      name: profile.company
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: siteConfig.url,
    description: defaultDescription,
    author: {
      "@type": "Person",
      name: profile.name
    }
  };
}

export function projectJsonLd(project: {
  title: string;
  description: string;
  slug: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    author: {
      "@type": "Person",
      name: profile.name
    },
    keywords: project.technologies.join(", ")
  };
}
