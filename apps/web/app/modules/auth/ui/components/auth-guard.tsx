"use client";

import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { AuthLayout } from "../layouts/auth-layout";
import { SignInView } from "../views/sing-in-view";

export const AuthGuard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>Loading...</AuthLayout>
      </AuthLoading>

      <Authenticated>{children}</Authenticated>

      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
