
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface SettingDetail {
  group: { title: string };
  item: { name: string; description: string };
}

interface ManageSettingDialogProps {
  setting: SettingDetail | null;
  onOpenChange: (open: boolean) => void;
}

export function ManageSettingDialog({ setting, onOpenChange }: ManageSettingDialogProps) {
  if (!setting) {
    return null;
  }

  return (
    <Dialog open={!!setting} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{setting.item.name}</DialogTitle>
          <DialogDescription>
            Part of "{setting.group.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Configuration options for this setting will be displayed here.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
