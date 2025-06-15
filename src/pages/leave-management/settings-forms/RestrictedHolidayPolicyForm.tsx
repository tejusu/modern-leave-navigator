
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const policySchema = z.object({
  maxRestrictedHolidays: z.coerce.number().int().min(0, "Must be a positive number.").default(2),
});

type PolicyFormValues = z.infer<typeof policySchema>;

export function RestrictedHolidayPolicyForm({ onSave }: { onSave: () => void }) {
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      maxRestrictedHolidays: 2,
    },
  });

  function onSubmit(data: PolicyFormValues) {
    console.log("Saving restricted holiday policy:", data);
    toast.success("Settings Saved", {
      description: `Maximum restricted holidays set to ${data.maxRestrictedHolidays}.`,
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="restricted-holiday-policy-form" className="space-y-6">
        <FormField
          control={form.control}
          name="maxRestrictedHolidays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Allowed Restricted Holidays</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 2" {...field} />
              </FormControl>
              <FormDescription>
                Set the total number of restricted holidays an employee can avail in a single leave year.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
