import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-slate-400">
          {profile.name} · Python Backend Engineer · Django · FastAPI · Odoo ERP · PostgreSQL
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/projects" className="text-slate-400 transition hover:text-emeraldSoft">
            Projects
          </Link>
          <Link href="/contact" className="text-slate-400 transition hover:text-emeraldSoft">
            Contact
          </Link>
          <a
            href="https://github.com/arcanep00"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-emeraldSoft"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
