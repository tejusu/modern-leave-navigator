
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  minimumUnit: z.string().min(1, "Minimum unit is required"),
  maximumDays: z.string().min(1, "Maximum days is required"),
  maxRequestsPerMonth: z.string().min(1, "Max requests per month is required"),
  maxRequestsPerYear: z.string().min(1, "Max requests per year is required"),
  cooldownPeriod: z.string().min(1, "Cooldown period is required"),
});

interface LeaveApplicationLimitsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveApplicationLimitsDialog({
  open,
  onOpenChange,
}: LeaveApplicationLimitsDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minimumUnit: "0.5",
      maximumDays: "30",
      maxRequestsPerMonth: "4",
      maxRequestsPerYear: "24",
      cooldownPeriod: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Leave Application Limits Settings:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leave Application Limits</DialogTitle>
          <DialogDescription>
            Configure minimum/maximum limits and frequency controls for leave applications.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Min/Max Leave Per Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="minimumUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Unit (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.5"
                          placeholder="0.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maximumDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Days per Request</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave Frequency Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="maxRequestsPerMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Requests per Month</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxRequestsPerYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Requests per Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cooldownPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cooldown Period (days between requests)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
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
