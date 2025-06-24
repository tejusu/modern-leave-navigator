
export interface Employee {
  employeeId: string;
  name: string;
  email: string;
  avatar?: string;
  department?: string;
  role?: string;
  status: "Active" | "On Leave" | "Deactivated";
  joiningDate?: string;
  dateOfBirth?: string;
  phone?: string;
  reportingManager?: string;
  workLocation?: string;
  employmentType?: "Full-time" | "Part-time" | "Contractor" | "Intern";
  gender?: "Male" | "Female" | "Other";
  address?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  aadhaarNumber?: string;
  panNumber?: string;
  bankDetails?: {
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
  };
  isAdmin?: boolean;
}

export interface Admin {
  adminId: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  department?: string;
  status: "Active" | "Inactive";
  role: "Admin Only" | "Employee + Admin";
  employeeId?: string; // If this admin is also an employee
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ComponentType;
}

export interface LeaveApplication {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
  reason?: string;
}

export interface MonthlyLeaveData {
  month: string;
  approved: number;
  pending: number;
  rejected: number;
}

export interface DepartmentLeaveData {
  department: string;
  leaves: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "holiday" | "leave" | "event";
  description?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: "General Holiday" | "Restricted Holiday";
  departments?: string[];
}
