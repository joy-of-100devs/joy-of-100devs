const ASSET_SERVER_URL = new URL(process.env.NEXT_PUBLIC_ASSET_SERVER_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: ASSET_SERVER_URL.hostname,
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
            },
            {
                hostname: "*",
            }
        ],
        domains: ["*.googleusercontent.com"]
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            typescript: true,
                            ref: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false
                                            },
                                        },
                                    },
                                ]
                            }
                        }
                    },
                ],
            }
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i
        return config
    },
}

module.exports = nextConfig
