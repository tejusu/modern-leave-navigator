
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeaveTrendChart } from "@/components/charts/LeaveTrendChart";
import { LeaveDistributionChart } from "@/components/charts/LeaveDistributionChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsAndAnalytics() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Gain insights into leave patterns and trends across your organization.
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leave Trend Analysis</CardTitle>
            <CardDescription>Monthly leave requests overview.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leave Type Distribution</CardTitle>
            <CardDescription>Breakdown of leaves by type.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveDistributionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
