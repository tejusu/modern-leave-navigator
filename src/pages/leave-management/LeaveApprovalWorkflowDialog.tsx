
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const approvalLevelSchema = z.object({
  approver: z.string().min(1, "Approver is required"),
  escalationDays: z.coerce.number().int().min(1).max(30).default(3),
});

const formSchema = z.object({
  approvalType: z.enum(["single", "multi"]),
  singleLevelApprover: z.string().optional(),
  backupApprover: z.string().optional(),
  singleEscalationDays: z.coerce.number().int().min(1).max(30).default(3),
  multiLevelApprovals: z.array(approvalLevelSchema).min(1),
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
      approvalType: "single",
      singleLevelApprover: "reporting-manager",
      backupApprover: "",
      singleEscalationDays: 3,
      multiLevelApprovals: [
        { approver: "reporting-manager", escalationDays: 3 },
        { approver: "department-head", escalationDays: 3 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "multiLevelApprovals",
  });

  const watchApprovalType = form.watch("approvalType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Leave Approval Workflow Settings:", values);
    toast.success("Approval workflow settings saved successfully!");
    onOpenChange(false);
  };

  const approverOptions = [
    { value: "reporting-manager", label: "Reporting Manager" },
    { value: "department-head", label: "Department Head" },
    { value: "hr-manager", label: "HR Manager" },
    { value: "project-manager", label: "Project Manager" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <CardTitle className="text-lg">Approval Level</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="approvalType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Approval Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select approval type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single-Level Approval</SelectItem>
                          <SelectItem value="multi">Multi-Level Approval</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchApprovalType === "single" && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-base">Single-Level Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="singleLevelApprover"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Approver</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select primary approver" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {approverOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Auto-detected from the system (Reporting Manager is default)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="backupApprover"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Backup Approver (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select backup approver" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">None</SelectItem>
                                {approverOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="singleEscalationDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Escalate if no action in (days)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="30"
                                placeholder="Enter number of days"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Number of days to wait before escalating to backup approver
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {watchApprovalType === "multi" && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-base">Multi-Level Configuration</CardTitle>
                      <CardDescription>
                        Define the approval chain with escalation timelines
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-4 p-4 border rounded-lg">
                          <div className="font-medium text-sm pt-2.5 whitespace-nowrap min-w-[60px]">
                            Level {index + 1}
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`multiLevelApprovals.${index}.approver`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                {index === 0 && <FormLabel>Approver</FormLabel>}
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select approver" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {approverOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`multiLevelApprovals.${index}.escalationDays`}
                            render={({ field }) => (
                              <FormItem className="w-32">
                                {index === 0 && <FormLabel>Days</FormLabel>}
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    max="30"
                                    placeholder="3"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 1}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ approver: "", escalationDays: 3 })}
                        className="mt-4"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Approval Level
                      </Button>
                    </CardContent>
                  </Card>
                )}
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
