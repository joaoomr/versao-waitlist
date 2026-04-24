import type { NextConfig } from "next";

// Content Security Policy — vitrine publica, servindo apenas de mesmo origem.
// Sem fontes externas, sem analytics, sem CDN. Se algum dia embutir media
// remota, adicionar o host explicito em img-src / connect-src.
const csp = [
  "default-src 'self'",
  // 'unsafe-inline' pra inline scripts do Next hydration;
  // 'unsafe-eval' pra Next/Turbopack em runtime.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // Sem remotePatterns: a vitrine nao carrega imagens externas. Se precisar,
  // adicionar host especifico aqui (em vez de wildcard).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
