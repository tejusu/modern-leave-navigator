import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AddLeaveTypeDialog } from "./AddLeaveTypeDialog";

const initialLeaveTypes = [
  { name: "Casual Leave", maxDays: 12, accrual: "Monthly", carryForward: true, encashment: false },
  { name: "Sick Leave", maxDays: 10, accrual: "Yearly", carryForward: false, encashment: false },
  { name: "Earned Leave", maxDays: 20, accrual: "Monthly", carryForward: true, encashment: true },
];

export function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState(initialLeaveTypes);

  const handleAddLeaveType = (newType: {
    name?: string;
    maxDays?: number;
    accrual?: "Monthly" | "Yearly";
    carryForward?: boolean;
    encashment?: boolean;
  }) => {
    if (newType.name && typeof newType.maxDays === "number" && newType.accrual) {
      setLeaveTypes((prev) => [
        ...prev,
        {
          name: newType.name,
          maxDays: newType.maxDays,
          accrual: newType.accrual,
          carryForward: !!newType.carryForward,
          encashment: !!newType.encashment,
        },
      ]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Leave Types</CardTitle>
            <CardDescription>Define and manage different types of leave available to employees.</CardDescription>
          </div>
          <AddLeaveTypeDialog onSave={handleAddLeaveType} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type Name</TableHead>
              <TableHead className="hidden sm:table-cell">Max Days/Year</TableHead>
              <TableHead className="hidden md:table-cell">Accrual Logic</TableHead>
              <TableHead className="hidden lg:table-cell">Carry Forward</TableHead>
              <TableHead className="hidden lg:table-cell">Encashment</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveTypes.map((type) => (
              <TableRow key={type.name}>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{type.maxDays}</TableCell>
                <TableCell className="hidden md:table-cell">{type.accrual}</TableCell>
                <TableCell className="hidden lg:table-cell">{type.carryForward ? "Yes" : "No"}</TableCell>
                <TableCell className="hidden lg:table-cell">{type.encashment ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
