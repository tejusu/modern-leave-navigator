
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Bell,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CheckCircle,
    iconColor: "text-green-500",
    title: "Leave Approved",
    description: "Your request for sick leave on 2025-06-20 has been approved.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    icon: XCircle,
    iconColor: "text-red-500",
    title: "Leave Rejected",
    description: "Your casual leave request from 2025-07-01 to 2025-07-03 was rejected.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    icon: FileText,
    iconColor: "text-blue-500",
    title: "New Leave Request",
    description: "John Doe has requested for paternity leave.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    icon: Calendar,
    iconColor: "text-purple-500",
    title: "Upcoming Holiday",
    description: "Independence Day is on 2025-08-15.",
    time: "1 week ago",
    read: true,
  },
];

export default function NotificationsAndAlerts() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notifications & Alerts
        </h1>
        <p className="text-muted-foreground">
          Review all system notifications and alerts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>You have {notifications.filter(n => !n.read).length} unread notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${!notification.read ? 'bg-muted/50' : ''}`}
              >
                <notification.icon className={`h-6 w-6 mt-1 ${notification.iconColor}`} />
                <div className="flex-1">
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {notification.time}
                </div>
                {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary self-center" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
