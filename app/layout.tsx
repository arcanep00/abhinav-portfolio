import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhinav-pandey.dev"),
  title: {
    default: "Abhinav Pandey | Backend, Django, Python & Odoo Developer",
    template: "%s | Abhinav Pandey"
  },
  description:
    "Portfolio of Abhinav Pandey, an early-career software engineer focused on Python, Django, Odoo ERP, PostgreSQL, REST APIs, and backend development.",
  keywords: [
    "Abhinav Pandey",
    "Software Developer",
    "Backend Developer",
    "Django Developer",
    "Python Developer",
    "Odoo Developer",
    "PostgreSQL",
    "REST APIs"
  ],
  authors: [{ name: "Abhinav Pandey" }],
  creator: "Abhinav Pandey",
  openGraph: {
    title: "Abhinav Pandey | Backend, Django, Python & Odoo Developer",
    description:
      "Early-career software engineer with internship experience in Python, Django, Odoo ERP, PostgreSQL, REST APIs, and backend development.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/hero-backend-workspace.png",
        width: 1600,
        height: 900,
        alt: "Abhinav Pandey backend developer portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Pandey | Backend Developer",
    description:
      "Python, Django, Odoo ERP, PostgreSQL, REST APIs, and backend development portfolio.",
    images: ["/hero-backend-workspace.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ink font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
