interface ProviderCredentials {
    url: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    grant_type: "code";
}

export const findProviderCredentials = (name: string): ProviderCredentials => {
    const provider = name.toUpperCase();

    return {
        url: process.env[`${provider}_URL`] as string,
        client_id: process.env[`${provider}_CLIENT_ID`] as string,
        client_secret: process.env[`${provider}_CLIENT_SECRET`] as string,
        redirect_uri: process.env[`${provider}_REDIRECT_URI`] as string,
        grant_type: "code",
    };
};
