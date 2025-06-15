import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CalendarCheck,
  BarChart2,
  Bell,
  Settings,
} from "lucide-react";

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
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <a href="/">
            <img
              src="/lovable-uploads/03870ed3-19ca-4cb6-9f54-058584aa4a5a.png"
              alt="Acelucid logo"
              className="h-8 w-auto"
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
      <SidebarFooter className="p-4 space-y-4">
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
