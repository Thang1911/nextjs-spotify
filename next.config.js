/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: `https://nextjs-spotify-lac.vercel.app`
  },
}

module.exports = nextConfig
