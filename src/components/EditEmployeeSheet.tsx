
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/lib/types";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
    name: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().optional(),
    department: z.string().min(1, { message: "Department is required." }),
    role: z.string().min(1, { message: "Designation is required." }),
    joiningDate: z.string().min(1, { message: "Date of joining is required." }),
    reportingManager: z.string().optional(),
    workLocation: z.string().optional(),
    employmentType: z.enum(["Full-time", "Part-time", "Contractor"]).optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
    bloodGroup: z.string().optional(),
    aadhaarNumber: z.string().optional(),
    panNumber: z.string().optional(),
    bankDetails: z.string().optional(),
});

type EditEmployeeSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    employee: Employee | null;
    onUpdateEmployee: (updatedEmployee: Employee) => void;
};

export function EditEmployeeSheet({ open, onOpenChange, employee, onUpdateEmployee }: EditEmployeeSheetProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (employee) {
            form.reset({
                ...employee,
                phone: employee.phone || "",
                reportingManager: employee.reportingManager || "",
                workLocation: employee.workLocation || "",
                dateOfBirth: employee.dateOfBirth || "",
                address: employee.address || "",
                bloodGroup: employee.bloodGroup || "",
                aadhaarNumber: employee.aadhaarNumber || "",
                panNumber: employee.panNumber || "",
                bankDetails: employee.bankDetails || "",
            });
        }
    }, [employee, form, open]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!employee) return;
        const updatedEmployee: Employee = {
            ...employee,
            ...values,
            phone: values.phone || undefined,
            reportingManager: values.reportingManager || undefined,
            workLocation: values.workLocation || undefined,
            dateOfBirth: values.dateOfBirth || undefined,
            address: values.address || undefined,
            bloodGroup: values.bloodGroup || undefined,
            aadhaarNumber: values.aadhaarNumber || undefined,
            panNumber: values.panNumber || undefined,
            bankDetails: values.bankDetails || undefined,
        };
        onUpdateEmployee(updatedEmployee);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg w-full flex flex-col">
                <SheetHeader>
                    <SheetTitle>Edit Employee</SheetTitle>
                    <SheetDescription>Update the details of an existing employee.</SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-grow pr-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="department" render={({ field }) => ( <FormItem><FormLabel>Department/Team</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="role" render={({ field }) => ( <FormItem><FormLabel>Designation/Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="joiningDate" render={({ field }) => ( <FormItem><FormLabel>Date of Joining</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="reportingManager" render={({ field }) => ( <FormItem><FormLabel>Reporting Manager</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="workLocation" render={({ field }) => ( <FormItem><FormLabel>Work Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="employmentType" render={({ field }) => ( <FormItem><FormLabel>Employment Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Contractor">Contractor</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="bloodGroup" render={({ field }) => ( <FormItem><FormLabel>Blood Group</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger></FormControl><SelectContent><SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem><SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem><SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem><SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="dateOfBirth" render={({ field }) => ( <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />

                            <h3 className="text-md font-medium pt-4 border-b pb-2">Financial & Compliance Information</h3>
                            <FormField control={form.control} name="aadhaarNumber" render={({ field }) => ( <FormItem><FormLabel>Aadhaar Number</FormLabel><FormControl><Input placeholder="XXXX XXXX XXXX" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="panNumber" render={({ field }) => ( <FormItem><FormLabel>PAN Number</FormLabel><FormControl><Input placeholder="ABCDE1234F" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name="bankDetails" render={({ field }) => ( <FormItem><FormLabel>Bank Details</FormLabel><FormControl><Textarea placeholder="e.g. Account Holder Name, Account Number, Bank Name, IFSC Code" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        </form>
                    </Form>
                </ScrollArea>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
