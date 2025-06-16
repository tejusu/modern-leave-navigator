
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, Calendar, Clock, Shield } from "lucide-react";
import { SandwichLeavePolicyDialog } from "./SandwichLeavePolicyDialog";
import { CompOffPolicyDialog } from "./CompOffPolicyDialog";
import { HalfDayLeavePolicyDialog } from "./HalfDayLeavePolicyDialog";
import { AdvanceNoticeDialog } from "./AdvanceNoticeDialog";
import { BlackoutPeriodsDialog } from "./BlackoutPeriodsDialog";

const policyGroups = [
  {
    icon: Calendar,
    title: "Leave Application Policies",
    description: "Set rules for leave application timing and approval workflows.",
    items: [
      { 
        name: "Sandwich Leave Policy", 
        description: "Configure rules for leave applications before and after weekends/holidays.",
        type: "sandwich-leave"
      },
      { 
        name: "Compensatory Off (Comp-Off)", 
        description: "Set rules for comp-off generation and utilization periods.",
        type: "comp-off"
      },
      { 
        name: "Half-Day Leave Policy", 
        description: "Configure half-day leave options for CL/SL types.",
        type: "half-day-leave"
      },
      { 
        name: "Advance Notice Requirements", 
        description: "Define minimum advance notice periods for different leave types.",
        type: "advance-notice"
      },
    ],
  },
  {
    icon: Shield,
    title: "Leave Restrictions",
    description: "Configure restrictions and blackout periods for leave applications.",
    items: [
      { 
        name: "Blackout Periods", 
        description: "Define periods when leave applications are restricted.",
        type: "blackout-periods"
      },
      { 
        name: "Consecutive Leave Limits", 
        description: "Set maximum consecutive leave days allowed.",
        type: "consecutive-limits"
      },
    ],
  },
];

export function LeavePolicy() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const handleManagePolicy = (policyType: string) => {
    setSelectedPolicy(policyType);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policyGroups.map((group) => (
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
                      onClick={() => handleManagePolicy(item.type)}
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

      <SandwichLeavePolicyDialog
        open={selectedPolicy === "sandwich-leave"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <CompOffPolicyDialog
        open={selectedPolicy === "comp-off"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <HalfDayLeavePolicyDialog
        open={selectedPolicy === "half-day-leave"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <AdvanceNoticeDialog
        open={selectedPolicy === "advance-notice"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <BlackoutPeriodsDialog
        open={selectedPolicy === "blackout-periods"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />
    </>
  );
}
