import { AuthGuard } from "@/app/modules/auth/ui/components/auth-guard";
import { DashboardLayout } from "../modules/dashboard/ui/layouts/dashboard-layout";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}

export default Layout;
