"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, ArrowUpRight, Navigation, Clock, ShieldCheck } from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

const QUICK_LINKS = [
  { label: "Security Solutions", href: "/security" },
  { label: "Internet Services", href: "/internet" },
  { label: "About Broadnet", href: "/about" },
  { label: "Get in Touch", href: "/contact" },
];

const SERVICES = [
  "Broadnet FTTH Plans",
  "Railwire FTTH & OTT",
  "CCTV Installation & Services",
  "BSNL Bharat Fibre",
  "Dual Band Gigabit ONT",
  "CP PLUS & Hikvision Security",
];

export default function Footer() {
  const handleServiceClick = (e: React.MouseEvent, serviceName: string) => {
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("broadnet:select-service", { detail: { service: serviceName } })
      );
      scrollToWithPhysics("enquiry");
    }
  };

  return (
    <footer className="bg-[#16143E] text-white relative overflow-hidden pb-12 pt-16">
      {/* Decorative gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4E0DBA] to-transparent" />
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(78,13,186,0.8) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/logo.png"
              alt="Broadnet"
              width={200}
              height={82}
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              Engineered connectivity and intelligent surveillance for homes and enterprises in Avadi, Chennai.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-xs text-white/50 font-medium">Network Operational · 99.9% Uptime</span>
            </div>
            {/* Official Partner of CP PLUS */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 shadow-sm">
              <ShieldCheck size={14} className="text-[#FF6B35]" />
              <span className="text-xs font-semibold text-white/85">Official Partner of CP PLUS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors group"
                  >
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#4E0DBA]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — Linked to Contact / Enquiry */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-5">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href={`/contact?service=${encodeURIComponent(s)}`}
                    onClick={(e) => handleServiceClick(e, s)}
                    className="text-sm text-white/60 hover:text-white flex items-center gap-2 transition-all duration-200 group cursor-pointer"
                    title={`Enquire about ${s}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF1313] group-hover:scale-125 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-5">Contact & Hours</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-[#4E0DBA] mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-white/60 leading-relaxed">
                    1093, Fire Station Road, TNHB,<br />Avadi, Chennai – 600 054
                  </span>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=1093,+Fire+Station+Road,+TNHB,+Avadi,+Chennai,+Tamil+Nadu+600054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-[#4E0DBA]/25 border border-white/10 hover:border-[#4E0DBA]/50 text-xs font-semibold text-[#00C2FF] hover:text-white transition-all duration-200 w-fit group"
                    title="Open office directions in Google Maps"
                  >
                    <Navigation size={12} className="text-[#00C2FF] group-hover:rotate-45 transition-transform" />
                    <span>Get Directions</span>
                    <ArrowUpRight size={11} className="opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-[#4E0DBA] mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919884344075" className="text-sm text-white/60 hover:text-white transition-colors">
                    98843 44075
                  </a>
                  <a href="tel:+918681888111" className="text-sm text-white/60 hover:text-white transition-colors">
                    86818 88111
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-[#4E0DBA] mt-0.5 flex-shrink-0" />
                <a href="mailto:admin@broadnet.in" className="text-sm text-white/60 hover:text-white transition-colors">
                  admin@broadnet.in
                </a>
              </li>
              {/* Opening Hours */}
              <li className="flex gap-3 pt-1 border-t border-white/8">
                <Clock size={15} className="text-[#4E0DBA] mt-0.5 flex-shrink-0" />
                <div className="flex flex-col text-xs text-white/60 leading-relaxed">
                  <span className="font-semibold text-white/85">Opening Hours:</span>
                  <span>Mon — Sat: 9:00 AM — 7:00 PM</span>
                  <span className="text-emerald-400 font-medium">Emergency: 24/7 On-Call Support</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links Strip */}
        <div className="pt-8 pb-4 border-t border-white/10 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-4 text-center sm:text-left">
            Quick Links
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. WhatsApp */}
            <a
              href="https://wa.me/919884344075?text=Hello%20Broadnet%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#25D366]/15 border border-white/10 hover:border-[#25D366]/40 text-xs font-semibold text-white/90 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0">
                  <WhatsAppIcon />
                </span>
                <span className="truncate">
                  <span className="text-white/50 group-hover:text-white/80 font-normal">Whatsapp: </span>
                  +91 98843 44075
                </span>
              </div>
              <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 flex-shrink-0 text-[#25D366]" />
            </a>

            {/* 2. Instagram */}
            <a
              href="https://www.instagram.com/broadnet_tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#E4405F]/15 border border-white/10 hover:border-[#E4405F]/40 text-xs font-semibold text-white/90 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-[#E4405F] group-hover:scale-110 transition-transform flex-shrink-0">
                  <InstagramIcon />
                </span>
                <span className="truncate">
                  <span className="text-white/50 group-hover:text-white/80 font-normal">Instagram: </span>
                  broadnet_tech
                </span>
              </div>
              <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 flex-shrink-0 text-[#E4405F]" />
            </a>

            {/* 3. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/janardhanaml/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#0A66C2]/15 border border-white/10 hover:border-[#0A66C2]/40 text-xs font-semibold text-white/90 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-[#0A66C2] group-hover:scale-110 transition-transform flex-shrink-0">
                  <LinkedInIcon />
                </span>
                <span className="truncate">
                  <span className="text-white/50 group-hover:text-white/80 font-normal">LinkedIn: </span>
                  Janardhanam L
                </span>
              </div>
              <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 flex-shrink-0 text-[#0A66C2]" />
            </a>

            {/* 4. Phone */}
            <a
              href="tel:+919884344075"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#4E0DBA]/25 border border-white/10 hover:border-[#4E0DBA]/50 text-xs font-semibold text-white/90 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Phone size={14} className="text-[#4E0DBA] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="truncate">
                  <span className="text-white/50 group-hover:text-white/80 font-normal">Phone: </span>
                  +91 98843 44075
                </span>
              </div>
              <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 flex-shrink-0 text-[#4E0DBA]" />
            </a>

            {/* 5. Mail */}
            <a
              href="mailto:admin@broadnet.in"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-[#EF1313]/15 border border-white/10 hover:border-[#EF1313]/40 text-xs font-semibold text-white/90 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Mail size={14} className="text-[#EF1313] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="truncate">
                  <span className="text-white/50 group-hover:text-white/80 font-normal">Mail: </span>
                  admin@broadnet.in
                </span>
              </div>
              <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 flex-shrink-0 text-[#EF1313]" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35 text-center sm:text-left">
            © {new Date().getFullYear()} Broadnet Internet Services. All rights reserved.
          </p>
          <p className="text-sm font-semibold text-gradient text-center">
            A Safer, Smarter Tomorrow Starts Today
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6-.1.49-.3 1.47-1.2 1.68-1.76.21-.56.21-1.04.15-1.16-.06-.12-.22-.19-.47-.32z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
    </svg>
  );
}
