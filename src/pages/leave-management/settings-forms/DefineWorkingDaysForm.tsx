
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const days = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
] as const;

const FormSchema = z.object({
  workingDays: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one working day.",
  }),
});

export function DefineWorkingDaysForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Working days saved:", data);
    toast({
      title: "Settings Saved",
      description: "Working days have been updated successfully.",
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="define-working-days-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="workingDays"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Standard Work Week</FormLabel>
                <p className="text-sm text-muted-foreground">Select the days that are considered working days in your organization.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {days.map((day) => (
                  <FormField
                    key={day.id}
                    control={form.control}
                    name="workingDays"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(day.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), day.id])
                                : field.onChange(
                                    (field.value || []).filter((value) => value !== day.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{day.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
