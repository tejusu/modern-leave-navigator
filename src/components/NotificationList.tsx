
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, FileText, XCircle } from "lucide-react";

const notifications = [
    {
        id: 1,
        icon: CheckCircle,
        iconColor: "text-green-500",
        title: "Leave Approved",
        description: "Your request for sick leave...",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        icon: XCircle,
        iconColor: "text-red-500",
        title: "Leave Rejected",
        description: "Your casual leave request...",
        time: "1 day ago",
        read: false,
    },
    {
        id: 3,
        icon: FileText,
        iconColor: "text-blue-500",
        title: "New Leave Request",
        description: "John Doe has requested for...",
        time: "2 days ago",
        read: true,
    },
];

export function NotificationList() {
    return (
        <Card className="border-0 shadow-none">
            <CardHeader className="p-4 border-b">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>You have {notifications.filter(n => !n.read).length} unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y">
                    {notifications.map((notification) => (
                        <div key={notification.id} className={`flex items-start gap-3 p-4 text-sm ${!notification.read ? 'bg-muted/50' : ''}`}>
                            <notification.icon className={`h-5 w-5 mt-0.5 shrink-0 ${notification.iconColor}`} />
                            <div className="flex-1">
                                <p className="font-medium">{notification.title}</p>
                                <p className="text-muted-foreground">{notification.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                             {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary self-center" />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-2 border-t">
                <Button variant="link" className="w-full" asChild>
                    <a href="/notifications-alerts">
                        View all notifications
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
