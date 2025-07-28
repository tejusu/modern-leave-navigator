
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, X, Download, CheckCircle, AlertTriangle } from "lucide-react";

type BulkImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BulkImportDialog({ open, onOpenChange }: BulkImportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      validateFile(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setValidationErrors([]);
    setIsValid(null);
    setEmployeeCount(0);
    const input = document.getElementById('dropzone-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const validateFile = (file: File) => {
    const errors: string[] = [];
    
    // Check file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.csv')) {
      errors.push('Invalid file format. Please use .xlsx or .csv files only.');
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      errors.push('File size exceeds 5MB limit.');
    }
    
    // Simulate validation (in real implementation, you'd parse the file)
    if (errors.length === 0) {
      // Simulate successful validation
      const mockEmployeeCount = Math.floor(Math.random() * 50) + 10;
      setEmployeeCount(mockEmployeeCount);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    
    setValidationErrors(errors);
  };

  const handleDownloadTemplate = () => {
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
    link.setAttribute("download", "bulk_employee_import_template.xlsx");
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
            Upload employee data using the provided Excel template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: Download Template */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <h3 className="font-semibold">Download Template</h3>
            </div>
            <Button 
              variant="outline" 
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Template (.xlsx)
            </Button>
          </div>

          {/* Step 2: Upload File */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <h3 className="font-semibold">Upload Filled File</h3>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50 relative transition-colors">
                {selectedFile ? (
                  <div className="text-center p-4 w-full">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold text-foreground text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={(e) => { e.preventDefault(); handleClearFile(); }}>
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-3 pb-4">
                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Supported format: .xlsx | Max size: 5MB</p>
                  </div>
                )}
                <input 
                  id="dropzone-file" 
                  type="file" 
                  className="hidden" 
                  accept=".xlsx,.csv" 
                  onChange={handleFileChange} 
                />
              </label>
            </div>
          </div>

          {/* Validation Results */}
          {selectedFile && (
            <div className="space-y-3">
              {validationErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-2">The following errors were found:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {isValid && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <div className="font-semibold">✅ File uploaded successfully.</div>
                    <p className="text-sm mt-1">{employeeCount} employees are ready to be imported.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            disabled={!selectedFile || !isValid} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Import Employees
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
