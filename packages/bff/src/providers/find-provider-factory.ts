import { AbstractFactory, GithubFactory, GoogleFactory } from "./factory";

export type AvailableProviders = "google" | "github";

export const findProviderFactory = (
    providers: AvailableProviders,
    code: string
): AbstractFactory => {
    switch (providers) {
        case "github":
            return new GithubFactory(code);
        case "google":
            return new GoogleFactory(code);
        default:
            throw new Error("Invalid provider");
    }
};
