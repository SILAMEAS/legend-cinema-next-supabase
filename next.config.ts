import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: [
            "coolbeans.sgp1.digitaloceanspaces.com",
            "image.tmdb.org",
            "images.unsplash.com",
            "uxhbvygzxrupbrezyatn.supabase.co", // ✅ only hostname
            "imgs.search.brave.com"
        ],
    },
};

export default nextConfig;