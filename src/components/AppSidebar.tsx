
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
  Send,
  History,
  CalendarDays,
  Settings,
  UserCircle,
  LogOut,
  Atom,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Send, label: "Apply for Leave", href: "#" },
  { icon: History, label: "Leave History", href: "#" },
  { icon: CalendarDays, label: "Team Calendar", href: "#" },
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
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <p className="font-semibold text-sidebar-primary">Alex Turner</p>
                <p className="text-xs text-sidebar-foreground">alex.t@example.com</p>
            </div>
            <LogOut className="w-5 h-5 text-sidebar-foreground hover:text-sidebar-primary cursor-pointer" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
