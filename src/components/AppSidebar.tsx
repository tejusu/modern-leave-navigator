
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
  LogOut,
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
const logoutItem = { icon: LogOut, label: "Logout", href: "/logout" };

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-gradient-to-b from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
      <SidebarHeader className="p-4 border-b border-red-200/30 dark:border-red-800/30">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-2">
          <Button
            variant="ghost"
            className="size-10 p-0 order-last group-data-[collapsible=icon]:order-none hover:bg-red-100 dark:hover:bg-red-800/50 rounded-full transition-all duration-200"
            onClick={toggleSidebar}
          >
            <ChevronsLeft className="size-5 shrink-0 transition-transform duration-300 group-data-[collapsible=icon]:rotate-180 text-red-600 dark:text-red-400" />
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
      <SidebarContent className="flex-grow px-3 py-6">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton 
                asChild 
                className="w-full justify-start px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-800/50 hover:shadow-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:size-12 text-gray-700 dark:text-gray-200 hover:text-red-700 dark:hover:text-red-300"
              >
                <a href={item.href} className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                  <item.icon className="size-5 shrink-0 text-red-600 dark:text-red-400" />
                  <span className="group-data-[collapsible=icon]:hidden font-medium">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-red-200/30 dark:border-red-800/30 space-y-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="w-full justify-start px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-800/50 hover:shadow-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:size-12 text-gray-700 dark:text-gray-200 hover:text-red-700 dark:hover:text-red-300"
            >
              <a href={settingsItem.href} className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                <settingsItem.icon className="size-5 shrink-0 text-red-600 dark:text-red-400" />
                <span className="group-data-[collapsible=icon]:hidden font-medium">{settingsItem.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="w-full justify-start px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-800/50 hover:shadow-sm group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:size-12 text-gray-700 dark:text-gray-200 hover:text-red-700 dark:hover:text-red-300"
            >
              <a href={logoutItem.href} className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                <logoutItem.icon className="size-5 shrink-0 text-red-600 dark:text-red-400" />
                <span className="group-data-[collapsible=icon]:hidden font-medium">{logoutItem.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
