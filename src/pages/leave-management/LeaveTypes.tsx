import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Power, Users, Building, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddLeaveTypeDialog } from "./AddLeaveTypeDialog";
import { toast } from "sonner";

interface LeaveType {
  name: string;
  description?: string;
  paidType: "Paid" | "Unpaid";
  maxDays: number;
  entitlementUnit: "Days" | "Weeks";
  entitlementPeriod: "Annual" | "Bi-Annual" | "Monthly" | "One-Time";
  accrual?: number;
  accrualPeriod?: "Monthly" | "Yearly";
  minimumService?: number;
  genderEligibility: "All" | "Male" | "Female";
  carryForward: boolean;
  carryForwardMaxDays?: number;
  encashable: boolean;
  maxEncashmentDays?: number;
  noticePeriod: number;
  isActive: boolean;
}

const initialLeaveTypes: LeaveType[] = [
  { 
    name: "Casual Leave",
    description: "Short-term leave for personal matters",
    paidType: "Paid",
    maxDays: 12, 
    entitlementUnit: "Days",
    entitlementPeriod: "Annual",
    accrual: 1,
    accrualPeriod: "Monthly",
    minimumService: 0,
    genderEligibility: "All",
    carryForward: true,
    carryForwardMaxDays: 5,
    encashable: false,
    noticePeriod: 3,
    isActive: true
  },
  { 
    name: "Sick Leave",
    description: "Medical leave for health issues",
    paidType: "Paid", 
    maxDays: 10,
    entitlementUnit: "Days",
    entitlementPeriod: "Annual",
    accrual: 0.83,
    accrualPeriod: "Monthly",
    minimumService: 0,
    genderEligibility: "All",
    carryForward: false,
    encashable: false,
    noticePeriod: 0,
    isActive: true
  },
  { 
    name: "Earned Leave",
    description: "Annual planned leave",
    paidType: "Paid",
    maxDays: 20,
    entitlementUnit: "Days",
    entitlementPeriod: "Annual",
    accrual: 1.67,
    accrualPeriod: "Monthly",
    minimumService: 3,
    genderEligibility: "All",
    carryForward: true,
    carryForwardMaxDays: 10,
    encashable: true,
    maxEncashmentDays: 10,
    noticePeriod: 15,
    isActive: true
  },
];

export function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(initialLeaveTypes);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    leaveTypeName: string;
  }>({ open: false, leaveTypeName: "" });

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
    
    const type = leaveTypes.find(t => t.name === typeName);
    if (type) {
      toast.success(`Leave type "${typeName}" ${type.isActive ? 'deactivated' : 'activated'} successfully.`);
    }
  };

  const handleDeleteLeaveType = (typeName: string) => {
    setDeleteConfirmation({ open: true, leaveTypeName: typeName });
  };

  const confirmDelete = () => {
    setLeaveTypes((prev) => prev.filter(type => type.name !== deleteConfirmation.leaveTypeName));
    toast.success(`Leave type "${deleteConfirmation.leaveTypeName}" deleted successfully.`);
    setDeleteConfirmation({ open: false, leaveTypeName: "" });
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
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Max Days/Year</TableHead>
                <TableHead className="hidden lg:table-cell">Carry Forward</TableHead>
                <TableHead className="hidden lg:table-cell">Encashable</TableHead>
                <TableHead className="hidden lg:table-cell">Notice Period</TableHead>
                <TableHead className="hidden xl:table-cell">Gender</TableHead>
                <TableHead className="hidden xl:table-cell">Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveTypes.map((type) => (
                <TableRow key={type.name} className={!type.isActive ? "opacity-60" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{type.name}</span>
                      {type.description && (
                        <span className="text-xs text-muted-foreground">{type.description}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={type.paidType === "Paid" ? "default" : "secondary"}>
                      {type.paidType}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <span>{type.maxDays} {type.entitlementUnit}</span>
                      <span className="text-xs text-muted-foreground">{type.entitlementPeriod}</span>
                    </div>
                  </TableCell>
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
                        {type.maxEncashmentDays && (
                          <span className="text-xs text-muted-foreground">
                            Max: {type.maxEncashmentDays} days
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{type.noticePeriod} days</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {type.genderEligibility}
                    </Badge>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Map to Roles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Building className="mr-2 h-4 w-4" />
                          Map to Departments
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteLeaveType(type.name)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmation.open} onOpenChange={(open) => setDeleteConfirmation(prev => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the leave type "{deleteConfirmation.leaveTypeName}"? 
              This action cannot be undone and will affect all related leave applications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirmation({ open: false, leaveTypeName: "" })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Leave Type
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}