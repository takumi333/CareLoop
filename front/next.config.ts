import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
//   async rewrites() {
//     return [
//       {
//         //  /api/req/**のreqをproxy(全てRails APIへ転送)
//         source: "/api/req/:path*",
//         destination: "http://back:3000/api/v1/:path*",
//       },
//     ];
//   },
};

export default nextConfig;
