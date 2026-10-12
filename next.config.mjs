/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/reviews',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/locations/:slug(bengaluru|mumbai|delhi|dubai|london|new-york|toronto|sydney)',
        destination: '/locations',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/arunacharya1603',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
