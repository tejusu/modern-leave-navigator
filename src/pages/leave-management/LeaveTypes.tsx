
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Power, Users, Building } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AddLeaveTypeDialog } from "./AddLeaveTypeDialog";

interface LeaveType {
  name: string;
  maxDays: number;
  accrual: "Monthly" | "Yearly" | "Manual";
  carryForward: boolean;
  carryForwardMaxDays?: number;
  encashable: boolean;
  encashmentLimit?: number;
  noticePeriod: number;
  categoryApplicability: string[];
  isActive: boolean;
}

const initialLeaveTypes: LeaveType[] = [
  { 
    name: "Casual Leave", 
    maxDays: 12, 
    accrual: "Monthly", 
    carryForward: true,
    carryForwardMaxDays: 5,
    encashable: false,
    noticePeriod: 3,
    categoryApplicability: ["full-time", "part-time"],
    isActive: true
  },
  { 
    name: "Sick Leave", 
    maxDays: 10, 
    accrual: "Yearly", 
    carryForward: false,
    encashable: false,
    noticePeriod: 0,
    categoryApplicability: ["full-time", "part-time", "contractor", "intern"],
    isActive: true
  },
  { 
    name: "Earned Leave", 
    maxDays: 20, 
    accrual: "Monthly", 
    carryForward: true,
    carryForwardMaxDays: 10,
    encashable: true,
    encashmentLimit: 15,
    noticePeriod: 15,
    categoryApplicability: ["full-time"],
    isActive: true
  },
];

const categoryLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contractor": "Contractor",
  "intern": "Intern",
};

export function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(initialLeaveTypes);

  const handleAddLeaveType = (newType: Omit<LeaveType, 'isActive'>) => {
    setLeaveTypes((prev) => [...prev, { ...newType, isActive: true }]);
  };

  const handleToggleActive = (typeName: string) => {
    setLeaveTypes((prev) => 
      prev.map(type => 
        type.name === typeName 
          ? { ...type, isActive: !type.isActive }
          : type
      )
    );
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type Name</TableHead>
                <TableHead className="hidden sm:table-cell">Max Days/Year</TableHead>
                <TableHead className="hidden md:table-cell">Accrual</TableHead>
                <TableHead className="hidden lg:table-cell">Carry Forward</TableHead>
                <TableHead className="hidden lg:table-cell">Encashable</TableHead>
                <TableHead className="hidden lg:table-cell">Notice Period</TableHead>
                <TableHead className="hidden xl:table-cell">Category</TableHead>
                <TableHead className="hidden xl:table-cell">Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveTypes.map((type) => (
                <TableRow key={type.name} className={!type.isActive ? "opacity-60" : ""}>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{type.maxDays}</TableCell>
                  <TableCell className="hidden md:table-cell">{type.accrual}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {type.carryForward ? (
                      <div className="flex flex-col">
                        <span className="text-green-600">Yes</span>
                        {type.carryForwardMaxDays && (
                          <span className="text-xs text-muted-foreground">
                            Max: {type.carryForwardMaxDays} days
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {type.encashable ? (
                      <div className="flex flex-col">
                        <span className="text-green-600">Yes</span>
                        {type.encashmentLimit && (
                          <span className="text-xs text-muted-foreground">
                            Limit: {type.encashmentLimit} days
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{type.noticePeriod} days</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {type.categoryApplicability.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {categoryLabels[category]}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <Badge variant={type.isActive ? "default" : "secondary"}>
                      {type.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(type.name)}>
                          <Power className="mr-2 h-4 w-4" />
                          {type.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Map to Roles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Building className="mr-2 h-4 w-4" />
                          Map to Departments
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
