/**
 * Settings class for our API
 */
export interface Settings {
    /**
     * The subdomain of the organisation of the api
     */
    Organisation?: string;
    /**
     * The environment of the API this can be: App, Test or Prod
     */
    Environment?: string;
    /**
     * The apitype can be Full or Execution
     */
    ApiType?: string;
    /**
     * The authority is the url of the identityserver instance that sign tokens for authentication in our Api
     */
    Authority?: string;
    /**
     * The tokenendpoint is the url where you can request tokens with your client/secret
     */
    TokenEndpoint?: string;
}
