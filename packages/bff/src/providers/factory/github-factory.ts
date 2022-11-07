import { URLSearchParams } from "url";
import { AbstractFactory } from "./abstract-factory";
import axios from "axios";

interface GithubAccessTokenResponse {
    access_token: string;
    scope: string;
    token_type: "bearer";
}

interface GithubResponse {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
    plan: {
        name: string;
        space: number;
        private_repos: number;
        collaborators: number;
    };
}

// Use access token to exchange for a email

// session id cookie -> email
//jsonwebtoken - redis

export class GithubFactory extends AbstractFactory {
    protected client_id = process.env.GITHUB_CLIENT_ID || "";
    protected client_secret = process.env.GITHUB_CLIENT_SECRET || "";
    protected provider_uri = process.env.GITHUB_URL || "";

    constructor(code: string) {
        super(code);
    }

    public async fetchAccessToken(): Promise<any> {
        //redirect uri is optional
        const params = new URLSearchParams({
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
        });

        const result = await axios.post<GithubAccessTokenResponse>(
            `${this.provider_uri}?${params}`,
            {},
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );
        const githubResponse = await axios.get<GithubResponse>(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${result.data.access_token}`,
                },
            }
        );

        //only return email?
        return githubResponse.data.email;
    }
}
