
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Search, User, ArrowRight } from "lucide-react";
import { Employee } from "@/lib/types";

interface AssignAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
  onAssignAdmins: (selectedEmployees: Employee[]) => void;
}

export function AssignAdminDialog({ open, onOpenChange, employees, onAssignAdmins }: AssignAdminDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [showPreview, setShowPreview] = useState(false);

  // Filter out employees who are already admins and filter by search
  const eligibleEmployees = employees.filter(employee => 
    !employee.isAdmin && 
    (employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (employee.department && employee.department.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleToggleEmployee = (employeeId: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(employeeId)) {
      newSelected.delete(employeeId);
    } else {
      newSelected.add(employeeId);
    }
    setSelectedEmployees(newSelected);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleBackToSelection = () => {
    setShowPreview(false);
  };

  const handleConfirmAssignment = () => {
    const selectedEmployeeObjects = employees.filter(emp => selectedEmployees.has(emp.employeeId));
    onAssignAdmins(selectedEmployeeObjects);
    
    // Reset state
    setSelectedEmployees(new Set());
    setShowPreview(false);
    setSearchQuery("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedEmployees(new Set());
    setShowPreview(false);
    setSearchQuery("");
    onOpenChange(false);
  };

  const selectedEmployeeObjects = employees.filter(emp => selectedEmployees.has(emp.employeeId));

  if (showPreview) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review and Confirm Admin Assignment</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Review the selected employees before assigning admin access. You can remove any employee from this list before confirming.
            </p>
            
            {selectedEmployeeObjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No employees selected for admin assignment.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedEmployeeObjects.map((employee) => (
                  <div key={employee.employeeId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                        <div className="text-xs text-muted-foreground">{employee.department || "—"}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleEmployee(employee.employeeId)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBackToSelection}>
              Back to Selection
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmAssignment}
                disabled={selectedEmployees.size === 0}
                className="bg-red-600 hover:bg-red-700"
              >
                Confirm & Assign Admins ({selectedEmployees.size})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Admin Access</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {eligibleEmployees.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No employees found matching your search." : "All employees already have admin access or no employees available."}
              </div>
            ) : (
              eligibleEmployees.map((employee) => (
                <div key={employee.employeeId} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                      <div className="text-xs text-muted-foreground">{employee.department || "—"}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {selectedEmployees.has(employee.employeeId) ? "Selected" : "Select"}
                    </span>
                    <Switch
                      checked={selectedEmployees.has(employee.employeeId)}
                      onCheckedChange={() => handleToggleEmployee(employee.employeeId)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedEmployees.size > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                {selectedEmployees.size} employee{selectedEmployees.size > 1 ? 's' : ''} selected for admin assignment
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handlePreview}
            disabled={selectedEmployees.size === 0}
            className="bg-red-600 hover:bg-red-700"
          >
            Preview Selected Admins ({selectedEmployees.size})
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
