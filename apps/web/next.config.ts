import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...(config.resolve.extensions || []),
    ];
    return config;
  },
  turbopack: {
    resolveAlias: {
      "react-native": "react-native-web",
    },
  },
};

export default nextConfig;
