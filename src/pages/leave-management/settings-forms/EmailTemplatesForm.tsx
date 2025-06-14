
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

const emailTemplatesSchema = z.object({
  templateName: z.string(),
  subject: z.string().min(1, "Subject is required."),
  body: z.string().min(1, "Body is required."),
});

type EmailTemplatesFormValues = z.infer<typeof emailTemplatesSchema>;

const templates: Record<string, { subject: string; body: string }> = {
  "leave-application": {
    subject: "Leave Application Received - {employee_name}",
    body: "Hi Team,\n\nThis is to inform you that {employee_name} has applied for {leave_type} from {start_date} to {end_date}.\n\nRegards,\nHR Team",
  },
  "leave-approval": {
    subject: "Your leave has been approved",
    body: "Hi {employee_name},\n\nYour {leave_type} from {start_date} to {end_date} has been approved.\n\nEnjoy your time off!\n\nRegards,\n{manager_name}",
  },
  "leave-rejection": {
    subject: "Update on your leave application",
    body: "Hi {employee_name},\n\nWe regret to inform you that your {leave_type} from {start_date} to {end_date} has been rejected.\n\nPlease connect with your manager for further details.\n\nRegards,\n{manager_name}",
  },
};

const placeholders = [
  "{employee_name}",
  "{leave_type}",
  "{start_date}",
  "{end_date}",
  "{days}",
  "{manager_name}",
  "{reason}",
];

export function EmailTemplatesForm({ onSave }: { onSave: () => void }) {
  const form = useForm<EmailTemplatesFormValues>({
    resolver: zodResolver(emailTemplatesSchema),
    defaultValues: {
      templateName: "leave-application",
      subject: templates["leave-application"].subject,
      body: templates["leave-application"].body,
    },
  });

  function onSubmit(data: EmailTemplatesFormValues) {
    toast.success("Email template saved successfully!");
    console.log("Email template saved:", data);
    onSave();
  }

  const handleTemplateChange = (value: string) => {
    if (templates[value]) {
      form.reset({
        templateName: value,
        subject: templates[value].subject,
        body: templates[value].body,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="email-templates-form" className="space-y-6">
        <FormField
          control={form.control}
          name="templateName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Template</FormLabel>
              <Select onValueChange={handleTemplateChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template to edit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="leave-application">Leave Application</SelectItem>
                  <SelectItem value="leave-approval">Leave Approval</SelectItem>
                  <SelectItem value="leave-rejection">Leave Rejection</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the email template you want to customize.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter email subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter email body" className="min-h-[200px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h4 className="text-sm font-medium mb-2">Available Placeholders</h4>
          <div className="flex flex-wrap gap-2">
            {placeholders.map((p) => (
              <Button
                key={p}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  const currentBody = form.getValues("body");
                  form.setValue("body", currentBody + ` ${p} `);
                }}
              >
                {p}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Click to insert a placeholder into the email body.</p>
        </div>
      </form>
    </Form>
  );
}
