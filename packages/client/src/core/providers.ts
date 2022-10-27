const bffURL = import.meta.env.BFF_PROXY_URL;

//type IdentityProvider = "github" | "google" | "linkedin";

export interface OauthProvider {
    provider: string;
    url: string;
    response_type: "code";
    authCode: {
        client_id: string;
        redirect_uri: string;
        scope: string;
    };
    bffProxy: {
        url: string;
    };
}

export const providers: OauthProvider[] = ["GOOGLE", "GITHUB", "LINKEDIN"].map(
    (openid) => ({
        provider: openid.toLowerCase(),
        url: import.meta.env[`VITE_${openid}_URL`],
        response_type: "code",
        authCode: {
            client_id: import.meta.env[`VITE_${openid}_CLIENT_ID`],
            redirect_uri: import.meta.env[`VITE_${openid}_REDIRECT_URI`],
            scope: import.meta.env[`VITE_${openid}_SCOPE`],
        },
        bffProxy: {
            url: bffURL,
        },
    })
);

/*
export const providers: OauthProvider[] = [
    {
        provider: "google",
        url: import.meta.env.GOOGLE_URL,
        response_type: "code",
        authCode: {
            client_id: import.meta.env.GOOGLE_CLIENT_ID,
            redirect_uri: import.meta.env.GOOGLE_REDIRECT_URI,
            state: import.meta.env.GOOGLE_STATE,
            scope: import.meta.env.GOOGLE_SCOPE,
        },
        bffProxy: {
            url: bffURL,
        },
    },
	{
        provider: "github",
        url: import.meta.env.GITHUB_URL,
        response_type: "code",
        authCode: {
            client_id: import.meta.env.GITHUB_CLIENT_ID,
            redirect_uri: import.meta.env.GOOGLE_REDIRECT_URI,
            state: import.meta.env.GOOGLE_STATE,
            scope: import.meta.env.GOOGLE_SCOPE,
        },
        bffProxy: {
            url: bffURL,
        },
    },
	{
        provider: "google",
        url: import.meta.env.GOOGLE_URL,
        response_type: "code",
        authCode: {
            client_id: import.meta.env.GOOGLE_CLIENT_ID,
            redirect_uri: import.meta.env.GOOGLE_REDIRECT_URI,
            state: import.meta.env.GOOGLE_STATE,
            scope: import.meta.env.GOOGLE_SCOPE,
        },
        bffProxy: {
            url: bffURL,
        },
    },
];
*/
