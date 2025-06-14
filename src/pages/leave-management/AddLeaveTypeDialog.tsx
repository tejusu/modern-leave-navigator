
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
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const leaveTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  maxDays: z.coerce.number().int().positive("Max days must be a positive number"),
  accrual: z.enum(["Monthly", "Yearly"]),
  carryForward: z.boolean().default(false),
  encashment: z.boolean().default(false),
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
      encashment: false,
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
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Leave Type</DialogTitle>
          <DialogDescription>
            Define a new leave type available to employees.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input type="number" placeholder="e.g., 15" {...field} />
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
                        <div>
                            <FormLabel>Carry Forward</FormLabel>
                            <FormDescription>Allow unused leave to be carried over to the next year.</FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                    </FormItem>
                )}
                />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <FormField
                control={form.control}
                name="encashment"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between w-full">
                        <div>
                            <FormLabel>Encashment</FormLabel>
                            <FormDescription>Allow unused leave to be encashed at year-end.</FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                    </FormItem>
                )}
                />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Leave Type</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
