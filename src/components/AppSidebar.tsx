
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
    <Sidebar collapsible="icon" className="border-r border-gray-200/50 dark:border-gray-800/50">
      <SidebarHeader className="p-4 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-2">
          <Button
            variant="ghost"
            className="size-8 p-0 order-last group-data-[collapsible=icon]:order-none hover:bg-gray-100 dark:hover:bg-gray-800"
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
      <SidebarContent className="flex-grow px-2 py-4">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton 
                asChild 
                className="w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group-data-[collapsible=icon]:justify-center"
              >
                <a href={item.href} className="flex items-center gap-3">
                  <item.icon className="size-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group-data-[collapsible=icon]:justify-center"
            >
              <a href={settingsItem.href} className="flex items-center gap-3">
                <settingsItem.icon className="size-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">{settingsItem.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
