import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquirySection from "@/components/EnquirySection";
import { Users, Award, MapPin, Clock, TrendingUp, Heart, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Broadnet Internet Services",
  description: "Learn about Broadnet Internet Services - established 2014 in Avadi, Chennai, delivering fiber internet and security solutions.",
};

const STATS = [
  { value: "2014", label: "Year Established", icon: Clock },
  { value: "100+", label: "km Optical Fibre", icon: TrendingUp },
  { value: "2,500+", label: "Happy Customers", icon: Heart },
  { value: "10+", label: "Technical Experts", icon: Users },
];

const VALUES = [
  { title: "Engineering Excellence", desc: "Every installation is executed with precision — from cable routing to system configuration — following international standards." },
  { title: "Client-First Philosophy", desc: "We design solutions around your needs, not off-the-shelf packages. Every project begins with a thorough consultation and site survey." },
  { title: "Certified Expertise", desc: "Our team holds certified credentials from Hikvision, CP PLUS, Grandstream, eSSL, and Tactine — ensuring manufacturer-level proficiency." },
  { title: "After-Sales Commitment", desc: "Our relationship doesn't end at handover. AMC contracts, priority support, and remote diagnostics keep your systems running flawlessly." },
];

export default function AboutPage() {
  return (
    <>
      <Header activePage="About Us" />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 bg-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: "radial-gradient(circle, #16143E 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #4E0DBA 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-4">
                <span className="w-4 h-px bg-[#4E0DBA]" /> Our Story
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-[#16143E] leading-tight mb-6">
                Built in Avadi.
                <br />
                <span className="text-gradient">Trusted Across Chennai.</span>
              </h1>
              <p className="text-[#16143E]/60 text-xl leading-relaxed mb-8">
                Since 2014, Broadnet Internet Services has been the backbone of connectivity and security for thousands of homes and businesses in Avadi, Tamil Nadu. What started as a local ISP has grown into a full-spectrum technology solutions provider.
              </p>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#4E0DBA]" />
                <span className="text-[#16143E]/60 text-sm">
                  1093, Fire Station Road, TNHB, Avadi, Chennai ? 600 054
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#16143E] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-2xl border border-white/8 bg-white/4">
                  <stat.icon size={24} className="mx-auto mb-3 text-[#4E0DBA]" />
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/40 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-4">
                <span className="w-4 h-px bg-[#4E0DBA]" /> Our Principles
              </span>
              <h2 className="text-4xl font-bold text-[#16143E]">What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {VALUES.map((v, i) => (
                <div key={v.title} className="flex gap-5 p-7 rounded-2xl border border-[#16143E]/8 hover:border-[#4E0DBA]/25 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[#4E0DBA]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E0DBA]/15 transition-colors">
                    <span className="text-sm font-bold text-[#4E0DBA]">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[#16143E] font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-[#16143E]/55 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-white border-t border-[#16143E]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-2">
                <Award size={14} /> Certifications
              </span>
              <h2 className="text-3xl font-bold text-[#16143E]">Official Partner Status</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {["Hikvision HCSA Certified", "CP PLUS CSE Certified", "Grandstream Certified Specialist", "eSSL Authorised Partner", "Tactine Firewall Dealer"].map((cert) => (
                <div key={cert} className="px-6 py-3.5 rounded-xl border border-[#16143E]/10 bg-white shadow-sm hover:border-[#4E0DBA]/30 transition-colors text-sm font-semibold text-[#16143E]/70 flex items-center gap-2">
                  <BadgeCheck size={16} className="text-[#4E0DBA] flex-shrink-0" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>

        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
