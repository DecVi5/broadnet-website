"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, ArrowUpRight, Navigation } from "lucide-react";

const QUICK_LINKS = [
  { label: "Security Solutions", href: "/security" },
  { label: "Internet Services", href: "/internet" },
  { label: "About Broadnet", href: "/about" },
  { label: "Get in Touch", href: "/contact" },
];

const SERVICES = [
  "CCTV Surveillance",
  "Hikvision Intrusion Alarms",
  "Fiber Internet",
  "Enterprise Wi-Fi",
  "Access Control",
  "Network Security",
];

export default function Footer() {
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
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Engineered connectivity and intelligent surveillance for homes and enterprises in Avadi, Chennai.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-xs text-white/50 font-medium">Network Operational · 99.9% Uptime</span>
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

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-5">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-white/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#EF1313]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-5">Contact</h3>
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
            </ul>
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
