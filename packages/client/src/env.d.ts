/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BFF_PROXY_BASE_URL: string;
    readonly VITE_BFF_PROXY_URL: string;

    readonly VITE_GOOGLE_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_GOOGLE_STATE: string;
    readonly VITE_GOOGLE_REDIRECT_URI: string;
    readonly VITE_GOOGLE_SCOPE: string;

    readonly VITE_GITHUB_URL: string;
    readonly VITE_GITHUB_CLIENT_ID: string;
    readonly VITE_GITHUB_STATE: string;
    readonly VITE_GITHUB_REDIRECT_URI: string;
    readonly VITE_GITHUB_SCOPE: string;

    readonly VITE_LINKEDIN_URL: string;
    readonly VITE_LINKEDIN_CLIENT_ID: string;
    readonly VITE_LINKEDIN_STATE: string;
    readonly VITE_LINKEDIN_REDIRECT_URI: string;
    readonly VITE_LINKEDIN_SCOPE: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
