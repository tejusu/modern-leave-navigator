
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BlackoutPeriod {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  departments: string[];
  isActive: boolean;
}

interface BlackoutPeriodsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlackoutPeriodsDialog({ open, onOpenChange }: BlackoutPeriodsDialogProps) {
  const [blackoutPeriods, setBlackoutPeriods] = useState<BlackoutPeriod[]>([
    {
      id: "1",
      name: "Year-end Processing",
      startDate: new Date(2024, 11, 25), // Dec 25
      endDate: new Date(2025, 0, 2), // Jan 2
      reason: "Critical year-end financial processing and system maintenance",
      departments: ["Finance", "IT"],
      isActive: true,
    },
    {
      id: "2", 
      name: "Quarterly Reviews",
      startDate: new Date(2024, 2, 25), // March 25
      endDate: new Date(2024, 2, 31), // March 31
      reason: "Mandatory quarterly performance reviews for all departments",
      departments: ["All"],
      isActive: true,
    }
  ]);

  const [isAddingPeriod, setIsAddingPeriod] = useState(false);
  const [newPeriod, setNewPeriod] = useState<Partial<BlackoutPeriod>>({
    name: "",
    reason: "",
    departments: [],
    isActive: true,
  });

  const departments = ["All", "Finance", "IT", "HR", "Marketing", "Sales", "Operations"];

  const handleAddPeriod = () => {
    if (newPeriod.name && newPeriod.startDate && newPeriod.endDate) {
      const period: BlackoutPeriod = {
        id: Date.now().toString(),
        name: newPeriod.name,
        startDate: newPeriod.startDate,
        endDate: newPeriod.endDate,
        reason: newPeriod.reason || "",
        departments: newPeriod.departments || [],
        isActive: newPeriod.isActive ?? true,
      };
      setBlackoutPeriods(prev => [...prev, period]);
      setNewPeriod({
        name: "",
        reason: "",
        departments: [],
        isActive: true,
      });
      setIsAddingPeriod(false);
    }
  };

  const handleDeletePeriod = (id: string) => {
    setBlackoutPeriods(prev => prev.filter(period => period.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setBlackoutPeriods(prev => 
      prev.map(period => 
        period.id === id ? { ...period, isActive: !period.isActive } : period
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blackout Periods Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Blackout Periods */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Active Blackout Periods</h3>
              <Button 
                onClick={() => setIsAddingPeriod(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Period
              </Button>
            </div>

            <div className="grid gap-4">
              {blackoutPeriods.map((period) => (
                <Card key={period.id} className={cn(
                  "border-l-4",
                  period.isActive ? "border-l-red-500" : "border-l-gray-300"
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{period.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={period.isActive}
                          onCheckedChange={() => handleToggleActive(period.id)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePeriod(period.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Start Date</Label>
                        <p className="font-medium">{format(period.startDate, "MMM dd, yyyy")}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">End Date</Label>
                        <p className="font-medium">{format(period.endDate, "MMM dd, yyyy")}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Departments</Label>
                        <p className="font-medium">{period.departments.join(", ")}</p>
                      </div>
                      <div className="md:col-span-3">
                        <Label className="text-muted-foreground">Reason</Label>
                        <p className="font-medium">{period.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add New Period Form */}
          {isAddingPeriod && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardHeader>
                <CardTitle className="text-base">Add New Blackout Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="period-name">Period Name</Label>
                    <Input
                      id="period-name"
                      value={newPeriod.name || ""}
                      onChange={(e) => setNewPeriod(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Year-end Processing"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Affected Departments</Label>
                    <Select
                      value={newPeriod.departments?.[0] || ""}
                      onValueChange={(value) => setNewPeriod(prev => ({ ...prev, departments: [value] }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPeriod.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPeriod.startDate ? format(newPeriod.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPeriod.startDate}
                          onSelect={(date) => setNewPeriod(prev => ({ ...prev, startDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPeriod.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPeriod.endDate ? format(newPeriod.endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPeriod.endDate}
                          onSelect={(date) => setNewPeriod(prev => ({ ...prev, endDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period-reason">Reason</Label>
                  <Textarea
                    id="period-reason"
                    value={newPeriod.reason || ""}
                    onChange={(e) => setNewPeriod(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Explain why leave applications are restricted during this period"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingPeriod(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddPeriod}>
                    Add Period
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
