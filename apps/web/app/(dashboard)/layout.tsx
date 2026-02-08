import { AuthGuard } from "@/app/modules/auth/ui/components/auth-guard";
import { OrgGuard } from "../modules/auth/ui/components/org-guard";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <OrgGuard>{children}</OrgGuard>
    </AuthGuard>
  );
}

export default Layout;
