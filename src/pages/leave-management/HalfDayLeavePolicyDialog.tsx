
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Clock, CheckCircle, Info } from "lucide-react";

const halfDayPolicySchema = z.object({
  enabled: z.boolean().default(true),
  applicableLeaveTypes: z.array(z.string()).min(1, "Select at least one leave type"),
  firstHalfEnabled: z.boolean().default(true),
  secondHalfEnabled: z.boolean().default(true),
  deductionAmount: z.literal(0.5),
});

type HalfDayPolicyFormValues = z.infer<typeof halfDayPolicySchema>;

interface HalfDayLeavePolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const leaveTypes = [
  { id: "casual-leave", label: "Casual Leave" },
  { id: "sick-leave", label: "Sick Leave" },
  { id: "annual-leave", label: "Annual Leave" },
  { id: "personal-leave", label: "Personal Leave" },
];

const getHalfDayPolicySettings = (): HalfDayPolicyFormValues => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("halfDayLeavePolicy");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse half-day leave policy from localStorage", e);
      }
    }
  }
  return {
    enabled: true,
    applicableLeaveTypes: ["casual-leave", "sick-leave"],
    firstHalfEnabled: true,
    secondHalfEnabled: true,
    deductionAmount: 0.5,
  };
};

const saveHalfDayPolicySettings = (settings: HalfDayPolicyFormValues) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("halfDayLeavePolicy", JSON.stringify(settings));
  }
};

export function HalfDayLeavePolicyDialog({ open, onOpenChange }: HalfDayLeavePolicyDialogProps) {
  const form = useForm<HalfDayPolicyFormValues>({
    resolver: zodResolver(halfDayPolicySchema),
    defaultValues: getHalfDayPolicySettings(),
  });

  useEffect(() => {
    if (open) {
      form.reset(getHalfDayPolicySettings());
    }
  }, [open, form]);

  function onSubmit(data: HalfDayPolicyFormValues) {
    saveHalfDayPolicySettings(data);
    toast.success("Half-Day Leave Policy Updated", {
      description: "Your half-day leave policy settings have been saved successfully.",
    });
    onOpenChange(false);
  }

  const watchedValues = form.watch();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Half-Day Leave Policy</DialogTitle>
          <DialogDescription>
            Configure half-day leave options for different leave types and time slots.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="half-day-policy-form" className="space-y-6">
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Half-Day Leave</FormLabel>
                      <FormDescription>
                        Allow employees to apply for half-day leave for selected leave types
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
                      <CardTitle className="text-lg">Applicable Leave Types</CardTitle>
                      <CardDescription>
                        Select which leave types support half-day leave options
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Time Slot Configuration</CardTitle>
                      <CardDescription>
                        Define available time slots for half-day leave applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstHalfEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel>First Half</FormLabel>
                                <FormDescription className="text-xs">
                                  9:00 AM - 1:00 PM
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
                          name="secondHalfEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel>Second Half</FormLabel>
                                <FormDescription className="text-xs">
                                  2:00 PM - 6:00 PM
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
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Leave Balance Deduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                        <Info className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          <strong>0.5 days</strong> will be deducted from the employee's leave balance for each half-day leave application.
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </form>
          </Form>

          {watchedValues.enabled && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Application Example</h3>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Half-Day Leave Application Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>1. Employee selects leave type</span>
                      <Badge variant="outline">Casual Leave ✓</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>2. Half-day option appears</span>
                      <Badge variant="outline">Checkbox shown ✓</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>3. Time slot selection</span>
                      <Badge variant="outline">First/Second Half ✓</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span>4. Balance deduction</span>
                      <Badge className="bg-green-100 text-green-800">0.5 days ✓</Badge>
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
          <Button type="submit" form="half-day-policy-form">
            Save Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
