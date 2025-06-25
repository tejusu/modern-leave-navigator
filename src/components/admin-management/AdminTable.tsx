
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, User } from "lucide-react";
import { Admin } from "@/lib/types";

interface AdminTableProps {
  admins: Admin[];
  onToggleStatus: (adminId: string) => void;
  onRemoveAdmin: (adminId: string) => void;
}

export function AdminTable({
  admins,
  onToggleStatus,
  onRemoveAdmin,
}: AdminTableProps) {
  return (
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
        {admins.map((admin) => (
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
                  onCheckedChange={() => onToggleStatus(admin.adminId)}
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
                  onClick={() => onRemoveAdmin(admin.adminId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {admins.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
              No admins found matching your search criteria.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
