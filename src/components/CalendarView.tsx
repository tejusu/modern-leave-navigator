
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function CalendarView() {
    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Team's leave calendar.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6 text-center text-muted-foreground">
                <div>
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <p>Full calendar view coming soon.</p>
                </div>
            </CardContent>
        </Card>
    );
}
