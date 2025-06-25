
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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  allowCancellationAfterApproval: z.boolean(),
  noticePeriodForCancellation: z.string().min(1, "Notice period is required"),
  blockInsufficientBalance: z.boolean(),
  gracePeriod: z.string().optional(),
});

interface LeaveCancellationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveCancellationDialog({
  open,
  onOpenChange,
}: LeaveCancellationDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowCancellationAfterApproval: true,
      noticePeriodForCancellation: "2",
      blockInsufficientBalance: true,
      gracePeriod: "5",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Leave Cancellation & Accrual Settings:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leave Cancellation & Accrual Policies</DialogTitle>
          <DialogDescription>
            Configure cancellation policies and accrual blocking rules.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="allowCancellationAfterApproval"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Allow cancellation after approval
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Enable employees to cancel approved leave requests
                        </div>
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

                <FormField
                  control={form.control}
                  name="noticePeriodForCancellation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Period for Cancellation (days before leave start)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2"
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
                <CardTitle className="text-lg">Accrual Blocking Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="blockInsufficientBalance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Block if balance is insufficient
                        </FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Prevent leave applications when balance is insufficient
                        </div>
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

                <FormField
                  control={form.control}
                  name="gracePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allow Grace Period (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5"
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
