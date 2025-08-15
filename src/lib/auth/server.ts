// server-only client (import from /client for server use)
import { createAuthClient } from "better-auth/client";
import { usernameClient, apiKeyClient, multiSessionClient, organizationClient, passkeyClient } from "better-auth/client/plugins";
import { twoFactorClient } from "better-auth/plugins/two-factor";

export const authClientServer = createAuthClient({
  baseURL: "http://localhost:3333",
  plugins: [
    usernameClient(),
    apiKeyClient(),
    multiSessionClient(),
    organizationClient(),
    twoFactorClient(),
    passkeyClient()
  ]
});
