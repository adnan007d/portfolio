/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental : {
    mdxRs: true,
  },
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        port: '',
        pathname: '/*/adnan007d/**',
      },
    ],
  },
}
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
