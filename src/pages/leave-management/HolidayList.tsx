import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Holiday } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface HolidayListProps {
  holidays: Holiday[];
  onEdit: (holiday: Holiday) => void;
  onDelete: (holiday: Holiday) => void;
}

export function HolidayList({ holidays, onEdit, onDelete }: HolidayListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Holiday List</CardTitle>
        <CardDescription>View, edit, or delete company holidays.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.sort((a,b) => a.date.getTime() - b.date.getTime()).map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell>{format(holiday.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell className="font-medium">{holiday.name}</TableCell>
                  <TableCell>
                    <Badge variant={holiday.type === 'General Holiday' ? 'default' : 'secondary'}>{holiday.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(holiday)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(holiday)} className="hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
