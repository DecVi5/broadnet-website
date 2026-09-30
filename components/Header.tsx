"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

const NAV_LINKS = [
  { label: "Home", href: "/", targetId: "hero" },
  { label: "Security", href: "/#security", targetId: "security" },
  { label: "Internet", href: "/#internet", targetId: "internet" },
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
      {/* ?? Main header bar ?? */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-[#16143E]/10 shadow-lg shadow-[#16143E]/5"
            : "bg-white/95 border-b border-transparent"
        }`}
        style={{ overflow: "visible" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ overflow: "visible" }}>
          <div className="flex items-center h-16 gap-4" style={{ overflow: "visible" }}>

            {/* Left: Logo */}
            <div
              onClick={() => {
                if (isHomePage) {
                  window.dispatchEvent(new CustomEvent("broadnet:replay-intro"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex-shrink-0 cursor-pointer group"
              title="Click to replay BroadNet intro animation"
            >
              <Link href="/" onClick={(e) => { if (isHomePage) e.preventDefault(); }}>
                <Image
                  src="/assets/logo.png"
                  alt="Broadnet"
                  width={200}
                  height={82}
                  className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                  loading="eager"
                />
              </Link>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Center: Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-full group
                    ${activePage === link.label
                      ? "text-[#4E0DBA]"
                      : "text-[#16143E]/65 hover:text-[#16143E]"
                    }`}
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1.5 left-5 right-5 h-0.5 rounded-full bg-[#4E0DBA] transition-transform duration-200 origin-left
                      ${activePage === link.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
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
              className="md:hidden border-t border-[#16143E]/10 bg-white/98 overflow-hidden"
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
                <Link
                  href="/contact"
                  onClick={handleEnquiryClick}
                  className="btn-crimson mt-2 justify-center"
                >
                  Request Enquiry
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}