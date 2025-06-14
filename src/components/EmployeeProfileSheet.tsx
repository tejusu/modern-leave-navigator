
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/lib/types";

type EmployeeProfileSheetProps = {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function EmployeeProfileSheet({ employee, open, onOpenChange }: EmployeeProfileSheetProps) {
  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Employee Profile</SheetTitle>
          <SheetDescription>
            Detailed information about the employee.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
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
              <ProfileDetail label="Employee ID" value={employee.id} />
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
            <div className="grid grid-cols-2 gap-4">
              <ProfileDetail label="Date of Birth" value={employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : undefined} />
              <ProfileDetail label="Gender" value={employee.gender} />
              <ProfileDetail label="Address" value={employee.address} />
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
