
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

interface EmployeeTableFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string[];
    toggleStatusFilter: (status: "Active" | "On Leave" | "Deactivated") => void;
}

export const EmployeeTableFilters = ({
    searchQuery,
    setSearchQuery,
    statusFilter,
    toggleStatusFilter
}: EmployeeTableFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>All Employees</CardTitle>
            <CardDescription>A list of all employees in the system.</CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search employees..." 
                  className="pl-8 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes("Active")}
                  onCheckedChange={() => toggleStatusFilter("Active")}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes("Deactivated")}
                  onCheckedChange={() => toggleStatusFilter("Deactivated")}
                >
                  Deactivated
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
    )
}
