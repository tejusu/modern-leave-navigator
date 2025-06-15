import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Holiday } from "@/lib/types";
import { HolidayCalendar } from "./HolidayCalendar";
import { HolidayList } from "./HolidayList";
import { AddEditHolidayDialog, HolidayFormValues } from "./AddEditHolidayDialog";
import { DeleteHolidayDialog } from "./DeleteHolidayDialog";

const initialHolidays: Holiday[] = [
  { id: '1', name: 'New Year\'s Day', date: new Date('2025-01-01T00:00:00'), type: 'General Holiday' },
  { id: '2', name: 'Good Friday', date: new Date('2025-04-18T00:00:00'), type: 'General Holiday' },
  { id: '3', name: 'Memorial Day', date: new Date('2025-05-26T00:00:00'), type: 'General Holiday' },
  { id: '4', name: 'Independence Day', date: new Date('2025-07-04T00:00:00'), type: 'General Holiday' },
  { id: '5', name: 'Labor Day', date: new Date('2025-09-01T00:00:00'), type: 'General Holiday' },
  { id: '6', name: 'Thanksgiving Day', date: new Date('2025-11-27T00:00:00'), type: 'General Holiday' },
  { id: '7', name: 'Christmas Day', date: new Date('2025-12-25T00:00:00'), type: 'General Holiday' },
  { id: '8', name: 'State Foundation Day', date: new Date('2025-08-15T00:00:00'), type: 'General Holiday', departments: ['Engineering'] },
  { id: '9', name: 'Raksha Bandhan', date: new Date('2025-08-19T00:00:00'), type: 'Restricted Holiday' },
  { id: '10', name: 'Ganesh Chaturthi', date: new Date('2025-08-29T00:00:00'), type: 'Restricted Holiday' },
];

export function HolidayManagement() {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const handleAdd = () => {
    setSelectedHoliday(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setIsAddEditOpen(true);
  };

  const handleDelete = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setIsDeleteOpen(true);
  };

  const handleSaveHoliday = (holidayData: HolidayFormValues) => {
    if (selectedHoliday) {
      setHolidays(holidays.map(h => {
        if (h.id === selectedHoliday.id) {
          const updatedHoliday: Holiday = {
            ...h,
            ...holidayData,
          };
          return updatedHoliday;
        }
        return h;
      }));
    } else {
      const newHoliday: Holiday = {
        id: new Date().toISOString(),
        name: holidayData.name,
        date: holidayData.date,
        type: holidayData.type,
      };
      setHolidays([...holidays, newHoliday]);
    }
    setIsAddEditOpen(false);
    setSelectedHoliday(null);
  };
  
  const confirmDelete = () => {
    if (selectedHoliday) {
      setHolidays(holidays.filter(h => h.id !== selectedHoliday.id));
      setIsDeleteOpen(false);
      setSelectedHoliday(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Holiday Management</h2>
          <p className="text-muted-foreground">
            Manage your company's holidays.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Holiday
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HolidayList holidays={holidays} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div>
          <HolidayCalendar holidays={holidays} />
        </div>
      </div>
      <AddEditHolidayDialog
        open={isAddEditOpen}
        onOpenChange={setIsAddEditOpen}
        onSave={handleSaveHoliday}
        holiday={selectedHoliday}
      />
      <DeleteHolidayDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        holidayName={selectedHoliday?.name}
      />
    </div>
  );
}
