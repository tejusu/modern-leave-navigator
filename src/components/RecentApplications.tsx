
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeaveApplication } from "@/lib/types";
import { cn } from "@/lib/utils";

const applications: LeaveApplication[] = [
  { id: "1", leaveType: "Annual Leave", startDate: "2025-07-20", endDate: "2025-07-25", days: 5, status: "Approved" },
  { id: "2", leaveType: "Sick Leave", startDate: "2025-06-10", endDate: "2025-06-10", days: 1, status: "Approved" },
  { id: "3", leaveType: "Casual Leave", startDate: "2025-08-01", endDate: "2025-08-02", days: 2, status: "Pending" },
  { id: "4", leaveType: "Annual Leave", startDate: "2025-05-15", endDate: "2025-05-16", days: 2, status: "Rejected" },
];

const statusColors: Record<LeaveApplication["status"], string> = {
    Approved: "bg-green-100 text-green-800 border-green-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
}

export function RecentApplications() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>A list of your recent leave requests.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Days</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {applications.map((app) => (
                    <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.leaveType}</TableCell>
                    <TableCell>{app.startDate}</TableCell>
                    <TableCell>{app.endDate}</TableCell>
                    <TableCell className="text-right">{app.days}</TableCell>
                    <TableCell className="text-center">
                        <Badge className={cn("text-xs", statusColors[app.status])}>{app.status}</Badge>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
