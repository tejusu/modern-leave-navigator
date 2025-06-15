
import * as z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  department: z.string().min(1, "Department is required."),
  role: z.string().min(1, "Role is required."),
  joiningDate: z.date({
    required_error: "A date of joining is required.",
  }),
  reportingManager: z.string().optional(),
  workLocation: z.string().optional(),
  employmentType: z.enum(["Full-time", "Part-time", "Contractor"]),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  dateOfBirth: z.date().optional(),
  address: z.string().optional(),
  bloodGroup: z.string().optional(),
  aadhaarNumber: z.string().optional(),
  panNumber: z.string().optional(),
  bankDetails: z.object({
    accountHolderName: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    ifscCode: z.string().optional(),
  }).optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
