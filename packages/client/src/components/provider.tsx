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
        <div className="border rounded w-64 h-24">
            {/*<a href={url}>Sign in with {provider}</a>*/}
            <button onClick={() => handleSignIn(url)}>
                Sign in with {provider}
            </button>
        </div>
    );
};
