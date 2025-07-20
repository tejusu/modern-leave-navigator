
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PlusCircle, Check, X, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const categoryOptions = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contractor", label: "Contractor" },
  { id: "intern", label: "Intern" },
];

const leaveTypeSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Leave type name is required"),
  description: z.string().optional(),
  paidType: z.enum(["Paid", "Unpaid"], {
    required_error: "Please select paid/unpaid type",
  }),
  entitlement: z.coerce.number().int().positive("Entitlement must be a positive number"),
  entitlementUnit: z.enum(["Days", "Weeks"], {
    required_error: "Please select entitlement unit",
  }),
  entitlementPeriod: z.enum(["Annual", "Monthly", "One-Time"], {
    required_error: "Please select entitlement period",
  }),
  
  // Accrual & Eligibility Rules
  monthlyAccrual: z.coerce.number().min(0, "Monthly accrual must be 0 or more").optional(),
  minimumService: z.coerce.number().int().min(0, "Minimum service must be 0 or more").optional(),
  genderEligibility: z.enum(["All", "Male", "Female"]).default("All"),
  
  // Carry Forward & Encashment
  carryForwardAllowed: z.boolean().default(true),
  carryForwardLimit: z.coerce.number().int().min(0, "Carry forward limit must be 0 or more").optional(),
  encashmentAllowed: z.boolean().default(false),
  
  // Application Rules
  advanceNotice: z.coerce.number().int().min(0, "Advance notice must be 0 or more days").optional(),
  maxConsecutiveDays: z.coerce.number().int().min(0, "Max consecutive days must be 0 or more").optional(),
  allowedIntervals: z.coerce.number().int().min(0, "Allowed intervals must be 0 or more").optional(),
  
  categoryApplicability: z.array(z.string()).min(1, "Please select at least one category"),
}).refine((data) => {
  if (data.carryForwardAllowed && !data.carryForwardLimit) {
    return false;
  }
  return true;
}, {
  message: "Carry forward limit is required when carry forward is allowed",
  path: ["carryForwardLimit"],
});

type LeaveTypeFormValues = z.infer<typeof leaveTypeSchema>;

interface AddLeaveTypeDialogProps {
  onSave: (data: LeaveTypeFormValues) => void;
}

export function AddLeaveTypeDialog({ onSave }: AddLeaveTypeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    basic: true,
    accrual: true,
    carryForward: true,
    application: true,
  });

  const form = useForm<LeaveTypeFormValues>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      paidType: "Paid",
      entitlement: 1,
      entitlementUnit: "Days",
      entitlementPeriod: "Annual",
      monthlyAccrual: 0,
      minimumService: 0,
      genderEligibility: "All",
      carryForwardAllowed: true,
      carryForwardLimit: 0,
      encashmentAllowed: false,
      advanceNotice: 0,
      maxConsecutiveDays: 0,
      allowedIntervals: 0,
      categoryApplicability: [],
    },
  });

  const watchCarryForwardAllowed = form.watch("carryForwardAllowed");
  const watchEncashmentAllowed = form.watch("encashmentAllowed");

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  function onSubmit(data: LeaveTypeFormValues) {
    // Transform data to match the expected interface
    const transformedData = {
      name: data.name,
      maxDays: data.entitlement,
      accrual: "Monthly" as const, // Default to Monthly for now
      carryForward: data.carryForwardAllowed,
      carryForwardMaxDays: data.carryForwardLimit,
      encashable: data.encashmentAllowed,
      encashmentLimit: undefined, // Not included in new schema
      noticePeriod: data.advanceNotice || 0,
      categoryApplicability: data.categoryApplicability,
    };
    
    onSave(transformedData);
    form.reset();
    setIsOpen(false);
    toast.success("Leave Type successfully added.");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add New Leave Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Leave Type</DialogTitle>
          <DialogDescription>
            Define a new leave type with all necessary configurations organized in collapsible sections.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Basic Information Section */}
              <Card>
                <Collapsible 
                  open={openSections.basic} 
                  onOpenChange={() => toggleSection('basic')}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          Basic Information
                          <span className="text-xs text-red-500">*Required</span>
                        </CardTitle>
                        {openSections.basic ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Leave Type Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Earned Leave" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="paidType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Paid / Unpaid *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Paid">Paid</SelectItem>
                                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Planned leave for full-time employees as per statutory norms." 
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="entitlement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Entitlement (Days) *</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="entitlementUnit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Entitlement Unit *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Days">Days</SelectItem>
                                  <SelectItem value="Weeks">Weeks</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="entitlementPeriod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Entitlement Period *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select period" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Annual">Annual</SelectItem>
                                  <SelectItem value="Monthly">Monthly</SelectItem>
                                  <SelectItem value="One-Time">One-Time</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Accrual & Eligibility Rules Section */}
              <Card>
                <Collapsible 
                  open={openSections.accrual} 
                  onOpenChange={() => toggleSection('accrual')}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Accrual & Eligibility Rules</CardTitle>
                        {openSections.accrual ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="monthlyAccrual"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Accrual</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder="0.5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="minimumService"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Service (Months)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="3" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="genderEligibility"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender Eligibility</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select eligibility" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="All">All</SelectItem>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Carry Forward & Encashment Section */}
              <Card>
                <Collapsible 
                  open={openSections.carryForward} 
                  onOpenChange={() => toggleSection('carryForward')}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Carry Forward & Encashment</CardTitle>
                        {openSections.carryForward ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <FormField
                              control={form.control}
                              name="carryForwardAllowed"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between w-full">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Carry Forward Allowed</FormLabel>
                                    <FormDescription>
                                      Allow unused leave to be carried over to the next year.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          {watchCarryForwardAllowed && (
                            <FormField
                              control={form.control}
                              name="carryForwardLimit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Carry Forward Limit</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="5" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Maximum number of days that can be carried forward.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <FormField
                              control={form.control}
                              name="encashmentAllowed"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between w-full">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Encashment Allowed</FormLabel>
                                    <FormDescription>
                                      Allow employees to encash unused leave days.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Application Rules Section */}
              <Card>
                <Collapsible 
                  open={openSections.application} 
                  onOpenChange={() => toggleSection('application')}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Application Rules</CardTitle>
                        {openSections.application ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="advanceNotice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Advance Notice (Days)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="3" {...field} />
                              </FormControl>
                              <FormDescription>
                                Days in advance for leave request.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="maxConsecutiveDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Consecutive Days</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="3" {...field} />
                              </FormControl>
                              <FormDescription>
                                Maximum consecutive days allowed.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="allowedIntervals"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Allowed Intervals</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="2" {...field} />
                              </FormControl>
                              <FormDescription>
                                Number of allowed intervals per year.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Category Applicability Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Category Applicability
                    <span className="text-xs text-red-500">*Required</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="categoryApplicability"
                    render={() => (
                      <FormItem>
                        <FormDescription className="mb-4">
                          Select which employee categories can use this leave type.
                        </FormDescription>
                        <div className="grid grid-cols-2 gap-4">
                          {categoryOptions.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="categoryApplicability"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.label}
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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
