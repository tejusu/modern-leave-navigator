
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeaveTrendChart } from "@/components/charts/LeaveTrendChart";
import { LeaveDistributionChart } from "@/components/charts/LeaveDistributionChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DepartmentLeaveChart } from "@/components/charts/DepartmentLeaveChart";
import { LeaveApprovalRateChart } from "@/components/charts/LeaveApprovalRateChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const detailedLeaveData = [
    { month: "June", leaveType: "Sick", employees: 8, totalDays: 15 },
    { month: "June", leaveType: "Casual", employees: 12, totalDays: 28 },
    { month: "June", leaveType: "Earned", employees: 5, totalDays: 20 },
    { month: "May", leaveType: "Sick", employees: 7, totalDays: 10 },
    { month: "May", leaveType: "Casual", employees: 15, totalDays: 23 },
    { month: "May", leaveType: "Earned", employees: 6, totalDays: 18 },
    { month: "April", leaveType: "Sick", employees: 6, totalDays: 9 },
    { month: "April", leaveType: "Casual", employees: 10, totalDays: 25 },
    { month: "April", leaveType: "Earned", employees: 4, totalDays: 15 },
];

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
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Leave</CardTitle>
            <CardDescription>Leave distribution across departments.</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentLeaveChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leave Approval Rate</CardTitle>
            <CardDescription>Overview of leave request statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveApprovalRateChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Monthly Leave Details</CardTitle>
                <CardDescription>
                Detailed breakdown of leaves by type, showing number of employees and total days.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead className="text-right">No. of Employees</TableHead>
                    <TableHead className="text-right">Total Days</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {detailedLeaveData.map((data) => (
                    <TableRow key={`${data.month}-${data.leaveType}`}>
                        <TableCell className="font-medium">{data.month}</TableCell>
                        <TableCell>{data.leaveType}</TableCell>
                        <TableCell className="text-right">{data.employees}</TableCell>
                        <TableCell className="text-right">{data.totalDays}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
