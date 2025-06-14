
import { LeaveBalanceCard } from "@/components/LeaveBalanceCard";
import { RecentApplications } from "@/components/RecentApplications";
import { UpcomingHolidays } from "@/components/UpcomingHolidays";
import { Button } from "@/components/ui/button";
import { Plane, Stethoscope, Briefcase, PlusCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Alex! Here's your leave summary.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Apply for Leave
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LeaveBalanceCard 
          title="Annual Leave" 
          remainingDays={14} 
          totalDays={20} 
          icon={Plane}
          colorClass="bg-blue-500"
        />
        <LeaveBalanceCard 
          title="Sick Leave" 
          remainingDays={8} 
          totalDays={10} 
          icon={Stethoscope}
          colorClass="bg-orange-500"
        />
        <LeaveBalanceCard 
          title="Casual Leave" 
          remainingDays={3} 
          totalDays={5} 
          icon={Briefcase}
          colorClass="bg-purple-500"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <RecentApplications />
        <UpcomingHolidays />
      </div>

    </div>
  );
};

export default Index;
