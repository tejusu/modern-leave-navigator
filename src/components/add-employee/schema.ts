
import * as z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  department: z.string().min(1, "Department is required."),
  role: z.string().min(1, "Role is required."),
  joiningDate: z.date({
    required_error: "Joining date is required.",
  }),
  dateOfBirth: z.date().optional(),
  employmentType: z.enum(["Full-time", "Part-time", "Contractor", "Intern"], {
    required_error: "Please select an employment type.",
  }),
  reportingManager: z.string().optional(),
  workLocation: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  address: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  aadhaarNumber: z.string().optional(),
  panNumber: z.string().optional(),
  avatar: z.string().optional(),
  isAdmin: z.boolean().default(false),
  bankDetails: z.object({
    accountHolderName: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    ifscCode: z.string().optional(),
  }).optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
