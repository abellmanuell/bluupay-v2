import { authClientServer } from '@/lib/auth/server';
import FuseLoading from '@fuse/core/FuseLoading';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

type AuthGuardProps = {
	children: React.ReactNode;
	loginRedirectUrl?: string;
  requireAuth?: boolean;
  guestOnly?: boolean;
  allowedRoles?: string[];
};

export default async function AuthGuardRedirect({ children, loginRedirectUrl }: AuthGuardProps) {
  // next/headers is async in modern Next.js — await it
  const incomingHeaders = await headers();

  // Ask the auth client for the session, forwarding the request headers (so cookies are sent)
  const { data: session } = await authClientServer.getSession({
    fetchOptions: {
      headers: incomingHeaders
    },
  });

  // If there's no session or user, redirect server-side before any HTML is sent
  if (!session?.user) {
    // TODO: also, check for roles
    // use the route you want to redirect unauthenticated users to
    redirect(loginRedirectUrl ?? "/sign-in");
  }

  return session.session ? children : <FuseLoading />
}