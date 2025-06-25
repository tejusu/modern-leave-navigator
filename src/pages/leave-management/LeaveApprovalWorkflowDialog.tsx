
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  approvalLevel: z.enum(["single", "multi"]),
  defaultApprover: z.string().min(1, "Default approver is required"),
  escalationTimeline: z.string().min(1, "Escalation timeline is required"),
});

interface LeaveApprovalWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveApprovalWorkflowDialog({
  open,
  onOpenChange,
}: LeaveApprovalWorkflowDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      approvalLevel: "single",
      defaultApprover: "",
      escalationTimeline: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Leave Approval Workflow Settings:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leave Approval Workflow</DialogTitle>
          <DialogDescription>
            Configure approval workflow settings for leave applications.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Approval Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="approvalLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approval Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select approval level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single-level approval</SelectItem>
                          <SelectItem value="multi">Multi-level approval</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultApprover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Approver</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select default approver" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="direct-manager">Direct Manager</SelectItem>
                          <SelectItem value="hr-manager">HR Manager</SelectItem>
                          <SelectItem value="department-head">Department Head</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="escalationTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escalation Timeline (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter number of days"
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
