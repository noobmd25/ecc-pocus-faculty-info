/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Module pages read src/content/*.md at request time — make sure the
  // files are bundled with the serverless functions on deploy.
  outputFileTracingIncludes: {
    "/**": ["./src/content/**/*"],
  },
};

export default nextConfig;
