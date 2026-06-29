"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,157,0.1)" : "1px solid transparent"
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/">
          <span className="font-display text-base font-bold tracking-tight text-white transition hover:text-[#00ff9d]">
            <span className="text-[#00ff9d]">&lt;</span>
            {profile.name}
            <span className="text-[#00ff9d]">/&gt;</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className="relative rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: active ? "#00ff9d" : "#94a3b8" }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{ background: "#00ff9d", boxShadow: "0 0 8px #00ff9d" }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
          <a
            href="mailto:panabhi8456@gmail.com"
            className="ml-3 rounded-md border border-[#00ff9d]/40 px-4 py-2 text-sm font-semibold text-[#00ff9d] transition hover:bg-[#00ff9d]/10"
          >
            Hire Me
          </a>
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
        <div
          className="border-t px-5 pb-5 pt-3 lg:hidden"
          style={{ background: "rgba(5,5,8,0.97)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className="block rounded-md px-3 py-3 text-sm font-medium transition"
                style={{ color: location === item.href ? "#00ff9d" : "#94a3b8" }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </span>
            </Link>
          ))}
          <a
            href="mailto:panabhi8456@gmail.com"
            className="mt-3 block rounded-md border border-[#00ff9d]/40 px-3 py-3 text-center text-sm font-semibold text-[#00ff9d]"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
