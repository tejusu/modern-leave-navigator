
import { useState } from "react";
import { PolicyGroup } from "./components/PolicyGroup";
import { PolicyDialogContainer } from "./components/PolicyDialogContainer";
import { policyGroups } from "./data/policyGroups";

export function LeavePolicy() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const handleManagePolicy = (policyType: string) => {
    setSelectedPolicy(policyType);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedPolicy(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policyGroups.map((group) => (
          <PolicyGroup
            key={group.title}
            icon={group.icon}
            title={group.title}
            description={group.description}
            items={group.items}
            onManagePolicy={handleManagePolicy}
          />
        ))}
      </div>

      <PolicyDialogContainer
        selectedPolicy={selectedPolicy}
        onOpenChange={handleDialogOpenChange}
      />
    </>
  );
}
