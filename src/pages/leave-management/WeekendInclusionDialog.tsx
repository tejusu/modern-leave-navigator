
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  annualLeaveWeekends: z.boolean(),
  sickLeaveWeekends: z.boolean(),
  casualLeaveWeekends: z.boolean(),
  maternityLeaveWeekends: z.boolean(),
  weekendDays: z.enum(["saturdays", "sundays", "both"]),
});

interface WeekendInclusionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WeekendInclusionDialog({
  open,
  onOpenChange,
}: WeekendInclusionDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualLeaveWeekends: false,
      sickLeaveWeekends: true,
      casualLeaveWeekends: false,
      maternityLeaveWeekends: true,
      weekendDays: "both",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Weekend Inclusion Settings:", values);
    onOpenChange(false);
  };

  const leaveTypes = [
    { key: "annualLeaveWeekends", label: "Annual Leave" },
    { key: "sickLeaveWeekends", label: "Sick Leave" },
    { key: "casualLeaveWeekends", label: "Casual Leave" },
    { key: "maternityLeaveWeekends", label: "Maternity Leave" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Weekend Inclusion Settings</DialogTitle>
          <DialogDescription>
            Configure whether weekends are included in leave calculations for different leave types.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave Type Weekend Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveTypes.map((leaveType) => (
                  <FormField
                    key={leaveType.key}
                    control={form.control}
                    name={leaveType.key as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {leaveType.label}
                          </FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Include weekends in {leaveType.label.toLowerCase()} calculations
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value as boolean}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekend Days Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="weekendDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apply weekend inclusion to</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select weekend days" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="saturdays">Saturdays only</SelectItem>
                          <SelectItem value="sundays">Sundays only</SelectItem>
                          <SelectItem value="both">Both Saturdays and Sundays</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
