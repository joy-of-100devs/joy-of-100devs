declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_ASSET_SERVER_URL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            MONGODB_URI: string;
            DB_NAME: string;
        }
    }
}

export {}
