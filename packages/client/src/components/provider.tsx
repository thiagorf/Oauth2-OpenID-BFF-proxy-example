interface ProviderInfo {
    url: string;
    provider: string;
}

export const Provider = ({ url, provider }: ProviderInfo) => {
    //TODO useeffect fething access token after redirect

    return (
        <div className="border rounded w-64 h-24">
            <a href={url}>Sign in with {provider}</a>
        </div>
    );
};
