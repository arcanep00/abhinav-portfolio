"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Odoo", "#odoo"],
  ["Contact", "#contact"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/[0.72] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#hero" className="font-display text-base font-semibold text-white">
          Abhinav Pandey
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden rounded-md border border-emeraldSoft/40 bg-emeraldSoft/10 px-4 py-2 text-sm font-semibold text-emeraldSoft transition hover:border-emeraldSoft hover:bg-emeraldSoft/[0.16] md:inline-flex"
        >
          Hire Me
        </a>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
