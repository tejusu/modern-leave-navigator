
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Plus, ArrowDown, Clock, User } from "lucide-react";
import { toast } from "sonner";

const approvalLevelSchema = z.object({
  name: z.string().min(1, "Level name is required"),
  approver: z.string().min(1, "Approver is required"),
  escalationDays: z.coerce.number().int().min(1).max(30).default(3),
  mandatoryApproval: z.boolean().default(true),
  allowDelegation: z.boolean().default(false),
});

const formSchema = z.object({
  approvalType: z.enum(["single", "multi"]),
  singleLevelApprover: z.string().optional(),
  backupApprover: z.string().optional(),
  singleEscalationDays: z.coerce.number().int().min(1).max(30).default(3),
  multiLevelApprovals: z.array(approvalLevelSchema).min(1),
  enableAutoEscalation: z.boolean().default(true),
  enableParallelApproval: z.boolean().default(false),
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
        { 
          name: "Primary Approval", 
          approver: "reporting-manager", 
          escalationDays: 3, 
          mandatoryApproval: true,
          allowDelegation: false 
        },
        { 
          name: "Secondary Approval", 
          approver: "department-head", 
          escalationDays: 3, 
          mandatoryApproval: true,
          allowDelegation: false 
        },
      ],
      enableAutoEscalation: true,
      enableParallelApproval: false,
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
    { value: "reporting-manager", label: "Reporting Manager", icon: User },
    { value: "department-head", label: "Department Head", icon: User },
    { value: "hr-manager", label: "HR Manager", icon: User },
    { value: "project-manager", label: "Project Manager", icon: User },
    { value: "admin", label: "Admin", icon: User },
    { value: "skip-level-manager", label: "Skip Level Manager", icon: User },
    { value: "finance-head", label: "Finance Head", icon: User },
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
                <CardDescription>
                  Configure how leave applications are approved in your organization
                </CardDescription>
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
                      <CardDescription>
                        Define a single approver with optional backup for leave applications
                      </CardDescription>
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
                      <CardTitle className="text-base flex items-center gap-2">
                        <ArrowDown className="h-4 w-4" />
                        Multi-Level Configuration
                      </CardTitle>
                      <CardDescription>
                        Design the approval chain with escalation timelines and delegation options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Global Settings */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                        <FormField
                          control={form.control}
                          name="enableAutoEscalation"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-y-0">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">Auto Escalation</FormLabel>
                                <FormDescription className="text-xs">
                                  Automatically escalate if no response
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="enableParallelApproval"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-y-0">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">Parallel Approval</FormLabel>
                                <FormDescription className="text-xs">
                                  Allow multiple approvers at same level
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Approval Levels */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Approval Chain</h4>
                          <Badge variant="outline">{fields.length} Level{fields.length > 1 ? 's' : ''}</Badge>
                        </div>
                        
                        {fields.map((field, index) => (
                          <Card key={field.id} className="relative">
                            <CardContent className="p-4">
                              <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                                {index + 1}
                              </div>
                              
                              <div className="ml-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`multiLevelApprovals.${index}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm">Level Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g., Primary Approval" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name={`multiLevelApprovals.${index}.approver`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm">Approver Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select approver role" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {approverOptions.map((option) => (
                                              <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                  <option.icon className="h-4 w-4" />
                                                  {option.label}
                                                </div>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                  <FormField
                                    control={form.control}
                                    name={`multiLevelApprovals.${index}.escalationDays`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-sm flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          Escalation Time (Days)
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            min="1"
                                            max="30"
                                            placeholder="3"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormDescription className="text-xs">
                                          Auto-escalate if no response within this period
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name={`multiLevelApprovals.${index}.mandatoryApproval`}
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-center justify-between space-y-0 p-3 border rounded-md">
                                        <div className="space-y-0.5">
                                          <FormLabel className="text-xs font-medium">Mandatory</FormLabel>
                                          <FormDescription className="text-xs">
                                            Required approval
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name={`multiLevelApprovals.${index}.allowDelegation`}
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-center justify-between space-y-0 p-3 border rounded-md">
                                        <div className="space-y-0.5">
                                          <FormLabel className="text-xs font-medium">Delegation</FormLabel>
                                          <FormDescription className="text-xs">
                                            Allow delegation
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                <div className="flex justify-end">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    disabled={fields.length <= 1}
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove Level
                                  </Button>
                                </div>
                              </div>
                              
                              {index < fields.length - 1 && (
                                <div className="absolute -bottom-3 left-3 w-6 h-6 flex items-center justify-center">
                                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ 
                          name: `Level ${fields.length + 1}`, 
                          approver: "", 
                          escalationDays: 3,
                          mandatoryApproval: true,
                          allowDelegation: false
                        })}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Approval Level
                      </Button>
                      
                      {/* Workflow Preview */}
                      <Card className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-sm">Workflow Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-xs text-muted-foreground leading-relaxed">
                            <strong>Sample workflow text:</strong><br/>
                            "Multi-level approval requires sequential approval from {fields.length} level{fields.length > 1 ? 's' : ''}:
                            {fields.map((field, index) => {
                              const levelData = form.getValues(`multiLevelApprovals.${index}`);
                              return ` Level ${index + 1} - ${levelData.name || 'Unnamed'} (${levelData.escalationDays} days timeout)${index < fields.length - 1 ? ',' : '.'}`;
                            }).join('')}
                            {form.watch('enableAutoEscalation') && ' Auto-escalation is enabled.'}
                            {form.watch('enableParallelApproval') && ' Parallel approval is allowed at each level.'}
                            "
                          </div>
                        </CardContent>
                      </Card>
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
