
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, Settings } from "lucide-react";

interface EmployeeManagementHeaderProps {
  onAddEmployeeClick: () => void;
  onBulkImportClick: () => void;
  onEmailSettingsClick: () => void;
}

export const EmployeeManagementHeader = ({
  onAddEmployeeClick,
  onBulkImportClick,
  onEmailSettingsClick,
}: EmployeeManagementHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
        <p className="text-muted-foreground">
          View, add, and manage your organization's employees.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onEmailSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          Email Settings
        </Button>
        <Button onClick={onAddEmployeeClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
        <Button variant="outline" onClick={onBulkImportClick}>
          <Upload className="mr-2 h-4 w-4" />
          Bulk Import
        </Button>
      </div>
    </div>
  );
};
