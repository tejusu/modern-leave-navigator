
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Clock } from "lucide-react";
import React from "react";

export function UpdateCalendarForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();

  const handleRunAccrual = () => {
    console.log("Manual accrual process triggered.");
    toast({
      title: "Process Started",
      description: "Leave accrual process has been manually triggered. This may take a few minutes.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form id="update-calendar-form" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Manually trigger the leave accrual process for all employees based on current settings.
          This is useful for ad-hoc updates or corrections. The process runs automatically at the end of each period.
        </p>
        <Card>
          <CardHeader>
              <CardTitle>Manual Accrual Trigger</CardTitle>
              <CardDescription>Last run: 2025-05-31 11:59 PM</CardDescription>
          </CardHeader>
          <CardContent>
               <Button type="button" onClick={handleRunAccrual}>
                  <Clock className="mr-2 h-4 w-4" /> Run Accrual Now
              </Button>
          </CardContent>
        </Card>
        
         <Card>
          <CardHeader>
              <CardTitle>Recent Accrual History</CardTitle>
          </CardHeader>
          <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between"><span>May 2025 Accrual</span> <span>Completed on 2025-05-31</span></li>
                  <li className="flex justify-between"><span>April 2025 Accrual</span> <span>Completed on 2025-04-30</span></li>
                  <li className="flex justify-between"><span>March 2025 Accrual</span> <span>Completed on 2025-03-31</span></li>
              </ul>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
