
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { PolicyItem } from "./PolicyItem";

interface PolicyGroupItem {
  name: string;
  description: string;
  type: string;
}

interface PolicyGroupProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: PolicyGroupItem[];
  onManagePolicy: (policyType: string) => void;
}

export function PolicyGroup({ icon: Icon, title, description, items, onManagePolicy }: PolicyGroupProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Icon className="w-8 h-8 text-primary" />
        <div className="flex-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item) => (
            <PolicyItem
              key={item.name}
              name={item.name}
              description={item.description}
              type={item.type}
              onManage={onManagePolicy}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
