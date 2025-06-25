
import { SandwichLeavePolicyDialog } from "../SandwichLeavePolicyDialog";
import { CompOffPolicyDialog } from "../CompOffPolicyDialog";
import { HalfDayLeavePolicyDialog } from "../HalfDayLeavePolicyDialog";
import { AdvanceNoticeDialog } from "../AdvanceNoticeDialog";
import { BlackoutPeriodsDialog } from "../BlackoutPeriodsDialog";
import { LeaveApprovalWorkflowDialog } from "../LeaveApprovalWorkflowDialog";
import { LeaveApplicationLimitsDialog } from "../LeaveApplicationLimitsDialog";
import { LeaveCancellationDialog } from "../LeaveCancellationDialog";
import { RoleBasedLeaveDialog } from "../RoleBasedLeaveDialog";
import { WeekendInclusionDialog } from "../WeekendInclusionDialog";

interface PolicyDialogContainerProps {
  selectedPolicy: string | null;
  onOpenChange: (open: boolean) => void;
}

export function PolicyDialogContainer({ selectedPolicy, onOpenChange }: PolicyDialogContainerProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onOpenChange(false);
    }
  };

  return (
    <>
      <SandwichLeavePolicyDialog
        open={selectedPolicy === "sandwich-leave"}
        onOpenChange={handleOpenChange}
      />

      <CompOffPolicyDialog
        open={selectedPolicy === "comp-off"}
        onOpenChange={handleOpenChange}
      />

      <HalfDayLeavePolicyDialog
        open={selectedPolicy === "half-day-leave"}
        onOpenChange={handleOpenChange}
      />

      <AdvanceNoticeDialog
        open={selectedPolicy === "advance-notice"}
        onOpenChange={handleOpenChange}
      />

      <BlackoutPeriodsDialog
        open={selectedPolicy === "blackout-periods"}
        onOpenChange={handleOpenChange}
      />

      <LeaveApprovalWorkflowDialog
        open={selectedPolicy === "approval-workflow"}
        onOpenChange={handleOpenChange}
      />

      <LeaveApplicationLimitsDialog
        open={selectedPolicy === "application-limits"}
        onOpenChange={handleOpenChange}
      />

      <LeaveCancellationDialog
        open={selectedPolicy === "cancellation-accrual"}
        onOpenChange={handleOpenChange}
      />

      <RoleBasedLeaveDialog
        open={selectedPolicy === "role-based-rules"}
        onOpenChange={handleOpenChange}
      />

      <WeekendInclusionDialog
        open={selectedPolicy === "weekend-inclusion"}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
