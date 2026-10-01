import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Broadnet Internet Services | Engineered Connectivity. Intelligent Surveillance.",
  description: "Broadnet - Avadi premier ISP and security solutions provider delivering fiber internet, CCTV surveillance, enterprise Wi-Fi, and ELV systems since 2014.",
  keywords: "Broadnet, ISP Avadi, fiber internet Chennai, CCTV Avadi, Hikvision dealer, CP PLUS dealer",
};

import CustomCursor from "@/components/CustomCursor";
import MobileStickyBar from "@/components/MobileStickyBar";

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
      </head>
      <body>
        <CustomCursor />
        {children}
        <MobileStickyBar />
      </body>
    </html>
  );
}