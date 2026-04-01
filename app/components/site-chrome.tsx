"use client";

import { useState } from "react";

function BrandLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#a3e635]" aria-hidden="true">
        <path d="M13.5 2 6 13h5l-1 9 8-12h-5l.5-8Z" fill="currentColor" />
      </svg>
      <span className="text-[26px] leading-none" style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-white">Fit</span>
        <span className="text-[#a3e635]">Con</span>
        <span className="text-white">Mi</span>
      </span>
    </a>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "#", label: "Nutrition" },
    { href: "#", label: "About" },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)" }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 text-base text-white">
            {links.map((link) => (
              <li key={link.label}>
                <a className="transition-colors duration-300 hover:text-[#a3e635]" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/programs"
            className="rounded-full bg-[#a3e635] px-4 py-2 text-xs font-bold text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_18px_rgba(163,230,53,0.45)]"
          >
            Start Free
          </a>
        </div>
        <button
          className="rounded-md border border-white/20 p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0a]/95 px-4 py-4 md:hidden">
          <ul className="space-y-3 text-white">
            {links.map((link) => (
              <li key={link.label}>
                <a className="transition-colors duration-300 hover:text-[#a3e635]" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
        <BrandLogo />
        <ul className="flex flex-wrap items-center gap-4 text-[#9ca3af] sm:gap-6">
          {["Programs", "Nutrition", "Calculator", "About"].map((item) => (
            <li key={item}>
              <a className="transition-colors hover:text-[#a3e635]" href="#">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 space-y-2 text-sm text-[#9ca3af]">
        <p>© 2026 FitConMi. All rights reserved.</p>
        <p>Always consult a physician before starting any fitness program.</p>
      </div>
    </footer>
  );
}
