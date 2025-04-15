// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/boostacarriere-2679a.appspot.com/o/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/512/1077/1077114.png",
      },
      {
        protocol: "https",
        hostname: "ethical-leader.blog",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "**",
      },
    ],
    domains: ["static.vecteezy.com"],
  },
};

module.exports = nextConfig;
