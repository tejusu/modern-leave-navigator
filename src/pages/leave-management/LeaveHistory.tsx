
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, FileChartLine, ListChecks, Search } from "lucide-react";

// Mock data
const auditTrailData = [
  { id: 1, date: "2025-05-20", leaveType: "Casual Leave", days: 2, status: "Approved", actionBy: "System", details: "Applied by John Doe, approved by Manager" },
  { id: 2, date: "2025-04-10", leaveType: "Sick Leave", days: 1, status: "Approved", actionBy: "HR Admin", details: "Applied by John Doe, auto-approved with medical certificate" },
];

const balanceLogsData = [
  { id: 1, date: "2025-06-01", employee: "John Doe", leaveType: "Casual Leave", change: "+1", newBalance: 12, reason: "Monthly Accrual" },
  { id: 2, date: "2025-05-20", employee: "John Doe", leaveType: "Casual Leave", change: "-2", newBalance: 11, reason: "Leave Taken" },
  { id: 3, date: "2025-05-15", employee: "Jane Smith", leaveType: "Sick Leave", change: "-3", newBalance: 7, reason: "Leave Taken" },
  { id: 4, date: "2025-05-01", employee: "Jane Smith", leaveType: "Sick Leave", change: "+1", newBalance: 10, reason: "Monthly Accrual" },
];

const complianceReports = [
  {
    title: "Employee Leave Balance Report",
    description: "View current leave balances for all employees.",
    icon: FileText,
  },
  {
    title: "Leave Trend Analysis",
    description: "Analyze leave patterns and trends across departments.",
    icon: FileChartLine,
  },
  {
    title: "Policy Compliance Checklist",
    description: "Verify adherence to leave policies and regulations.",
    icon: ListChecks,
  },
];


export function LeaveHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave History & Reports</CardTitle>
        <CardDescription>View audit trails, logs, and compliance reports.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Employee-wise Audit Trail */}
        <Card>
          <CardHeader>
            <CardTitle>Employee-wise Audit Trail</CardTitle>
            <CardDescription>Track leave history for individual employees.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search employee by name or ID..." className="pl-8" />
              </div>
              <Button>Search</Button>
            </div>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Action By</TableHead>
                    <TableHead className="hidden md:table-cell">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditTrailData.map((trail) => (
                    <TableRow key={trail.id}>
                      <TableCell>{trail.date}</TableCell>
                      <TableCell>{trail.leaveType}</TableCell>
                      <TableCell>{trail.days}</TableCell>
                      <TableCell>{trail.status}</TableCell>
                      <TableCell className="hidden sm:table-cell">{trail.actionBy}</TableCell>
                      <TableCell className="hidden md:table-cell">{trail.details}</TableCell>
                    </TableRow>
                  ))}
                   {auditTrailData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Search for an employee to see their audit trail.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Balance Change Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Balance Change Logs</CardTitle>
            <CardDescription>Review a log of all leave balance adjustments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>New Balance</TableHead>
                    <TableHead className="hidden sm:table-cell">Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balanceLogsData.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.employee}</TableCell>
                      <TableCell>{log.leaveType}</TableCell>
                      <TableCell>{log.change}</TableCell>
                      <TableCell>{log.newBalance}</TableCell>
                      <TableCell className="hidden sm:table-cell">{log.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Policy Compliance Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Compliance Reports</CardTitle>
            <CardDescription>Generate reports to ensure compliance with leave policies.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complianceReports.map((report) => (
              <div key={report.title} className="p-4 border rounded-lg flex flex-col items-start gap-2 bg-background/50">
                <report.icon className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{report.description}</p>
                <Button variant="outline" size="sm" className="mt-auto w-full">Generate Report</Button>
              </div>
            ))}
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}
