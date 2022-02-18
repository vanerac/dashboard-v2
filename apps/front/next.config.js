/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        externalDir: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            // Transform all direct `react-native` imports to `react-native-web`
            'react-native$': 'react-native-web',
            '@area/services': '../../../packages/services',
        };
        config.resolve.extensions = ['.web.js', '.web.ts', '.web.tsx', ...config.resolve.extensions];
        return config;
    },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
};

module.exports = nextConfig;
