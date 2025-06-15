
import { useState, useMemo } from "react";
import { Employee } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { sendWelcomeEmail } from "@/lib/email-service";
import { generateEmployeeId } from "@/lib/employee-utils";

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

export const useEmployeeManagement = () => {
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

    return {
        employees,
        searchQuery,
        setSearchQuery,
        statusFilter,
        toggleStatusFilter,
        filteredEmployees,
        isAddSheetOpen,
        setAddSheetOpen,
        isImportDialogOpen,
        setImportDialogOpen,
        isProfileSheetOpen,
        setProfileSheetOpen,
        selectedEmployee,
        employeeToEdit,
        isEditSheetOpen,
        setEditSheetOpen,
        employeeToDelete,
        isDeleteDialogOpen,
        setDeleteDialogOpen,
        isEmailSettingsOpen,
        setEmailSettingsOpen,
        handleAddEmployee,
        handleViewProfile,
        handleEdit,
        handleUpdateEmployee,
        handleDelete,
        confirmDeleteEmployee,
        isPersonalDetailsIncomplete,
        isFinancialDetailsIncomplete,
    };
}
