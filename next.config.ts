import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Désactive la vérification TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  /* tes autres options ici */
};

export default nextConfig;