
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  cycle: z.enum(["calendar", "fiscal"], {
    required_error: "You need to select a leave year cycle.",
  }),
});

export function DefineLeaveYearCycleForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cycle: "calendar",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Leave year cycle saved:", data);
    toast({
      title: "Settings Saved",
      description: `Leave year cycle set to ${data.cycle === 'calendar' ? 'Calendar Year' : 'Fiscal Year'}.`,
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="define-leave-year-cycle-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cycle"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Leave Year Cycle</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="calendar" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Calendar Year (January - December)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="fiscal" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Fiscal Year (based on your organization's financial year)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
