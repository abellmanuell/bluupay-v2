import {
  apiKeyClient,
  multiSessionClient,
  organizationClient,
  passkeyClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://api-dev-v2.bluupay.co",
  basePath: "/auth",
  plugins: [
    usernameClient(),
    apiKeyClient(),
    multiSessionClient(),
    organizationClient(),
    twoFactorClient(),
    passkeyClient(),
  ],
});
