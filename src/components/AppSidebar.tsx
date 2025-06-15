
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CalendarCheck,
  BarChart2,
  Bell,
  Settings,
  ChevronsLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Employee Management", href: "/employee-management" },
  { icon: ClipboardList, label: "Leave Management", href: "/leave-management" },
  { icon: CalendarCheck, label: "Holiday Management", href: "/holiday-management" },
  { icon: BarChart2, label: "Reports & Analytics", href: "/reports-analytics" },
  { icon: Bell, label: "Notifications & Alerts", href: "/notifications-alerts" },
];

const settingsItem = { icon: Settings, label: "Settings", href: "/settings" };

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-2">
          <Button
            variant="ghost"
            className="size-8 p-0 order-last group-data-[collapsible=icon]:order-none"
            onClick={toggleSidebar}
          >
            <ChevronsLeft className="size-5 shrink-0 transition-transform duration-300 group-data-[collapsible=icon]:rotate-180" />
          </Button>
          <a href="/" className="order-first group-data-[collapsible=icon]:order-none">
            <img
              src="/lovable-uploads/03870ed3-19ca-4cb6-9f54-058584aa4a5a.png"
              alt="Acelucid logo"
              className="h-8 w-auto group-data-[collapsible=icon]:hidden"
            />
             <img
              src="/lovable-uploads/0f388e4d-293a-4dee-ac0b-8a94b3551bef.png"
              alt="Acelucid logo"
              className="h-8 w-auto hidden group-data-[collapsible=icon]:block"
            />
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href={settingsItem.href}>
                <settingsItem.icon />
                <span>{settingsItem.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
