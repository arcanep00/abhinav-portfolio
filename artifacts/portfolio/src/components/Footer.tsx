import { Link } from "wouter";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer
      className="mt-20 border-t px-5 py-10 sm:px-8 lg:px-12"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(5,5,8,0.8)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-sm font-bold text-white">
            <span className="text-[#00ff9d]">&lt;</span>{profile.name}<span className="text-[#00ff9d]">/&gt;</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">Python Backend Engineer · Django · FastAPI · PostgreSQL · LLMs</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-sm">
          {[
            { label: "Projects", href: "/projects", internal: true },
            { label: "Experience", href: "/experience", internal: true },
            { label: "Contact", href: "/contact", internal: true },
            { label: "GitHub", href: "https://github.com/arcanep00", internal: false }
          ].map(({ label, href, internal }) =>
            internal ? (
              <Link key={label} href={href}>
                <span className="text-slate-500 transition hover:text-[#00ff9d]">{label}</span>
              </Link>
            ) : (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 transition hover:text-[#00ff9d]">
                {label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
