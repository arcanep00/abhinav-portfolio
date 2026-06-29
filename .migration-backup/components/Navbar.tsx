"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/[0.72] backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-base font-semibold text-white transition hover:text-emeraldSoft"
        >
          Abhinav Pandey
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                isActive(href)
                  ? "bg-emeraldSoft/10 text-emeraldSoft"
                  : "text-slate-300 hover:text-white"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="hidden rounded-md border border-emeraldSoft/40 bg-emeraldSoft/10 px-4 py-2 text-sm font-semibold text-emeraldSoft transition hover:border-emeraldSoft hover:bg-emeraldSoft/[0.16] lg:inline-flex"
        >
          Hire Me
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium transition",
                  isActive(href)
                    ? "bg-emeraldSoft/10 text-emeraldSoft"
                    : "text-slate-200 hover:bg-white/10"
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md border border-emeraldSoft/40 bg-emeraldSoft/10 px-3 py-3 text-center text-sm font-semibold text-emeraldSoft"
            >
              Hire Me
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
