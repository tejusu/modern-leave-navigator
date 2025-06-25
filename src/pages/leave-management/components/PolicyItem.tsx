
import { Button } from "@/components/ui/button";

interface PolicyItemProps {
  name: string;
  description: string;
  type: string;
  onManage: (policyType: string) => void;
}

export function PolicyItem({ name, description, type, onManage }: PolicyItemProps) {
  return (
    <li className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onManage(type)}
      >
        Manage
      </Button>
    </li>
  );
}
