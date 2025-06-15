
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Holiday } from "@/lib/types";

interface HolidayCalendarProps {
  holidays: Holiday[];
}

export function HolidayCalendar({ holidays }: HolidayCalendarProps) {
  const holidayDates = holidays.map(h => h.date);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Holiday Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={holidayDates}
          month={new Date('2025-01-01')}
          className="p-0"
        />
      </CardContent>
    </Card>
  );
}
