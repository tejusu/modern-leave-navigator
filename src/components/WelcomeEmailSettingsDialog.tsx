
import { useEffect } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getWelcomeEmailTemplate, saveWelcomeEmailTemplate, WelcomeEmailTemplate } from "@/lib/email-service";

const emailSchema = z.object({
  subject: z.string().min(1, "Subject is required."),
  body: z.string().min(1, "Body is required."),
});

type EmailFormValues = WelcomeEmailTemplate;

const placeholders = [
  "{employee_name}",
  "{employee_id}",
  "{company_name}",
];

interface WelcomeEmailSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeEmailSettingsDialog({ open, onOpenChange }: WelcomeEmailSettingsDialogProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: getWelcomeEmailTemplate(),
  });

  useEffect(() => {
    if (open) {
      form.reset(getWelcomeEmailTemplate());
    }
  }, [open, form]);

  function onSubmit(data: EmailFormValues) {
    saveWelcomeEmailTemplate(data);
    toast.success("Welcome email template saved successfully!");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Welcome Email Template</DialogTitle>
          <DialogDescription>
            Customize the email that new employees receive when they are added to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="welcome-email-form" className="space-y-4 py-2">
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
                    <Textarea placeholder="Enter email body" className="min-h-[200px] resize-none" {...field} />
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
                      form.setFocus("body");
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="submit" form="welcome-email-form">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
