
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, Calendar, Clock, Shield } from "lucide-react";
import { SandwichLeavePolicyDialog } from "./SandwichLeavePolicyDialog";

const policyGroups = [
  {
    icon: Calendar,
    title: "Sandwich Leave Policy",
    description: "Configure rules for leave applications before and after weekends/holidays.",
    items: [
      { 
        name: "Sandwich Leave Rules", 
        description: "Set advance notice requirements and counting rules for sandwich leaves.",
        type: "sandwich-leave"
      },
    ],
  },
  {
    icon: Clock,
    title: "Leave Application Policies",
    description: "Set rules for leave application timing and approval workflows.",
    items: [
      { 
        name: "Advance Notice Requirements", 
        description: "Define minimum advance notice periods for different leave types.",
        type: "advance-notice"
      },
      { 
        name: "Emergency Leave Policy", 
        description: "Configure rules for emergency or short-notice leave applications.",
        type: "emergency-leave"
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
  {
    icon: FileText,
    title: "Documentation Policies",
    description: "Configure documentation requirements for leave applications.",
    items: [
      { 
        name: "Medical Certificate Requirements", 
        description: "Define when medical certificates are required for sick leave.",
        type: "medical-certificate"
      },
      { 
        name: "Supporting Document Rules", 
        description: "Configure document requirements for different leave types.",
        type: "supporting-documents"
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
    </>
  );
}
