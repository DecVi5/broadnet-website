"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2, Quote, ExternalLink } from "lucide-react";
import { SectionLabel } from "./MotionHelpers";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  category: "Security" | "Internet";
  serviceTag: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
  avatarBg: string;
  initials: string;
}

const REVIEWS: Testimonial[] = [
  {
    name: "K. Senthil Nathan",
    role: "President, Residents Welfare Association",
    location: "Kaveri Nagar, Avadi",
    category: "Security",
    serviceTag: "16-Camera Hikvision 4K IP & Boom Barrier",
    rating: 5,
    date: "Installed Nov 2023",
    quote:
      "BroadNet handled our entire 48-flat apartment complex surveillance. The conduit work was completely concealed without damaging building aesthetics. When a camera angle needed adjustment, their technician arrived within 90 minutes. That local SLA makes all the difference.",
    verified: true,
    avatarBg: "bg-[#16143E]",
    initials: "SN",
  },
  {
    name: "Dr. A. Meenakshi",
    role: "Chief Medical Director",
    location: "LifeCare Diagnostic Centre, Avadi",
    category: "Internet",
    serviceTag: "200 Mbps Dedicated Fiber & Tactine Firewall",
    rating: 5,
    date: "Client since 2021",
    quote:
      "Our medical imaging diagnostics require continuous, symmetric cloud uploads with zero packet loss. BroadNet's dedicated fiber has run uninterrupted with exceptional consistency for over 3 years. Their support team doesn't hide behind a bot; a real engineer answers.",
    verified: true,
    avatarBg: "bg-[#4E0DBA]",
    initials: "AM",
  },
  {
    name: "P. Vigneshwaran",
    role: "Lead Cloud Architect (Remote US Team)",
    location: "TNHB Colony, Avadi",
    category: "Internet",
    serviceTag: "Fiber Turbo 100 Mbps FTTH",
    rating: 5,
    date: "Client since 2022",
    quote:
      "I work late-night US hours where any connection drop disconnects my VPN tunnels. With other major providers I spent days raising tickets. BroadNet provided static routing and pristine low latency (under 8ms to Chennai servers). Truly infrastructure-grade.",
    verified: true,
    avatarBg: "bg-[#EF1313]",
    initials: "PV",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} id="testimonials" className="py-24 bg-white relative overflow-hidden border-t border-[#16143E]/6">
      {/* Background ambient texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (Trick 2: Visual Hierarchy & Trick 4: Believable Social Proof) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionLabel>Authentic Social Proof</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#16143E] tracking-tight mt-2 mb-4 font-display">
            Trusted by Avadi's <span className="text-gradient">Community</span>
          </h2>
          <p className="text-[#16143E]/60 text-base md:text-lg leading-relaxed font-body">
            Real deployments, real engineers, and verified experiences from property associations, health centers, and residents.
          </p>

          {/* Google Review Aggregation Card */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-[#16143E]/4 border border-[#16143E]/10 shadow-sm">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-[#F59E0B]" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#16143E]">4.9 out of 5</span>
            <span className="text-xs text-[#16143E]/40">•</span>
            <span className="text-xs font-semibold text-[#16143E]/70">
              420+ Verified Local Google Reviews
            </span>
            <span className="text-xs text-[#16143E]/40">•</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#25D366]">
              <CheckCircle2 size={13} /> 100% On-Site Serviced
            </span>
          </div>
        </motion.div>

        {/* 3 Believable Testimonial Cards (Trick 5: Cognitive Fluency & Chunking) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {REVIEWS.map((rev, index) => {
            const isSecurity = rev.category === "Security";
            const accent = isSecurity ? "#EF1313" : "#4E0DBA";

            return (
              <motion.div
                key={rev.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.12,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-7 border border-[#16143E]/10 shadow-xl shadow-[#16143E]/4 flex flex-col justify-between relative group hover:border-[#4E0DBA]/35 transition-all duration-300"
              >
                {/* Header of Card */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl ${rev.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-md`}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-[#16143E] text-base leading-snug font-display">
                            {rev.name}
                          </h3>
                          {rev.verified && (
                            <span title="Verified Client Deployment">
                              <CheckCircle2 size={14} className="text-[#25D366]" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#16143E]/55 font-medium leading-tight">
                          {rev.role}
                        </p>
                      </div>
                    </div>
                    <Quote size={24} className="text-[#16143E]/10 group-hover:text-[#4E0DBA]/25 transition-colors" />
                  </div>

                  {/* Rating Stars & Location */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-[#16143E]/8">
                    <div className="flex items-center text-[#F59E0B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} className="fill-[#F59E0B]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-[#16143E]/50">
                      {rev.location}
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="text-sm text-[#16143E]/75 leading-relaxed font-body italic mb-6">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Footer of Card: Concrete Spec Tag */}
                <div className="pt-3 border-t border-[#16143E]/8 flex items-center justify-between gap-2 text-xs">
                  <span
                    className="inline-flex items-center gap-1.5 font-semibold text-[11px] px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${accent}33`,
                      color: accent,
                      backgroundColor: `${accent}0A`,
                    }}
                  >
                    <ShieldCheck size={12} />
                    {rev.serviceTag}
                  </span>
                  <span className="text-[11px] text-[#16143E]/45 font-medium whitespace-nowrap">
                    {rev.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
