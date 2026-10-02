"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  Wifi,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MapPin,
  MessageSquare,
  Mail,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
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

interface FormState {
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  message?: string;
}

export default function EnquirySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [formType, setFormType] = useState<FormType>("security");
  const [status, setStatus] = useState<Status>("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    enquiryType: string;
    requirements: string[];
    referenceId?: string;
  } | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const lastSubmittedPayload = useRef<string>("");

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
    setSelected((prev) => (prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]));
  };

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case "name": {
        const trimmed = value.trim();
        if (!trimmed) {
          return "Please enter your full name.";
        }
        if (trimmed.length < 2) {
          return "Name must be at least 2 characters.";
        }
        if (trimmed.length > 80) {
          return "Name cannot exceed 80 characters.";
        }
        return undefined;
      }
      case "phone": {
        const cleaned = value.replace(/[\s\-\(\)]/g, "");
        if (!cleaned) {
          return "Please enter your phone number.";
        }
        // Match Indian phone format: 10 digits starting with 6-9, with optional +91 or 0 prefix
        const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
        if (!phoneRegex.test(cleaned)) {
          return "Please enter a valid 10-digit Indian mobile number (e.g. 98843 44075).";
        }
        return undefined;
      }
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) return undefined; // Optional
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return "Please enter a valid email address (e.g. name@example.com) or leave blank.";
        }
        return undefined;
      }
      case "location": {
        if (value.length > 120) {
          return "Location cannot exceed 120 characters.";
        }
        return undefined;
      }
      case "message": {
        if (value.length > 800) {
          return "Requirement notes cannot exceed 800 characters.";
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const nameErr = validateField("name", form.name);
    if (nameErr) newErrors.name = nameErr;

    const phoneErr = validateField("phone", form.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateField("email", form.email);
    if (emailErr) newErrors.email = emailErr;

    const locErr = validateField("location", form.location);
    if (locErr) newErrors.location = locErr;

    const msgErr = validateField("message", form.message);
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      location: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const triggerHaptic = (pattern: number | number[] = 18) => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      triggerHaptic([30, 40, 30]);
      // Focus on first invalid field
      const firstInvalidKey = ["name", "phone", "email", "location", "message"].find(
        (k) => errors[k as keyof FormErrors]
      );
      if (firstInvalidKey) {
        const el = document.getElementById(`enquiry-${firstInvalidKey}`);
        el?.focus();
      }
      return;
    }

    // Check duplicate submission
    const payloadHash = `${form.name}|${form.phone}|${formType}|${selected.join(",")}|${form.message}`;
    if (lastSubmittedPayload.current === payloadHash && status === "success") {
      return;
    }

    // Gentle tactile haptic on submission click
    triggerHaptic(20);

    setStatus("sending");
    setServerErrorMessage("");
    setPreviewUrl(null);
    const startTime = Date.now();

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      location: form.location.trim() || undefined,
      enquiryType: formType === "security" ? "Security & ELV Enquiry" : "Fiber Internet Enquiry",
      requirements: selected,
      message: form.message.trim() || undefined,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      // Smooth motion design window: let the message takeoff animation complete naturally
      const elapsed = Date.now() - startTime;
      if (elapsed < 900) {
        await new Promise((r) => setTimeout(r, 900 - elapsed));
      }

      // Triumphant delivery haptic confirmation
      triggerHaptic([30, 60, 40]);

      lastSubmittedPayload.current = payloadHash;
      setSubmittedData({
        name: form.name.trim(),
        phone: form.phone.trim(),
        enquiryType: payload.enquiryType,
        requirements: selected,
        referenceId: data.referenceId,
      });

      setStatus("success");
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to connect to the enquiry service.";
      setServerErrorMessage(errMsg);
      setStatus("error");
      triggerHaptic([40, 50, 40]);
    }
  };

  const handleResetForm = () => {
    setForm({ name: "", phone: "", email: "", location: "", message: "" });
    setSelected([]);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setSubmittedData(null);
    setServerErrorMessage("");
    lastSubmittedPayload.current = "";
  };

  const handleMailtoDirect = () => {
    const subject = encodeURIComponent(
      `[BroadNet ${formType === "security" ? "Security" : "Internet"} Enquiry] ${form.name || "Customer Lead"}`
    );
    const body = encodeURIComponent(
      `Customer Name: ${form.name || "Not provided"}\n` +
      `Phone Number: ${form.phone || "Not provided"}\n` +
      `Email: ${form.email || "Not provided"}\n` +
      `Location / Area: ${form.location || "Not provided"}\n` +
      `Enquiry Category: ${formType === "security" ? "Security & ELV" : "Fiber Internet"}\n` +
      `Selected Requirements: ${selected.join(", ") || "None specified"}\n\n` +
      `Requirements / Notes:\n${form.message || "None specified"}\n`
    );
    window.open(`mailto:admin@broadnet.in?subject=${subject}&body=${body}`, "_self");
  };

  const whatsappHref = `https://wa.me/919884344075?text=${encodeURIComponent(
    `Hello BroadNet, I would like to enquire about ${
      formType === "security" ? "Security & CCTV Systems" : "Fiber Internet"
    }${selected.length > 0 ? ` (${selected.join(", ")})` : ""}.${
      form.location ? ` Location: ${form.location}.` : ""
    } My Name is ${form.name || "a customer"}.`
  )}`;

  return (
    <section ref={ref} className="py-8 sm:py-10 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Concise Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-3 sm:mb-4"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF1313] font-display">
            Direct Technician Dispatch · Avadi & Chennai
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16143E] mt-0.5 mb-1 font-display">
            Quick Enquiry & Site Feasibility
          </h2>
          <p className="text-xs text-[#16143E]/65 max-w-lg mx-auto">
            Get a same-day quotation and free on-site survey scheduled at your convenience.
          </p>
        </motion.div>

        {/* The Form Card with id="enquiry" so CTA clicks frame the complete form on screen */}
        <motion.div
          id="enquiry"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="bg-white border border-[#16143E]/12 rounded-2xl sm:rounded-3xl shadow-xl shadow-[#16143E]/6 overflow-hidden scroll-mt-20"
        >
          {/* Toggle Pillars */}
          <div className="flex border-b border-[#16143E]/10 bg-[#16143E]/[0.02]">
            {(["security", "internet"] as FormType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setFormType(t);
                  setSelected([]);
                }}
                className={`flex-1 min-h-[42px] flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  formType === t
                    ? t === "security"
                      ? "bg-white text-[#EF1313] border-b-2 border-[#EF1313] shadow-sm"
                      : "bg-white text-[#4E0DBA] border-b-2 border-[#4E0DBA] shadow-sm"
                    : "text-[#16143E]/55 hover:text-[#16143E] hover:bg-white/40"
                }`}
              >
                {t === "security" ? <Shield size={15} /> : <Wifi size={15} />}
                <span>{t === "security" ? "Security & ELV Systems" : "Fiber Internet & FTTH"}</span>
              </button>
            ))}
          </div>

          {/* Success Screen */}
          {status === "success" && submittedData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#16143E] mb-2 font-display">
                Enquiry Successfully Received!
              </h3>
              <p className="text-sm sm:text-base text-[#16143E]/70 max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you, <strong className="text-[#16143E]">{submittedData.name}</strong>. Our local Avadi technical engineering team will review your requirements and call you at{" "}
                <strong className="text-[#16143E]">{submittedData.phone}</strong> within 2 hours.
              </p>

              {/* Submission summary badge */}
              <div className="bg-[#16143E]/[0.03] border border-[#16143E]/10 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left text-xs">
                <div className="font-bold text-[#16143E] mb-1">Submission Details:</div>
                <div className="text-[#16143E]/70 mb-1">Category: <span className="font-semibold text-[#16143E]">{submittedData.enquiryType}</span></div>
                {submittedData.requirements.length > 0 && (
                  <div className="text-[#16143E]/70">
                    Selected Services:{" "}
                    <span className="font-semibold text-[#4E0DBA]">{submittedData.requirements.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Next Steps Card */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 max-w-lg mx-auto mb-6 text-left text-xs">
                <div className="font-bold text-[#16143E] mb-2 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>What Happens Next:</span>
                </div>
                <ol className="space-y-1.5 text-[#16143E]/80 list-decimal pl-4 leading-relaxed">
                  <li>Our Avadi technical desk has logged your enquiry with Reference ID: <strong className="font-mono text-[#EF1313]">{submittedData.referenceId}</strong>.</li>
                  <li>A technician from our Fire Station Road office will call you at <strong className="text-[#16143E]">{submittedData.phone}</strong> within 30–60 minutes.</li>
                  <li>We confirm port feasibility and schedule your doorstep setup or site survey at your convenience.</li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-crimson min-h-[44px] px-6 py-2.5 w-full sm:w-auto justify-center"
                >
                  <RefreshCw size={15} /> Submit Another Enquiry
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-6 py-2.5 rounded-full font-bold text-xs bg-[#25D366] text-white hover:bg-[#20ba5a] flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 w-full sm:w-auto"
                >
                  <MessageCircle size={15} /> Follow up on WhatsApp
                </a>
              </div>

              {previewUrl && (
                <div className="mt-6">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#4E0DBA]/10 text-[#4E0DBA] hover:bg-[#4E0DBA]/20 text-xs font-semibold transition-all border border-[#4E0DBA]/20"
                  >
                    <ExternalLink size={13} /> View Test Email Dispatch Log ↗
                  </a>
                </div>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-4 sm:p-5">
              {/* Retryable Error Alert Box */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-800 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle size={16} className="text-[#EF1313] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="font-bold">Submission Notice: </strong>
                        <span>{serverErrorMessage || "Unable to send enquiry online right now. You can retry or contact us directly below."}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                      <button
                        type="submit"
                        className="px-3.5 py-2 min-h-[40px] rounded-lg bg-[#EF1313] text-white font-bold text-xs hover:bg-[#d00e0e] transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-md"
                      >
                        <RefreshCw size={13} /> Retry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name + Phone */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-2.5">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#16143E]/75 mb-1"
                  >
                    Full Name <span className="text-[#EF1313]">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none"
                    />
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={80}
                      placeholder="e.g. Senthil Kumar"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "enquiry-name-error" : undefined}
                      className={`input-field input-field-icon input-field-compact min-h-[40px] ${
                        errors.name ? "border-[#EF1313] focus:border-[#EF1313] focus:ring-[#EF1313]/20" : ""
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p id="enquiry-name-error" className="mt-1 text-[11px] text-[#EF1313] flex items-center gap-1 font-medium">
                      <AlertCircle size={11} className="flex-shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#16143E]/75 mb-1"
                  >
                    Phone Number <span className="text-[#EF1313]">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none"
                    />
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={15}
                      placeholder="e.g. 98843 44075"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
                      className={`input-field input-field-icon input-field-compact min-h-[40px] ${
                        errors.phone ? "border-[#EF1313] focus:border-[#EF1313] focus:ring-[#EF1313]/20" : ""
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p id="enquiry-phone-error" className="mt-1 text-[11px] text-[#EF1313] flex items-center gap-1 font-medium">
                      <AlertCircle size={11} className="flex-shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email + Location */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-2.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="enquiry-email"
                      className="block text-[11px] font-bold uppercase tracking-wider text-[#16143E]/75"
                    >
                      Email Address
                    </label>
                    <span className="text-[10px] text-[#16143E]/45">Optional</span>
                  </div>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none"
                    />
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. contact@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "enquiry-email-error" : undefined}
                      className={`input-field input-field-icon input-field-compact min-h-[40px] ${
                        errors.email ? "border-[#EF1313] focus:border-[#EF1313] focus:ring-[#EF1313]/20" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p id="enquiry-email-error" className="mt-1 text-[11px] text-[#EF1313] flex items-center gap-1 font-medium">
                      <AlertCircle size={11} className="flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="enquiry-location"
                      className="block text-[11px] font-bold uppercase tracking-wider text-[#16143E]/75"
                    >
                      Location / Area
                    </label>
                    <span className="text-[10px] text-[#16143E]/45">Avadi & Chennai</span>
                  </div>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#16143E]/35 pointer-events-none"
                    />
                    <input
                      id="enquiry-location"
                      name="location"
                      type="text"
                      value={form.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={120}
                      placeholder="e.g. TNHB Avadi, 600054"
                      aria-invalid={!!errors.location}
                      aria-describedby={errors.location ? "enquiry-location-error" : undefined}
                      className={`input-field input-field-icon input-field-compact min-h-[40px] ${
                        errors.location ? "border-[#EF1313] focus:border-[#EF1313] focus:ring-[#EF1313]/20" : ""
                      }`}
                    />
                  </div>
                  {errors.location && (
                    <p id="enquiry-location-error" className="mt-1 text-[11px] text-[#EF1313] flex items-center gap-1 font-medium">
                      <AlertCircle size={11} className="flex-shrink-0" />
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Requirements Chips */}
              <div className="mb-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#16143E]/75">
                    Select Requirements
                  </label>
                  <span className="text-[10px] text-[#16143E]/45">Select all that apply</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={formType}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {requirements.map((req) => {
                      const isSelected = selected.includes(req);
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => toggleReq(req)}
                          aria-pressed={isSelected}
                          className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 flex items-center justify-center ${
                            isSelected
                              ? formType === "security"
                                ? "bg-[#EF1313] border-[#EF1313] text-white shadow-sm"
                                : "bg-[#4E0DBA] border-[#4E0DBA] text-white shadow-sm"
                              : "border-[#16143E]/15 text-[#16143E]/70 hover:border-[#16143E]/35 bg-white/70"
                          }`}
                        >
                          {req}
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Message */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="enquiry-message"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#16143E]/75"
                  >
                    Requirement Details / Notes
                  </label>
                  <span className="text-[10px] text-[#16143E]/45">{form.message.length}/800</span>
                </div>
                <div className="relative">
                  <MessageSquare
                    size={15}
                    className="absolute left-3.5 top-2.5 text-[#16143E]/35 pointer-events-none"
                  />
                  <textarea
                    id="enquiry-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={2}
                    maxLength={800}
                    placeholder="Describe your property, camera count, fiber speed requirement, or installation timeline..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "enquiry-message-error" : undefined}
                    className={`input-field input-field-icon input-field-compact resize-none ${
                      errors.message ? "border-[#EF1313] focus:border-[#EF1313] focus:ring-[#EF1313]/20" : ""
                    }`}
                  />
                </div>
                {errors.message && (
                  <p id="enquiry-message-error" className="mt-1 text-[11px] text-[#EF1313] flex items-center gap-1 font-medium">
                    <AlertCircle size={11} className="flex-shrink-0" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit & Quick Contact Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 flex-wrap">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 450, damping: 24 }}
                  className="relative overflow-hidden btn-crimson min-h-[44px] min-w-[200px] w-full sm:w-auto justify-center disabled:cursor-not-allowed shadow-lg shadow-[#EF1313]/30"
                >
                  {/* Transmitting light sweep across button */}
                  {status === "sending" && (
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.div
                        key="sending-state"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center gap-2"
                      >
                        {/* Flying Message Motion Graphic */}
                        <div className="relative w-4 h-4 flex items-center justify-center">
                          <motion.span
                            animate={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "easeOut" }}
                            className="absolute w-3.5 h-3.5 rounded-full border border-white/60"
                          />
                          <motion.div
                            animate={{
                              x: [0, 4, 18, -14, 0],
                              y: [0, -3, -12, 4, 0],
                              rotate: [0, 15, 28, -8, 0],
                              scale: [1, 1.1, 0.9, 0.95, 1],
                            }}
                            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                          >
                            <Send size={14} className="text-white fill-white/25" />
                          </motion.div>
                        </div>
                        <span className="font-bold text-xs tracking-wide">
                          Dispatching Message...
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle-state"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center gap-2 group-hover:gap-2.5 transition-all text-xs sm:text-sm"
                      >
                        <motion.span
                          whileHover={{ x: 2, y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <Send size={14} />
                        </motion.span>
                        <span>Send Enquiry</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2 rounded-full font-bold text-xs bg-[#25D366]/10 text-emerald-800 hover:bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:9884344075"
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#16143E]/70 hover:text-[#16143E] border border-[#16143E]/12 hover:border-[#16143E]/25 bg-transparent transition-all w-full sm:w-auto"
                >
                  <Phone size={13} className="text-[#EF1313]" /> Call 98843 44075
                </a>

                <div className="w-full sm:w-auto sm:ml-auto flex items-center justify-center sm:justify-end gap-2 text-[11px] text-[#16143E]/60 pt-1 sm:pt-0">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>2-Hour Avadi Desk Response Guarantee</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
