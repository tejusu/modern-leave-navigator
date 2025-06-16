
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveTypes } from "./leave-management/LeaveTypes";
import { LeaveSettings } from "./leave-management/LeaveSettings";
import { LeaveHistory } from "./leave-management/LeaveHistory";
import { LeavePolicy } from "./leave-management/LeavePolicy";

export default function LeaveManagement() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <p className="text-muted-foreground">
          Manage leave types, settings, policies, and view history.
        </p>
      </header>
      <Tabs defaultValue="leave-types" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="leave-types">Leave Types</TabsTrigger>
          <TabsTrigger value="leave-settings">Leave Settings</TabsTrigger>
          <TabsTrigger value="leave-policy">Leave Policy</TabsTrigger>
          <TabsTrigger value="leave-history">Leave History</TabsTrigger>
        </TabsList>
        <TabsContent value="leave-types" className="mt-6">
          <LeaveTypes />
        </TabsContent>
        <TabsContent value="leave-settings" className="mt-6">
          <LeaveSettings />
        </TabsContent>
        <TabsContent value="leave-policy" className="mt-6">
          <LeavePolicy />
        </TabsContent>
        <TabsContent value="leave-history" className="mt-6">
          <LeaveHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
