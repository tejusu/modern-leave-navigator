
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LeaveBalanceCardProps = {
  title: string;
  remainingDays: number;
  totalDays: number;
  icon: React.ElementType;
  colorClass: string;
};

export function LeaveBalanceCard({ title, remainingDays, totalDays, icon: Icon, colorClass }: LeaveBalanceCardProps) {
  const percentage = (remainingDays / totalDays) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-muted-foreground", colorClass)} />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-2xl font-bold">{remainingDays} <span className="text-xs text-muted-foreground">/ {totalDays} days</span></div>
        <div className="mt-auto pt-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className={cn("h-1.5 rounded-full", colorClass)} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
