import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Supabase uses TransformStream which is not available in Node.js.
    // This polyfill is required for server-side rendering.
     if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'web-streams-polyfill/dist/ponyfill.es2018.js': require.resolve(
          'web-streams-polyfill/dist/ponyfill.es2018.js'
        ),
      };
    }
    return config;
  }
};

export default nextConfig;
