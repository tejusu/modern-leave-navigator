
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Check, X } from "lucide-react";
import { toast } from "sonner";

const categoryOptions = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contractor", label: "Contractor" },
  { id: "intern", label: "Intern" },
];

const leaveTypeSchema = z.object({
  name: z.string().min(1, "Leave type name is required"),
  maxDays: z.coerce.number().int().positive("Max days must be a positive number"),
  accrual: z.enum(["Monthly", "Yearly", "Manual"], {
    required_error: "Please select an accrual logic",
  }),
  carryForward: z.boolean().default(false),
  noticePeriod: z.coerce.number().int().min(0, "Notice period must be 0 or more days"),
  categoryApplicability: z.array(z.string()).min(1, "Please select at least one category"),
});

type LeaveTypeFormValues = z.infer<typeof leaveTypeSchema>;

interface AddLeaveTypeDialogProps {
  onSave: (data: LeaveTypeFormValues) => void;
}

export function AddLeaveTypeDialog({ onSave }: AddLeaveTypeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<LeaveTypeFormValues>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: "",
      maxDays: 0,
      accrual: "Monthly",
      carryForward: false,
      noticePeriod: 0,
      categoryApplicability: [],
    },
  });

  function onSubmit(data: LeaveTypeFormValues) {
    onSave(data);
    form.reset();
    setIsOpen(false);
    toast.success("Leave type added successfully!");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Leave Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Leave Type</DialogTitle>
          <DialogDescription>
            Define a new leave type available to employees.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leave Type Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Maternity Leave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Days per Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 26" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accrual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accrual Logic</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select accrual logic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between rounded-lg border p-4">
                <FormField
                  control={form.control}
                  name="carryForward"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between w-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Carry Forward</FormLabel>
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

              <FormField
                control={form.control}
                name="noticePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Period (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormDescription>
                      Number of days in advance employees must request this leave type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryApplicability"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Category Applicability</FormLabel>
                      <FormDescription>
                        Select which employee categories can use this leave type.
                      </FormDescription>
                    </div>
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

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Check className="h-4 w-4" />
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
