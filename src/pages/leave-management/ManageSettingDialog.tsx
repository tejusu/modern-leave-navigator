
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DefineWorkingDaysForm } from "./settings-forms/DefineWorkingDaysForm";
import { SetWorkingHoursForm } from "./settings-forms/SetWorkingHoursForm";
import { ConfigureShiftsForm } from "./settings-forms/ConfigureShiftsForm";
import { SetFiscalYearStartForm } from "./settings-forms/SetFiscalYearStartForm";
import { DefineLeaveYearCycleForm } from "./settings-forms/DefineLeaveYearCycleForm";
import { ConfigureYearEndProcessingForm } from "./settings-forms/ConfigureYearEndProcessingForm";
import { MonthlyAccrualRulesForm } from "./settings-forms/MonthlyAccrualRulesForm";
import { EmployeeCategorySettingsForm } from "./settings-forms/EmployeeCategorySettingsForm";
import { ProrationLogicForm } from "./settings-forms/ProrationLogicForm";
import { UpdateCalendarForm } from "./settings-forms/UpdateCalendarForm";


export interface SettingDetail {
  group: { title: string };
  item: { name: string; description: string };
}

interface ManageSettingDialogProps {
  setting: SettingDetail | null;
  onOpenChange: (open: boolean) => void;
}

const settingForms: Record<string, React.FC<{ onSave: () => void }>> = {
  "Define Working Days": DefineWorkingDaysForm,
  "Set Working Hours": SetWorkingHoursForm,
  "Configure Shifts": ConfigureShiftsForm,
  "Set Fiscal Year Start": SetFiscalYearStartForm,
  "Define Leave Year Cycle": DefineLeaveYearCycleForm,
  "Configure Year-end Processing": ConfigureYearEndProcessingForm,
  "Monthly Accrual Rules": MonthlyAccrualRulesForm,
  "Employee Category Settings": EmployeeCategorySettingsForm,
  "Proration Logic": ProrationLogicForm,
  "Update Calendar": UpdateCalendarForm,
};

export function ManageSettingDialog({ setting, onOpenChange }: ManageSettingDialogProps) {
  if (!setting) {
    return null;
  }

  const FormComponent = settingForms[setting.item.name];
  const formId = setting.item.name.toLowerCase().replace(/\s+/g, '-') + '-form';

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={!!setting} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{setting.item.name}</DialogTitle>
          <DialogDescription>
            Part of "{setting.group.title}". {setting.item.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {FormComponent ? (
            <FormComponent onSave={handleSave} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Configuration options for this setting will be displayed here.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {FormComponent && (
            <Button type="submit" form={formId}>
              Save Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
