import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Navbar } from "@/components/Navbar";
import { OdooExperience } from "@/components/OdooExperience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <BackgroundFX />
      <LoadingOverlay />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Abhinav Pandey",
            jobTitle: "Backend Developer",
            email: "mailto:panabhi8456@gmail.com",
            telephone: "+918979610223",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ghaziabad",
              addressRegion: "Uttar Pradesh",
              addressCountry: "IN"
            },
            knowsAbout: [
              "Python",
              "Django",
              "Odoo ERP",
              "PostgreSQL",
              "REST APIs",
              "Backend Development"
            ]
          })
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <OdooExperience />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
