
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmployeeManagement from "./pages/EmployeeManagement";
import LeaveManagement from "./pages/LeaveManagement";
import HolidayManagementPage from "./pages/HolidayManagementPage";
import ReportsAndAnalytics from "./pages/ReportsAndAnalytics";
import NotificationsAndAlerts from "./pages/NotificationsAndAlerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { UserNav } from "./components/UserNav";
import { NotificationBell } from "./components/NotificationBell";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col bg-muted/40">
              <header className="flex items-center h-16 px-4 shrink-0 bg-background shadow-sm">
                <div className="lg:hidden">
                  <SidebarTrigger>
                    <Menu />
                  </SidebarTrigger>
                </div>
                <div className="flex-1 flex justify-center px-4">
                  <div className="relative w-full max-w-md hidden md:block">
                    <form>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search..."
                          className="w-full rounded-lg bg-muted pl-8"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <NotificationBell />
                  <UserNav />
                </div>
              </header>
              <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/employee-management" element={<EmployeeManagement />} />
                  <Route path="/leave-management" element={<LeaveManagement />} />
                  <Route path="/holiday-management" element={<HolidayManagementPage />} />
                  <Route path="/reports-analytics" element={<ReportsAndAnalytics />} />
                  <Route path="/notifications-alerts" element={<NotificationsAndAlerts />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
