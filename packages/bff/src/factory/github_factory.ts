import { URLSearchParams } from "url";
import { AbstractFactory } from "./abstract_factory";

export class GithubFactory extends AbstractFactory {
    protected client_id = process.env.GITHUB_CLIENT_ID;
    protected client_secret = process.env.GITHUB_CLIENT_SECRET;
    protected provider_uri = process.env.GITHUB_URL;

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
        const result = fetch(`${this.provider_uri}?${params}`, {
            method: "POST",
        }).then((res) => res.json());

        return result;
    }
}
