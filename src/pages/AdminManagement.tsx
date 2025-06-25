
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminManagementHeader } from "@/components/admin-management/AdminManagementHeader";
import { AdminTableFilters } from "@/components/admin-management/AdminTableFilters";
import { AdminTable } from "@/components/admin-management/AdminTable";
import { AssignAdminDialog } from "@/components/admin-management/AssignAdminDialog";
import { useAdminManagement } from "@/hooks/useAdminManagement";

const AdminManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  
  const {
    admins,
    employees,
    handleAddAdmin,
    handleAssignAdmins,
    handleToggleStatus,
    handleRemoveAdmin,
  } = useAdminManagement();

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.adminId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onAddAdmin = (adminData: Omit<Admin, "adminId">) => {
    handleAddAdmin(adminData);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <AdminManagementHeader
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        setIsAssignDialogOpen={setIsAssignDialogOpen}
        onAddAdmin={onAddAdmin}
      />

      <Card>
        <CardHeader>
          <CardTitle>Admin List</CardTitle>
          <AdminTableFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </CardHeader>
        <CardContent>
          <AdminTable
            admins={filteredAdmins}
            onToggleStatus={handleToggleStatus}
            onRemoveAdmin={handleRemoveAdmin}
          />
        </CardContent>
      </Card>

      <AssignAdminDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        employees={employees}
        onAssignAdmins={handleAssignAdmins}
      />
    </div>
  );
};

export default AdminManagement;
