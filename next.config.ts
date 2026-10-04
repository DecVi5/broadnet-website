import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add domains here if using next/image with external URLs
    // e.g. domains: ["res.cloudinary.com"],
    domains: [],
  },
  // Suppress the fs/path warnings from nodemailer on client bundles
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
