
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

type BulkImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BulkImportDialog({ open, onOpenChange }: BulkImportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    const input = document.getElementById('dropzone-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const handleDownloadSample = () => {
    const csvHeaders = [
      "name", "email", "department", "role", "joiningDate", "employmentType",
      "phone", "reportingManager", "workLocation", "gender", "dateOfBirth", "address", "bloodGroup"
    ];
    const exampleRow = [
      "John Doe", "john.doe@example.com", "Engineering", "Software Developer", "2024-01-15", "Full-time",
      "123-456-7890", "Jane Smith", "New York Office", "Male", "1990-05-20", "123 Main St, Anytown", "O+"
    ];
    const csvContent = "data:text/csv;charset=utf-8," 
      + csvHeaders.join(",") + "\n" 
      + exampleRow.join(",");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_employee_import.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        handleClearFile();
      }
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Import Employees</DialogTitle>
          <DialogDescription>
            Upload a CSV file with employee data. The columns in the CSV must match the required format.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <h4 className="font-medium text-md mb-2">File Format Instructions</h4>
            <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-3 max-h-48 overflow-y-auto">
               <p>Your CSV file should contain a header row with column names that match the fields below. The order of columns does not matter.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                     <h5 className="font-semibold">Required Columns:</h5>
                     <ul className="list-disc list-inside text-muted-foreground text-xs">
                        <li><code>name</code> (Text)</li>
                        <li><code>email</code> (Email format)</li>
                        <li><code>department</code> (Text)</li>
                        <li><code>role</code> (Text)</li>
                        <li><code>joiningDate</code> (YYYY-MM-DD format)</li>
                        <li><code>employmentType</code> (Full-time, Part-time, Contractor, Intern)</li>
                     </ul>
                  </div>
                  <div>
                     <h5 className="font-semibold">Optional Columns:</h5>
                      <ul className="list-disc list-inside text-muted-foreground text-xs">
                        <li><code>phone</code> (Text)</li>
                        <li><code>reportingManager</code> (Full name of an existing employee)</li>
                        <li><code>workLocation</code> (Text)</li>
                        <li><code>gender</code> (Male, Female, Other)</li>
                        <li><code>dateOfBirth</code> (YYYY-MM-DD format)</li>
                        <li><code>address</code> (Text)</li>
                        <li><code>bloodGroup</code> (e.g. A+, O-, etc.)</li>
                      </ul>
                  </div>
               </div>
               <Button variant="link" size="sm" className="p-0 h-auto text-primary" onClick={handleDownloadSample}>
                  Download sample CSV template
               </Button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/80 relative transition-colors">
              {selectedFile ? (
                <div className="text-center p-4">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-foreground text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 rounded-full" onClick={(e) => { e.preventDefault(); handleClearFile(); }}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Clear file</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-3 pb-4">
                  <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-muted-foreground">CSV file (MAX. 5MB)</p>
                </div>
              )}
              <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!selectedFile}>Import Employees</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
