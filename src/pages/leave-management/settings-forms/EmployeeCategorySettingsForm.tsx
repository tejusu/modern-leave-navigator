
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const employeeCategories = ["Full-time", "Part-time", "Contractor", "Intern"];
const leaveTypes = ["Annual Leave", "Sick Leave"];

const FormSchema = z.object({
  category: z.string({ required_error: "Please select a category." }),
  leaveType: z.string({ required_error: "Please select a leave type." }),
  accrualRate: z.coerce.number().min(0, "Rate must be positive."),
});

export function EmployeeCategorySettingsForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Employee category settings saved:", data);
    toast({
      title: "Settings Saved",
      description: `Custom rules for ${data.category} employees' ${data.leaveType} have been set.`,
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="employee-category-settings-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employeeCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leaveType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a leave type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leaveTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accrualRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Accrual Rate (days per month)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" placeholder="e.g., 1.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
