import {
  createFrontendModule,
  SignInPageBlueprint,
} from '@backstage/frontend-plugin-api';
import { SignInPage } from '@backstage/core-components';
import React from 'react';

/**
 * Custom Sign-In Page with OIDC (Keycloak) provider
 */
const customSignInPage = SignInPageBlueprint.make({
  params: {
    loader: async () => props =>
      React.createElement(SignInPage, {
        ...props,
        providers: [
          'guest',
          {
            id: 'oidc',
            title: 'Keycloak SSO',
            message: 'Sign in with Keycloak',
            apiRef: { id: 'internal.auth.oidc' } as any,
          },
        ],
      }),
  },
});

export const authModule = createFrontendModule({
  pluginId: 'app',
  extensions: [customSignInPage],
});
