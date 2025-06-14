
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
