"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import FuseLoading from "@fuse/core/FuseLoading";

export default function AuthGuardClient({
  children,
  session,
  requireAuth,
  guestOnly,
  allowedRoles,
}: {
  children: React.ReactNode;
  session: any;
  requireAuth?: boolean;
  guestOnly?: boolean;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  console.log(requireAuth && !session?.user, guestOnly && session?.user);

  useEffect(() => {
    if (requireAuth && !session?.user) {
      router.replace("/sign-in");
    } else if (guestOnly && session?.user) {
      router.replace("/dashboard");
    } else if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      session?.user &&
      !allowedRoles.includes(session.user.role)
    ) {
      notFound(); // or some error page
    } else {
      setChecking(false);
    }
  }, [session, requireAuth, guestOnly, allowedRoles, router]);

  if (checking) {
    return <FuseLoading />;
  }

  return <>{children}</>;
}
