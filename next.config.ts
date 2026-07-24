import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV === 'development';
const scriptSrc = isDevelopment
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://tagmanager.google.com https://www.google-analytics.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://www.google-analytics.com";
const connectSrc = isDevelopment
  ? "connect-src 'self' ws: wss: https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com"
  : "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  connectSrc,
  "frame-src https://www.googletagmanager.com",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: rootDir,
  },
  // Lighthouse: compresión y headers de caché
  compress: true,
  poweredByHeader: false,
  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 año
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
