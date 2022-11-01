export abstract class AbstractFactory {
    protected code: string;
    constructor(code: string) {
        this.code = code;
    }

    protected abstract client_id: string;
    protected abstract client_secret: string;
    protected abstract provider_uri: string;
    public abstract fetchAccessToken(): Promise<any>;
}
