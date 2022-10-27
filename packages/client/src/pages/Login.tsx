import axios from "axios";
import { useEffect } from "react";
import { Provider } from "../components/provider";
import { providers } from "../core/providers";

function Login() {
    const URI = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (URI.has("code") && URI.has("state")) {
            const state = URI.get("state")?.split("|")[1];
            const code = URI.get("code");

            const oauthProvider = providers.find(
                (oauth) => oauth.provider === state
            );

            if (!oauthProvider) {
                console.log("Invalid or inexisting provider");

                return;
            }

            const {
                bffProxy: { url },
            } = oauthProvider;

            (async () => {
                const result = await axios.post(url, {
                    code,
                });

                console.log(result.data);
            })();
        }
    }, []);

    return (
        <div className="border rounded w-[360px] h-96 mx-auto mt-20">
            <h3 className="text-center text-2xl font-semibold">
                Select a Provider
                {providers.map((provider, index) => (
                    <Provider key={index} {...provider} />
                ))}
            </h3>
        </div>
    );
}

export default Login;
