
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  carryForward: z.boolean().default(false),
  maxCarryForwardDays: z.coerce.number().min(0).optional(),
  encashment: z.boolean().default(false),
}).refine(data => {
  if (data.carryForward && (data.maxCarryForwardDays === undefined || data.maxCarryForwardDays === null)) {
    return false;
  }
  return true;
}, {
  message: "Max carry forward days is required when carry forward is enabled.",
  path: ["maxCarryForwardDays"],
});

export function ConfigureYearEndProcessingForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      carryForward: true,
      maxCarryForwardDays: 10,
      encashment: false,
    },
  });

  const watchCarryForward = form.watch("carryForward");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Year-end processing saved:", data);
    toast({
      title: "Settings Saved",
      description: "Year-end processing rules have been updated.",
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="configure-year-end-processing-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="carryForward"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Carry Forward</FormLabel>
                <FormDescription>
                  Allow employees to carry forward unused leaves to the next year.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watchCarryForward && (
          <FormField
            control={form.control}
            name="maxCarryForwardDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Carry Forward Days</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 10" {...field} value={field.value ?? ""} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="encashment"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Leave Encashment</FormLabel>
                <FormDescription>
                  Allow employees to encash their unused leaves at year-end.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
            <h4 className="font-medium">Leave Lapsing</h4>
            <p className="text-sm text-muted-foreground">Unused leaves that are not carried forward or encashed will lapse at the end of the year.</p>
        </div>
      </form>
    </Form>
  );
}
