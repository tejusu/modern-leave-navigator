
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const sandwichPolicySchema = z.object({
  enabled: z.boolean().default(true),
  advanceNoticeDays: z.coerce.number().int().min(1).max(30).default(14),
  countSandwichDays: z.boolean().default(true),
  allowWfhEarlyApplication: z.boolean().default(true),
  blockWfhLateApplication: z.boolean().default(true),
});

type SandwichPolicyFormValues = z.infer<typeof sandwichPolicySchema>;

interface SandwichLeavePolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
    countSandwichDays: true,
    allowWfhEarlyApplication: true,
    blockWfhLateApplication: true,
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
                  <FormField
                    control={form.control}
                    name="advanceNoticeDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Advance Notice Requirement (Days)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="30" {...field} />
                        </FormControl>
                        <FormDescription>
                          Minimum days in advance employees must apply to avoid sandwich day penalties
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="allowWfhEarlyApplication"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Allow WFH (Early Application)</FormLabel>
                            <FormDescription className="text-xs">
                              Allow WFH when applied {watchedValues.advanceNoticeDays}+ days in advance
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
                            <FormLabel>Block WFH (Late Application)</FormLabel>
                            <FormDescription className="text-xs">
                              Block WFH when applied less than {watchedValues.advanceNoticeDays} days in advance
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
                </>
              )}
            </form>
          </Form>

          {watchedValues.enabled && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Policy Examples</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Early Application (≥{watchedValues.advanceNoticeDays} days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <Badge variant="secondary">Leave ✓</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <Badge variant="outline">Weekend (Not Counted)</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <Badge variant="outline">Weekend (Not Counted)</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <Badge variant="secondary">Leave ✓</Badge>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      Total: 2 days counted | WFH allowed
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Late Application (&lt;{watchedValues.advanceNoticeDays} days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <Badge variant="destructive">Leave</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <Badge variant="destructive">Counted as Leave</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <Badge variant="destructive">Counted as Leave</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <Badge variant="destructive">Leave</Badge>
                      </div>
                    </div>
                    <div className="text-xs text-red-600 font-medium">
                      Total: 4 days counted | WFH blocked
                    </div>
                  </CardContent>
                </Card>
              </div>
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
