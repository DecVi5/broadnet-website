"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

const NAV_LINKS = [
  { label: "Home", href: "/", targetId: "hero" },
  { label: "Security", href: "/#security", targetId: "security" },
  { label: "Internet", href: "/#internet", targetId: "internet" },
  { label: "Coverage", href: "/#coverage", targetId: "coverage" },
  { label: "About Us", href: "/about", targetId: "about" },
];

export default function Header({ activePage = "" }: { activePage?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || activePage === "Home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        if (document.getElementById(hashId)) {
          scrollToWithPhysics(hashId);
        }
      }, 450);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: (typeof NAV_LINKS)[0]) => {
    setMobileOpen(false);
    if (isHomePage) {
      if (link.targetId === "hero" || link.href === "/") {
        e.preventDefault();
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (link.targetId && document.getElementById(link.targetId)) {
        e.preventDefault();
        window.history.pushState(null, "", `#${link.targetId}`);
        scrollToWithPhysics(link.targetId);
        return;
      }
    }
  };

  const handleEnquiryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage && document.getElementById("enquiry")) {
      e.preventDefault();
      window.history.pushState(null, "", "#enquiry");
      scrollToWithPhysics("enquiry");
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ── Main header bar with Glassmorphism & Animated Optical Background ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-header-scrolled" : "glass-header"
        }`}
        style={{ overflow: "visible" }}
      >
        {/* Dynamic Background Effect Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Top Spectrum Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4E0DBA]/40 to-transparent" />

          {/* Ambient Luminous Aurora Orbs */}
          <div className="absolute -top-6 left-[15%] w-96 h-28 bg-gradient-to-r from-[#4E0DBA] via-[#7B2FF7] to-[#4E0DBA] blur-2xl rounded-full opacity-35 aurora-pulse-violet" />
          <div className="absolute -top-6 right-[18%] w-80 h-28 bg-gradient-to-l from-[#EF1313] via-[#FF4D4D] to-[#EF1313] blur-2xl rounded-full opacity-30 aurora-pulse-crimson" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[520px] h-20 bg-gradient-to-r from-transparent via-[#4E0DBA]/25 to-transparent blur-xl rounded-full opacity-40" />

          {/* Micro High-Tech Dot Matrix Grid */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #4E0DBA 1.2px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Optical Fiber Traveling Laser Beam at Bottom */}
          <div className="header-fiber-border" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6" style={{ overflow: "visible" }}>
          <div className="flex items-center h-16 gap-3 sm:gap-4" style={{ overflow: "visible" }}>

            {/* Left: Logo & Live NOC Status */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    window.history.pushState(null, "", "/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex-shrink-0 cursor-pointer group flex items-center"
              >
                <Image
                  src="/assets/logo.png"
                  alt="Broadnet Internet & Security Services Logo"
                  width={200}
                  height={82}
                  className="h-10 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-xs"
                  priority
                />
              </Link>

              {/* High-Tech NOC Status Indicator */}
              <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16143E]/[0.04] border border-[#16143E]/10 backdrop-blur-sm text-[10px] font-bold text-[#16143E]/80 tracking-wide font-display">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[#16143E]/60 font-semibold">Avadi Grid:</span>
                <span className="text-emerald-700 font-extrabold">Active</span>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Center: Nav links island */}
            <nav className="hidden md:flex items-center gap-1 bg-[#16143E]/[0.06] hover:bg-[#16143E]/[0.08] p-1.5 rounded-full border border-[#16143E]/12 shadow-[inset_0_2px_4px_rgba(22,20,62,0.05),0_4px_16px_rgba(78,13,186,0.06)] backdrop-blur-md transition-all">
              {NAV_LINKS.map((link) => {
                const isActive = activePage === link.label;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 rounded-full flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#4E0DBA] bg-white shadow-sm shadow-[#4E0DBA]/20 border border-[#4E0DBA]/20"
                        : "text-[#16143E]/75 hover:text-[#16143E] hover:bg-white/70"
                    }`}
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4E0DBA] inline-block animate-pulse" />
                    )}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Direct Phone & CTA */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="tel:9884344075"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-[#16143E]/80 hover:text-[#EF1313] transition-colors py-2 px-3.5 rounded-full border border-[#16143E]/12 hover:border-[#EF1313]/30 bg-white/70 hover:bg-white backdrop-blur-sm shadow-xs font-display"
              >
                <Phone size={12} className="text-[#EF1313]" />
                <span>98843 44075</span>
              </a>

              <Link
                href="/contact"
                onClick={handleEnquiryClick}
                className="btn-crimson shadow-md shadow-[#EF1313]/25 hover:shadow-lg hover:shadow-[#EF1313]/40 text-xs sm:text-sm"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Request Enquiry
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-[#16143E] hover:bg-[#16143E]/5 transition-colors"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden border-t border-white/50 bg-white/85 backdrop-blur-2xl overflow-hidden shadow-2xl"
              style={{
                WebkitBackdropFilter: "blur(24px) saturate(190%)",
                backdropFilter: "blur(24px) saturate(190%)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors
                      ${activePage === link.label
                        ? "bg-[#4E0DBA]/8 text-[#4E0DBA]"
                        : "text-[#16143E]/65 hover:bg-[#16143E]/5"
                      }`}
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-[#16143E]/10 flex flex-col gap-2">
                  <Link
                    href="/contact"
                    onClick={handleEnquiryClick}
                    className="btn-crimson min-h-[44px] justify-center w-full shadow-lg shadow-[#EF1313]/25"
                  >
                    Request Enquiry
                  </Link>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <a
                      href="tel:+919884344075"
                      className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#16143E]/15 text-xs font-semibold text-[#16143E] bg-[#16143E]/4 hover:bg-[#16143E]/8 transition-colors active:scale-98"
                    >
                      <Phone size={14} className="text-[#4E0DBA]" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href="https://wa.me/919884344075?text=Hello%20Broadnet%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#25D366]/30 text-xs font-semibold text-[#16143E] bg-[#25D366]/8 hover:bg-[#25D366]/15 transition-colors active:scale-98"
                    >
                      <MessageCircle size={14} className="text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}