"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

interface PlanItem {
  tag: string;
  tagColor: string;
  name: string;
  speed: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  btnPrimaryVariant: "red" | "dark";
  whatsappText: string;
}

const PLANS: PlanItem[] = [
  {
    tag: "ESSENTIAL",
    tagColor: "text-[#A78BFA]",
    name: "Fiber Starter",
    speed: "40 Mbps",
    price: "₹499",
    period: "/ month",
    features: [
      "Truly Unlimited FTTH Data",
      "Dual-Band Wi-Fi Setup",
      "Local Avadi Support Desk",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I am interested in the Fiber Starter (40 Mbps @ ₹499/month) plan. Please share availability details for my location.",
  },
  {
    tag: "RECOMMENDED",
    tagColor: "text-[#818CF8]",
    name: "Fiber Turbo",
    speed: "100 Mbps",
    price: "₹699",
    period: "/ month",
    features: [
      "Unlimited 4K Streaming & Gaming",
      "Free Router & Fast Installation",
      "Symmetric 100 Mbps Speeds",
    ],
    popular: true,
    btnPrimaryVariant: "red",
    whatsappText: "Hi Broadnet, I am interested in the Fiber Turbo (100 Mbps @ ₹699/month) Most Popular plan. Please share availability details for my location.",
  },
  {
    tag: "PREMIUM",
    tagColor: "text-[#C084FC]",
    name: "Fiber Ultra Pro",
    speed: "200 Mbps",
    price: "₹999",
    period: "/ month",
    features: [
      "Ideal for Workstations & Multi-Devices",
      "Zero Latency Cloud Sync",
      "Priority Operations Dispatch",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I am interested in the Fiber Ultra Pro (200 Mbps @ ₹999/month) plan. Please share availability details for my location.",
  },
];

const COMPARISON_ROWS = [
  { feature: "Download Speed", starter: "40 Mbps", turbo: "100 Mbps", ultra: "200 Mbps" },
  { feature: "Upload Speed", starter: "40 Mbps (Symmetric)", turbo: "100 Mbps (Symmetric)", ultra: "200 Mbps (Symmetric)" },
  { feature: "Data Allowance", starter: "Truly Unlimited (No FUP)", turbo: "Truly Unlimited (No FUP)", ultra: "Truly Unlimited (No FUP)" },
  { feature: "Dual-Band Wi-Fi Router", starter: "Available on deposit", turbo: "FREE with plan", ultra: "High-Gain Wi-Fi 6 Router Included" },
  { feature: "Installation & Setup", starter: "Express Setup (24h)", turbo: "Express Setup (Same Day)", ultra: "Priority VIP Installation" },
  { feature: "OTT & Entertainment", starter: "Optional Add-on", turbo: "4K Ready Ultra Low Ping", ultra: "Ultra HD Multi-Stream + Gaming QoS" },
  { feature: "Static IP Add-on", starter: "Available on request", turbo: "Available (IPv4/IPv6)", ultra: "1 Free Static IP on annual plan" },
  { feature: "Support SLA", starter: "Standard Avadi Desk", turbo: "Priority Quick-Resolve", ultra: "Direct Senior Tech Dispatch" },
];

export default function PlansSection() {
  const [showTable, setShowTable] = useState(false);
  const [arrived, setArrived] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const handleArrival = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string }>;
      if (customEvent.detail?.targetId === "internet" || customEvent.detail?.targetId === "plans") {
        setArrived(true);
        setTimeout(() => setArrived(false), 3800);
      }
    };
    window.addEventListener("broadnet:section-arrived", handleArrival);
    return () => window.removeEventListener("broadnet:section-arrived", handleArrival);
  }, []);

  return (
    <section
      ref={ref}
      className={`py-24 bg-[#0B091E] relative overflow-hidden transition-all duration-500 ${
        arrived ? "ring-2 ring-[#818CF8]/40 shadow-2xl shadow-[#4E0DBA]/25" : ""
      }`}
      id="internet"
    >
      {/* Invisible anchor for #plans compatibility */}
      <span id="plans" className="absolute -top-20" />

      {/* Background radial glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4E0DBA]/15 blur-[140px] pointer-events-none rounded-full transition-opacity duration-700 ${
          arrived ? "opacity-100 scale-110" : "opacity-60 scale-100"
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#818CF8]">
              <span className="w-4 h-px bg-[#818CF8]" /> Transparent Pricing <span className="w-4 h-px bg-[#818CF8]" />
            </span>

            <AnimatePresence>
              {arrived && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4E0DBA]/40 text-[#E0D7FE] border border-[#818CF8]/50 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
                  Arrived · Ready For You
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-display">
            Choose the Plan That Fits You
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-body">
            Whether you&apos;re browsing, streaming, working, studying or running a business,
            choose a connection designed around your needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan, index) => {
            const waHref = `https://wa.me/919884344075?text=${encodeURIComponent(plan.whatsappText)}`;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.1,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-colors duration-300 ${
                  plan.popular
                    ? "bg-[#110E28] border-2 border-[#EF1313]/60 shadow-[0_0_40px_rgba(239,19,19,0.22)] md:-translate-y-2"
                    : "bg-[#110E28]/80 border border-white/10 hover:border-white/20 shadow-xl"
                }`}
              >
                {/* Floating "MOST POPULAR" Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#EF1313] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_20px_rgba(239,19,19,0.85)] z-20">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Category Tag */}
                  <span className={`text-xs font-black uppercase tracking-[0.2em] block mb-2 ${plan.tagColor}`}>
                    {plan.tag}
                  </span>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-4 font-display">
                    {plan.name}
                  </h3>

                  {/* Speed */}
                  <div className="text-4xl lg:text-5xl font-black text-[#818CF8] tracking-tight mb-3 font-display">
                    {plan.speed}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-white/50 text-sm font-medium">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-white/80 leading-snug">
                        <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[#818CF8] flex-shrink-0">
                          <Check className="w-4 h-4 text-[#818CF8]" strokeWidth={2.5} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-4 mt-auto border-t border-white/10">
                  <a
                    href="/contact#enquiry"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center transition-all duration-200 ${
                      plan.btnPrimaryVariant === "red"
                        ? "bg-[#EF1313] hover:bg-[#d00e0e] text-white shadow-[0_4px_24px_rgba(239,19,19,0.45)] hover:shadow-[0_6px_30px_rgba(239,19,19,0.6)]"
                        : "bg-[#1E1B38] hover:bg-[#27234A] text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    CHECK AVAILABILITY
                  </a>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_4px_16px_rgba(34,197,94,0.3)] transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compare All Plan Features Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-14 text-center"
        >
          <button
            type="button"
            onClick={() => setShowTable((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181436] hover:bg-[#221D4A] border border-white/15 text-white/90 hover:text-white font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <span>Compare All Plan Features</span>
            {showTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Expandable Comparison Table */}
        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#120F2D] shadow-2xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#17133B] text-xs font-bold uppercase tracking-wider text-white/70">
                      <th className="py-4 px-6">Feature</th>
                      <th className="py-4 px-6 text-[#A78BFA]">Fiber Starter (₹499)</th>
                      <th className="py-4 px-6 text-[#EF1313]">Fiber Turbo (₹699)</th>
                      <th className="py-4 px-6 text-[#C084FC]">Fiber Ultra Pro (₹999)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-6 font-medium text-white/90">{row.feature}</td>
                        <td className="py-3.5 px-6 text-white/70">{row.starter}</td>
                        <td className="py-3.5 px-6 font-semibold text-white">{row.turbo}</td>
                        <td className="py-3.5 px-6 text-white/70">{row.ultra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
