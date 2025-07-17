/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration for allowing images from Firebase Storage
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },

  // The new configuration to fix the 'canvas' module build error
  webpack: (config, {isServer}) => {
    // This is a workaround for a build issue with the 'canvas' package
    // which is a dependency of pdf.js-extract. We are telling Webpack to
    // ignore this module during the build process as it's not needed
    // for server-side text extraction and causes errors in serverless environments.
    if (isServer) {
      config.externals.push("canvas");
    }
    return config;
  },
};

export default nextConfig;
