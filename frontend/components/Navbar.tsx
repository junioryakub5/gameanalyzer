"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "#0a0a0a",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Square badge — matches flat logo aesthetic */}
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-200 group-hover:opacity-80"
              style={{
                borderRadius: "6px",
                border: "1px solid rgba(31,122,31,0.45)",
                background: "rgba(31,122,31,0.08)",
              }}
            >
              <Image src="/logo.png" alt="GameAnalyzer" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <div className="leading-none">
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "0.04em",
                  color: "#f2f2f2",
                  display: "block",
                }}
              >
                GAME
                <span style={{ color: "#3aaa3a" }}>ANALYZER</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin portal — rectangular, outlined */}
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold tracking-widest transition-all duration-200 hover:bg-[rgba(31,122,31,0.12)]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                border: "1px solid rgba(31,122,31,0.5)",
                color: "#3aaa3a",
                borderRadius: "6px",
                letterSpacing: "0.08em",
              }}
            >
              PORTAL
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 transition-all duration-200"
            style={{
              color: "#9a9a9a",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="page-container py-4 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm py-3 border-b ${pathname === link.href ? "active" : ""}`}
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 pb-1">
            <Link
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold tracking-widest transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                border: "1px solid rgba(31,122,31,0.5)",
                color: "#3aaa3a",
                borderRadius: "6px",
                letterSpacing: "0.08em",
              }}
            >
              PORTAL
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
