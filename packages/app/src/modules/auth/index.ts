import {
  SignInPageBlueprint,
  type SignInPageProps,
} from '@backstage/plugin-app-react';
import { SignInPage } from '@backstage/core-components';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import {
  createApiRef,
  type OpenIdConnectApi,
  type ProfileInfoApi,
  type BackstageIdentityApi,
  type SessionApi,
} from '@backstage/core-plugin-api';
import React from 'react';

/**
 * API reference for OIDC authentication
 */
export const oidcAuthApiRef = createApiRef<
  OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi
>({
  id: 'internal.auth.oidc',
});

/**
 * Custom Sign-In Page with Guest and OIDC (Keycloak) providers
 */
const customSignInPage = SignInPageBlueprint.make({
  params: {
    loader: async () => (props: SignInPageProps) =>
      React.createElement(SignInPage, {
        ...props,
        providers: [
          'guest',
          {
            id: 'oidc',
            title: 'Keycloak SSO',
            message: 'Sign in with Keycloak',
            apiRef: oidcAuthApiRef,
          },
        ],
      }),
  },
});

export const authModule = createFrontendModule({
  pluginId: 'app',
  extensions: [customSignInPage],
});
