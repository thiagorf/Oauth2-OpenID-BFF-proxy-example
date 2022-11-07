import type { OauthProvider } from "../core/providers";
import { nanoid } from "nanoid";

export const Provider = ({
    url,
    provider,
    authCode: { client_id, scope, redirect_uri },
    response_type,
}: OauthProvider) => {
    const handleSignIn = async (url: string) => {
        const randomId = nanoid(14);

        const state = randomId + "|" + provider;

        const params = {
            state,
            response_type,
            client_id,
            scope,
            redirect_uri,
        };

        const queryParams = new URLSearchParams(params);

        window.location.assign(`${url}?${queryParams.toString()}`);
    };

    return (
        <button
            className="w-[80%] h-12 border mb-2"
            onClick={() => handleSignIn(url)}
        >
            Sign in with <span className="font-bold">{provider}</span>
        </button>
    );
};
