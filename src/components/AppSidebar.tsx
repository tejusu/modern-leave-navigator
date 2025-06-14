
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
  LogOut,
  Atom,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Users, label: "Employee Management", href: "#" },
  { icon: ClipboardList, label: "Leave Management", href: "#" },
  { icon: CalendarCheck, label: "Holiday Management", href: "#" },
  { icon: BarChart2, label: "Reports & Analytics", href: "#" },
  { icon: Bell, label: "Notifications & Alerts", href: "#" },
];

const settingsItem = { icon: Settings, label: "Settings", href: "#" };

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Atom className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold text-sidebar-primary">LeaveFlow</h1>
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

        <div className="border-t border-sidebar-border pt-4 mt-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
                <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <p className="font-semibold text-sidebar-primary">Admin User</p>
                <p className="text-xs text-sidebar-foreground">admin@leaveflow.com</p>
            </div>
            <LogOut className="w-5 h-5 text-sidebar-foreground hover:text-sidebar-primary cursor-pointer" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
