
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Upload, MoreHorizontal, Search } from "lucide-react";

// Mock data for employees
const employees = [
  {
    id: "EMP001",
    name: "Olivia Martin",
    email: "olivia.martin@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
    joiningDate: "2023-05-15",
  },
  {
    id: "EMP002",
    name: "Jackson Lee",
    email: "jackson.lee@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Engineering",
    role: "Backend Developer",
    status: "Active",
    joiningDate: "2022-11-20",
  },
  {
    id: "EMP003",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Human Resources",
    role: "HR Manager",
    status: "Active",
    joiningDate: "2024-01-10",
  },
  {
    id: "EMP004",
    name: "William Kim",
    email: "will.kim@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Marketing",
    role: "Content Strategist",
    status: "On Leave",
    joiningDate: "2023-08-22",
  },
    {
    id: "EMP005",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Active",
    joiningDate: "2023-03-12",
  },
  {
    id: "EMP006",
    name: "James Brown",
    email: "james.brown@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Sales",
    role: "Sales Executive",
    status: "Deactivated",
    joiningDate: "2021-07-01",
  },
];

const EmployeeManagement = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            View, add, and manage your organization's employees.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>All Employees</CardTitle>
              <CardDescription>A list of all employees in the system.</CardDescription>
            </div>
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-8 w-full md:w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead className="hidden lg:table-cell">Joining Date</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        employee.status === "Active" ? "default" :
                        employee.status === "On Leave" ? "secondary" : "destructive"
                      }>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{employee.role}</TableCell>
                    <TableCell className="hidden lg:table-cell">{employee.department}</TableCell>
                    <TableCell className="hidden lg:table-cell">{new Date(employee.joiningDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Documents</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Deactivate</DropdownMenuItem>
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
    </div>
  );
};

export default EmployeeManagement;
