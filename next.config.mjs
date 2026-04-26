/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/projects.html', destination: '/projects', permanent: true },
      { source: '/university.html', destination: '/university', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/about/index.html', destination: '/about', permanent: true },
      { source: '/projects/index.html', destination: '/projects', permanent: true },
      { source: '/university/index.html', destination: '/university', permanent: true },
      { source: '/contact/index.html', destination: '/contact', permanent: true }
    ];
  }
};

export default nextConfig;
