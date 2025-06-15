export type Employee = {
  employeeId: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  department: string;
  role: string;
  status: "Active" | "On Leave" | "Deactivated";
  joiningDate: string;
  reportingManager?: string;
  workLocation?: string;
  employmentType: "Full-time" | "Part-time" | "Contractor" | "Intern";
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  address?: string;
  bloodGroup?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  bankDetails?: {
    accountHolderName?: string;
    accountNumber?: string;
    bankName?: string;
    ifscCode?: string;
  };
};

export type LeaveApplication = {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "Approved" | "Pending" | "Rejected";
};

export type Holiday = {
  id: string;
  date: Date;
  name: string;
  type: "General Holiday" | "Restricted Holiday";
  departments?: string[];
};
