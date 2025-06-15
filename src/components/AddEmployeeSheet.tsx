
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Employee } from "@/lib/types";
import { employeeSchema, EmployeeFormValues } from "./add-employee/schema";
import { EmployeeDetailsForm } from "./add-employee/EmployeeDetailsForm";
import { FinancialComplianceForm } from "./add-employee/FinancialComplianceForm";

type AddEmployeeSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEmployee: (employee: Omit<Employee, "employeeId" | "status" | "avatar">) => void;
};

export function AddEmployeeSheet({ open, onOpenChange, onAddEmployee }: AddEmployeeSheetProps) {
  const [step, setStep] = React.useState(1);
  
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      reportingManager: "",
      workLocation: "",
      employmentType: "Full-time",
      address: "",
      aadhaarNumber: "",
      panNumber: "",
      bankDetails: {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
      },
    },
  });

  const onSubmit = (values: EmployeeFormValues) => {
    const bankDetails = values.bankDetails;
    const finalBankDetails = (bankDetails && (bankDetails.accountHolderName || bankDetails.accountNumber || bankDetails.bankName || bankDetails.ifscCode))
      ? bankDetails
      : undefined;

    const newEmployeeData: Omit<Employee, "employeeId" | "status" | "avatar"> = {
      name: values.name,
      email: values.email,
      department: values.department,
      role: values.role,
      employmentType: values.employmentType,
      joiningDate: format(values.joiningDate, "yyyy-MM-dd"),
      dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "yyyy-MM-dd") : undefined,
      phone: values.phone,
      reportingManager: values.reportingManager,
      workLocation: values.workLocation,
      gender: values.gender,
      address: values.address,
      bloodGroup: values.bloodGroup,
      aadhaarNumber: values.aadhaarNumber,
      panNumber: values.panNumber,
      bankDetails: finalBankDetails,
    };

    onAddEmployee(newEmployeeData);
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (!open) {
      form.reset();
      setStep(1);
    }
  }, [open, form]);

  const handleNext = async () => {
    const fields: (keyof EmployeeFormValues)[] = [
      "name", "email", "department", "role", "joiningDate", "employmentType",
    ];
    const output = await form.trigger(fields, { shouldFocus: true });
    if (!output) return;
    setStep(2);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Add New Employee</SheetTitle>
          <SheetDescription>
            {step === 1 
              ? "Fill in the details below to add a new employee to the system."
              : "Add financial and compliance details. This is optional and can be done later."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1</div>
                <span className={`${step >= 1 ? 'font-semibold' : ''}`}>Employee Details</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2</div>
                <span className={`${step >= 2 ? 'font-semibold' : 'text-muted-foreground'}`}>Financial & Compliance</span>
            </div>
        </div>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-grow overflow-y-hidden">
            <div className="flex-grow space-y-6 py-2 overflow-y-auto pr-6">
              {step === 1 && <EmployeeDetailsForm form={form} />}
              {step === 2 && <FinancialComplianceForm form={form} />}
            </div>
            <SheetFooter className="pt-6 mt-auto border-t">
              {step === 1 && (
                <div className="flex w-full justify-between">
                  <SheetClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button type="button" onClick={handleNext}>Next</Button>
                </div>
              )}
              {step === 2 && (
                <div className="flex w-full justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={form.handleSubmit(onSubmit)}>Skip & Save</Button>
                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save Employee</Button>
                  </div>
                </div>
              )}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
