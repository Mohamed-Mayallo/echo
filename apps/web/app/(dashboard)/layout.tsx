import { AuthGuard } from "@/app/modules/auth/ui/components/auth-guard";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthGuard>{children}</AuthGuard>;
}

export default Layout;
