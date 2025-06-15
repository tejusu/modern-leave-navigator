
import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmployeeFormValues } from "./schema";

type FinancialComplianceFormProps = {
  form: UseFormReturn<EmployeeFormValues>;
};

export function FinancialComplianceForm({ form }: FinancialComplianceFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-md font-medium pt-4 border-b pb-2">Financial & Compliance Information (Optional)</h3>
      <FormField
        control={form.control}
        name="aadhaarNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Aadhaar Number</FormLabel>
            <FormControl>
              <Input placeholder="XXXX XXXX XXXX" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="panNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PAN Number</FormLabel>
            <FormControl>
              <Input placeholder="ABCDE1234F" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <FormLabel>Bank Details</FormLabel>
        <div className="space-y-4 rounded-md border p-4 mt-2">
          <FormField
            control={form.control}
            name="bankDetails.accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankDetails.bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. State Bank of Example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankDetails.accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankDetails.ifscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. SBIN0001234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
