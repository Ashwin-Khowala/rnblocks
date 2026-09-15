import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@rnblocks/registry", "@rnblocks/ui", "react-native-svg"],
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
      "react-native-svg$": path.resolve(__dirname, "lib/react-native-svg-web.js"),
      "@react-native/assets-registry/registry": path.resolve(__dirname, "lib/assets-registry-mock.js"),
      "@react-native/assets-registry": path.resolve(__dirname, "lib/assets-registry-mock.js"),
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
      "react-native-svg": "./lib/react-native-svg-web.js",
      "@react-native/assets-registry/registry": "./lib/assets-registry-mock.js",
      "@react-native/assets-registry": "./lib/assets-registry-mock.js",
    },
  },
};

export default nextConfig;

