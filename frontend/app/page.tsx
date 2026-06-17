"use client";

import { useState, useEffect } from "react";
import { Loader2, CalendarX2, BarChart2, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PredictionCard from "@/components/PredictionCard";
import { getActivePredictions } from "@/lib/api";
import { Prediction } from "@/lib/types";

const FILTER_TABS = [
  { label: "All Tips", value: "all" },
  { label: "2+ Odds", value: "2+" },
  { label: "5+ Odds", value: "5+" },
  { label: "10+ Odds", value: "10+" },
  { label: "20+ Odds", value: "20+" },
];

export default function HomePage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);

  // Count-up animation: 1 → 500 over 1.8s with easeOut
  useEffect(() => {
    const target = 500;
    const duration = 1800;
    const startDelay = 300;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * (target - 1) + 1));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, startDelay);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    fetchPredictions("all");
  }, []);

  const fetchPredictions = async (category: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await getActivePredictions(category === "all" ? undefined : category);
      setPredictions(data);
    } catch {
      setError("Failed to load predictions. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value: string) => {
    setActiveFilter(value);
    fetchPredictions(value);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen" style={{ background: "var(--bg, #0a0a0a)" }}>

        {/* ── Hero ── */}
        <section
          className="pt-[60px] relative overflow-hidden"
          style={{ background: "#0a0a0a" }}
        >
          {/* Dot-grid background — analytical, not orbs */}
          <div
            className="pointer-events-none absolute inset-0 dot-grid"
            style={{
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Left green edge accent */}
          <div
            className="pointer-events-none absolute left-0 top-[60px] bottom-0 w-[3px]"
            style={{
              background: "linear-gradient(to bottom, #1f7a1f 0%, rgba(31,122,31,0.2) 60%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div className="page-container relative z-10 pt-14 pb-12">

            {/* Live indicator row */}
            <div className="flex items-center gap-3 mb-7 animate-fadeInUp">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "rgba(31,122,31,0.08)",
                  border: "1px solid rgba(31,122,31,0.3)",
                  color: "#3aaa3a",
                  borderRadius: "4px",
                  letterSpacing: "0.1em",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#3aaa3a",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                LIVE ANALYSIS
              </div>
              <span
                style={{
                  color: "#3a3a3a",
                  fontSize: "0.72rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                GAME ANALYZER © {new Date().getFullYear()}
              </span>
            </div>

            {/* Main headline — bold, left-aligned, analytical */}
            <h1
              className="animate-fadeInUp"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 7vw, 5.8rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#f2f2f2",
                maxWidth: "820px",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              YOU CAN&apos;T BE{" "}
              <span style={{ color: "#3aaa3a" }}>UNLUCKY</span>
              <br />
              <span
                style={{
                  fontSize: "clamp(1.6rem, 5.5vw, 4.2rem)",
                  color: "#5a5a5a",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                FOR{" "}
                <span style={{ color: "#f2f2f2", fontWeight: 800, fontSize: "clamp(2.4rem, 7vw, 5.8rem)" }}>
                  {count}
                </span>
                {" "}DAYS
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="animate-fadeInUp"
              style={{
                color: "#5a5a5a",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                maxWidth: "400px",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                fontWeight: 400,
              }}
            >
              Expert-verified football tips. Unlock the slip, place the bet,{" "}
              <span style={{ color: "#3aaa3a", fontWeight: 600 }}>collect the money.</span>
            </p>

            {/* Stats — horizontal data strip */}
            <div
              className="animate-fadeInUp flex items-stretch mb-8 w-full max-w-md overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                background: "#111111",
              }}
            >
              {[
                { value: "87%", label: "WIN RATE", icon: <TrendingUp size={14} /> },
                { value: `${count}+`, label: "PREDICTIONS", icon: <BarChart2 size={14} /> },
                { value: "100%", label: "VERIFIED", icon: <ShieldCheck size={14} /> },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex-1 flex flex-col items-center justify-center py-3 px-2 gap-1"
                  style={{
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(1rem, 3vw, 1.4rem)",
                      color: "#3aaa3a",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#3a3a3a",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tab bar — underline style, NOT pills */}
          <div
            className="animate-fadeInUp"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "#0d0d0d",
            }}
          >
            <div className="page-container">
              <div
                className="flex items-center overflow-x-auto scrollbar-none"
                style={{ gap: 0 }}
              >
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab.value;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => handleFilter(tab.value)}
                      className="flex-shrink-0 relative px-5 py-3.5 text-xs font-bold transition-all duration-200"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "0.06em",
                        color: isActive ? "#3aaa3a" : "#3a3a3a",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        borderBottom: isActive ? "2px solid #3aaa3a" : "2px solid transparent",
                      }}
                    >
                      {tab.label.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cards Grid ── */}
        <section
          className="pb-20 relative z-10"
          style={{ background: "#0a0a0a" }}
        >
          <div className="page-container pt-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: "rgba(31,122,31,0.07)",
                    border: "1px solid rgba(31,122,31,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  <Loader2 size={22} style={{ color: "#3aaa3a" }} className="animate-spin" />
                </div>
                <p style={{ color: "#4a4a4a" }} className="text-sm">
                  Loading predictions...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => fetchPredictions(activeFilter)}
                  className="btn-outline-gold"
                >
                  Try Again
                </button>
              </div>
            ) : predictions.length === 0 ? (
              <div className="text-center py-24">
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                  }}
                >
                  <CalendarX2 size={24} style={{ color: "#4a4a4a" }} />
                </div>
                <p
                  className="text-lg mb-2 font-display font-semibold"
                  style={{ color: "#9a9a9a" }}
                >
                  No predictions available
                </p>
                <p className="text-sm" style={{ color: "#4a4a4a" }}>
                  Check back soon — new tips are being prepared.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {predictions.map((pred, idx) => (
                    <PredictionCard
                      key={pred._id}
                      prediction={pred}
                      animationDelay={idx * 100}
                    />
                  ))}
                </div>

                {/* View History CTA */}
                <div className="text-center mt-14">
                  <a href="/history" className="btn-outline-gold">
                    View Past Results
                  </a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Trust Section ── */}
        <section
          className="py-16 relative z-10"
          style={{ background: "#0a0a0a" }}
        >
          <div className="glow-line mb-12" aria-hidden="true" />

          <div className="page-container">
            {/* Section heading — left aligned */}
            <div className="mb-10">
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#3aaa3a",
                  marginBottom: "0.75rem",
                }}
              >
                Why Choose Us
              </p>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.4rem, 5vw, 2.4rem)",
                  letterSpacing: "-0.03em",
                  color: "#f2f2f2",
                  maxWidth: "520px",
                  lineHeight: 1.15,
                }}
              >
                Built for bettors who{" "}
                <span className="gradient-text">take the game seriously.</span>
              </h2>
            </div>

            {/* 3-col grid — angular cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <BarChart2 size={20} />,
                  title: "Expert Analysis",
                  desc: "Statistic-driven predictions backed by deep match research and team data.",
                  color: "#3aaa3a",
                  iconBg: "rgba(31,122,31,0.1)",
                  iconBorder: "rgba(31,122,31,0.22)",
                },
                {
                  icon: <ShieldCheck size={20} />,
                  title: "Secure Payments",
                  desc: "Paystack-powered payments — safe, instant, and fully encrypted.",
                  color: "#4ab84a",
                  iconBg: "rgba(74,184,74,0.1)",
                  iconBorder: "rgba(74,184,74,0.2)",
                },
                {
                  icon: <Zap size={20} />,
                  title: "Instant Access",
                  desc: "Unlock your prediction immediately after payment confirmation.",
                  color: "#f59e0b",
                  iconBg: "rgba(245,158,11,0.1)",
                  iconBorder: "rgba(245,158,11,0.18)",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 transition-all duration-200 hover:border-l-[var(--accent-text)] group"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "3px solid #1f7a1f",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{
                      background: item.iconBg,
                      border: `1px solid ${item.iconBorder}`,
                      color: item.color,
                      borderRadius: "6px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="font-display font-bold text-sm mb-2"
                    style={{ color: "#f2f2f2" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5a5a5a" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
