"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, Send } from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after scrolling past the first 250px so it doesn't obstruct initial hero view
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Quick Contact Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2 bg-white/92 backdrop-blur-xl border-t border-[#16143E]/10 shadow-[0_-8px_30px_rgba(22,20,62,0.12)] transition-all duration-300"
      style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href="tel:+919884344075"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#16143E]/5 hover:bg-[#16143E]/10 border border-[#16143E]/10 text-[#16143E] active:scale-95 transition-all text-center"
        >
          <Phone size={16} className="text-[#4E0DBA] mb-0.5" />
          <span className="text-[11px] font-bold font-display">Call</span>
        </a>

        <a
          href="https://wa.me/919884344075?text=Hello%20Broadnet%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#16143E] active:scale-95 transition-all text-center"
        >
          <MessageCircle size={16} className="text-[#25D366] mb-0.5" />
          <span className="text-[11px] font-bold font-display">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => {
            if (document.getElementById("enquiry")) {
              scrollToWithPhysics("enquiry");
            } else {
              window.location.href = "/contact#enquiry";
            }
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#EF1313] hover:bg-[#d81010] text-white shadow-md shadow-[#EF1313]/30 active:scale-95 transition-all text-center"
        >
          <Send size={15} className="text-white mb-0.5" />
          <span className="text-[11px] font-bold font-display">Enquiry</span>
        </button>
      </div>
    </aside>
  );
}
