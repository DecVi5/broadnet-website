"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ChevronDown, ChevronUp, MessageCircle, Gift, Tv, MapPin } from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

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
  badge?: string;
  workload: string;
}

const BROADNET_PLANS: PlanItem[] = [
  {
    tag: "STARTER FIBER",
    tagColor: "text-[#A78BFA]",
    name: "Broadnet FTTH 60",
    speed: "60 Mbps",
    price: "₹499",
    period: "/ month",
    badge: "Free ONT Included",
    workload: "Up to 6 Devices · HD Streaming",
    features: [
      "Symmetric 60 Mbps Speed",
      "FREE Installation Included",
      "FREE to Use Optical ONT",
      "Truly Unlimited (No FUP)",
      "Local Avadi Support Desk",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I am interested in the Broadnet FTTH 60 Mbps @ ₹499/month plan (Free Installation & Free ONT). Please check availability for my location.",
  },
  {
    tag: "MOST POPULAR",
    tagColor: "text-[#EF1313]",
    name: "Broadnet FTTH 100",
    speed: "100 Mbps",
    price: "₹599",
    period: "/ month",
    badge: "Best Value",
    workload: "10-15 Devices · 4K UHD & WFH",
    features: [
      "Ultra-Fast 100 Mbps Symmetric",
      "FREE Installation & Free ONT",
      "Low Latency Gaming & 4K Streams",
      "Truly Unlimited High-Speed Fiber",
      "Same-Day Priority Setup",
    ],
    popular: true,
    btnPrimaryVariant: "red",
    whatsappText: "Hi Broadnet, I am interested in the Broadnet FTTH 100 Mbps @ ₹599/month plan. Please check availability for my location.",
  },
  {
    tag: "PRO STREAMER",
    tagColor: "text-[#818CF8]",
    name: "Broadnet FTTH 125",
    speed: "125 Mbps",
    price: "₹699",
    period: "/ month",
    badge: "High Performance",
    workload: "15-20 Devices · Multi-Stream",
    features: [
      "125 Mbps Dedicated Fiber Line",
      "FREE Installation & Free ONT",
      "Zero Bottleneck Streaming",
      "Truly Unlimited High-Speed Data",
      "Direct Senior Tech Support",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I am interested in the Broadnet FTTH 125 Mbps @ ₹699/month plan. Please check availability for my location.",
  },
  {
    tag: "ULTRA POWER",
    tagColor: "text-[#C084FC]",
    name: "Broadnet FTTH 150",
    speed: "150 Mbps",
    price: "₹799",
    period: "/ month",
    badge: "Top Tier",
    workload: "25+ Devices · Smart Home & Cloud",
    features: [
      "Blazing 150 Mbps Symmetric Speed",
      "FREE Installation & Free ONT",
      "Max Bandwidth for Home Labs",
      "Truly Unlimited Cloud Sync",
      "VIP Express Resolution SLA",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I am interested in the Broadnet FTTH 150 Mbps @ ₹799/month plan. Please check availability for my location.",
  },
];

const RAILWIRE_PLANS: PlanItem[] = [
  {
    tag: "OTT STARTER",
    tagColor: "text-[#A78BFA]",
    name: "Railwire OTT 50",
    speed: "50 Mbps",
    price: "₹599",
    period: "/ month",
    badge: "Amazon Prime + 20 OTTs",
    workload: "Multi-device Entertainment",
    features: [
      "50 Mbps High-Speed Broadband",
      "Amazon Prime Video Subscription",
      "20+ Premium OTT Platforms",
      "450+ Live TV Channels",
      "Railwire Reliable Fiber Backbone",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I want to order Railwire FTTH 50 Mbps @ ₹599/month with Amazon Prime + 20 OTTs + 450 Live TV channels.",
  },
  {
    tag: "OTT POPULAR",
    tagColor: "text-[#EF1313]",
    name: "Railwire OTT 100",
    speed: "100 Mbps",
    price: "₹799",
    period: "/ month",
    badge: "Full Entertainment Pack",
    workload: "Whole-Family Streaming & Work",
    features: [
      "100 Mbps Symmetric Fiber Speed",
      "Amazon Prime Video Included",
      "20+ Premium OTT Apps Bundled",
      "450+ Live TV Channels Streaming",
      "Ultra-low Buffer 4K Video QoS",
    ],
    popular: true,
    btnPrimaryVariant: "red",
    whatsappText: "Hi Broadnet, I want to order Railwire FTTH 100 Mbps @ ₹799/month with Amazon Prime + 20 OTTs + 450 Live TV channels.",
  },
  {
    tag: "OTT ULTRA",
    tagColor: "text-[#818CF8]",
    name: "Railwire OTT 150",
    speed: "150 Mbps",
    price: "₹1,099",
    period: "/ month",
    badge: "Prime + Max OTT Suite",
    workload: "Simultaneous 4K & Workstations",
    features: [
      "150 Mbps Ultra-Fast Fiber",
      "Amazon Prime Video + 20+ OTTs",
      "450+ Live TV Channels",
      "Dedicated High-Speed Entertainment",
      "Fast Installation by Broadnet",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I want to order Railwire FTTH 150 Mbps @ ₹1,099/month with OTT Pack.",
  },
  {
    tag: "OTT SUPREME",
    tagColor: "text-[#C084FC]",
    name: "Railwire OTT 200",
    speed: "200 Mbps",
    price: "₹1,199",
    period: "/ month",
    badge: "Prime + Live TV + 20 OTTs",
    workload: "Extreme Bandwidth & Multi-TV",
    features: [
      "200 Mbps High-Capacity Pipe",
      "Amazon Prime Video Included",
      "20+ Premium OTT Platforms",
      "450+ Live TV Channels",
      "Zero Ping Spikes for Esports",
    ],
    popular: false,
    btnPrimaryVariant: "dark",
    whatsappText: "Hi Broadnet, I want to order Railwire FTTH 200 Mbps @ ₹1,199/month with OTT Pack.",
  },
];

const CATALOG_HARDWARE_SERVICES = [
  {
    title: "Dual Band Gigabit ONT",
    category: "Hardware Upgrade",
    price: "₹3,500",
    badge: "High-Performance Router",
    desc: "Netlink Dual-Band 2.4GHz & 5GHz Gigabit optical fiber router with 2GE LAN + 1POTS voice port. Eliminates dead zones with whole-home coverage.",
    enquiryService: "Dual Band ONT Upgrade",
    waText: "Hi Broadnet, I want to purchase/upgrade to the Dual Band ONT (₹3,500.00). Please share setup details.",
  },
  {
    title: "CCTV Installation & Services",
    category: "Surveillance & AMC",
    price: "From ₹1,399",
    badge: "Official CP PLUS Partner",
    desc: "Expert HD/4K IP camera installation, live remote smartphone view setup, wiring, maintenance, and annual maintenance contracts (AMC).",
    enquiryService: "CCTV Installation & Services",
    waText: "Hi Broadnet, I would like to book CCTV Installation and Services (starting ₹1,399). Please provide a quotation.",
  },
  {
    title: "BSNL FTTH Plans",
    category: "Government Fiber Backbone",
    price: "From ₹499",
    badge: "Authorized Partner",
    desc: "Authorized BSNL FTTH Partner in Avadi. Bharat Fibre Basic, Value, and Premium plans with nationwide routing stability and doorstep onboarding.",
    enquiryService: "BSNL Bharat Fibre",
    waText: "Hi Broadnet, I want to subscribe to BSNL FTTH Bharat Fibre plans in Avadi.",
  },
];

export default function PlansSection() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<"broadnet" | "railwire">("broadnet");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
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

  const currentPlans = activeCatalogTab === "broadnet" ? BROADNET_PLANS : RAILWIRE_PLANS;

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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#818CF8]">
              <span className="w-4 h-px bg-[#818CF8]" /> Official Catalog & Plans <span className="w-4 h-px bg-[#818CF8]" />
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
            High-Speed FTTH & OTT Plans
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-body">
            Choose from our private Avadi fiber network with free installation & ONT, or bundle high-speed broadband with Amazon Prime, 20+ OTTs, and 450+ Live TV channels.
          </p>

          {/* Catalog Type Switcher (Broadnet FTTH vs Railwire OTT) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="bg-[#151136] border border-white/12 p-1.5 rounded-2xl sm:rounded-full flex items-center shadow-2xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveCatalogTab("broadnet")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                  activeCatalogTab === "broadnet"
                    ? "bg-[#EF1313] text-white shadow-lg shadow-[#EF1313]/30"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Broadnet FTTH Plans
              </button>
              <button
                type="button"
                onClick={() => setActiveCatalogTab("railwire")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                  activeCatalogTab === "railwire"
                    ? "bg-[#4E0DBA] text-white shadow-lg shadow-[#4E0DBA]/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Railwire FTTH + OTT
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="bg-[#110E28] border border-white/10 p-1 rounded-full flex items-center shadow-md">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "monthly" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual" ? "bg-emerald-600 text-white" : "text-white/50 hover:text-white"
                }`}
              >
                Annual <span className="text-[10px] text-emerald-200 font-bold">-15%</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCatalogTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch"
          >
            {currentPlans.map((plan, index) => {
              const isAnnual = billingCycle === "annual";
              const rawNumeric = parseInt(plan.price.replace(/[^\d]/g, ""), 10);
              const discounted = Math.round(rawNumeric * 0.85);
              const displayPrice = isAnnual ? `₹${discounted.toLocaleString()}` : plan.price;
              const annualTotal = (discounted * 12).toLocaleString();

              const waHref = `https://wa.me/919884344075?text=${encodeURIComponent(
                `${plan.whatsappText} [Billing: ${isAnnual ? `Annual (₹${annualTotal}/yr)` : "Monthly"}]`
              )}`;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#151136] border-2 border-[#EF1313] shadow-[0_0_40px_rgba(239,19,19,0.25)] ring-1 ring-[#EF1313]/30"
                      : "bg-[#110E28]/85 border border-white/10 hover:border-white/25 shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#EF1313] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-[0_0_20px_rgba(239,19,19,0.8)] z-20 whitespace-nowrap">
                      ★ POPULAR CHOICE
                    </div>
                  )}

                  <div>
                    {/* Top Row: Tag & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider ${plan.tagColor}`}>
                        {plan.tag}
                      </span>
                      {plan.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/[0.08] text-white/80 border border-white/10">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-xl font-bold text-white mb-2 font-display">
                      {plan.name}
                    </h3>

                    {/* Workload */}
                    <div className="mb-3 px-2.5 py-1 rounded-lg bg-white/5 text-[11px] text-white/70 font-medium border border-white/5">
                      {plan.workload}
                    </div>

                    {/* Speed Display */}
                    <div className="text-3xl font-black text-[#818CF8] tracking-tight mb-2 font-display">
                      {plan.speed}
                    </div>

                    {/* Price */}
                    <div className="mb-5 pb-4 border-b border-white/10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white tracking-tight">
                          {displayPrice}
                        </span>
                        <span className="text-white/50 text-xs font-medium">
                          {plan.period}
                        </span>
                      </div>
                      {isAnnual && (
                        <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                          ✓ Billed ₹{annualTotal}/yr (15% Savings)
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-white/80 leading-snug">
                          <span className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[#818CF8] flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-[#818CF8]" strokeWidth={2.5} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTAs */}
                  <div className="space-y-2.5 pt-3 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (document.getElementById("coverage")) {
                          scrollToWithPhysics("coverage");
                        } else {
                          window.location.href = "/#coverage";
                        }
                      }}
                      className={`w-full py-3 px-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-200 ${
                        plan.btnPrimaryVariant === "red"
                          ? "bg-[#EF1313] hover:bg-[#d00e0e] text-white shadow-md shadow-[#EF1313]/30"
                          : "bg-[#1E1B38] hover:bg-[#27234A] text-white border border-white/10"
                      }`}
                    >
                      <MapPin size={13} />
                      <span>CHECK AVAILABILITY</span>
                    </button>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Free Perk Banner - Placed below where the plans are listed */}
        <AnimatePresence mode="wait">
          {activeCatalogTab === "broadnet" ? (
            <motion.div
              key="broadnet-free-perk"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-8 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#EF1313]/12 via-[#18133B] to-[#4E0DBA]/15 border border-[#EF1313]/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-[#EF1313]/5"
            >
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-[#EF1313]/20 border border-[#EF1313]/35 flex items-center justify-center flex-shrink-0">
                  <Gift size={22} className="text-[#EF1313]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                    <span className="text-white font-bold text-sm sm:text-base font-display">
                      FREE Installation & FREE To Use Optical ONT Router
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      100% Free Included
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">
                    Zero hidden setup fees or equipment deposits on all Broadnet FTTH plans across Avadi. Same-day priority connection.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/919884344075?text=Hi%20Broadnet%2C%20I%20am%20interested%20in%20the%20Broadnet%20FTTH%20plan%20with%20Free%20Installation%20and%20Free%20ONT."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#EF1313] hover:bg-[#d00e0e] text-white text-xs font-bold whitespace-nowrap transition-all shadow-md shadow-[#EF1313]/30 active:scale-95 flex items-center gap-1.5"
              >
                <span>Claim Free Installation</span>
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="railwire-free-perk"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-8 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#4E0DBA]/15 via-[#18133B] to-[#00C2FF]/15 border border-[#4E0DBA]/35 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-[#4E0DBA]/10"
            >
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-[#4E0DBA]/25 border border-[#4E0DBA]/40 flex items-center justify-center flex-shrink-0">
                  <Tv size={22} className="text-[#A78BFA]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                    <span className="text-white font-bold text-sm sm:text-base font-display">
                      Amazon Prime Video + 20+ Premium OTT Apps & 450+ Live TV
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Bundled Free
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">
                    Complete family entertainment package included at no extra cost with your Railwire FTTH broadband subscription.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/919884344075?text=Hi%20Broadnet%2C%20I%20want%20to%20order%20the%20Railwire%20FTTH%20OTT%20bundle%20with%20Amazon%20Prime."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#4E0DBA] hover:bg-[#3d0999] text-white text-xs font-bold whitespace-nowrap transition-all shadow-md shadow-[#4E0DBA]/30 active:scale-95 flex items-center gap-1.5"
              >
                <span>Order OTT Pack</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Catalog Hardware & Value Add Services Showcase */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF1313]">
              WhatsApp Catalog Services & Hardware
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Add-Ons, Routers & Surveillance Services
            </h3>
            <p className="text-white/60 text-sm mt-2">
              Upgrade your optical fiber setup or protect your premises with verified CP PLUS & Hikvision installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CATALOG_HARDWARE_SERVICES.map((item) => (
              <div
                key={item.title}
                className="bg-[#120F2D] border border-white/10 hover:border-[#4E0DBA]/50 rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:shadow-[#4E0DBA]/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#A78BFA] transition-colors">
                    {item.title}
                  </h4>

                  <div className="inline-block text-base font-extrabold text-[#EF1313] bg-[#EF1313]/10 border border-[#EF1313]/25 px-2.5 py-0.5 rounded-md mb-3">
                    {item.price}
                  </div>

                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <a
                    href={`/contact?service=${encodeURIComponent(item.enquiryService)}#enquiry`}
                    className="flex-1 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors"
                  >
                    Enquire Now
                  </a>
                  <a
                    href={`https://wa.me/919884344075?text=${encodeURIComponent(item.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
