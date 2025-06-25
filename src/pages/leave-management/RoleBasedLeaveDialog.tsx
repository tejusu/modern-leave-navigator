
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  applicableDesignations: z.array(z.string()).min(1, "Select at least one designation"),
  applicableDepartments: z.array(z.string()).min(1, "Select at least one department"),
  templateApplication: z.enum(["group", "designation"]),
});

const designations = [
  "Software Engineer",
  "Senior Software Engineer",
  "Team Lead",
  "Project Manager",
  "HR Manager",
  "Finance Manager",
];

const departments = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
];

interface RoleBasedLeaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleBasedLeaveDialog({
  open,
  onOpenChange,
}: RoleBasedLeaveDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicableDesignations: [],
      applicableDepartments: [],
      templateApplication: "group",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Role-Based Leave Rules Settings:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Role-Based Leave Rules</DialogTitle>
          <DialogDescription>
            Configure leave rules based on employee roles and departments.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Applicable Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="applicableDesignations"
                  render={() => (
                    <FormItem>
                      <FormLabel>Applicable Designations</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {designations.map((designation) => (
                          <FormField
                            key={designation}
                            control={form.control}
                            name="applicableDesignations"
                            render={({ field }) => (
                              <FormItem
                                key={designation}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(designation)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, designation])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== designation)
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {designation}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicableDepartments"
                  render={() => (
                    <FormItem>
                      <FormLabel>Applicable Departments</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {departments.map((department) => (
                          <FormField
                            key={department}
                            control={form.control}
                            name="applicableDepartments"
                            render={({ field }) => (
                              <FormItem
                                key={department}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(department)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, department])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== department)
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {department}
                                </FormLabel>
                              </FormItem>
                            )}
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
                <CardTitle className="text-lg">Template Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="templateApplication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apply Templates per</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template application method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="group">Group</SelectItem>
                          <SelectItem value="designation">Designation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
