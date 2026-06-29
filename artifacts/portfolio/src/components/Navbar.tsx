"use client";

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, profile } from "@/data/profile";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="font-display text-lg font-bold text-white transition hover:text-emeraldSoft">
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                location === item.href
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="flex items-center justify-center rounded-md p-2 text-slate-400 transition hover:text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.07] bg-ink/95 px-5 pb-4 pt-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium transition",
                location === item.href
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
