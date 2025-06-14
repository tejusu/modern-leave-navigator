
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const FormSchema = z.object({
  startMonth: z.string({
    required_error: "Please select a month.",
  }),
});

export function SetFiscalYearStartForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startMonth: "April",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Fiscal year start saved:", data);
    toast({
      title: "Settings Saved",
      description: `Fiscal year start month set to ${data.startMonth}.`,
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="set-fiscal-year-start-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="startMonth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Month</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the start month for the fiscal year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
