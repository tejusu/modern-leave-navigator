
import { StatCard } from "@/components/StatCard";
import { UpcomingHolidays } from "@/components/UpcomingHolidays";
import { Button } from "@/components/ui/button";
import { Users, FileText, Clock, PieChart, PlusCircle } from "lucide-react";
import { RecentJoiners } from "@/components/RecentJoiners";
import { CalendarView } from "@/components/CalendarView";

const Index = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Here's an overview of your leave management system.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Quick Stats</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Employees" 
            value="124"
            icon={Users}
          />
          <StatCard 
            title="Total Leave Requests" 
            value="82"
            icon={FileText}
          />
          <StatCard 
            title="Pending Approvals" 
            value="12"
            icon={Clock}
          />
          <StatCard 
            title="Leave Summaries"
            value="View"
            description="Detailed leave reports"
            icon={PieChart}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Overview Panels</h2>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <CalendarView />
          <RecentJoiners />
          <UpcomingHolidays />
        </div>
      </div>
    </div>
  );
};

export default Index;
