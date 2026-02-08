"use client";

import { useOrganization } from "@clerk/nextjs";
import { OrgSelectionView } from "../views/org-selection-view";
import { AuthLayout } from "../layouts/auth-layout";

export const OrgGuard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { organization } = useOrganization();

  if (!organization) {
    return (
      <AuthLayout>
        <OrgSelectionView />
      </AuthLayout>
    );
  }

  return <>{children}</>;
};
