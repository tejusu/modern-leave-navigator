
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { Admin } from "@/lib/types";
import { ProfilePictureUpload } from "../ProfilePictureUpload";

const adminSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  department: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  role: z.enum(["Admin Only", "Employee + Admin"]).default("Admin Only"),
  avatar: z.string().optional(),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface AddAdminFormProps {
  onSubmit: (data: Omit<Admin, "adminId">) => void;
}

export function AddAdminForm({ onSubmit }: AddAdminFormProps) {
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      status: "Active",
      role: "Admin Only",
      avatar: "",
    },
  });

  const handleSubmit = (values: AdminFormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4 pb-6 border-b">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Profile Picture (Optional)</FormLabel>
                <FormControl>
                  <ProfilePictureUpload
                    value={field.value}
                    onChange={field.onChange}
                    size="md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. john.doe@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. +1 234 567 890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department / Team</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Human Resources" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select admin role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin Only">Admin Only</SelectItem>
                    <SelectItem value="Employee + Admin">Employee + Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Status</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Set the admin access status
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === "Active"}
                    onCheckedChange={(checked) => 
                      field.onChange(checked ? "Active" : "Inactive")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Create Admin
          </Button>
        </div>
      </form>
    </Form>
  );
}
