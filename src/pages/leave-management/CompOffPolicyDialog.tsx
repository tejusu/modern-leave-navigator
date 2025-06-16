
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react";

interface CompOffPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompOffPolicyDialog({ open, onOpenChange }: CompOffPolicyDialogProps) {
  const [settings, setSettings] = useState({
    enabled: true,
    utilizationPeriod: "30", // days
    autoGeneration: true,
    minimumHours: "4", // minimum overtime hours to generate comp-off
    approvalRequired: false,
    carryForward: false,
    maxBalance: "5", // maximum comp-off balance
  });

  const handleSave = () => {
    localStorage.setItem('compOffPolicy', JSON.stringify(settings));
    console.log('Comp-Off Policy saved:', settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Compensatory Off (Comp-Off) Policy
          </DialogTitle>
          <DialogDescription>
            Configure rules for comp-off generation, utilization periods, and approval workflows.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Settings</CardTitle>
                <CardDescription>Configure core comp-off policy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="comp-off-enabled">Enable Comp-Off Policy</Label>
                  <Switch
                    id="comp-off-enabled"
                    checked={settings.enabled}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, enabled: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Utilization Period</Label>
                  <Select
                    value={settings.utilizationPeriod}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, utilizationPeriod: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Period within which comp-off must be utilized
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Overtime Hours</Label>
                  <Select
                    value={settings.minimumHours}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, minimumHours: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Minimum overtime hours required to generate comp-off
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Balance</Label>
                  <Select
                    value={settings.maxBalance}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, maxBalance: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="10">10 days</SelectItem>
                      <SelectItem value="15">15 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Maximum comp-off balance an employee can hold
                  </p>
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
                    <Label htmlFor="auto-generation">Auto Generation</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically generate comp-off based on overtime
                    </p>
                  </div>
                  <Switch
                    id="auto-generation"
                    checked={settings.autoGeneration}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoGeneration: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="approval-required">Approval Required</Label>
                    <p className="text-xs text-muted-foreground">
                      Require manager approval for comp-off utilization
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

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="carry-forward">Carry Forward</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow unused comp-off to carry forward to next period
                    </p>
                  </div>
                  <Switch
                    id="carry-forward"
                    checked={settings.carryForward}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, carryForward: checked }))
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
                      <p className="text-sm font-medium text-green-800">Generation Rule</p>
                      <p className="text-xs text-green-700">
                        Comp-off will be {settings.autoGeneration ? 'automatically generated' : 'manually approved'} 
                        {' '}after {settings.minimumHours} hours of overtime work.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Utilization Period</p>
                      <p className="text-xs text-blue-700">
                        Comp-off must be utilized within {settings.utilizationPeriod} days of generation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Balance Limit</p>
                      <p className="text-xs text-amber-700">
                        Maximum {settings.maxBalance} days comp-off balance allowed per employee.
                      </p>
                    </div>
                  </div>

                  {settings.approvalRequired && (
                    <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-purple-800">Approval Required</p>
                        <p className="text-xs text-purple-700">
                          Manager approval required for comp-off utilization.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example Scenario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2 font-medium border-b pb-2">
                    <span>Action</span>
                    <span>Date</span>
                    <span>Result</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span>Overtime Work</span>
                    <span>Jan 15</span>
                    <span className="text-green-600">+1 Comp-off</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span>Apply Comp-off</span>
                    <span>Jan 20</span>
                    <span className="text-blue-600">-1 Comp-off</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span>Expiry Date</span>
                    <span>Feb {15 + parseInt(settings.utilizationPeriod)}</span>
                    <span className="text-red-600">Auto-expire</span>
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
            Save Comp-Off Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
