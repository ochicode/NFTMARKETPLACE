/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "gateway.pinata.cloud",
      "ipfs.io",
      "cloudflare-ipfs.com",
      "nftstorage.link",
    ],
  },
};

export default nextConfig;
