import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: [
      '@react-three/fiber', 
      '@react-three/drei', 
      'framer-motion', 
      'react-icons', 
      'react-hook-form'
    ],
  },

  // Webpack configuration for advanced code splitting
  webpack: (config, { isServer, webpack: webpackInstance }) => {
    // Reduce bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 5,
      minSize: 20000,
      maxSize: 250000,
      cacheGroups: {
        // Separate vendor chunks
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        // Separate heavy libraries
        threejs: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three-js',
          chunks: 'all',
          priority: 10,
        },
        // Separate animation libraries
        animations: {
          test: /[\\/]node_modules[\\/](framer-motion|lenis)[\\/]/,
          name: 'animations',
          chunks: 'all',
          priority: 10,
        },
      },
    };

    // Minimize CSS
    config.optimization.minimizer.push(
      new CssMinimizerPlugin()
    );

    // Ignore unnecessary files
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
