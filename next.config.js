const ASSET_SERVER_URL = new URL(process.env.NEXT_PUBLIC_ASSET_SERVER_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                port: ASSET_SERVER_URL.port,
                hostname: ASSET_SERVER_URL.hostname,
                protocol: ASSET_SERVER_URL.protocol.replaceAll(/\W/g, ""),
            }
        ]
    }
}

module.exports = nextConfig
