"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppPromoModal from "../common/AppPromoModal";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAppPromo, setShowAppPromo] = useState(false);

  const navLinks = [
    { name: "หน้าแรก", href: "/" },
    { name: "อุทยานแห่งชาติ", href: "/park" },
    { name: "ข่าวสารและประกาศ", href: "/announcement" },
    { name: "ของรางวัล", href: "/reward" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D6EFE2] bg-[#F3F7F5]/90 backdrop-blur-md transition-all">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D1FAE5] text-[#064E3B] transition-transform duration-300 group-hover:scale-105 shadow-2xs border border-[#D6EFE2]">
            <span className="text-xl">🍃</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">
              <span className="text-[#00A86B]">Green</span>
              <span className="text-[#064E3B]">Pass.</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#64748B] uppercase mt-0.5">
              National Parks of Thailand
            </span>
          </div>
        </Link>

        {/* Centered Desktop Navigation */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#D6EFE2] bg-white/80 p-1.5 shadow-2xs">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#064E3B] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#064E3B] hover:bg-[#E8F7F0]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side spacer for desktop balance */}
        <div className="hidden lg:block w-32" />

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-[#D6EFE2] bg-white text-[#064E3B] hover:bg-[#E8F7F0] transition-colors cursor-pointer"
          aria-label="เปิดเมนูนำทาง"
        >
          {mobileMenuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#D6EFE2] bg-white px-6 py-5 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#E8F7F0] text-[#064E3B] font-bold"
                      : "text-[#64748B] hover:bg-[#F3F7F5] hover:text-[#064E3B]"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-[#00A86B]" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <AppPromoModal isOpen={showAppPromo} onClose={() => setShowAppPromo(false)} />
    </header>
  );
}