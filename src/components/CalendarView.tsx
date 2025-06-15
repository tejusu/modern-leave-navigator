
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Gift } from "lucide-react";

interface Event {
    date: Date;
    name: string;
    type: 'holiday' | 'birthday';
}

const events: Event[] = [
    { date: new Date("2025-06-28"), name: "John Doe's Birthday", type: 'birthday' },
    { date: new Date("2025-07-04"), name: "Independence Day", type: 'holiday' },
    { date: new Date("2025-07-15"), name: "Jane Smith's Birthday", type: 'birthday' },
    { date: new Date("2025-09-01"), name: "Labor Day", type: 'holiday' },
    { date: new Date("2025-11-27"), name: "Thanksgiving Day", type: 'holiday' },
    { date: new Date("2025-12-25"), name: "Christmas Day", type: 'holiday' },
];

const eventDates = events.map(e => e.date);

export function CalendarView() {
    const [month, setMonth] = useState(new Date("2025-06-15"));

    const monthlyEvents = useMemo(() => {
        return events.filter(event => 
            event.date.getMonth() === month.getMonth() && 
            event.date.getFullYear() === month.getFullYear()
        ).sort((a, b) => a.date.getDate() - b.date.getDate());
    }, [month]);
    
    return (
        <Card className="lg:col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle>Events Calendar</CardTitle>
                <CardDescription>Birthdays & holidays at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="flex justify-center">
                    <Calendar
                      mode="multiple"
                      selected={eventDates}
                      month={month}
                      onMonthChange={setMonth}
                      className="p-0"
                      classNames={{
                        day_selected: "bg-primary/20 text-primary-foreground hover:bg-primary/30",
                        day_outside: "text-muted-foreground/50",
                      }}
                      disabled
                    />
                </div>
                <div className="mt-4 space-y-4 pt-4 border-t flex-grow">
                    <h3 className="font-semibold text-sm">
                        Events in {month.toLocaleString('default', { month: 'long' })}
                    </h3>
                    {monthlyEvents.length > 0 ? (
                        <ul className="space-y-4">
                            {monthlyEvents.map(event => (
                                <li key={event.name} className="flex items-center gap-4">
                                    <div className="bg-muted p-2 rounded-md">
                                        {event.type === 'holiday' ? 
                                            <CalendarDays className="w-5 h-5 text-primary" /> : 
                                            <Gift className="w-5 h-5 text-primary" />
                                        }
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{event.name}</p>
                                        <p className="text-xs text-muted-foreground">{event.date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric' })}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No events this month.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

