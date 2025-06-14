export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  role: string;
  status: "Active" | "On Leave" | "Deactivated";
  joiningDate: string;
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
  date: string;
  name: string;
};
