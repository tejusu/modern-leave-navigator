
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveTypes } from "./leave-management/LeaveTypes";
import { LeavePolicies } from "./leave-management/LeavePolicies";
import { LeaveHistory } from "./leave-management/LeaveHistory";

export default function LeaveManagement() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <p className="text-muted-foreground">
          Manage leave types, policies, and view history.
        </p>
      </header>
      <Tabs defaultValue="leave-types" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid md:grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="leave-types">Leave Types</TabsTrigger>
          <TabsTrigger value="leave-policies">Leave Policies</TabsTrigger>
          <TabsTrigger value="leave-history">Leave History</TabsTrigger>
        </TabsList>
        <TabsContent value="leave-types" className="mt-6">
          <LeaveTypes />
        </TabsContent>
        <TabsContent value="leave-policies" className="mt-6">
          <LeavePolicies />
        </TabsContent>
        <TabsContent value="leave-history" className="mt-6">
          <LeaveHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
