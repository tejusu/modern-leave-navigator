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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PlusCircle, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Updated schema to match your exact specifications
const leaveTypeSchema = z.object({
  // Basic Information
  name: z.string()
    .min(1, "Leave type name is required")
    .max(50, "Leave type name cannot exceed 50 characters"),
  description: z.string()
    .max(250, "Description cannot exceed 250 characters")
    .optional(),
  paidType: z.enum(["Paid", "Unpaid"], {
    required_error: "Please select paid/unpaid type",
  }),
  entitlement: z.coerce.number()
    .int("Must be a whole number")
    .positive("Entitlement must be a positive number")
    .max(365, "Entitlement cannot exceed 365 days"),
  entitlementUnit: z.enum(["Days", "Weeks"], {
    required_error: "Please select entitlement unit",
  }),
  entitlementPeriod: z.enum(["Annual", "Bi-Annual", "Monthly", "One-Time"], {
    required_error: "Please select entitlement period",
  }),
  
  // Accrual & Eligibility Rules
  accrual: z.coerce.number()
    .min(0, "Accrual must be 0 or more")
    .optional(),
  accrualPeriod: z.enum(["Monthly", "Yearly"]).optional(),
  minimumService: z.coerce.number()
    .int("Must be a whole number")
    .min(0, "Minimum service must be 0 or more")
    .optional(),
  genderEligibility: z.enum(["All", "Male", "Female"]).default("All"),
  
  // Carry Forward & Encashment
  carryForwardAllowed: z.boolean().default(false),
  carryForwardLimit: z.coerce.number()
    .int("Must be a whole number")
    .min(0, "Carry forward limit must be 0 or more")
    .optional(),
  encashmentAllowed: z.boolean().default(false),
  maxEncashmentDays: z.coerce.number()
    .int("Must be a whole number")
    .min(0, "Max encashment days must be 0 or more")
    .optional(),
  
  // Application Rules
  advanceNotice: z.coerce.number()
    .int("Must be a whole number")
    .min(0, "Advance notice must be 0 or more days")
    .optional(),
}).refine((data) => {
  // Carry forward limit required if carry forward is allowed
  if (data.carryForwardAllowed && (data.carryForwardLimit === undefined || data.carryForwardLimit === 0)) {
    return false;
  }
  return true;
}, {
  message: "Carry forward limit is required when carry forward is allowed",
  path: ["carryForwardLimit"],
}).refine((data) => {
  // Max encashment days required if encashment is allowed
  if (data.encashmentAllowed && (data.maxEncashmentDays === undefined || data.maxEncashmentDays === 0)) {
    return false;
  }
  return true;
}, {
  message: "Max encashment days is required when encashment is allowed",
  path: ["maxEncashmentDays"],
}).refine((data) => {
  // Max encashment days must be ≤ 50% of entitlement days
  if (data.encashmentAllowed && data.maxEncashmentDays && data.maxEncashmentDays > (data.entitlement * 0.5)) {
    return false;
  }
  return true;
}, {
  message: "Max encashment days must be ≤ 50% of entitlement days",
  path: ["maxEncashmentDays"],
}).refine((data) => {
  // Accrual period required if accrual > 0
  if (data.accrual && data.accrual > 0 && !data.accrualPeriod) {
    return false;
  }
  return true;
}, {
  message: "Accrual period is required when accrual is greater than 0",
  path: ["accrualPeriod"],
});

type LeaveTypeFormValues = z.infer<typeof leaveTypeSchema>;

interface AddLeaveTypeDialogProps {
  onSave: (data: any) => void;
}

