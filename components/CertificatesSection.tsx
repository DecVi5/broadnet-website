"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BadgeCheck, Award, ShieldCheck } from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  fullName: string;
  brand: string;
  brandColor: string;
  /** Replace null with the real image path once you have the certificate, e.g. "/assets/certs/hikvision.jpg" */
  imagePath: string | null;
  issuedTo: string;
  year: string;
  category: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: "hikvision",
    name: "Hikvision HCSA",
    fullName: "Hikvision Certified Security Associate",
    brand: "Hikvision",
    brandColor: "#EF1313",
    imagePath: null,
    issuedTo: "Broadnet Internet Services",
    year: "2023",
    category: "Surveillance Systems",
  },
  {
    id: "cpplus",
    name: "CP PLUS CSE",
    fullName: "CP PLUS Certified Security Engineer",
    brand: "CP PLUS",
    brandColor: "#FF6B35",
    imagePath: null,
    issuedTo: "Broadnet Internet Services",
    year: "2023",
    category: "Official Partner",
  },
  {
    id: "grandstream",
    name: "Grandstream",
    fullName: "Grandstream Certified Specialist",
    brand: "Grandstream",
    brandColor: "#4E0DBA",
    imagePath: null,
    issuedTo: "Broadnet Internet Services",
    year: "2022",
    category: "Enterprise Wi-Fi & VoIP",
  },
  {
    id: "essl",
    name: "eSSL Partner",
    fullName: "eSSL Authorised Partner Certificate",
    brand: "eSSL",
    brandColor: "#0A84FF",
    imagePath: null,
    issuedTo: "Broadnet Internet Services",
    year: "2022",
    category: "Biometric Access Control",
  },
  {
    id: "tactine",
    name: "Tactine UTM",
    fullName: "Tactine Firewall Authorised Dealer",
    brand: "Tactine",
    brandColor: "#16143E",
    imagePath: null,
    issuedTo: "Broadnet Internet Services",
    year: "2023",
    category: "Network Security",
  },
];

export default function CertificatesSection() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section className="py-20 bg-[#F8F9FD] border-t border-[#16143E]/8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-4">
            <Award size={14} /> Official Certifications &amp; Partnerships
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#16143E]">Our Credentials</h2>
          <p className="text-[#16143E]/60 mt-3 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Manufacturer-certified and officially authorised across every product line we deploy.
            Click any card to view the certificate.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
          {CERTIFICATES.map((cert, i) => (
            <motion.button
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: `0 24px 48px ${cert.brandColor}25`,
                transition: { duration: 0.22 },
              }}
              whileTap={{ scale: 0.96 }}
              className="relative w-48 h-40 rounded-2xl border border-[#16143E]/10 bg-white shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden group"
              aria-label={`View ${cert.fullName} certificate`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: cert.brandColor }}
              />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${cert.brandColor}12`, border: `1.5px solid ${cert.brandColor}30` }}
              >
                <BadgeCheck size={28} style={{ color: cert.brandColor }} />
              </div>
              <div className="text-center px-3">
                <div className="font-bold text-sm text-[#16143E] leading-tight">{cert.name}</div>
                <div className="text-[11px] font-medium mt-0.5" style={{ color: cert.brandColor }}>
                  {cert.category}
                </div>
              </div>
              <div className="absolute bottom-2.5 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-[10px] font-semibold text-[#16143E]/50 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm border border-[#16143E]/10">
                  Click to view ↗
                </span>
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-2xl"
                style={{ background: `${cert.brandColor}06` }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full"
            >
              <button
                onClick={() => setActiveCert(null)}
                aria-label="Close certificate modal"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#16143E]/8 hover:bg-[#16143E]/15 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-[#16143E]" />
              </button>

              <div
                className="w-full aspect-[4/3] flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${activeCert.brandColor}10 0%, ${activeCert.brandColor}04 100%)`,
                }}
              >
                {activeCert.imagePath ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeCert.imagePath}
                    alt={`${activeCert.fullName} Certificate`}
                    className="w-full h-full object-contain p-6"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                    <div
                      className="w-72 max-w-[85%] h-52 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                      style={{ borderColor: `${activeCert.brandColor}50` }}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${activeCert.brandColor} 1px, transparent 1px)`,
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <BadgeCheck size={52} style={{ color: activeCert.brandColor }} className="opacity-30" />
                      <div className="text-center relative z-10">
                        <div className="font-extrabold text-lg tracking-wide" style={{ color: activeCert.brandColor }}>
                          {activeCert.brand}
                        </div>
                        <div className="text-sm text-[#16143E]/50 font-medium mt-0.5">Certificate Placeholder</div>
                        <div className="text-xs text-[#16143E]/35 mt-1 italic">— Awaiting certificate image —</div>
                      </div>
                    </div>
                    <p className="text-xs text-[#16143E]/40 text-center max-w-xs px-4">
                      Set{" "}
                      <code className="bg-[#16143E]/8 px-1.5 py-0.5 rounded text-[10px] font-mono">imagePath</code>{" "}
                      in{" "}
                      <code className="bg-[#16143E]/8 px-1.5 py-0.5 rounded text-[10px] font-mono">CertificatesSection.tsx</code>{" "}
                      to display the real certificate.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-[#16143E]/8">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${activeCert.brandColor}12` }}
                  >
                    <ShieldCheck size={22} style={{ color: activeCert.brandColor }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#16143E] text-base leading-tight">{activeCert.fullName}</h3>
                    <p className="text-xs text-[#16143E]/50 mt-0.5">
                      Issued to:{" "}
                      <span className="font-semibold text-[#16143E]/70">{activeCert.issuedTo}</span> · {activeCert.year}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
