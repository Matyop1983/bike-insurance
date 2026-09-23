import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: "/bicycle-insurance", destination: "/contact", permanent: false },
      { source: "/coverage", destination: "/contact", permanent: false },
      { source: "/how-it-works", destination: "/contact", permanent: false },
      { source: "/faq", destination: "/contact", permanent: false },
      {
        source: "/business-insurance/builders-risk",
        destination: "/builders-risk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
