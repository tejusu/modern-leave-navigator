
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, UserPlus } from "lucide-react";
import { AddAdminForm } from "@/components/admin-management/AddAdminForm";
import { Admin } from "@/lib/types";

interface AdminManagementHeaderProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  setIsAssignDialogOpen: (open: boolean) => void;
  onAddAdmin: (adminData: Omit<Admin, "adminId">) => void;
}

export function AdminManagementHeader({
  isAddDialogOpen,
  setIsAddDialogOpen,
  setIsAssignDialogOpen,
  onAddAdmin,
}: AdminManagementHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Management</h1>
        <p className="text-muted-foreground">
          Manage administrative access and permissions for your organization
        </p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline"
          onClick={() => setIsAssignDialogOpen(true)}
          className="border-red-600 text-red-600 hover:bg-red-50"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Admin
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <AddAdminForm onSubmit={onAddAdmin} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
