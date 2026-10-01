"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Zap,
  Wifi,
  Send,
  MessageCircle,
  AlertCircle,
  Building2,
  Check,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

interface LocationData {
  name: string;
  pincode: string;
  zone: string;
  status: "live" | "expansion";
  speed: string;
  sameDay: boolean;
  landmark?: string;
}

const SERVING_LOCATIONS: LocationData[] = [
  // Zone: Avadi Core (600054)
  { name: "TNHB Avadi", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true, landmark: "Near Fire Station & Bus Terminus" },
  { name: "Fire Station Road", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true, landmark: "Broadnet HQ Backbone Feeder" },
  { name: "JB Nagar & Vasantham Nagar", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Gandhi Nagar & Nehru Nagar", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Kamaraj Nagar", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Cholambedu", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true, landmark: "Cholambedu High Road" },
  { name: "Anna Nagar Avadi", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Vaishnavi Nagar", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "HVF Estate & Ordnance Road", pincode: "600054", zone: "Avadi Core", status: "live", speed: "Up to 300 Mbps", sameDay: true },

  // Zone: Avadi Surrounds (600071 / 600055)
  { name: "Paruthipattu", pincode: "600071", zone: "Avadi Outskirts", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Kovilpathu", pincode: "600071", zone: "Avadi Outskirts", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Mittanamallee", pincode: "600055", zone: "Avadi Outskirts", status: "live", speed: "Up to 200 Mbps", sameDay: true, landmark: "IAF Gate Feeder" },
  { name: "Morai", pincode: "600055", zone: "Avadi Outskirts", status: "live", speed: "Up to 200 Mbps", sameDay: false },

  // Zone: Thirumullaivoyal (600062)
  { name: "Thirumullaivoyal", pincode: "600062", zone: "Thirumullaivoyal", status: "live", speed: "Up to 300 Mbps", sameDay: true, landmark: "CTH Road Corridor" },
  { name: "Thirumullaivoyal Pudur", pincode: "600062", zone: "Thirumullaivoyal", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Manikandapuram", pincode: "600062", zone: "Thirumullaivoyal", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Women's Industrial Estate", pincode: "600062", zone: "Thirumullaivoyal", status: "live", speed: "Up to 300 Mbps (Gigabit Ready)", sameDay: true, landmark: "Enterprise Industrial Hub" },
  { name: "Sivasakthi Nagar", pincode: "600062", zone: "Thirumullaivoyal", status: "live", speed: "Up to 300 Mbps", sameDay: true },

  // Zone: Pattabiram & Thandurai (600072)
  { name: "Pattabiram", pincode: "600072", zone: "Pattabiram", status: "live", speed: "Up to 300 Mbps", sameDay: true, landmark: "Pattabiram Railway Station Area" },
  { name: "Thandurai", pincode: "600072", zone: "Pattabiram", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Sekkadu", pincode: "600072", zone: "Pattabiram", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Iyyappan Nagar", pincode: "600072", zone: "Pattabiram", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Military Siding", pincode: "600072", zone: "Pattabiram", status: "live", speed: "Up to 300 Mbps", sameDay: true },

  // Zone: Ambattur (600053)
  { name: "Ambattur OT", pincode: "600053", zone: "Ambattur", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Menambedu", pincode: "600053", zone: "Ambattur", status: "live", speed: "Up to 300 Mbps", sameDay: true },
  { name: "Ram Nagar", pincode: "600053", zone: "Ambattur", status: "live", speed: "Up to 300 Mbps", sameDay: true },

  // Zone: Poonamallee (600056)
  { name: "Poonamallee Trunk Road", pincode: "600056", zone: "Poonamallee", status: "live", speed: "Up to 200 Mbps", sameDay: true },
  { name: "Senneerkuppam", pincode: "600056", zone: "Poonamallee", status: "live", speed: "Up to 200 Mbps", sameDay: true },
  { name: "Kumananchavadi", pincode: "600056", zone: "Poonamallee", status: "expansion", speed: "Up to 200 Mbps", sameDay: false, landmark: "Line Expansion Active" },
  { name: "Nemilichery & Thiruninravur", pincode: "602024", zone: "Outer Feeder", status: "expansion", speed: "Up to 200 Mbps", sameDay: false, landmark: "Pre-Booking Open" },
];

const ZONE_FILTERS = [
  "All Zones",
  "Avadi Core",
  "Thirumullaivoyal",
  "Pattabiram",
  "Ambattur",
  "Poonamallee",
];

export default function LocationChecker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [activeResult, setActiveResult] = useState<LocationData | null>(null);

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const filteredLocations = useMemo(() => {
    return SERVING_LOCATIONS.filter((loc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        loc.name.toLowerCase().includes(q) ||
        loc.pincode.includes(q) ||
        loc.zone.toLowerCase().includes(q) ||
        (loc.landmark && loc.landmark.toLowerCase().includes(q));

      const matchesZone = selectedZone === "All Zones" || loc.zone === selectedZone;
      return matchesSearch && matchesZone;
    });
  }, [searchQuery, selectedZone]);

  const handleSelectLocation = (loc: LocationData) => {
    setActiveResult(loc);
  };

  const handleBookLocation = (locName: string) => {
    // Send event to enquiry form to pre-populate location & select internet enquiry
    window.dispatchEvent(
      new CustomEvent("broadnet:select-service", {
        detail: { service: "Broadnet FTTH Plans" },
      })
    );
    window.dispatchEvent(
      new CustomEvent("broadnet:set-location", {
        detail: { location: locName },
      })
    );
    scrollToWithPhysics("enquiry");
  };

  return (
    <section
      ref={ref}
      id="coverage"
      className="py-24 bg-[#07091E] relative overflow-hidden text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4E0DBA]/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#EF1313]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00C2FF] mb-3">
            <Wifi size={14} className="animate-pulse" />
            100+ KM Optical Fiber Network Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-display">
            Check Internet Availability{" "}
            <span className="text-gradient">in Your Area</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-body">
            Broadnet owns and operates private fiber rings across Avadi, Thirumullaivoyal, Pattabiram, and surrounding areas. Type your locality or pincode for instant connection feasibility.
          </p>
        </motion.div>

        {/* Search & Quick Check Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-[#110E2E]/90 border border-white/12 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-12"
        >
          {/* Search Input */}
          <div className="relative mb-5">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveResult(null);
              }}
              placeholder="Enter your street, area, or pincode (e.g. TNHB, Cholambedu, 600054)..."
              className="w-full bg-[#18143F] border border-white/15 focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20 text-white rounded-2xl py-4 pl-12 pr-10 text-sm sm:text-base outline-none transition-all placeholder:text-white/35 font-body"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs px-2 py-1 rounded bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Zone Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-white/40 font-bold uppercase tracking-wider whitespace-nowrap mr-1">
              Filter:
            </span>
            {ZONE_FILTERS.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  selectedZone === zone
                    ? "bg-[#4E0DBA] border-[#4E0DBA] text-white shadow-md shadow-[#4E0DBA]/40"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>

          {/* Instant Active Result Box */}
          <AnimatePresence>
            {activeResult && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ duration: 0.35 }}
                className="mt-6 pt-6 border-t border-white/10 overflow-hidden"
              >
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#18143F] to-emerald-500/5 border border-emerald-500/30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-xl font-bold text-white font-display">
                          {activeResult.name}
                        </h4>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
                          {activeResult.pincode}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          {activeResult.status === "live"
                            ? "100% Fiber Ready"
                            : "Line Expansion Active"}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs">
                        Zone: <strong className="text-white/80">{activeResult.zone}</strong>
                        {activeResult.landmark && ` · ${activeResult.landmark}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleBookLocation(activeResult.name)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#EF1313] hover:bg-[#d00e0e] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#EF1313]/30 transition-all active:scale-95"
                      >
                        <Send size={13} />
                        <span>Book Connection</span>
                      </button>

                      <a
                        href={`https://wa.me/919884344075?text=${encodeURIComponent(
                          `Hi Broadnet, I am located in ${activeResult.name} (${activeResult.pincode}). Please verify fiber connection availability and install internet.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <MessageCircle size={14} className="fill-white" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-white/40 block">Max Speed</span>
                      <span className="font-bold text-white">{activeResult.speed}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Installation</span>
                      <span className="font-bold text-emerald-400">
                        {activeResult.sameDay ? "Same-Day Setup" : "24–48 Hours"}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Hardware Included</span>
                      <span className="font-bold text-white">Free ONT Router</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Local Tech Support</span>
                      <span className="font-bold text-white">&lt; 2 Hr SLA</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Serving Locations Directory Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <MapPin size={18} className="text-[#00C2FF]" />
              <span>Serving Localities & Fiber Clusters</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
                {filteredLocations.length} Areas
              </span>
            </h3>
            <span className="text-xs text-white/50 hidden sm:inline">
              Click any area to view feasibility & instant booking
            </span>
          </div>

          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredLocations.map((loc) => {
                const isSelected = activeResult?.name === loc.name;
                return (
                  <div
                    key={loc.name}
                    onClick={() => handleSelectLocation(loc)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#1C1747] border-[#00C2FF] shadow-lg shadow-[#00C2FF]/10 ring-1 ring-[#00C2FF]/40"
                        : "bg-[#110E2A]/70 border-white/8 hover:border-white/20 hover:bg-[#151136]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E0DBA]/30 transition-colors">
                        <MapPin size={15} className="text-[#00C2FF]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white group-hover:text-[#00C2FF] transition-colors">
                            {loc.name}
                          </span>
                          <span className="text-[10px] font-mono text-white/50">
                            {loc.pincode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/50 mt-0.5">
                          <span>{loc.zone}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">
                            {loc.speed}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          loc.status === "live"
                            ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]"
                            : "bg-amber-400"
                        }`}
                        title={loc.status === "live" ? "Fiber Live" : "Expansion"}
                      />
                      <ChevronRight
                        size={15}
                        className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty Search Fallback */
            <div className="p-8 rounded-3xl bg-[#110E2A] border border-white/10 text-center max-w-xl mx-auto">
              <AlertCircle size={32} className="text-amber-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">
                Locality Not in List?
              </h4>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                Broadnet continuously extends private optical cables across Avadi and surrounding taluks. Send your street location to our engineering team for instant feasibility mapping.
              </p>
              <a
                href={`https://wa.me/919884344075?text=${encodeURIComponent(
                  `Hi Broadnet, I want to check fiber feasibility in my area: "${searchQuery}". Please let me know if connection is available.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageCircle size={15} className="fill-white" />
                <span>Request Feasibility for &ldquo;{searchQuery}&rdquo;</span>
              </a>
            </div>
          )}
        </div>

        {/* Network Infrastructure Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-[#0D0A24] border border-white/8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#4E0DBA]/20 border border-[#4E0DBA]/30 flex items-center justify-center flex-shrink-0">
              <Zap size={18} className="text-[#A78BFA]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white mb-1">
                Zero Third-Party Reseller Mesh
              </h5>
              <p className="text-white/50 text-xs leading-relaxed">
                Direct optical connections from our private headend ring. Guaranteed bandwidth without evening congestion.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#EF1313]/20 border border-[#EF1313]/30 flex items-center justify-center flex-shrink-0">
              <Clock size={18} className="text-[#EF1313]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white mb-1">
                Local Avadi Technician SLA
              </h5>
              <p className="text-white/50 text-xs leading-relaxed">
                Our technicians are stationed locally in Avadi for rapid on-site resolution within 2 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white mb-1">
                Free Optical ONT Equipment
              </h5>
              <p className="text-white/50 text-xs leading-relaxed">
                All live coverage areas qualify for 100% Free Installation and free-to-use high gain optical ONT routers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
