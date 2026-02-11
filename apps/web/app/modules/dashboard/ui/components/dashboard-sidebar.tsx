"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroupLabel,
  SidebarGroupContent,
  Sidebar,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { Palette, Blocks, Mic, CreditCard, InboxIcon, LibraryBigIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarContent = [
  {
    group: "Customer Support",
    items: [
      {
        name: "Conversations",
        url: "/conversations",
        icon: InboxIcon,
      },
      {
        name: "Knowledge Base",
        url: "/files",
        icon: LibraryBigIcon,
      },
    ],
  },
  {
    group: "Configurations",
    items: [
      {
        name: "Widget Customization",
        url: "/customizations",
        icon: Palette,
      },
      {
        name: "Integrations",
        url: "/integrations",
        icon: Blocks,
      },
      {
        name: "Voice Assistant",
        url: "/plugins/vapi",
        icon: Mic,
      },
    ],
  },
  {
    group: "Accounts",
    items: [
      {
        name: "Plans & Billing",
        url: "/billing",
        icon: CreditCard,
      },
    ],
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === url;
    }

    return pathname.startsWith(url);
  };

  return (
    <Sidebar className="group" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: "w-full! h-8!",
                    avatarBox: "rounded-sm! size-4!",
                    organizationSwitcherTrigger:
                      "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! justify-start!",
                    organizationPreview: "group-data-[collapsible=icon]:justify-center! gap-2!",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                    organizationSwitcherTriggerIcon:
                      "group-data-[collapsible=icon]:hidden! ml-auto! text-sidebar-foreground!",
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sidebarContent.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        isActive(item.url) &&
                          "bg-gradient-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!",
                      )}
                      isActive={isActive(item.url)}
                      tooltip={item.name}
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4!" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: "w-full! h-8!",
              avatarBox: "rounded-sm! size-4!",
              userButtonTrigger:
                "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
              userButtonBox:
                "w-full! flex-row-reverse! gap-2! justify-end! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!",
              userButtonOuterIdentifier: "group-data-[collapsible=icon]:hidden! pl-0!",
            },
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
