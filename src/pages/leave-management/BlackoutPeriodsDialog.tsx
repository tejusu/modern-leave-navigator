import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar, Plus, Trash2, Shield } from "lucide-react";

interface BlackoutPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  enabled: boolean;
}

interface BlackoutPeriodsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlackoutPeriodsDialog({ open, onOpenChange }: BlackoutPeriodsDialogProps) {
  const [blackoutPeriods, setBlackoutPeriods] = useState<BlackoutPeriod[]>([
    {
      id: "1",
      name: "Year-end Closure",
      startDate: "2024-12-25",
      endDate: "2024-12-31",
      description: "No leave allowed during year-end closure",
      enabled: true
    },
    {
      id: "2", 
      name: "Financial Year-end",
      startDate: "2024-03-25",
      endDate: "2024-03-31",
      description: "Critical business period",
      enabled: true
    }
  ]);

  const [newPeriod, setNewPeriod] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const addBlackoutPeriod = () => {
    if (newPeriod.name && newPeriod.startDate && newPeriod.endDate) {
      const period: BlackoutPeriod = {
        id: Date.now().toString(),
        ...newPeriod,
        enabled: true
      };
      setBlackoutPeriods([...blackoutPeriods, period]);
      setNewPeriod({ name: "", startDate: "", endDate: "", description: "" });
    }
  };

  const removePeriod = (id: string) => {
    setBlackoutPeriods(blackoutPeriods.filter(p => p.id !== id));
  };

  const togglePeriod = (id: string) => {
    setBlackoutPeriods(blackoutPeriods.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleSave = () => {
    localStorage.setItem('blackoutPeriods', JSON.stringify(blackoutPeriods));
    console.log('Blackout Periods saved:', blackoutPeriods);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Blackout Periods Management
          </DialogTitle>
          <DialogDescription>
            Define periods when leave applications are restricted or not allowed.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add New Period */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Blackout Period</CardTitle>
                <CardDescription>Create new restricted leave periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Period Name</Label>
                  <Input
                    placeholder="e.g., Year-end Closure"
                    value={newPeriod.name}
                    onChange={(e) => setNewPeriod(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={newPeriod.startDate}
                      onChange={(e) => setNewPeriod(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={newPeriod.endDate}
                      onChange={(e) => setNewPeriod(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Optional description"
                    value={newPeriod.description}
                    onChange={(e) => setNewPeriod(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <Button onClick={addBlackoutPeriod} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Blackout Period
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Existing Periods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Configured Blackout Periods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blackoutPeriods.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No blackout periods configured
                  </p>
                ) : (
                  blackoutPeriods.map((period) => (
                    <div key={period.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{period.name}</h4>
                            <Switch
                              checked={period.enabled}
                              onCheckedChange={() => togglePeriod(period.id)}
                              size="sm"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {period.startDate} to {period.endDate}
                          </p>
                          {period.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {period.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePeriod(period.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className={`text-xs px-2 py-1 rounded ${
                        period.enabled 
                          ? 'bg-red-100 text-red-700 border border-red-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {period.enabled ? 'Active - Leave applications blocked' : 'Inactive'}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Blackout Periods
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
