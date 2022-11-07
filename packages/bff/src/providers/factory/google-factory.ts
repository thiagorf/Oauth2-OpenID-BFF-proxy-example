import axios from "axios";
import { decode } from "jsonwebtoken";
import { URLSearchParams } from "url";
import { AbstractFactory } from "./abstract-factory";

interface GoogleAccessTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    scope: string;
    token_type: "Bearer";
    refresh_token?: string;
}

interface GoogleIDToken {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    at_hash: string;
    hd: string;
    email: string;
    email_verified: boolean;
    iat: number;
    exp: number;
    nonce: string;
}

export class GoogleFactory extends AbstractFactory {
    protected client_id = process.env.GOOGLE_CLIENT_ID || "";
    protected client_secret = process.env.GOOGLE_CLIENT_SECRET || "";
    protected provider_uri = process.env.GOOGLE_URL || "";
    private redirect_uri = process.env.GOOGLE_REDIRECT_URI || "";
    private grant_type = "authorization_code";

    constructor(code: string) {
        super(code);
    }

    public async fetchAccessToken() {
        const params = new URLSearchParams({
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
            redirect_uri: this.redirect_uri,
            grant_type: this.grant_type,
        });

        const result = await axios.post<GoogleAccessTokenResponse>(
            `${this.provider_uri}?${params}`
        );

        const { email } = decode(result.data.id_token) as GoogleIDToken;

        return email;
    }
}
