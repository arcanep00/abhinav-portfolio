export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Odoo ERP", href: "/odoo" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" }
] as const;

export const siteConfig = {
  name: "Abhinav Pandey",
  url: "https://abhinav-pandey.dev",
  ogImage: "/hero-backend-workspace.png",
  resumePath: "/Abhinav-Pandey-Resume.pdf"
} as const;
