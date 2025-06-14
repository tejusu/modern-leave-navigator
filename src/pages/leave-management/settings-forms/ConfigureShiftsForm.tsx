
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, PlusCircle } from "lucide-react";

const ShiftSchema = z.object({
  name: z.string().min(1, "Shift name is required."),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
});

const FormSchema = z.object({
  shifts: z.array(ShiftSchema).min(1, "At least one shift is required."),
});

export function ConfigureShiftsForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shifts: [{ name: "General Shift", startTime: "09:00", endTime: "17:00" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "shifts",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Shifts saved:", data);
    toast({
      title: "Settings Saved",
      description: "Work shifts have been updated successfully.",
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="configure-shifts-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4 sm:space-y-0 sm:grid sm:grid-cols-8 sm:gap-4 sm:items-end">
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name={`shifts.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Morning Shift" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name={`shifts.${index}.startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                 <FormField
                  control={form.control}
                  name={`shifts.${index}.endTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Remove Shift</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", startTime: "09:00", endTime: "17:00" })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Shift
        </Button>
      </form>
    </Form>
  );
}
