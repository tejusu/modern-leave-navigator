
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const joiners = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", date: "2025-06-10" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", date: "2025-06-08" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", date: "2025-06-05" },
    { name: "William Kim", email: "will@email.com", date: "2025-06-01" },
];

export function RecentJoiners() {
    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Recent Joiners</CardTitle>
                <CardDescription>New employees who joined recently.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {joiners.map(joiner => (
                        <div key={joiner.email} className="flex items-center gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>{joiner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{joiner.name}</p>
                                <p className="text-sm text-muted-foreground">{joiner.email}</p>
                            </div>
                            <div className="ml-auto font-medium text-sm text-muted-foreground">{new Date(joiner.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
