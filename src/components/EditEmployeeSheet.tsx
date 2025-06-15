
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Employee } from "@/lib/types";
import { employeeSchema, EmployeeFormValues } from "./add-employee/schema";
import { EmployeeDetailsForm } from "./add-employee/EmployeeDetailsForm";
import { FinancialComplianceForm } from "./add-employee/FinancialComplianceForm";
import { format } from "date-fns";

type EditEmployeeSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    employee: Employee | null;
    onUpdateEmployee: (updatedEmployee: Employee) => void;
    employees: Employee[];
};

export function EditEmployeeSheet({ open, onOpenChange, employee, onUpdateEmployee, employees }: EditEmployeeSheetProps) {
    const [step, setStep] = useState(1);
    
    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
    });

    useEffect(() => {
        if (employee) {
            form.reset({
                ...employee,
                joiningDate: new Date(employee.joiningDate),
                dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth) : undefined,
                phone: employee.phone || "",
                reportingManager: employee.reportingManager || "",
                workLocation: employee.workLocation || "",
                address: employee.address || "",
                bloodGroup: employee.bloodGroup || "",
                aadhaarNumber: employee.aadhaarNumber || "",
                panNumber: employee.panNumber || "",
                bankDetails: {
                  accountHolderName: employee.bankDetails?.accountHolderName || "",
                  bankName: employee.bankDetails?.bankName || "",
                  accountNumber: employee.bankDetails?.accountNumber || "",
                  ifscCode: employee.bankDetails?.ifscCode || "",
                },
            });
        }
        if (!open) {
          setStep(1);
        }
    }, [employee, form, open]);

    const onSubmit = (values: EmployeeFormValues) => {
        if (!employee) return;
        
        const bankDetails = values.bankDetails;
        const finalBankDetails = (bankDetails && (bankDetails.accountHolderName || bankDetails.accountNumber || bankDetails.bankName || bankDetails.ifscCode))
          ? bankDetails
          : undefined;

        const updatedEmployee: Employee = {
            ...employee,
            ...values,
            joiningDate: format(values.joiningDate, "yyyy-MM-dd"),
            dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "yyyy-MM-dd") : undefined,
            phone: values.phone || undefined,
            reportingManager: values.reportingManager || undefined,
            workLocation: values.workLocation || undefined,
            address: values.address || undefined,
            bloodGroup: values.bloodGroup || undefined,
            aadhaarNumber: values.aadhaarNumber || undefined,
            panNumber: values.panNumber || undefined,
            employmentType: values.employmentType || "Full-time",
            bankDetails: finalBankDetails,
        };
        onUpdateEmployee(updatedEmployee);
    };
    
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
                    <SheetTitle>Edit Employee</SheetTitle>
                    <SheetDescription>
                        {step === 1
                            ? "Update the employee's main details."
                            : "Update financial and compliance details."
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
                            {step === 1 && <EmployeeDetailsForm form={form} employees={(employees || []).filter(e => e.employeeId !== employee?.employeeId)} />}
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
                                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
                                </div>
                            )}
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
