
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Bell, CheckCircle } from "lucide-react";

interface AdvanceNoticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdvanceNoticeDialog({ open, onOpenChange }: AdvanceNoticeDialogProps) {
  const [settings, setSettings] = useState({
    casualLeave: "1", // days
    sickLeave: "0", // same day allowed
    earnedLeave: "7", // days
    maternityLeave: "30", // days
    compOff: "1", // days
    emergencyLeave: "0", // same day allowed
  });

  const handleSave = () => {
    localStorage.setItem('advanceNoticePolicy', JSON.stringify(settings));
    console.log('Advance Notice Policy saved:', settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Advance Notice Requirements
          </DialogTitle>
          <DialogDescription>
            Define minimum advance notice periods required for different leave types.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave Type Notice Periods</CardTitle>
                <CardDescription>Set minimum advance notice for each leave type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Casual Leave (CL)</Label>
                  <Select
                    value={settings.casualLeave}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, casualLeave: value }))
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
                      <SelectItem value="7">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sick Leave (SL)</Label>
                  <Select
                    value={settings.sickLeave}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, sickLeave: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Same day</SelectItem>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="2">2 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Earned Leave (EL)</Label>
                  <Select
                    value={settings.earnedLeave}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, earnedLeave: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="14">2 weeks</SelectItem>
                      <SelectItem value="30">1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Maternity Leave</Label>
                  <Select
                    value={settings.maternityLeave}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, maternityLeave: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">1 month</SelectItem>
                      <SelectItem value="60">2 months</SelectItem>
                      <SelectItem value="90">3 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Compensatory Off</Label>
                  <Select
                    value={settings.compOff}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, compOff: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Same day</SelectItem>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="2">2 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Policy Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(settings).map(([key, value]) => {
                    const leaveTypeNames = {
                      casualLeave: "Casual Leave",
                      sickLeave: "Sick Leave",
                      earnedLeave: "Earned Leave",
                      maternityLeave: "Maternity Leave",
                      compOff: "Compensatory Off",
                      emergencyLeave: "Emergency Leave"
                    };
                    
                    return (
                      <div key={key} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            {leaveTypeNames[key as keyof typeof leaveTypeNames]}
                          </p>
                          <p className="text-xs text-blue-700">
                            {value === "0" ? "Can be applied on the same day" : `Requires ${value} day${parseInt(value) > 1 ? 's' : ''} advance notice`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800">✅ Valid Application</p>
                    <p className="text-green-700">Applying for EL on Jan 15 for leave on Jan 22 (7 days advance)</p>
                  </div>
                  
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="font-medium text-red-800">❌ Invalid Application</p>
                    <p className="text-red-700">Applying for EL on Jan 15 for leave on Jan 18 (3 days - insufficient notice)</p>
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
            Save Notice Requirements
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
