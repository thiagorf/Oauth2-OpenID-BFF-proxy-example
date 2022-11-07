const bffURL = import.meta.env.VITE_BFF_PROXY_BASE_URL + "/token";

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

//TODO refactoring

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
