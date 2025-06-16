
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Calendar, CheckCircle, Sun, Moon } from "lucide-react";

interface HalfDayLeavePolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HalfDayLeavePolicyDialog({ open, onOpenChange }: HalfDayLeavePolicyDialogProps) {
  const [settings, setSettings] = useState({
    enabled: true,
    allowedLeaveTypes: ["CL", "SL"],
    firstHalfEnabled: true,
    secondHalfEnabled: true,
    firstHalfTiming: "9:00 AM - 1:00 PM",
    secondHalfTiming: "2:00 PM - 6:00 PM",
    deductionMethod: "0.5", // 0.5 day deduction
    combinationRules: true, // allow combining with full day leaves
    advanceNotice: "1", // days
    approvalRequired: false,
  });

  const handleLeaveTypeChange = (leaveType: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      allowedLeaveTypes: checked 
        ? [...prev.allowedLeaveTypes, leaveType]
        : prev.allowedLeaveTypes.filter(type => type !== leaveType)
    }));
  };

  const handleSave = () => {
    localStorage.setItem('halfDayLeavePolicy', JSON.stringify(settings));
    console.log('Half-Day Leave Policy saved:', settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Half-Day Leave Policy
          </DialogTitle>
          <DialogDescription>
            Configure half-day leave options for different leave types and set timing rules.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Settings</CardTitle>
                <CardDescription>Configure core half-day leave settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="half-day-enabled">Enable Half-Day Leave</Label>
                  <Switch
                    id="half-day-enabled"
                    checked={settings.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, enabled: checked }))
                    }
                  />
                </div>

                <div className="space-y-3">
                  <Label>Allowed Leave Types</Label>
                  <div className="space-y-2">
                    {["CL", "SL", "PL", "ML"].map((leaveType) => (
                      <div key={leaveType} className="flex items-center space-x-2">
                        <Checkbox
                          id={leaveType}
                          checked={settings.allowedLeaveTypes.includes(leaveType)}
                          onCheckedChange={(checked) => 
                            handleLeaveTypeChange(leaveType, checked as boolean)
                          }
                        />
                        <Label htmlFor={leaveType} className="text-sm">
                          {leaveType === "CL" && "Casual Leave (CL)"}
                          {leaveType === "SL" && "Sick Leave (SL)"}
                          {leaveType === "PL" && "Privilege Leave (PL)"}
                          {leaveType === "ML" && "Maternity Leave (ML)"}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Deduction Method</Label>
                  <Select
                    value={settings.deductionMethod}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, deductionMethod: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5 day deduction</SelectItem>
                      <SelectItem value="1">1 full day deduction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Advance Notice Required</Label>
                  <Select
                    value={settings.advanceNotice}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, advanceNotice: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Same day</SelectItem>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="2">2 days</SelectItem>
                      <SelectItem value="3">3 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timing Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="first-half">Enable First Half</Label>
                    <Switch
                      id="first-half"
                      checked={settings.firstHalfEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, firstHalfEnabled: checked }))
                      }
                    />
                  </div>
                  {settings.firstHalfEnabled && (
                    <div className="ml-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">First Half Timing</span>
                      </div>
                      <p className="text-sm text-orange-700">{settings.firstHalfTiming}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="second-half">Enable Second Half</Label>
                    <Switch
                      id="second-half"
                      checked={settings.secondHalfEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, secondHalfEnabled: checked }))
                      }
                    />
                  </div>
                  {settings.secondHalfEnabled && (
                    <div className="ml-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Second Half Timing</span>
                      </div>
                      <p className="text-sm text-blue-700">{settings.secondHalfTiming}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="combination-rules">Allow Combination</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow combining half-day with full-day leaves
                    </p>
                  </div>
                  <Switch
                    id="combination-rules"
                    checked={settings.combinationRules}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, combinationRules: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="approval-required">Approval Required</Label>
                    <p className="text-xs text-muted-foreground">
                      Require manager approval for half-day leaves
                    </p>
                  </div>
                  <Switch
                    id="approval-required"
                    checked={settings.approvalRequired}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, approvalRequired: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Policy Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Available Options</p>
                      <p className="text-xs text-green-700">
                        Half-day leave available for: {settings.allowedLeaveTypes.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Deduction Rule</p>
                      <p className="text-xs text-blue-700">
                        {settings.deductionMethod} day will be deducted from leave balance per half-day.
                      </p>
                    </div>
                  </div>

                  {settings.advanceNotice !== "0" && (
                    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Advance Notice</p>
                        <p className="text-xs text-amber-700">
                          {settings.advanceNotice} day(s) advance notice required.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Half-Day Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {settings.firstHalfEnabled && (
                    <div className="p-3 border border-orange-200 rounded-lg bg-orange-50">
                      <div className="flex items-center gap-2 mb-1">
                        <Sun className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-800">First Half</span>
                      </div>
                      <p className="text-sm text-orange-700">{settings.firstHalfTiming}</p>
                      <p className="text-xs text-orange-600 mt-1">
                        Employee can take leave during morning hours
                      </p>
                    </div>
                  )}

                  {settings.secondHalfEnabled && (
                    <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-center gap-2 mb-1">
                        <Moon className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Second Half</span>
                      </div>
                      <p className="text-sm text-blue-700">{settings.secondHalfTiming}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Employee can take leave during afternoon hours
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example Application</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2 font-medium border-b pb-2">
                    <span>Leave Type</span>
                    <span>Deduction</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <span>CL - First Half</span>
                    <span className="text-red-600">-{settings.deductionMethod} day</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <span>SL - Second Half</span>
                    <span className="text-red-600">-{settings.deductionMethod} day</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 text-muted-foreground">
                    <span>Available timings</span>
                    <span>
                      {settings.firstHalfEnabled && settings.secondHalfEnabled 
                        ? "Both halves" 
                        : settings.firstHalfEnabled 
                        ? "First half only" 
                        : "Second half only"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Half-Day Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
