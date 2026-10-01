"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Wifi, Send, CheckCircle, AlertCircle, User, Phone, MapPin, MessageSquare, Mail, ExternalLink, Copy, Check } from "lucide-react";
import { SectionLabel } from "./MotionHelpers";

const SECURITY_REQUIREMENTS = [
  "CCTV Installation & Services",
  "Intrusion Alarm System",
  "Smart Video Door Phone",
  "Biometric Access Control",
  "Intercom System",
  "Boom & Flap Barriers",
];

const INTERNET_REQUIREMENTS = [
  "Broadnet FTTH Plans",
  "Railwire FTTH + OTT",
  "BSNL Bharat Fibre",
  "Dual Band ONT Upgrade",
  "Enterprise Wi-Fi 6",
  "Structured Cabling",
];

type FormType = "security" | "internet";
type Status = "idle" | "sending" | "success" | "error";

export default function EnquirySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [formType, setFormType] = useState<FormType>("security");
  const [status, setStatus] = useState<Status>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", location: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const email = "admin@broadnet.in";
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const fallbackCopy = (text: string) => {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    } catch {
      // ignore fallback error
    }
  };

  const requirements = formType === "security" ? SECURITY_REQUIREMENTS : INTERNET_REQUIREMENTS;

  useEffect(() => {
    const handleServiceSelect = (serviceName: string) => {
      if (!serviceName) return;
      const lower = serviceName.toLowerCase();

      const isInternet =
        lower.includes("internet") ||
        lower.includes("fiber") ||
        lower.includes("ftth") ||
        lower.includes("broadnet") ||
        lower.includes("railwire") ||
        lower.includes("bsnl") ||
        lower.includes("ont") ||
        lower.includes("wi-fi") ||
        lower.includes("wifi") ||
        lower.includes("network") ||
        lower.includes("cabling");

      const type: FormType = isInternet ? "internet" : "security";
      setFormType(type);

      const targetList = isInternet ? INTERNET_REQUIREMENTS : SECURITY_REQUIREMENTS;
      const matched = targetList.find(
        (r) => lower.includes(r.toLowerCase()) || r.toLowerCase().includes(lower)
      );

      if (matched) {
        setSelected([matched]);
      } else if (lower.includes("cctv")) {
        setSelected(["CCTV Installation & Services"]);
      } else if (lower.includes("railwire")) {
        setSelected(["Railwire FTTH + OTT"]);
      } else if (lower.includes("broadnet")) {
        setSelected(["Broadnet FTTH Plans"]);
      } else if (lower.includes("ont")) {
        setSelected(["Dual Band ONT Upgrade"]);
      } else if (lower.includes("bsnl")) {
        setSelected(["BSNL Bharat Fibre"]);
      } else {
        setSelected([serviceName]);
      }
    };

    const onCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string }>;
      if (customEvent.detail?.service) {
        handleServiceSelect(customEvent.detail.service);
      }
    };

    const onLocationEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ location: string }>;
      if (customEvent.detail?.location) {
        setForm((prev) => ({ ...prev, location: customEvent.detail.location }));
      }
    };

    window.addEventListener("broadnet:select-service", onCustomEvent);
    window.addEventListener("broadnet:set-location", onLocationEvent);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      const locationParam = params.get("location");
      if (serviceParam) {
        handleServiceSelect(serviceParam);
      }
      if (locationParam) {
        setForm((prev) => ({ ...prev, location: locationParam }));
      }
    }

    return () => {
      window.removeEventListener("broadnet:select-service", onCustomEvent);
      window.removeEventListener("broadnet:set-location", onLocationEvent);
    };
  }, []);

  const toggleReq = (req: string) => {
    setSelected((prev) => prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");
    setPreviewUrl(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          location: form.location,
          enquiryType: formType === "security" ? "Security Enquiry" : "Internet Enquiry",
          requirements: selected,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setStatus("success");
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      setForm({ name: "", phone: "", location: "", message: "" });
      setSelected([]);
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 9000);
  };

  const handleMailtoDirect = () => {
    const subject = encodeURIComponent(
      `[BroadNet ${formType === "security" ? "Security" : "Internet"} Enquiry] ${form.name || "Customer Lead"}`
    );
    const body = encodeURIComponent(
      `Customer Name: ${form.name || "Not provided"}\n` +
      `Phone Number: ${form.phone || "Not provided"}\n` +
      `Location / Area: ${form.location || "Not provided"}\n` +
      `Enquiry Category: ${formType === "security" ? "Security Enquiry" : "Internet Enquiry"}\n` +
      `Selected Requirements: ${selected.join(", ") || "None specified"}\n\n` +
      `Requirements / Notes:\n${form.message || "None specified"}\n`
    );
    window.open(`mailto:admin@broadnet.in?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <section ref={ref} id="enquiry" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel>Enquiry Hub</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-[#16143E] mt-2 mb-4">
            Start Your{" "}
            <span className="text-gradient">Project</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="bg-white border border-[#16143E]/8 rounded-3xl shadow-2xl shadow-[#16143E]/5 overflow-hidden"
        >
          {/* Toggle */}
          <div className="flex border-b border-[#16143E]/8">
            {(["security", "internet"] as FormType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setFormType(t); setSelected([]); }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-3 sm:py-4 px-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  formType === t
                    ? t === "security"
                      ? "bg-[#EF1313]/5 text-[#EF1313] border-b-2 border-[#EF1313]"
                      : "bg-[#4E0DBA]/5 text-[#4E0DBA] border-b-2 border-[#4E0DBA]"
                    : "text-[#16143E]/40 hover:text-[#16143E]/70"
                }`}
              >
                {t === "security" ? <Shield size={15} /> : <Wifi size={15} />}
                {t === "security" ? "Security Enquiry" : "Internet Enquiry"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            {/* Name + Phone */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
              <div>
                <label
                  htmlFor="enquiry-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#16143E]/70 mb-2"
                >
                  Full Name <span className="text-[#EF1313]">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none" />
                  <input
                    id="enquiry-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="input-field input-field-icon"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-xs font-bold uppercase tracking-wider text-[#16143E]/70 mb-2"
                >
                  Phone Number <span className="text-[#EF1313]">*</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none" />
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="input-field input-field-icon"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-5">
              <label
                htmlFor="enquiry-location"
                className="block text-xs font-bold uppercase tracking-wider text-[#16143E]/70 mb-2"
              >
                Location / Area
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none" />
                <input
                  id="enquiry-location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Connaught Place, New Delhi"
                  className="input-field input-field-icon"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#16143E]/70 mb-2.5">
                Select Requirements
              </label>
              <AnimatePresence mode="wait">
                <motion.div
                  key={formType}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                >
                  {requirements.map((req) => (
                    <button
                      key={req}
                      type="button"
                      onClick={() => toggleReq(req)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold border transition-all duration-150 ${
                        selected.includes(req)
                          ? formType === "security"
                            ? "bg-[#EF1313] border-[#EF1313] text-white"
                            : "bg-[#4E0DBA] border-[#4E0DBA] text-white"
                          : "border-[#16143E]/15 text-[#16143E]/60 hover:border-[#16143E]/30"
                      }`}
                    >
                      {req}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Message */}
            <div className="mb-7">
              <label
                htmlFor="enquiry-message"
                className="block text-xs font-bold uppercase tracking-wider text-[#16143E]/70 mb-2"
              >
                Requirement Details / Notes
              </label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-4 top-4 text-[#16143E]/35 pointer-events-none" />
                <textarea
                  id="enquiry-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your requirements or any specific details..."
                  className="input-field input-field-icon resize-none"
                />
              </div>
            </div>

            {/* Submit & Secondary Options */}
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="btn-crimson w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending to Admin...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={16} /> Sent to admin@broadnet.in!
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Enquiry
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleMailtoDirect}
                title="Compose and send directly to admin@broadnet.in using your default mail app"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-[#16143E]/70 hover:text-[#16143E] border border-[#16143E]/15 hover:border-[#16143E]/30 bg-transparent transition-all w-full sm:w-auto"
              >
                <Mail size={14} className="text-[#EF1313]" /> Open in Mail App
              </button>

              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#4E0DBA]/10 text-[#4E0DBA] hover:bg-[#4E0DBA]/20 text-xs font-semibold transition-all border border-[#4E0DBA]/20 animate-pulse"
                >
                  <ExternalLink size={13} /> View Test Email Preview ↗
                </a>
              )}

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-[#EF1313]"
                  >
                    <AlertCircle size={14} /> Failed to send. Please use "Open in Mail App" or call directly.
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Click to copy email address"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 sm:ml-auto group cursor-pointer border ${
                  copiedEmail
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 font-semibold shadow-sm"
                    : "text-[#16143E]/55 hover:text-[#16143E] bg-[#16143E]/[0.03] hover:bg-[#16143E]/[0.08] border-[#16143E]/8 hover:border-[#16143E]/18"
                }`}
              >
                {copiedEmail ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span>Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <span>
                      Direct to: <strong className="text-[#16143E]/80 group-hover:text-[#16143E]">admin@broadnet.in</strong>
                    </span>
                    <Copy size={12} className="opacity-45 group-hover:opacity-100 transition-opacity ml-0.5 text-[#4E0DBA]" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
