declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_ASSET_SERVER_URL: string;
        }
    }
}

export {}
