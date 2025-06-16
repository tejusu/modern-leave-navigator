
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
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Key Metrics
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">124</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-blue-900/70 dark:text-blue-100/70">Total Employees</CardTitle>
              <p className="text-xs text-blue-700/60 dark:text-blue-200/60 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-2xl font-bold text-emerald-600">82</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-emerald-900/70 dark:text-emerald-100/70">Leave Requests</CardTitle>
              <p className="text-xs text-emerald-700/60 dark:text-emerald-200/60 mt-1">+5% this week</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <span className="text-2xl font-bold text-amber-600">12</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-amber-900/70 dark:text-amber-100/70">Pending Approvals</CardTitle>
              <p className="text-xs text-amber-700/60 dark:text-amber-200/60 mt-1">Needs attention</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">96%</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium text-purple-900/70 dark:text-purple-100/70">Approval Rate</CardTitle>
              <p className="text-xs text-purple-700/60 dark:text-purple-200/60 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overview Panels */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
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
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto p-4 hover:bg-blue-50 hover:border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Manage Employees</p>
                  <p className="text-xs text-muted-foreground">Add, edit, or view employee data</p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4 hover:bg-green-50 hover:border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Review Requests</p>
                  <p className="text-xs text-muted-foreground">Approve or reject leave applications</p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4 hover:bg-purple-50 hover:border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <PieChart className="h-4 w-4 text-purple-600" />
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
