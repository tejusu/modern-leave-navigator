
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const leaveSummaryData = [
  { type: "Casual Leave", days: 12, color: "bg-sky-500" },
  { type: "Sick Leave", days: 5, color: "bg-amber-500" },
  { type: "Earned Leave", days: 8, color: "bg-emerald-500" },
];

export function MonthlyLeaveSummary() {
  const totalDays = leaveSummaryData.reduce((acc, item) => acc + item.days, 0);

  return (
    <Card className="lg:col-span-1 flex flex-col">
      <CardHeader>
        <CardTitle>Monthly Leave Summary</CardTitle>
        <CardDescription>Overview for June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {leaveSummaryData.map((item) => (
            <div key={item.type}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{item.type}</span>
                <span className="text-sm text-muted-foreground">{item.days} days</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${(item.days / totalDays) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t mt-4 text-right">
             <p className="text-sm font-bold">Total Leave Days: {totalDays}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

