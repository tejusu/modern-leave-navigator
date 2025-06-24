
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, User } from "lucide-react";
import { Admin } from "@/lib/types";
import { AddAdminForm } from "@/components/admin-management/AddAdminForm";
import { useToast } from "@/hooks/use-toast";

const initialAdmins: Admin[] = [
  {
    adminId: "ADM001",
    name: "Sarah Johnson",
    email: "sarah.johnson@leaveflow.com",
    avatar: "/placeholder.svg",
    phone: "+1 234 567 8901",
    department: "Human Resources",
    status: "Active",
    role: "Admin Only",
  },
  {
    adminId: "ADM002", 
    name: "Michael Chen",
    email: "michael.chen@leaveflow.com",
    phone: "+1 234 567 8902",
    department: "Engineering",
    status: "Active",
    role: "Employee + Admin",
    employeeId: "AL002",
  },
];

const AdminManagement = () => {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.adminId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAdmin = (adminData: Omit<Admin, "adminId">) => {
    const newAdminId = `ADM${String(admins.length + 1).padStart(3, "0")}`;
    const newAdmin: Admin = {
      ...adminData,
      adminId: newAdminId,
    };
    
    setAdmins([...admins, newAdmin]);
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Admin created successfully.",
    });
  };

  const handleToggleStatus = (adminId: string) => {
    setAdmins(admins.map(admin => 
      admin.adminId === adminId 
        ? { ...admin, status: admin.status === "Active" ? "Inactive" : "Active" }
        : admin
    ));
    toast({
      title: "Status Updated",
      description: "Admin status has been updated successfully.",
    });
  };

  const handleRemoveAdmin = (adminId: string) => {
    setAdmins(admins.filter(admin => admin.adminId !== adminId));
    toast({
      title: "Admin Removed",
      description: "Admin access has been removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Management</h1>
          <p className="text-muted-foreground">
            Manage administrative access and permissions for your organization
          </p>
        </div>
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
            <AddAdminForm onSubmit={handleAddAdmin} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin List</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search admins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Name & Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.adminId}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={admin.avatar} alt={admin.name} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-sm text-muted-foreground">{admin.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{admin.department || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={admin.role === "Admin Only" ? "default" : "secondary"}>
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={admin.status === "Active"}
                        onCheckedChange={() => handleToggleStatus(admin.adminId)}
                      />
                      <span className="text-sm">
                        {admin.status === "Active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRemoveAdmin(admin.adminId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAdmins.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No admins found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;
