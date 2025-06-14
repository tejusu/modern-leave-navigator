
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  newJoinerLogic: z.string({ required_error: "Please select a logic for new joiners." }),
  leaverLogic: z.string({ required_error: "Please select a logic for leavers." }),
});

export function ProrationLogicForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        newJoinerLogic: "pro_rata",
        leaverLogic: "pro_rata",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Proration logic saved:", data);
    toast({
      title: "Settings Saved",
      description: "Proration logic for new joiners and leavers has been updated.",
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form id="proration-logic-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="newJoinerLogic"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>New Joiner Proration</FormLabel>
              <FormDescription>
                How leave is accrued for employees in their joining month.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="pro_rata" /></FormControl>
                    <FormLabel className="font-normal">Prorate based on joining date</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="full_if_before_15" /></FormControl>
                    <FormLabel className="font-normal">Full credit if joining on/before 15th, none otherwise</FormLabel>
                  </FormItem>
                   <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="full_credit" /></FormControl>
                    <FormLabel className="font-normal">Full credit regardless of joining date</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="no_credit" /></FormControl>
                    <FormLabel className="font-normal">No credit for the joining month</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="leaverLogic"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Leaver Proration</FormLabel>
               <FormDescription>
                How leave is accrued for employees in their leaving month.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="pro_rata" /></FormControl>
                    <FormLabel className="font-normal">Prorate based on leaving date</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="full_if_after_15" /></FormControl>
                    <FormLabel className="font-normal">Full credit if leaving on/after 15th, none otherwise</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="no_credit" /></FormControl>
                    <FormLabel className="font-normal">No credit for the leaving month</FormLabel>
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
