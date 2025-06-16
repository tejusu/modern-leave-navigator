
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Clock, PieChart, PlusCircle, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import { RecentJoiners } from "@/components/RecentJoiners";
import { CalendarView } from "@/components/CalendarView";
import { MonthlyLeaveSummary } from "@/components/MonthlyLeaveSummary";

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome back, Admin!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your team today.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-red-600" />
          Key Metrics
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold text-red-600">124</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-red-900/70 dark:text-red-100/70">Total Employees</CardTitle>
              <p className="text-xs text-red-700/60 dark:text-red-200/60 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-rose-500/10 rounded-lg">
                  <FileText className="h-6 w-6 text-rose-600" />
                </div>
                <span className="text-2xl font-bold text-rose-600">82</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-rose-900/70 dark:text-rose-100/70">Leave Requests</CardTitle>
              <p className="text-xs text-rose-700/60 dark:text-rose-200/60 mt-1">+5% this week</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950 dark:to-orange-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">12</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-orange-900/70 dark:text-orange-100/70">Pending Approvals</CardTitle>
              <p className="text-xs text-orange-700/60 dark:text-orange-200/60 mt-1">Needs attention</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <PieChart className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold text-red-600">96%</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-red-900/70 dark:text-red-100/70">Approval Rate</CardTitle>
              <p className="text-xs text-red-700/60 dark:text-red-200/60 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overview Panels */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-red-600" />
          Overview Panels
        </h2>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <CalendarView />
          </div>
          <div className="lg:col-span-1">
            <RecentJoiners />
          </div>
          <div className="lg:col-span-1">
            <MonthlyLeaveSummary />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-red-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto p-4 hover:bg-red-50 hover:border-red-200 group transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <Users className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Manage Employees</p>
                  <p className="text-xs text-muted-foreground">Add, edit, or view employee data</p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4 hover:bg-red-50 hover:border-red-200 group transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <FileText className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Review Requests</p>
                  <p className="text-xs text-muted-foreground">Approve or reject leave applications</p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4 hover:bg-red-50 hover:border-red-200 group transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <PieChart className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">View Reports</p>
                  <p className="text-xs text-muted-foreground">Analytics and insights</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
