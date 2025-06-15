
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddEmployeeSheet } from "@/components/AddEmployeeSheet";
import { BulkImportDialog } from "@/components/BulkImportDialog";
import { EmployeeProfileSheet } from "@/components/EmployeeProfileSheet";
import { EditEmployeeSheet } from "@/components/EditEmployeeSheet";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { WelcomeEmailSettingsDialog } from "@/components/WelcomeEmailSettingsDialog";
import { useEmployeeManagement } from "@/hooks/useEmployeeManagement";
import { EmployeeManagementHeader } from "@/components/employee-management/EmployeeManagementHeader";
import { EmployeeTableFilters } from "@/components/employee-management/EmployeeTableFilters";
import { EmployeeTable } from "@/components/employee-management/EmployeeTable";

const EmployeeManagement = () => {
  const {
    employees,
    searchQuery,
    setSearchQuery,
    statusFilter,
    toggleStatusFilter,
    filteredEmployees,
    isAddSheetOpen,
    setAddSheetOpen,
    isImportDialogOpen,
    setImportDialogOpen,
    isProfileSheetOpen,
    setProfileSheetOpen,
    selectedEmployee,
    employeeToEdit,
    isEditSheetOpen,
    setEditSheetOpen,
    employeeToDelete,
    isDeleteDialogOpen,
    setDeleteDialogOpen,
    isEmailSettingsOpen,
    setEmailSettingsOpen,
    handleAddEmployee,
    handleViewProfile,
    handleEdit,
    handleUpdateEmployee,
    handleDelete,
    confirmDeleteEmployee,
    isPersonalDetailsIncomplete,
    isFinancialDetailsIncomplete,
  } = useEmployeeManagement();

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
        <EmployeeManagementHeader
          onAddEmployeeClick={() => setAddSheetOpen(true)}
          onBulkImportClick={() => setImportDialogOpen(true)}
          onEmailSettingsClick={() => setEmailSettingsOpen(true)}
        />

        <Card>
          <CardHeader>
            <EmployeeTableFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                toggleStatusFilter={toggleStatusFilter}
            />
          </CardHeader>
          <CardContent>
            <EmployeeTable 
                employees={filteredEmployees}
                onViewProfile={handleViewProfile}
                isPersonalDetailsIncomplete={isPersonalDetailsIncomplete}
                isFinancialDetailsIncomplete={isFinancialDetailsIncomplete}
            />
          </CardContent>
        </Card>
      </div>
      <AddEmployeeSheet 
        open={isAddSheetOpen} 
        onOpenChange={setAddSheetOpen} 
        onAddEmployee={handleAddEmployee} 
        employees={employees}
      />
      <BulkImportDialog 
        open={isImportDialogOpen} 
        onOpenChange={setImportDialogOpen} 
      />
      <EmployeeProfileSheet 
        employee={selectedEmployee} 
        open={isProfileSheetOpen} 
        onOpenChange={setProfileSheetOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditEmployeeSheet
        open={isEditSheetOpen}
        onOpenChange={setEditSheetOpen}
        employee={employeeToEdit}
        onUpdateEmployee={handleUpdateEmployee}
        employees={employees}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteEmployee}
        employeeName={employeeToDelete?.name}
      />
      <WelcomeEmailSettingsDialog
        open={isEmailSettingsOpen}
        onOpenChange={setEmailSettingsOpen}
      />
    </>
  );
};

export default EmployeeManagement;
