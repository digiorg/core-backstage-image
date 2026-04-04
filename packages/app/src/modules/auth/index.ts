import {
  SignInPageBlueprint,
  type SignInPageProps,
} from '@backstage/plugin-app-react';
import { SignInPage } from '@backstage/core-components';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { oidcAuthApiRef } from '@backstage/core-plugin-api';
import React from 'react';

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
