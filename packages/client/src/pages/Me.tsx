import { Provider } from "../components/provider";
import { providers } from "../core/providers";

export const Me = () => {
    console.log(providers);

    return (
        <div>
            <h1>Me Page</h1>

            {providers.map((provider, index) => (
                <Provider
                    key={index}
                    provider={provider.provider}
                    url={provider.url}
                />
            ))}
        </div>
    );
};
