
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

const reminderSchema = z.object({
  pendingApplications: z.boolean(),
  pendingApplicationsDays: z.number().min(1).max(30),
  upcomingLeaves: z.boolean(),
  upcomingLeavesDays: z.number().min(1).max(30),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

export function ReminderConfigurationsForm({ onSave }: { onSave: () => void }) {
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      pendingApplications: true,
      pendingApplicationsDays: 3,
      upcomingLeaves: true,
      upcomingLeavesDays: 7,
    },
  });

  function onSubmit(data: ReminderFormValues) {
    toast.success("Reminder configurations saved successfully!");
    console.log("Reminders saved:", data);
    onSave();
  }

  const watchPending = form.watch("pendingApplications");
  const watchUpcoming = form.watch("upcomingLeaves");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="reminder-configurations-form" className="space-y-8">
        <FormField
          control={form.control}
          name="pendingApplications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Pending Application Reminders</FormLabel>
                <FormDescription>
                  Send reminders to approvers for pending leave applications.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {watchPending && (
          <FormField
            control={form.control}
            name="pendingApplicationsDays"
            render={({ field: { value, onChange } }) => (
              <FormItem className="pl-4">
                <FormLabel>Remind After</FormLabel>
                <div className="flex items-center gap-4 pt-2">
                  <FormControl>
                    <Slider
                      defaultValue={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                      max={30}
                      min={1}
                      step={1}
                      className="w-[80%]"
                    />
                  </FormControl>
                  <span className="p-2 border rounded-md w-[60px] text-center text-sm">{value} {value > 1 ? 'days' : 'day'}</span>
                </div>
                <FormDescription>
                  Number of days after submission to send a reminder.
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="upcomingLeaves"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Upcoming Leave Reminders</FormLabel>
                <FormDescription>
                  Notify managers about their team's upcoming leaves.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {watchUpcoming && (
          <FormField
            control={form.control}
            name="upcomingLeavesDays"
            render={({ field: { value, onChange } }) => (
              <FormItem className="pl-4">
                <FormLabel>Remind Before</FormLabel>
                <div className="flex items-center gap-4 pt-2">
                  <FormControl>
                    <Slider
                      defaultValue={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                      max={30}
                      min={1}
                      step={1}
                      className="w-[80%]"
                    />
                  </FormControl>
                  <span className="p-2 border rounded-md w-[60px] text-center text-sm">{value} {value > 1 ? 'days' : 'day'}</span>
                </div>
                <FormDescription>
                  Number of days before a leave starts to send a reminder.
                </FormDescription>
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}
