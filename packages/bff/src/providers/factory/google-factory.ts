import { URLSearchParams } from "url";
import { AbstractFactory } from "./abstract-factory";

export class GoogleFactory extends AbstractFactory {
    protected client_id = process.env.GOOGLE_CLIENT_ID;
    protected client_secret = process.env.GOOGLE_CLIENT_SECRET;
    protected provider_uri = process.env.GOOGLE_URL;
    private redirect_uri = process.env.GOOGLE_REDIRECT_URI;
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

        const result = await fetch(`${this.provider_uri}?${params}`, {
            method: "POST",
        }).then((res) => res.json());

        return result;
    }
}
