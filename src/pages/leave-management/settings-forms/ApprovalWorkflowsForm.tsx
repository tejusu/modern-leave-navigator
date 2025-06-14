
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const approvalWorkflowSchema = z.object({
  multiLevelApproval: z.boolean(),
  workflows: z.array(
    z.object({
      approverRole: z.string().min(1, "Approver role is required"),
    })
  ),
});

type ApprovalWorkflowFormValues = z.infer<typeof approvalWorkflowSchema>;

export function ApprovalWorkflowsForm({ onSave }: { onSave: () => void }) {
  const form = useForm<ApprovalWorkflowFormValues>({
    resolver: zodResolver(approvalWorkflowSchema),
    defaultValues: {
      multiLevelApproval: true,
      workflows: [{ approverRole: "reporting_manager" }, { approverRole: "hr_manager" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workflows",
  });

  const watchMultiLevel = form.watch("multiLevelApproval");

  function onSubmit(data: ApprovalWorkflowFormValues) {
    toast.success("Approval workflow saved successfully!");
    console.log("Approval workflow saved:", data);
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="approval-workflows-form" className="space-y-6">
        <FormField
          control={form.control}
          name="multiLevelApproval"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Multi-level Approval</FormLabel>
                <FormDescription>
                  Enable to set up sequential approval from multiple stakeholders.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {watchMultiLevel && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approval Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-4">
                    <div className="font-medium text-sm pt-2.5 whitespace-nowrap">Level {index + 1}</div>
                    <FormField
                      control={form.control}
                      name={`workflows.${index}.approverRole`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {index === 0 && <FormLabel>Approver Role</FormLabel>}
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select approver role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="reporting_manager">Reporting Manager</SelectItem>
                              <SelectItem value="department_head">Department Head</SelectItem>
                              <SelectItem value="hr_manager">HR Manager</SelectItem>
                              <SelectItem value="project_manager">Project Manager</SelectItem>
                            </SelectContent>
                          </Select>
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
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => append({ approverRole: "" })}
              >
                Add Approval Level
              </Button>
            </CardContent>
          </Card>
        )}
      </form>
    </Form>
  );
}
