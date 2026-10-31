/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development';
    const rawUrl = isDev 
      ? (process.env.LOCAL_BACKEND_URL || process.env.BACKEND_URL || 'http://127.0.0.1:8000')
      : (process.env.BACKEND_URL 
            || process.env.NEXT_PUBLIC_BASE_URL 
            || process.env.VITE_BASE_URL 
            || 'https://hackathon-final-project-beige.vercel.app');
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
