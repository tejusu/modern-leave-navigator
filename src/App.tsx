
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import EmployeeManagement from "./pages/EmployeeManagement";
import AdminManagement from "./pages/AdminManagement";
import LeaveManagement from "./pages/LeaveManagement";
import HolidayManagementPage from "./pages/HolidayManagementPage";
import ReportsAndAnalytics from "./pages/ReportsAndAnalytics";
import NotificationsAndAlerts from "./pages/NotificationsAndAlerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
                <Route path="/admin-management" element={<AdminManagement />} />
                <Route path="/leave-management" element={<LeaveManagement />} />
                <Route path="/holiday-management" element={<HolidayManagementPage />} />
                <Route path="/reports-analytics" element={<ReportsAndAnalytics />} />
                <Route path="/notifications-alerts" element={<NotificationsAndAlerts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
