
import { useState } from "react";
import { Admin, Employee } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const initialAdmins: Admin[] = [
  {
    adminId: "ADM001",
    name: "Sarah Johnson",
    email: "sarah.johnson@leaveflow.com",
    avatar: "/placeholder.svg",
    phone: "+1 234 567 8901",
    department: "Human Resources",
    status: "Active",
    role: "Admin Only",
  },
  {
    adminId: "ADM002", 
    name: "Michael Chen",
    email: "michael.chen@leaveflow.com",
    phone: "+1 234 567 8902",
    department: "Engineering",
    status: "Active",
    role: "Employee + Admin",
    employeeId: "AL002",
  },
];

const mockEmployees: Employee[] = [
  {
    employeeId: "EMP001",
    name: "John Smith",
    email: "john.smith@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Marketing",
    role: "Marketing Specialist",
    status: "Active",
    isAdmin: false,
  },
  {
    employeeId: "EMP002",
    name: "Jane Doe", 
    email: "jane.doe@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Engineering",
    role: "Software Developer",
    status: "Active",
    isAdmin: false,
  },
  {
    employeeId: "EMP003",
    name: "Robert Wilson",
    email: "robert.wilson@leaveflow.com",
    avatar: "/placeholder.svg",
    department: "Sales",
    role: "Sales Manager",
    status: "Active",
    isAdmin: false,
  },
];

export function useAdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const { toast } = useToast();

  const handleAddAdmin = (adminData: Omit<Admin, "adminId">) => {
    const newAdminId = `ADM${String(admins.length + 1).padStart(3, "0")}`;
    const newAdmin: Admin = {
      ...adminData,
      adminId: newAdminId,
    };
    
    setAdmins([...admins, newAdmin]);
    toast({
      title: "Success",
      description: "Admin created successfully.",
    });
  };

  const handleAssignAdmins = (selectedEmployees: Employee[]) => {
    const newAdmins: Admin[] = selectedEmployees.map((employee, index) => {
      const newAdminId = `ADM${String(admins.length + index + 1).padStart(3, "0")}`;
      return {
        adminId: newAdminId,
        name: employee.name,
        email: employee.email,
        avatar: employee.avatar,
        phone: employee.phone,
        department: employee.department,
        status: "Active" as const,
        role: "Employee + Admin" as const,
        employeeId: employee.employeeId,
      };
    });

    setAdmins([...admins, ...newAdmins]);

    setEmployees(employees.map(emp => 
      selectedEmployees.some(selected => selected.employeeId === emp.employeeId)
        ? { ...emp, isAdmin: true }
        : emp
    ));

    toast({
      title: "Success",
      description: `${selectedEmployees.length} employee${selectedEmployees.length > 1 ? 's' : ''} assigned admin access successfully.`,
    });
  };

  const handleToggleStatus = (adminId: string) => {
    setAdmins(admins.map(admin => 
      admin.adminId === adminId 
        ? { ...admin, status: admin.status === "Active" ? "Inactive" : "Active" }
        : admin
    ));
    toast({
      title: "Status Updated",
      description: "Admin status has been updated successfully.",
    });
  };

  const handleRemoveAdmin = (adminId: string) => {
    const adminToRemove = admins.find(admin => admin.adminId === adminId);
    
    setAdmins(admins.filter(admin => admin.adminId !== adminId));
    
    if (adminToRemove?.employeeId) {
      setEmployees(employees.map(emp => 
        emp.employeeId === adminToRemove.employeeId
          ? { ...emp, isAdmin: false }
          : emp
      ));
    }
    
    toast({
      title: "Admin Removed",
      description: "Admin access has been removed successfully.",
      variant: "destructive",
    });
  };

  return {
    admins,
    employees,
    handleAddAdmin,
    handleAssignAdmins,
    handleToggleStatus,
    handleRemoveAdmin,
  };
}
