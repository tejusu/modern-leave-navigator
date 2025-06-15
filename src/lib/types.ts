
export type Employee = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  department?: string;
  role?: string;
  status: "Active" | "On Leave" | "Deactivated";
  joiningDate: string;
  reportingManager?: string;
  workLocation?: string;
  employmentType?: "Full-time" | "Part-time" | "Contractor";
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  address?: string;
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
  type: "National" | "Regional" | "Optional";
  departments?: string[];
};
