import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Provider } from "../components/provider";
import { providers } from "../core/providers";

function Login() {
    const navigate = useNavigate();
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
                const params = new URLSearchParams({
                    state,
                });
                const result = await fetch(`${url}?${params}`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        code: code,
                    }),
                })
                    .then((res) => res.json())
                    .catch((err) => console.error(err));

                //Change!

                localStorage.setItem("token", JSON.stringify(result));

                navigate("/me");
            })();
        }
    }, []);

    return (
        <div className="border rounded w-[360px] mx-auto mt-20">
            <h3 className="text-center text-2xl font-semibold mb-6">
                Select a Provider!
            </h3>
            <div className="flex flex-col items-center ">
                {providers.map((provider, index) => (
                    <Provider key={index} {...provider} />
                ))}
            </div>
        </div>
    );
}

export default Login;
