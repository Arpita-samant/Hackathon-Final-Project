/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  async rewrites() {
    const rawUrl = process.env.BACKEND_URL 
      || process.env.NEXT_PUBLIC_BASE_URL 
      || process.env.VITE_BASE_URL 
      || (process.env.NODE_ENV === 'production' 
            ? 'https://hackathon-final-project-beige.vercel.app' 
            : 'http://127.0.0.1:8000');
    const backendUrl = rawUrl.replace(/\/$/, '');

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
