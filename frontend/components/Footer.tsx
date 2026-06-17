import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
      }}
    >
      {/* Green top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #1f7a1f 30%, #3aaa3a 50%, #1f7a1f 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="page-container py-14 md:py-20">
        {/* Three-column grid — inline, never stacked */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mb-12">

          {/* Col 1 — Brand (spans full width on xs, 1 col on md+) */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div
                className="w-7 h-7 flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{
                  borderRadius: "5px",
                  border: "1px solid rgba(31,122,31,0.4)",
                  background: "rgba(31,122,31,0.07)",
                }}
              >
                <Image src="/logo.png" alt="GameAnalyzer" width={28} height={28} className="w-full h-full object-contain" />
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  letterSpacing: "0.04em",
                  color: "#f2f2f2",
                }}
              >
                GAME<span style={{ color: "#3aaa3a" }}>ANALYZER</span>
              </span>
            </Link>
            <p style={{ color: "#5a5a5a", fontSize: "0.82rem", lineHeight: 1.8, maxWidth: "260px", marginTop: "0.25rem" }}>
              Statistical football predictions for serious bettors in Ghana and Nigeria.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#3aaa3a",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/history", label: "Results History" },
                { href: "/about", label: "About Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs transition-colors duration-200 hover:text-[#3aaa3a] w-fit"
                  style={{ color: "#5a5a5a" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#3aaa3a",
                marginBottom: "1.25rem",
              }}
            >
              Legal
            </p>
            <div className="flex flex-col gap-4">
              <p style={{ color: "#5a5a5a", fontSize: "0.8rem", lineHeight: 1.7 }}>
                © {year} GameAnalyzer.<br />All rights reserved.
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#3a3a3a",
                  lineHeight: 1.6,
                  maxWidth: "200px",
                }}
              >
                Bet responsibly.{" "}
                <span style={{ color: "#5a5a5a" }}>18+ only.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "1.5rem",
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "#3a3a3a", fontSize: "0.72rem" }}>
            Premium analysis. Verified results.
          </span>
          <Link
            href="/portal"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#2a5a2a",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            ADMIN PORTAL
          </Link>
        </div>
      </div>
    </footer>
  );
}
