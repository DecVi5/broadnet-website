import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.broadnet.in"),
  title: {
    default: "Broadnet Internet Services | Fiber Broadband & CCTV Security in Avadi, Chennai",
    template: "%s | Broadnet Internet Services",
  },
  description:
    "Broadnet delivers high-speed fiber internet from ₹499/mo, BSNL Bharat Fibre, and certified Hikvision & CP PLUS CCTV security systems with 2-hour technician dispatch across Avadi & Chennai.",
  keywords: [
    "Broadnet",
    "broadband connection Avadi",
    "fiber internet Chennai",
    "CCTV installation Avadi",
    "Hikvision CCTV dealer Chennai",
    "CP PLUS camera installation Avadi",
    "ISP Avadi",
    "BSNL Bharat Fibre Avadi",
    "Railwire FTTH Avadi",
    "biometric access control Chennai",
    "intercom system Avadi",
    "enterprise Wi-Fi installation",
    "structured cabling Avadi",
    "Boom barriers Avadi",
  ],
  authors: [{ name: "Broadnet Internet Services", url: "https://www.broadnet.in" }],
  creator: "Broadnet Internet Services",
  publisher: "Broadnet Internet Services",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "https://www.broadnet.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.broadnet.in",
    siteName: "Broadnet Internet Services",
    title: "Broadnet | High-Speed Fiber Internet & CCTV Security in Avadi, Chennai",
    description:
      "Avadi's premier ISP and ELV security integrator. 100+ km private fiber network, official Hikvision & CP PLUS partner. 2-hour technician dispatch.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Broadnet Internet Services - Fiber Internet & CCTV Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Broadnet | Fiber Internet & Security Solutions Avadi",
    description:
      "Avadi's leading fiber ISP & certified CCTV security systems with 2-hour technician response.",
    images: ["/assets/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import CustomCursor from "@/components/CustomCursor";
import MobileStickyBar from "@/components/MobileStickyBar";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.broadnet.in/#localbusiness",
      "name": "Broadnet Internet Services",
      "url": "https://www.broadnet.in",
      "logo": "https://www.broadnet.in/assets/logo.png",
      "image": "https://www.broadnet.in/assets/logo.png",
      "description":
        "Premier fiber internet provider and certified security & ELV solutions integrator in Avadi, Chennai since 2014.",
      "telephone": "+91-9884344075",
      "email": "admin@broadnet.in",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1093, Fire Station Road, TNHB",
        "addressLocality": "Avadi",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600054",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.1147,
        "longitude": 80.1009,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00",
        },
      ],
      "areaServed": [
        { "@type": "City", "name": "Avadi" },
        { "@type": "City", "name": "Ambattur" },
        { "@type": "City", "name": "Thirumullaivoyal" },
        { "@type": "City", "name": "Pattabiram" },
        { "@type": "City", "name": "Poonamallee" },
        { "@type": "City", "name": "Chennai" },
      ],
      "sameAs": [
        "https://www.google.com/maps/dir/?api=1&destination=1093,+Fire+Station+Road,+TNHB,+Avadi,+Chennai,+Tamil+Nadu+600054",
      ],
    },
    {
      "@type": "InternetServiceProvider",
      "@id": "https://www.broadnet.in/#isp",
      "name": "Broadnet Fiber Internet",
      "provider": { "@id": "https://www.broadnet.in/#localbusiness" },
      "areaServed": { "@type": "City", "name": "Avadi" },
      "serviceType": "Fiber Broadband, FTTH, BSNL Bharat Fibre, Railwire FTTH",
    },
    {
      "@type": "SecurityService",
      "@id": "https://www.broadnet.in/#securityservice",
      "name": "Broadnet CCTV & ELV Security Solutions",
      "provider": { "@id": "https://www.broadnet.in/#localbusiness" },
      "areaServed": { "@type": "City", "name": "Avadi, Chennai" },
      "serviceType":
        "CCTV Camera Installation, Hikvision Intrusion Alarms, Biometric Access Control, Intercom Systems",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
          <MobileStickyBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}