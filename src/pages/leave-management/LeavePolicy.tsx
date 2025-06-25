import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, Calendar, Clock, Shield, Users, Settings } from "lucide-react";
import { SandwichLeavePolicyDialog } from "./SandwichLeavePolicyDialog";
import { CompOffPolicyDialog } from "./CompOffPolicyDialog";
import { HalfDayLeavePolicyDialog } from "./HalfDayLeavePolicyDialog";
import { AdvanceNoticeDialog } from "./AdvanceNoticeDialog";
import { BlackoutPeriodsDialog } from "./BlackoutPeriodsDialog";
import { LeaveApprovalWorkflowDialog } from "./LeaveApprovalWorkflowDialog";
import { LeaveApplicationLimitsDialog } from "./LeaveApplicationLimitsDialog";
import { LeaveCancellationDialog } from "./LeaveCancellationDialog";
import { RoleBasedLeaveDialog } from "./RoleBasedLeaveDialog";
import { WeekendInclusionDialog } from "./WeekendInclusionDialog";

const policyGroups = [
  {
    icon: Calendar,
    title: "Leave Application Policies",
    description: "Set rules for leave application timing and approval workflows.",
    items: [
      { 
        name: "Leave Approval Workflow", 
        description: "Configure single-level or multi-level approval workflows.",
        type: "approval-workflow"
      },
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
    title: "Leave Restrictions & Limits",
    description: "Configure restrictions, limits, and blackout periods for leave applications.",
    items: [
      { 
        name: "Application Limits & Frequency", 
        description: "Set min/max days per application and frequency controls.",
        type: "application-limits"
      },
      { 
        name: "Blackout Periods", 
        description: "Define periods when leave applications are restricted.",
        type: "blackout-periods"
      },
      { 
        name: "Cancellation & Accrual Rules", 
        description: "Configure cancellation policies and accrual blocking rules.",
        type: "cancellation-accrual"
      },
    ],
  },
  {
    icon: Users,
    title: "Role-Based Configuration",
    description: "Apply different leave rules based on employee roles and departments.",
    items: [
      { 
        name: "Role-Based Leave Rules", 
        description: "Configure leave rules for specific designations and departments.",
        type: "role-based-rules"
      },
    ],
  },
  {
    icon: Settings,
    title: "Calendar & Time Configuration",
    description: "Configure weekend inclusion and calendar-related settings.",
    items: [
      { 
        name: "Weekend Inclusion Settings", 
        description: "Configure weekend inclusion for different leave types.",
        type: "weekend-inclusion"
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

      {/* Existing dialogs */}
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

      {/* New dialogs */}
      <LeaveApprovalWorkflowDialog
        open={selectedPolicy === "approval-workflow"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <LeaveApplicationLimitsDialog
        open={selectedPolicy === "application-limits"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <LeaveCancellationDialog
        open={selectedPolicy === "cancellation-accrual"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <RoleBasedLeaveDialog
        open={selectedPolicy === "role-based-rules"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />

      <WeekendInclusionDialog
        open={selectedPolicy === "weekend-inclusion"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
        }}
      />
    </>
  );
}
