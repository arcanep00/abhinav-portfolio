import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-400 sm:px-8 lg:px-12">
      <p>
        {profile.name} · Software Developer · Python · Django · Odoo ERP · PostgreSQL · REST APIs
      </p>
    </footer>
  );
}
