import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.youtube.com",
      "user-profile-icons.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
