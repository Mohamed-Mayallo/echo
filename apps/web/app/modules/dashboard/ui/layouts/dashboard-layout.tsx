import {
  SidebarProvider,
  SIDEBAR_COOKIE_NAME,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const defaultOpen = cookie.get(SIDEBAR_COOKIE_NAME)?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <main className="flex flex-1 flex-col">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
