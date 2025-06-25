
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AdminTableFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AdminTableFilters({
  searchQuery,
  onSearchChange,
}: AdminTableFiltersProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search admins..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
