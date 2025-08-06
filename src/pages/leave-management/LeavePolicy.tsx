import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

export function LeavePolicy() {
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  
  // Policy states
  const [sandwichPolicy, setSandwichPolicy] = useState({
    enabled: false,
    appliesTo: [] as string[],
    thresholdDays: 14,
  });

  const [halfDayPolicy, setHalfDayPolicy] = useState({
    enabled: false,
    applicableTypes: [] as string[],
    firstHalfStart: "09:00",
    firstHalfEnd: "13:00",
    secondHalfStart: "14:00",
    secondHalfEnd: "18:00",
  });

  const [compOffPolicy, setCompOffPolicy] = useState({
    enabled: false,
    minimumOvertimeHours: 4,
    autoGenerate: false,
    approvalRequired: true,
    carryForwardAllowed: false,
    carryForwardLimit: 5,
    utilizationPeriod: 30,
  });

  const [approvalWorkflow, setApprovalWorkflow] = useState({
    workflowType: "single-level" as "single-level" | "multi-level",
    levels: [
      { name: "Level 1", approverRole: "Reporting Manager", escalationTime: 48, mandatory: true }
    ]
  });

  const [cancellationPolicy, setCancellationPolicy] = useState({
    canCancelAfterApproval: true,
    minimumNotice: 1,
    notifyApprover: true,
  });

  const leaveTypes = ["CL", "SL", "WFH", "LOP", "EL"];

  const togglePanel = (panelId: string) => {
    setExpandedPanels(prev =>
      prev.includes(panelId)
        ? prev.filter(id => id !== panelId)
        : [...prev, panelId]
    );
  };

  const savePolicy = (policyType: string) => {
    toast({
      title: "Policy Saved",
      description: `${policyType} policy has been saved successfully.`,
    });
  };

  const PolicyHeader = ({ title, panelId, children }: { title: string; panelId: string; children: React.ReactNode }) => (
    <Card className="mb-4">
      <Collapsible open={expandedPanels.includes(panelId)} onOpenChange={() => togglePanel(panelId)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              {expandedPanels.includes(panelId) ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  const MultiSelect = ({ 
    value, 
    onChange, 
    options, 
    placeholder 
  }: { 
    value: string[]; 
    onChange: (value: string[]) => void; 
    options: string[]; 
    placeholder: string;
  }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={value.includes(option)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...value, option]);
              } else {
                onChange(value.filter(v => v !== option));
              }
            }}
          />
          <Label htmlFor={option}>{option}</Label>
        </div>
      ))}
    </div>
  );

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Sandwich Leave Policy */}
        <PolicyHeader title="Sandwich Leave Policy" panelId="sandwich">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="sandwich-enabled"
                checked={sandwichPolicy.enabled}
                onCheckedChange={(enabled) => setSandwichPolicy(prev => ({ ...prev, enabled }))}
              />
              <Label htmlFor="sandwich-enabled">Enable Sandwich Policy</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>When enabled, leave around holidays/weekends may be automatically deducted</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {sandwichPolicy.enabled && (
              <>
                <div className="space-y-2">
                  <Label>Applies To</Label>
                  <MultiSelect
                    value={sandwichPolicy.appliesTo}
                    onChange={(value) => setSandwichPolicy(prev => ({ ...prev, appliesTo: value }))}
                    options={leaveTypes}
                    placeholder="Select leave types"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold-days">Advance Threshold Setting (Days)</Label>
                  <Input
                    id="threshold-days"
                    type="number"
                    value={sandwichPolicy.thresholdDays}
                    onChange={(e) => setSandwichPolicy(prev => ({ ...prev, thresholdDays: parseInt(e.target.value) || 0 }))}
                    className="w-32"
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Policy Logic</h4>
                  <p className="text-sm text-muted-foreground">
                    If Sandwich Policy is enabled and casual leave is taken the day before and after a holiday/weekend, 
                    the intervening holidays and weekends are also deducted as leave unless the applied leave span is ≥ {sandwichPolicy.thresholdDays} days.
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => togglePanel('sandwich')}>Close</Button>
              <Button onClick={() => savePolicy('Sandwich Leave')}>Save Policy</Button>
            </div>
          </div>
        </PolicyHeader>

        {/* Half-Day Leave Policy */}
        <PolicyHeader title="Half-Day Leave Policy" panelId="half-day">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="half-day-enabled"
                checked={halfDayPolicy.enabled}
                onCheckedChange={(enabled) => setHalfDayPolicy(prev => ({ ...prev, enabled }))}
              />
              <Label htmlFor="half-day-enabled">Enable Half-Day Policy</Label>
            </div>

            {halfDayPolicy.enabled && (
              <>
                <div className="space-y-2">
                  <Label>Applicable Leave Types</Label>
                  <MultiSelect
                    value={halfDayPolicy.applicableTypes}
                    onChange={(value) => setHalfDayPolicy(prev => ({ ...prev, applicableTypes: value }))}
                    options={leaveTypes}
                    placeholder="Select applicable leave types"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Half Timing</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={halfDayPolicy.firstHalfStart}
                        onChange={(e) => setHalfDayPolicy(prev => ({ ...prev, firstHalfStart: e.target.value }))}
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={halfDayPolicy.firstHalfEnd}
                        onChange={(e) => setHalfDayPolicy(prev => ({ ...prev, firstHalfEnd: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Second Half Timing</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={halfDayPolicy.secondHalfStart}
                        onChange={(e) => setHalfDayPolicy(prev => ({ ...prev, secondHalfStart: e.target.value }))}
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={halfDayPolicy.secondHalfEnd}
                        onChange={(e) => setHalfDayPolicy(prev => ({ ...prev, secondHalfEnd: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Policy Description</h4>
                  <p className="text-sm text-muted-foreground">
                    Enabling half-day policy allows employees to apply for CL or LOP in half-day units: 
                    morning ({halfDayPolicy.firstHalfStart}–{halfDayPolicy.firstHalfEnd}) or 
                    afternoon ({halfDayPolicy.secondHalfStart}–{halfDayPolicy.secondHalfEnd}).
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => togglePanel('half-day')}>Close</Button>
              <Button onClick={() => savePolicy('Half-Day Leave')}>Save Policy</Button>
            </div>
          </div>
        </PolicyHeader>

        {/* Compensatory Off Policy */}
        <PolicyHeader title="Compensatory Off (Comp-Off)" panelId="comp-off">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="comp-off-enabled"
                checked={compOffPolicy.enabled}
                onCheckedChange={(enabled) => setCompOffPolicy(prev => ({ ...prev, enabled }))}
              />
              <Label htmlFor="comp-off-enabled">Enable Comp-Off</Label>
            </div>

            {compOffPolicy.enabled && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-overtime">Minimum Overtime (Hours)</Label>
                    <Input
                      id="min-overtime"
                      type="number"
                      value={compOffPolicy.minimumOvertimeHours}
                      onChange={(e) => setCompOffPolicy(prev => ({ ...prev, minimumOvertimeHours: parseInt(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="utilization-period">Utilization Period (Days)</Label>
                    <Input
                      id="utilization-period"
                      type="number"
                      value={compOffPolicy.utilizationPeriod}
                      onChange={(e) => setCompOffPolicy(prev => ({ ...prev, utilizationPeriod: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-generate"
                      checked={compOffPolicy.autoGenerate}
                      onCheckedChange={(checked) => setCompOffPolicy(prev => ({ ...prev, autoGenerate: checked }))}
                    />
                    <Label htmlFor="auto-generate">Auto Generate Comp-Off</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="approval-required"
                      checked={compOffPolicy.approvalRequired}
                      onCheckedChange={(checked) => setCompOffPolicy(prev => ({ ...prev, approvalRequired: checked }))}
                    />
                    <Label htmlFor="approval-required">Approval Required</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="carry-forward"
                      checked={compOffPolicy.carryForwardAllowed}
                      onCheckedChange={(checked) => setCompOffPolicy(prev => ({ ...prev, carryForwardAllowed: checked }))}
                    />
                    <Label htmlFor="carry-forward">Carry Forward Allowed</Label>
                  </div>

                  {compOffPolicy.carryForwardAllowed && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="carry-forward-limit">Carry Forward Limit (Days)</Label>
                      <Input
                        id="carry-forward-limit"
                        type="number"
                        value={compOffPolicy.carryForwardLimit}
                        onChange={(e) => setCompOffPolicy(prev => ({ ...prev, carryForwardLimit: parseInt(e.target.value) || 0 }))}
                        className="w-32"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Policy Description</h4>
                  <p className="text-sm text-muted-foreground">
                    Overtime ≥ {compOffPolicy.minimumOvertimeHours} hours accrues comp-off which {compOffPolicy.approvalRequired ? 'requires manager approval' : 'is auto-approved'}; 
                    {compOffPolicy.carryForwardAllowed ? ` up to ${compOffPolicy.carryForwardLimit} days carry-forward allowed` : ' no carry-forward allowed'} 
                    within {compOffPolicy.utilizationPeriod}-day utilization window.
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => togglePanel('comp-off')}>Close</Button>
              <Button onClick={() => savePolicy('Comp-Off')}>Save Policy</Button>
            </div>
          </div>
        </PolicyHeader>

        {/* Leave Approval Workflow */}
        <PolicyHeader title="Leave Approval Workflow" panelId="approval">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Workflow Type</Label>
              <Select
                value={approvalWorkflow.workflowType}
                onValueChange={(value: "single-level" | "multi-level") => 
                  setApprovalWorkflow(prev => ({ ...prev, workflowType: value }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-level">Single-level</SelectItem>
                  <SelectItem value="multi-level">Multi-level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {approvalWorkflow.levels.map((level, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Level Name</Label>
                      <Input
                        value={level.name}
                        onChange={(e) => {
                          const newLevels = [...approvalWorkflow.levels];
                          newLevels[index].name = e.target.value;
                          setApprovalWorkflow(prev => ({ ...prev, levels: newLevels }));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Approver Role</Label>
                      <Input
                        value={level.approverRole}
                        onChange={(e) => {
                          const newLevels = [...approvalWorkflow.levels];
                          newLevels[index].approverRole = e.target.value;
                          setApprovalWorkflow(prev => ({ ...prev, levels: newLevels }));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Escalation Time (Hours)</Label>
                      <Input
                        type="number"
                        value={level.escalationTime}
                        onChange={(e) => {
                          const newLevels = [...approvalWorkflow.levels];
                          newLevels[index].escalationTime = parseInt(e.target.value) || 0;
                          setApprovalWorkflow(prev => ({ ...prev, levels: newLevels }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Switch
                      checked={level.mandatory}
                      onCheckedChange={(checked) => {
                        const newLevels = [...approvalWorkflow.levels];
                        newLevels[index].mandatory = checked;
                        setApprovalWorkflow(prev => ({ ...prev, levels: newLevels }));
                      }}
                    />
                    <Label>Mandatory Approval</Label>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Policy Description</h4>
              <p className="text-sm text-muted-foreground">
                {approvalWorkflow.workflowType === 'multi-level' 
                  ? `Multilevel approval: ${approvalWorkflow.levels[0]?.name} – ${approvalWorkflow.levels[0]?.approverRole} (must approve within ${approvalWorkflow.levels[0]?.escalationTime}h); if not approved -> escalate.`
                  : `Single-level approval: ${approvalWorkflow.levels[0]?.approverRole} must approve within ${approvalWorkflow.levels[0]?.escalationTime} hours.`
                }
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => togglePanel('approval')}>Close</Button>
              <Button onClick={() => savePolicy('Approval Workflow')}>Save Policy</Button>
            </div>
          </div>
        </PolicyHeader>

        {/* Leave Cancellation Policy */}
        <PolicyHeader title="Leave Cancellation Policy" panelId="cancellation">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="can-cancel"
                checked={cancellationPolicy.canCancelAfterApproval}
                onCheckedChange={(checked) => setCancellationPolicy(prev => ({ ...prev, canCancelAfterApproval: checked }))}
              />
              <Label htmlFor="can-cancel">Can Cancel After Approval</Label>
            </div>

            {cancellationPolicy.canCancelAfterApproval && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="min-notice">Minimum Cancellation Notice (Days)</Label>
                  <Input
                    id="min-notice"
                    type="number"
                    value={cancellationPolicy.minimumNotice}
                    onChange={(e) => setCancellationPolicy(prev => ({ ...prev, minimumNotice: parseInt(e.target.value) || 0 }))}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="notify-approver"
                    checked={cancellationPolicy.notifyApprover}
                    onCheckedChange={(checked) => setCancellationPolicy(prev => ({ ...prev, notifyApprover: checked }))}
                  />
                  <Label htmlFor="notify-approver">Notify Approver on Cancellation</Label>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Policy Description</h4>
                  <p className="text-sm text-muted-foreground">
                    Employees may cancel approved leave with at least {cancellationPolicy.minimumNotice} day notice; 
                    {cancellationPolicy.notifyApprover ? ' approvers are notified automatically.' : ' no notification sent to approvers.'}
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => togglePanel('cancellation')}>Close</Button>
              <Button onClick={() => savePolicy('Cancellation')}>Save Policy</Button>
            </div>
          </div>
        </PolicyHeader>
      </div>
    </TooltipProvider>
  );
}