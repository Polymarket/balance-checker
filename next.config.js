const securityHeaders = [
  {
    // Added automatically if deploying to Vercel but kept for clarity
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block"
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  }
  // To be added in follow up
  // {
  //     key: 'Content-Security-Policy',
  //     value: "default-src 'self' *.polymarket.com *.poly.market;"
  // }
];

module.exports = {
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  // async headers () {
  //   return [{
  //     source: "/(.*)",
  //     headers: securityHeaders
  //   }];
  // }
};
