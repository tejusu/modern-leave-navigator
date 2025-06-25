
import { Calendar, Shield, Users, Settings } from "lucide-react";

export const policyGroups = [
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
