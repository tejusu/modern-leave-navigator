
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, Gift } from "lucide-react";

interface UpcomingEvent {
    date: Date;
    name: string;
    type: 'holiday' | 'birthday';
}

const events: UpcomingEvent[] = [
    { date: new Date("2025-06-28"), name: "John Doe's Birthday", type: 'birthday' },
    { date: new Date("2025-07-04"), name: "Independence Day", type: 'holiday' },
    { date: new Date("2025-07-15"), name: "Jane Smith's Birthday", type: 'birthday' },
    { date: new Date("2025-09-01"), name: "Labor Day", type: 'holiday' },
    { date: new Date("2025-11-27"), name: "Thanksgiving Day", type: 'holiday' },
    { date: new Date("2025-12-25"), name: "Christmas Day", type: 'holiday' },
]

export function UpcomingHolidays() {
    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Upcoming Birthdays & Holidays</CardTitle>
                <CardDescription>Company-wide holidays and birthdays.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {events.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5).map(event => (
                        <li key={event.name} className="flex items-center gap-4">
                            <div className="bg-muted p-2 rounded-md">
                                {event.type === 'holiday' ? 
                                    <CalendarDays className="w-5 h-5 text-primary" /> : 
                                    <Gift className="w-5 h-5 text-primary" />
                                }
                            </div>
                            <div>
                                <p className="font-semibold">{event.name}</p>
                                <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
