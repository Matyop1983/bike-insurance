import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: "/coverage", destination: "/bicycle-insurance", permanent: false },
      { source: "/how-it-works", destination: "/bicycle-insurance", permanent: false },
      { source: "/faq", destination: "/bicycle-insurance", permanent: false },
    ];
  },
};

export default nextConfig;
