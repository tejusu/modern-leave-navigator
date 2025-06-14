
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function LeavePolicies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Policy Settings</CardTitle>
        <CardDescription>Configure global leave policies that apply to all employees.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Consecutive Days Limit</h3>
                <p className="text-sm text-muted-foreground">Set the maximum number of consecutive leave days allowed.</p>
                {/* Placeholder for settings */}
            </div>
            <div className="p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Sandwich Leave Policy</h3>
                <p className="text-sm text-muted-foreground">Define rules for leaves taken between weekends or holidays.</p>
                 {/* Placeholder for settings */}
            </div>
            <div className="p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Comp-off Rules</h3>
                <p className="text-sm text-muted-foreground">Manage compensatory off settings.</p>
                 {/* Placeholder for settings */}
            </div>
             <div className="p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Balance & Accrual Rules</h3>
                <p className="text-sm text-muted-foreground">Configure auto-accrual and balance enforcement rules.</p>
                 {/* Placeholder for settings */}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
