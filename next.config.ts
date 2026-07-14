import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Disabled temporarily because Next.js middleware is incompatible with static HTML exports
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
