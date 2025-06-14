
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Holiday } from "@/lib/types";
import { CalendarDays } from "lucide-react";

const holidays: Holiday[] = [
    { date: "2025-07-04", name: "Independence Day" },
    { date: "2025-09-01", name: "Labor Day" },
    { date: "2025-11-27", name: "Thanksgiving Day" },
    { date: "2025-12-25", name: "Christmas Day" },
]

export function UpcomingHolidays() {
    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Upcoming Holidays</CardTitle>
                <CardDescription>Company-wide holidays.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {holidays.map(holiday => (
                        <li key={holiday.name} className="flex items-center gap-4">
                            <div className="bg-muted p-2 rounded-md">
                                <CalendarDays className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold">{holiday.name}</p>
                                <p className="text-sm text-muted-foreground">{new Date(holiday.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
