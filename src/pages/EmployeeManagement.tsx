import React, { useState, useMemo } from "react";
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Upload, MoreHorizontal, Search, Filter, AlertTriangle, Settings } from "lucide-react";
import { Employee } from "@/lib/types";
import { AddEmployeeSheet } from "@/components/AddEmployeeSheet";
import { BulkImportDialog } from "@/components/BulkImportDialog";
import { EmployeeProfileSheet } from "@/components/EmployeeProfileSheet";
import { EditEmployeeSheet } from "@/components/EditEmployeeSheet";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { sendWelcomeEmail } from "@/lib/email-service";
import { WelcomeEmailSettingsDialog } from "@/components/WelcomeEmailSettingsDialog";

// Mock data for employees
const initialEmployees: Employee[] = [
  {
    employeeId: "AL001",
    name: "Olivia Martin",
    email: "olivia.martin@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
    joiningDate: "2023-05-15",
    employmentType: "Full-time",
  },
  {
    employeeId: "AL002",
    name: "Jackson Lee",
    email: "jackson.lee@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Engineering",
    role: "Backend Developer",
    status: "Active",
    joiningDate: "2022-11-20",
    employmentType: "Full-time",
  },
  {
    employeeId: "AL003",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Human Resources",
    role: "HR Manager",
    status: "Active",
    joiningDate: "2024-01-10",
    employmentType: "Full-time",
  },
  {
    employeeId: "AL004",
    name: "William Kim",
    email: "will.kim@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Marketing",
    role: "Content Strategist",
    status: "On Leave",
    joiningDate: "2023-08-22",
    employmentType: "Full-time",
  },
    {
    employeeId: "AL005",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Active",
    joiningDate: "2023-03-12",
    employmentType: "Full-time",
  },
  {
    employeeId: "AL-CT-01",
    name: "James Brown",
    email: "james.brown@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Sales",
    role: "Sales Executive",
    status: "Deactivated",
    joiningDate: "2021-07-01",
    employmentType: "Contractor",
  },
];

const generateEmployeeId = (
  employmentType: "Full-time" | "Part-time" | "Contractor" | "Intern",
  existingEmployees: Employee[]
): string => {
  let prefix = "";
  let regex: RegExp;

  switch (employmentType) {
    case "Full-time":
      prefix = "AL";
      regex = /^AL(\d{3})$/;
      break;
    case "Part-time":
      prefix = "AL-PT-";
      regex = /^AL-PT-(\d{2})$/;
      break;
    case "Intern":
      prefix = "AL-INT-";
      regex = /^AL-INT-(\d{2})$/;
      break;
    case "Contractor":
    default:
      prefix = "AL-CT-";
      regex = /^AL-CT-(\d{2})$/;
      break;
  }
  
  const relevantIds = existingEmployees
    .map(e => e.employeeId)
    .filter(id => regex.test(id))
    .map(id => parseInt(id.match(regex)![1], 10));

  const maxId = relevantIds.length > 0 ? Math.max(...relevantIds) : 0;
  const newIdNumber = maxId + 1;

  if (employmentType === "Full-time") {
    return `${prefix}${String(newIdNumber).padStart(3, '0')}`;
  }
  return `${prefix}${String(newIdNumber).padStart(2, '0')}`;
};

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(["Active", "Deactivated"]);

  const [isAddSheetOpen, setAddSheetOpen] = useState(false);
  const [isImportDialogOpen, setImportDialogOpen] = useState(false);
  const [isProfileSheetOpen, setProfileSheetOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [isEditSheetOpen, setEditSheetOpen] = useState(false);

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isEmailSettingsOpen, setEmailSettingsOpen] = useState(false);

  const handleAddEmployee = (newEmployeeData: Omit<Employee, "employeeId" | "status" | "avatar">) => {
    const newEmployeeId = generateEmployeeId(newEmployeeData.employmentType, employees);

    const newEmployee: Employee = {
      ...newEmployeeData,
      employeeId: newEmployeeId,
      status: "Active",
      avatar: "/placeholder.svg",
    };
    setEmployees([newEmployee, ...employees]);
    
    sendWelcomeEmail(newEmployee);
    
    toast({
      title: "Success",
      description: "Employee added and welcome email sent.",
    });
  };

  const handleViewProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setProfileSheetOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setProfileSheetOpen(false);
    setEmployeeToEdit(employee);
    setEditSheetOpen(true);
  };

  const handleUpdateEmployee = (updatedEmployeeData: Employee) => {
    setEmployees(employees.map(emp => emp.employeeId === updatedEmployeeData.employeeId ? updatedEmployeeData : emp));
    setEditSheetOpen(false);
    setEmployeeToEdit(null);
    toast({
      title: "Success",
      description: "Employee details updated successfully.",
    });
  };

  const handleDelete = (employee: Employee) => {
    setProfileSheetOpen(false);
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteEmployee = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter(e => e.employeeId !== employeeToDelete.employeeId));
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
      toast({
        title: "Success",
        description: "Employee deleted successfully.",
        variant: "destructive",
      });
    }
  };

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((employee) =>
        statusFilter.length === 0 || statusFilter.includes(employee.status)
      )
      .filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [employees, searchQuery, statusFilter]);

  const toggleStatusFilter = (status: "Active" | "On Leave" | "Deactivated") => {
    setStatusFilter(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const isPersonalDetailsIncomplete = (employee: Employee): boolean => {
    return !employee.gender || !employee.dateOfBirth || !employee.address || !employee.bloodGroup;
  };

  const isFinancialDetailsIncomplete = (employee: Employee): boolean => {
    const hasBankDetails = employee.bankDetails && 
      (employee.bankDetails.accountHolderName || 
       employee.bankDetails.accountNumber || 
       employee.bankDetails.bankName || 
       employee.bankDetails.ifscCode);
    return !employee.aadhaarNumber && !employee.panNumber && !hasBankDetails;
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
            <p className="text-muted-foreground">
              View, add, and manage your organization's employees.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setEmailSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Email Settings
            </Button>
            <Button onClick={() => setAddSheetOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
            <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
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
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search employees..." 
                      className="pl-8 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Active")}
                      onCheckedChange={() => toggleStatusFilter("Active")}
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Deactivated")}
                      onCheckedChange={() => toggleStatusFilter("Deactivated")}
                    >
                      Deactivated
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden lg:table-cell">Department</TableHead>
                    <TableHead className="hidden lg:table-cell">Joining Date</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {employee.name}
                              {(isPersonalDetailsIncomplete(employee) || isFinancialDetailsIncomplete(employee)) && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Incomplete profile details.</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{employee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.employeeId}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewProfile(employee)}>View Profile</DropdownMenuItem>
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
      <AddEmployeeSheet 
        open={isAddSheetOpen} 
        onOpenChange={setAddSheetOpen} 
        onAddEmployee={handleAddEmployee} 
        employees={employees}
      />
      <BulkImportDialog 
        open={isImportDialogOpen} 
        onOpenChange={setImportDialogOpen} 
      />
      <EmployeeProfileSheet 
        employee={selectedEmployee} 
        open={isProfileSheetOpen} 
        onOpenChange={setProfileSheetOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditEmployeeSheet
        open={isEditSheetOpen}
        onOpenChange={setEditSheetOpen}
        employee={employeeToEdit}
        onUpdateEmployee={handleUpdateEmployee}
        employees={employees}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteEmployee}
        employeeName={employeeToDelete?.name}
      />
      <WelcomeEmailSettingsDialog
        open={isEmailSettingsOpen}
        onOpenChange={setEmailSettingsOpen}
      />
    </>
  );
};

export default EmployeeManagement;
