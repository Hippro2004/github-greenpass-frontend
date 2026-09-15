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
    { name: "สะสมแสตมป์", href: "/stamp" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E3EBDD] bg-[#FAFDF8]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848] transition-transform duration-300 group-hover:scale-105 shadow-2xs">
            <span className="text-lg">🍃</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">
              <span className="text-[#6B8E62]">Green</span>
              <span className="text-[#3F6848]">Pass.</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-[#8A9488] uppercase">
              National Parks of Thailand
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 rounded-full border border-[#E3EBDD] bg-white/70 px-3 py-1.5 shadow-2xs">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#6B8E62] text-white shadow-2xs"
                    : "text-[#6F756B] hover:text-[#3F6848] hover:bg-[#F3F8F1]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAppPromo(true)}
            className="flex items-center gap-1.5 rounded-full bg-[#E8F3E5] border border-[#D5E2CE] px-4 py-2 text-xs font-bold text-[#3F6848] shadow-2xs transition-all hover:bg-[#6B8E62] hover:text-white hover:border-[#6B8E62] cursor-pointer"
          >
            <span>📱</span>
            <span>เช็คอินบนแอป</span>
            <span className="rounded-full bg-[#6B8E62] text-white px-1.5 py-0.2 text-[9px] font-medium group-hover:bg-white group-hover:text-[#3F6848]">
              App
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-[#E3EBDD] bg-white text-[#3F6848] hover:bg-[#F3F8F1] transition-colors"
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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E3EBDD] bg-white px-6 py-5 shadow-lg animate-fade-in">
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
                      ? "bg-[#E8F3E5] text-[#3F6848]"
                      : "text-[#6F756B] hover:bg-[#FAFDF8] hover:text-[#3F6848]"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-[#6B8E62]" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-[#F0F5ED]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowAppPromo(true);
                }}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#6B8E62] py-3 text-center text-sm font-bold text-white shadow-xs cursor-pointer"
              >
                <span>📱</span>
                <span>เช็คอินสะสมแสตมป์บนแอป</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Promotion Modal */}
      <AppPromoModal isOpen={showAppPromo} onClose={() => setShowAppPromo(false)} />
    </header>
  );
}