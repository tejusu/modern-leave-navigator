
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Clock, AlertTriangle, CheckCircle, Info, Home } from "lucide-react";

const sandwichPolicySchema = z.object({
  enabled: z.boolean().default(true),
  advanceNoticeDays: z.coerce.number().int().min(1).max(30).default(14),
  applicableLeaveTypes: z.array(z.string()).min(1, "Select at least one leave type"),
  allowWfhEarlyApplication: z.boolean().default(true),
  blockWfhLateApplication: z.boolean().default(true),
  countSandwichDays: z.boolean().default(true),
});

type SandwichPolicyFormValues = z.infer<typeof sandwichPolicySchema>;

interface SandwichLeavePolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const leaveTypes = [
  { id: "casual-leave", label: "Casual Leave" },
  { id: "sick-leave", label: "Sick Leave" },
  { id: "wfh", label: "Work From Home" },
  { id: "personal-leave", label: "Personal Leave" },
];

const getSandwichPolicySettings = (): SandwichPolicyFormValues => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("sandwichLeavePolicy");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse sandwich leave policy from localStorage", e);
      }
    }
  }
  return {
    enabled: true,
    advanceNoticeDays: 14,
    applicableLeaveTypes: ["casual-leave", "sick-leave", "wfh"],
    allowWfhEarlyApplication: true,
    blockWfhLateApplication: true,
    countSandwichDays: true,
  };
};

const saveSandwichPolicySettings = (settings: SandwichPolicyFormValues) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("sandwichLeavePolicy", JSON.stringify(settings));
  }
};

export function SandwichLeavePolicyDialog({ open, onOpenChange }: SandwichLeavePolicyDialogProps) {
  const form = useForm<SandwichPolicyFormValues>({
    resolver: zodResolver(sandwichPolicySchema),
    defaultValues: getSandwichPolicySettings(),
  });

  useEffect(() => {
    if (open) {
      form.reset(getSandwichPolicySettings());
    }
  }, [open, form]);

  function onSubmit(data: SandwichPolicyFormValues) {
    saveSandwichPolicySettings(data);
    toast.success("Sandwich Leave Policy Updated", {
      description: "Your sandwich leave policy settings have been saved successfully.",
    });
    onOpenChange(false);
  }

  const watchedValues = form.watch();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sandwich Leave Policy</DialogTitle>
          <DialogDescription>
            Configure rules for leave applications before and after weekends or holidays.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="sandwich-policy-form" className="space-y-6">
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Sandwich Leave Policy</FormLabel>
                      <FormDescription>
                        Activate sandwich leave rules for your organization
                      </FormDescription>
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

              {watchedValues.enabled && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Leave Type Applicability</CardTitle>
                      <CardDescription>
                        Apply policy to the following leave types
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="applicableLeaveTypes"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-2 gap-4">
                              {leaveTypes.map((leaveType) => (
                                <FormField
                                  key={leaveType.id}
                                  control={form.control}
                                  name="applicableLeaveTypes"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={leaveType.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(leaveType.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, leaveType.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== leaveType.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {leaveType.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <FormField
                    control={form.control}
                    name="advanceNoticeDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum days in advance to avoid sandwich leave penalty</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="30" {...field} />
                        </FormControl>
                        <FormDescription>
                          Default: 14 days. Employees must apply at least this many days in advance to avoid penalties.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Work From Home Conditions</CardTitle>
                      <CardDescription>
                        Configure WFH behavior based on application timing
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="allowWfhEarlyApplication"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Allow Work From Home when applied in advance
                              </FormLabel>
                              <FormDescription className="text-xs">
                                WFH is allowed when applied ≥{watchedValues.advanceNoticeDays} days in advance
                              </FormDescription>
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
                        name="blockWfhLateApplication"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Block WFH when applied late</FormLabel>
                              <FormDescription className="text-xs">
                                WFH will be blocked if applied less than {watchedValues.advanceNoticeDays} days in advance
                              </FormDescription>
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Weekend/Holiday Behavior</CardTitle>
                      <CardDescription>
                        Auto-applied by system (non-editable rules)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            <strong>Early Application (≥{watchedValues.advanceNoticeDays} days):</strong> Only actual leave days are counted
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">
                            <strong>Late Application (&lt;{watchedValues.advanceNoticeDays} days):</strong> Weekends/holidays are counted as leave
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </form>
          </Form>

          {watchedValues.enabled && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Policy Examples</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Early Application (≥{watchedValues.advanceNoticeDays} days)
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Employee applies for Friday and Monday leave 15 days in advance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">Thursday</span>
                        <Badge variant="outline">Working Day</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="font-medium">Friday</span>
                        <Badge className="bg-green-100 text-green-800">Leave (0.5 days)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="font-medium">Saturday</span>
                        <Badge variant="secondary">Weekend (Not Counted)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="font-medium">Sunday</span>
                        <Badge variant="secondary">Weekend (Not Counted)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="font-medium">Monday</span>
                        <Badge className="bg-green-100 text-green-800">Leave (0.5 days)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">Tuesday</span>
                        <Badge variant="outline">Working Day</Badge>
                      </div>
                    </div>
                    <div className="text-xs font-medium p-2 bg-green-100 text-green-800 rounded">
                      ✅ Total: 1.0 days counted | WFH allowed during weekends
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Late Application (&lt;{watchedValues.advanceNoticeDays} days)
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Employee applies for Friday and Monday leave 5 days in advance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">Thursday</span>
                        <Badge variant="outline">Working Day</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="font-medium">Friday</span>
                        <Badge className="bg-red-100 text-red-800">Leave (0.5 days)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="font-medium">Saturday</span>
                        <Badge className="bg-red-100 text-red-800">Counted as Leave (0.5 days)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="font-medium">Sunday</span>
                        <Badge className="bg-red-100 text-red-800">Counted as Leave (0.5 days)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="font-medium">Monday</span>
                        <Badge className="bg-red-100 text-red-800">Leave (0.5 days)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">Tuesday</span>
                        <Badge variant="outline">Working Day</Badge>
                      </div>
                    </div>
                    <div className="text-xs font-medium p-2 bg-red-100 text-red-800 rounded">
                      ❌ Total: 2.0 days counted | WFH blocked during weekends
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    Key Policy Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span>Sandwich leave penalties only apply to selected leave types</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span>WFH permissions are automatically managed based on application timing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span>Weekend/holiday counting is system-controlled and cannot be manually overridden</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span>Advance notice period can be customized between 1-30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="submit" form="sandwich-policy-form">
            Save Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
