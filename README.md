# Oauth2-OpenID-BFF-proxy-example (Work in progress)

It's an example about a SPA implementation in the context of an application that requires Oauth2 with OpenID

## Diagram

![Oauth2 OpenID BFF proxy diagram](https://github.com/thiagorf/Oauth2-OpenID-BFF-proxy-example/blob/docs/docs/Oauth2%20OpenID%20BFF%20Proxy.png?raw=true)

## Providers Endpoint

![Providers](https://github.com/thiagorf/Oauth2-OpenID-BFF-proxy-example/blob/docs/docs/Providers%20.png?raw=true)

## Implementation Plan

A home/login page with a "provider" component that can adapt based on which one is chosen, for this example is it going to be GitHub, Google and LinkedIn.

A /me page with the authenticated user information.

A backend for frontend with a /token endpoint which takes the authentication code and request for an access token based on the selected provider (GitHub, Google, LinkedIn).

Session management and logout needs further research
