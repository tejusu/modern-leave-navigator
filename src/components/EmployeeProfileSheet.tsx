
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

export function EmployeeProfileSheet({ employee, open, onOpenChange }: EmployeeProfileSheetProps) {
  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
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
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Employee ID</p>
              <p className="font-medium">{employee.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p>
                <Badge variant={
                  employee.status === "Active" ? "default" :
                  employee.status === "On Leave" ? "secondary" : "destructive"
                }>
                  {employee.status}
                </Badge>
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Department</p>
              <p className="font-medium">{employee.department}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium">{employee.role}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Joining Date</p>
              <p className="font-medium">{new Date(employee.joiningDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
