declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ORIGIN: string;

            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_REDIRECT_URI: string;
            GOOGLE_URL: string;

            GITHUB_CLIENT_ID: string;
            GITHUB_CLIENT_SECRET: string;
            GITHUB_REDIRECT_URI: string;
            GITHUB_URL: string;
        }
    }
}

export {};
