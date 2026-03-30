import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

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
};

export default nextConfig;
