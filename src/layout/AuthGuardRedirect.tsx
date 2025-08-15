import type { ReactNode } from "react";
import { headers } from "next/headers";
import { authClientServer } from "@/lib/auth/server";
import AuthGuardClient from "./AuthGuardClient";

export default async function AuthGuardRedirect({
  children,
  requireAuth = false,
  guestOnly = false,
  allowedRoles,
}: {
  children: ReactNode;
  requireAuth?: boolean;
  guestOnly?: boolean;
  allowedRoles?: string[];
}) {
  const incomingHeaders = await headers();

  const { data: session } = await authClientServer.getSession({
    fetchOptions: {
      headers: incomingHeaders,
    },
  });

  // Pass session info to client for redirect logic
  return (
    <AuthGuardClient
      session={session}
      requireAuth={requireAuth}
      guestOnly={guestOnly}
      allowedRoles={allowedRoles}
    >
      {children}
    </AuthGuardClient>
  );
}
