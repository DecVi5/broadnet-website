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
    if (isHomePage) {
      if (link.targetId === "hero" || link.href === "/") {
        e.preventDefault();
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMobileOpen(false);
        return;
      }
      if (link.targetId && document.getElementById(link.targetId)) {
        e.preventDefault();
        window.history.pushState(null, "", `#${link.targetId}`);
        scrollToWithPhysics(link.targetId);
        setMobileOpen(false);
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
      {/* ── Main header bar with Glassmorphism ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-header-scrolled" : "glass-header"
        }`}
        style={{ overflow: "visible" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ overflow: "visible" }}>
          <div className="flex items-center h-16 gap-4" style={{ overflow: "visible" }}>

            {/* Left: Logo */}
            <div className="flex-shrink-0 cursor-pointer group flex items-center">
              <Link
                href="/"
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    window.history.pushState(null, "", "/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <Image
                  src="/assets/logo.png"
                  alt="Broadnet"
                  width={200}
                  height={82}
                  className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                  loading="eager"
                />
              </Link>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Center: Nav links */}
            <nav className="hidden md:flex items-center gap-1 bg-[#16143E]/[0.03] p-1 rounded-full border border-white/40 backdrop-blur-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-4 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 rounded-full group ${
                    activePage === link.label
                      ? "text-[#4E0DBA] bg-white shadow-sm"
                      : "text-[#16143E]/70 hover:text-[#16143E] hover:bg-white/60"
                  }`}
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[#4E0DBA] transition-transform duration-200 origin-left ${
                      activePage === link.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                onClick={handleEnquiryClick}
                className="btn-crimson"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Request Enquiry
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-[#16143E] hover:bg-[#16143E]/5"
              aria-label="Toggle menu"
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
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-colors
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
                    className="btn-crimson justify-center w-full shadow-lg shadow-[#EF1313]/25"
                  >
                    Request Enquiry
                  </Link>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <a
                      href="tel:+919884344075"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#16143E]/15 text-xs font-semibold text-[#16143E] bg-[#16143E]/4 hover:bg-[#16143E]/8 transition-colors active:scale-98"
                    >
                      <Phone size={13} className="text-[#4E0DBA]" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href="https://wa.me/919884344075?text=Hello%20Broadnet%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#25D366]/30 text-xs font-semibold text-[#16143E] bg-[#25D366]/8 hover:bg-[#25D366]/15 transition-colors active:scale-98"
                    >
                      <MessageCircle size={13} className="text-[#25D366]" />
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