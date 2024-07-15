/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
        );
        return config;
    },
    pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;