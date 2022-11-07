export interface BaseProvider {
    authZ_code_url: string;
    client_id: string;
    redirect_uri: string;
    state: string;
    scope: string;
}
