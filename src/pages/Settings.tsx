
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfileForm } from "@/components/UserProfileForm";

const Settings = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserProfileForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