export function AddLeaveTypeDialog({ onSave }: AddLeaveTypeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<LeaveTypeFormValues | null>(null);
  const [openSections, setOpenSections] = useState({
    basic: true,
    accrual: false,
    carryForward: false,
    application: false,
  });

  const form = useForm<LeaveTypeFormValues>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      paidType: "Paid",
      entitlement: undefined,
      entitlementUnit: "Days",
      entitlementPeriod: "Annual",
      accrual: undefined,
      accrualPeriod: undefined,
      minimumService: undefined,
      genderEligibility: "All",
      carryForwardAllowed: false,
      carryForwardLimit: undefined,
      encashmentAllowed: false,
      maxEncashmentDays: undefined,
      advanceNotice: undefined,
    },
    mode: "onChange", // Enable real-time validation
  });

  const watchCarryForwardAllowed = form.watch("carryForwardAllowed");
  const watchEncashmentAllowed = form.watch("encashmentAllowed");
  const watchAccrual = form.watch("accrual");

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  function handleFormSubmit(data: LeaveTypeFormValues) {
    setFormData(data);
    setShowConfirmation(true);
  }

  function confirmSave() {
    if (!formData) return;
    
    // Transform data to match the expected interface
    const transformedData = {
      name: formData.name,
      description: formData.description,
      paidType: formData.paidType,
      maxDays: formData.entitlement,
      entitlementUnit: formData.entitlementUnit,
      entitlementPeriod: formData.entitlementPeriod,
      accrual: formData.accrual,
      accrualPeriod: formData.accrualPeriod,
      minimumService: formData.minimumService,
      genderEligibility: formData.genderEligibility,
      carryForward: formData.carryForwardAllowed,
      carryForwardMaxDays: formData.carryForwardLimit,
      encashable: formData.encashmentAllowed,
      maxEncashmentDays: formData.maxEncashmentDays,
      noticePeriod: formData.advanceNotice || 0,
      isActive: true,
    };
    
    onSave(transformedData);
    form.reset();
    setIsOpen(false);
    setShowConfirmation(false);
    setFormData(null);
    toast.success("Leave Type successfully added.");
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Leave Type
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add New Leave Type</DialogTitle>
            <DialogDescription>
              Define a new leave type with all necessary configurations. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                
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
                            1. Basic Information
                            <span className="text-xs text-destructive">*Required</span>
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
                                  <Input placeholder="Earned Leave" maxLength={50} {...field} />
                                </FormControl>
                                <FormDescription>
                                  Maximum 50 characters
                                </FormDescription>
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
                                  maxLength={250}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Optional, maximum 250 characters
                              </FormDescription>
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
                                  <Input 
                                    type="number" 
                                    placeholder="10" 
                                    min="1" 
                                    max="365"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  1-365 days
                                </FormDescription>
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
                                    <SelectItem value="Bi-Annual">Bi-Annual</SelectItem>
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
                          <CardTitle className="text-lg">2. Accrual & Eligibility Rules</CardTitle>
                          {openSections.accrual ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="accrual"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Accrual (leave per period)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    step="0.1" 
                                    placeholder="0.8" 
                                    min="0"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Decimal values accepted, positive only
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="accrualPeriod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Accrual Period</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  value={field.value}
                                  disabled={!watchAccrual || watchAccrual <= 0}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select accrual period" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                    <SelectItem value="Yearly">Yearly</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Required if accrual &gt; 0
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="minimumService"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Minimum Service (Months)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="3" 
                                    min="0"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Positive integer only
                                </FormDescription>
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
                                <FormDescription>
                                  Defaults to All
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

                {/* Carry Forward & Encashment Section */}
                <Card>
                  <Collapsible 
                    open={openSections.carryForward} 
                    onOpenChange={() => toggleSection('carryForward')}
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">3. Carry Forward & Encashment</CardTitle>
                          {openSections.carryForward ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Carry Forward */}
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
                                        Allow unused leave to be carried forward
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
                                    <FormLabel>Carry Forward Limit *</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="5" 
                                        min="1"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Required when carry forward is enabled
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>

                          {/* Encashment */}
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
                                        Allow employees to encash unused leave
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            {watchEncashmentAllowed && (
                              <FormField
                                control={form.control}
                                name="maxEncashmentDays"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Max Encashment Leave Days *</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        placeholder="5" 
                                        min="1"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormDescription>
                                       Must be ≤ 50% of entitlement days
                                     </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
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
                          <CardTitle className="text-lg">4. Application Rules</CardTitle>
                          {openSections.application ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="advanceNotice"
                          render={({ field }) => (
                            <FormItem className="md:w-1/3">
                              <FormLabel>Advance Notice (Days)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="3" 
                                  min="0"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Positive integer only
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t sticky bottom-0 bg-background">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsOpen(false)} 
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save Leave Type
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Save</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save this leave type? Once saved, it will be available for employees to use.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmation(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>
              Save Leave Type
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}