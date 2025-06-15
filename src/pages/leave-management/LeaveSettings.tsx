import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings, Calendar, SlidersHorizontal, Bell } from "lucide-react";
import { ManageSettingDialog, SettingDetail } from "./ManageSettingDialog";

const settingsGroups = [
  {
    icon: Settings,
    title: "Working Days Configuration",
    description: "Define your organization's work schedule.",
    items: [
      { name: "Define Working Days", description: "Set the standard work week (e.g., Mon-Fri)." },
      { name: "Set Working Hours", description: "Set default start and end times for a work day." },
      { name: "Configure Shifts", description: "Configure different work shifts if applicable." },
    ],
  },
  {
    icon: Calendar,
    title: "Leave Year Settings",
    description: "Configure fiscal year and year-end processing.",
    items: [
      { name: "Set Fiscal Year Start", description: "Set the start month for the leave year (e.g., April)." },
      { name: "Define Leave Year Cycle", description: "Define if leave cycle follows calendar or fiscal year." },
      { name: "Configure Year-end Processing", description: "Manage carry-forward, encashment, or lapsing rules." },
      { name: "Restricted Holiday Policy", description: "Set the number of restricted holidays employees can avail per year." },
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "Auto-Accrual Configuration",
    description: "Set up automatic leave accrual rules.",
    items: [
      { name: "Monthly Accrual Rules", description: "Define rules for how leave is earned each month." },
      { name: "Employee Category Settings", description: "Apply different rules for different employee groups." },
      { name: "Proration Logic", description: "Configure leave for new joiners or leavers." },
      { name: "Update Calendar", description: "Manually trigger or view calendar updates." },
    ],
  },
  {
    icon: Bell,
    title: "Notification Settings",
    description: "Manage email templates and workflows.",
    items: [
      { name: "Email Templates", description: "Customize emails for leave applications and approvals." },
      { name: "Approval Workflows", description: "Set up multi-level approval chains." },
      { name: "Reminder Configurations", description: "Configure automated reminders for pending actions." },
    ],
  },
];

export function LeaveSettings() {
  const [selectedSetting, setSelectedSetting] = useState<SettingDetail | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <group.icon className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSetting({ group: { title: group.title }, item })}
                    >
                      Manage
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <ManageSettingDialog
        setting={selectedSetting}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedSetting(null);
          }
        }}
      />
    </>
  );
}
