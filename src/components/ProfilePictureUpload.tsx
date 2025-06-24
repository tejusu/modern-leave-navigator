
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Camera, Edit, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfilePictureUploadProps {
  value?: string;
  onChange: (imageUrl: string | undefined) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProfilePictureUpload({ value, onChange, className = "", size = "lg" }: ProfilePictureUploadProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24", 
    lg: "h-32 w-32"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file (.jpg, .jpeg, .png).",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewImage) {
      onChange(previewImage);
      toast({
        title: "Success",
        description: "Profile picture updated successfully.",
      });
    }
    setIsDialogOpen(false);
    setPreviewImage(null);
  };

  const handleRemove = () => {
    onChange(undefined);
    setIsDialogOpen(false);
    setPreviewImage(null);
    toast({
      title: "Success", 
      description: "Profile picture removed successfully.",
    });
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPreviewImage(null);
  };

  return (
    <>
      <div className={`relative inline-block ${className}`}>
        <Avatar className={`${sizeClasses[size]} cursor-pointer`} onClick={() => setIsDialogOpen(true)}>
          <AvatarImage src={value} alt="Profile" />
          <AvatarFallback>
            <User className={iconSizes[size]} />
          </AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="secondary"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md hover:shadow-lg"
          onClick={() => setIsDialogOpen(true)}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={previewImage || value} alt="Profile preview" />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="max-w-xs"
            />
            <p className="text-sm text-muted-foreground text-center">
              Upload a new profile picture. Supported formats: JPG, JPEG, PNG. Max size: 5MB.
            </p>
          </div>
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              {(value || previewImage) && (
                <Button variant="destructive" onClick={handleRemove}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
            <Button 
              onClick={handleSave} 
              disabled={!previewImage}
              className="bg-red-600 hover:bg-red-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
