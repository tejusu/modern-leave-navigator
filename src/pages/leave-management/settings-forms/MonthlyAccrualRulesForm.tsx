
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const leaveTypes = ["Annual Leave", "Sick Leave", "Casual Leave"];

const FormSchema = z.object({
  leaveType: z.string({ required_error: "Please select a leave type." }),
  accrualRate: z.coerce.number().min(0, "Accrual rate must be positive."),
  creditTiming: z.enum(["start_of_month", "end_of_month"], { required_error: "Please select credit timing." }),
});

export function MonthlyAccrualRulesForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accrualRate: 1.5,
      creditTiming: "end_of_month",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Monthly accrual rules saved:", data);
    toast({
      title: "Settings Saved",
      description: `Accrual rules for ${data.leaveType} have been updated.`,
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="monthly-accrual-rules-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="leaveType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a leave type to configure" />
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
              <FormLabel>Accrual Rate (days per month)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" placeholder="e.g., 1.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creditTiming"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Credit Timing</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="start_of_month" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Start of the month
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="end_of_month" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      End of the month
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                When the leave balance should be credited.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
