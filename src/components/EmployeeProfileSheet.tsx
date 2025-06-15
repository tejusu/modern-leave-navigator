import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/lib/types";
import { Button } from "./ui/button";
import { Edit, Trash, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

type EmployeeProfileSheetProps = {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

const ProfileDetail = ({ label, value }: { label: string, value?: string | React.ReactNode }) => {
  if (!value) return null;
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export function EmployeeProfileSheet({ employee, open, onOpenChange, onEdit, onDelete }: EmployeeProfileSheetProps) {
  if (!employee) return null;

  const isPersonalDetailsIncomplete = !employee.gender || !employee.dateOfBirth || !employee.address || !employee.bloodGroup;

  const hasBankDetails = employee.bankDetails && (
    employee.bankDetails.accountHolderName || 
    employee.bankDetails.accountNumber || 
    employee.bankDetails.bankName || 
    employee.bankDetails.ifscCode
  );
  const isFinancialDetailsIncomplete = !employee.aadhaarNumber && !employee.panNumber && !hasBankDetails;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>Employee Profile</SheetTitle>
          <SheetDescription>
            Detailed information about the employee.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6 flex-grow overflow-y-auto pr-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.email}</p>
              <p className="text-sm text-muted-foreground">{employee.phone}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-medium border-b pb-2">Job Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <ProfileDetail label="Employee ID" value={employee.employeeId} />
               <ProfileDetail label="Status" value={
                <Badge variant={
                  employee.status === "Active" ? "default" :
                  employee.status === "On Leave" ? "secondary" : "destructive"
                }>
                  {employee.status}
                </Badge>
              } />
              <ProfileDetail label="Department" value={employee.department} />
              <ProfileDetail label="Role" value={employee.role} />
              <ProfileDetail label="Joining Date" value={new Date(employee.joiningDate).toLocaleDateString()} />
              <ProfileDetail label="Employment Type" value={employee.employmentType} />
              <ProfileDetail label="Reporting Manager" value={employee.reportingManager} />
              <ProfileDetail label="Work Location" value={employee.workLocation} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-medium border-b pb-2">Personal Information</h3>
            {isPersonalDetailsIncomplete && (
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Incomplete Information</AlertTitle>
                <AlertDescription>
                  Some personal details are missing. Click 'Edit' to update the profile.
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-2 gap-4">
              <ProfileDetail label="Date of Birth" value={employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : undefined} />
              <ProfileDetail label="Gender" value={employee.gender} />
              <ProfileDetail label="Blood Group" value={employee.bloodGroup} />
              <ProfileDetail label="Address" value={employee.address} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-medium border-b pb-2">Financial & Compliance</h3>
            {isFinancialDetailsIncomplete ? (
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Information Missing</AlertTitle>
                <AlertDescription>
                  Financial and compliance details have not been provided. Click 'Edit' to add them.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <ProfileDetail label="Aadhaar Number" value={employee.aadhaarNumber} />
                  <ProfileDetail label="PAN Number" value={employee.panNumber} />
                </div>
                {employee.bankDetails ? (
                  <div className="space-y-2 pt-2">
                    <p className="text-sm text-muted-foreground">Bank Details</p>
                    <div className="p-4 border rounded-md bg-muted/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ProfileDetail label="Account Holder" value={employee.bankDetails.accountHolderName} />
                        <ProfileDetail label="Bank Name" value={employee.bankDetails.bankName} />
                        <ProfileDetail label="Account Number" value={employee.bankDetails.accountNumber} />
                        <ProfileDetail label="IFSC Code" value={employee.bankDetails.ifscCode} />
                      </div>
                    </div>
                  </div>
                ): (
                   <div className="text-sm text-muted-foreground italic col-span-2 pt-2">No bank details provided.</div>
                )}
              </>
            )}
          </div>

        </div>
        <SheetFooter className="mt-auto pt-4 border-t">
            <div className="flex w-full justify-end gap-2">
                <Button variant="outline" onClick={() => onEdit(employee)}>
                    <Edit /> Edit
                </Button>
                <Button variant="destructive" onClick={() => onDelete(employee)}>
                    <Trash /> Delete
                </Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
