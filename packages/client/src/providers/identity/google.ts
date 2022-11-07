import { BaseProvider } from "../base-provider";

interface Google {
    response_type: "code";
}

export function Google<Google extends BaseProvider>({
    authZ_code_url,
    client_id,
    redirect_uri,
    scope,
    state,
}: Google) {
    //Make axios request?

    const params = new URLSearchParams({
        client_id,
        redirect_uri,
        scope,
        state,
    });

    const grant_code = `${authZ_code_url}?${params}`;
}

const providers = [
    {
        google: {
            authZ_code_url: "",
            client_id: "",
            redirect_uri: "",
            scope: "",
            state: "",
        },
    },
];
