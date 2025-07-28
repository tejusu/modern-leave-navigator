
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
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Upload, FileText, X, Download, CheckCircle, AlertTriangle, Info } from "lucide-react";

type BulkImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BulkImportDialog({ open, onOpenChange }: BulkImportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [validRows, setValidRows] = useState<number>(0);
  const [errorRows, setErrorRows] = useState<number>(0);
  const [duplicateRows, setDuplicateRows] = useState<number>(0);
  const [skipInvalidRows, setSkipInvalidRows] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<any[]>([]);

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
    setValidRows(0);
    setErrorRows(0);
    setDuplicateRows(0);
    setSkipInvalidRows(false);
    setPreviewData([]);
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
    
    // Simulate validation and preview (in real implementation, you'd parse the file)
    if (errors.length === 0) {
      // Simulate successful validation with detailed stats
      const mockTotal = Math.floor(Math.random() * 50) + 10;
      const mockErrors = Math.floor(Math.random() * 3);
      const mockDuplicates = Math.floor(Math.random() * 2);
      const mockValid = mockTotal - mockErrors - mockDuplicates;
      
      setValidRows(mockValid);
      setErrorRows(mockErrors);
      setDuplicateRows(mockDuplicates);
      setEmployeeCount(mockTotal);
      
      // Mock preview data
      setPreviewData([
        { name: "John Doe", email: "john@example.com", department: "Engineering", role: "Developer" },
        { name: "Jane Smith", email: "jane@example.com", department: "HR", role: "Manager" },
        { name: "Bob Johnson", email: "bob@example.com", department: "Sales", role: "Executive" }
      ]);
      
      if (mockErrors > 0) {
        errors.push(`Missing Email in Row ${mockTotal - 2}`);
        errors.push(`Invalid Date format in Row ${mockTotal - 1}`);
      }
      
      setIsValid(mockErrors === 0);
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
          <DialogDescription className="text-sm text-muted-foreground">
            Download the official template, fill in the required fields (*), and upload the completed file here.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Template Download Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template (.CSV / .XLSX)
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p><strong>Mandatory Columns:</strong> First Name, Email, DOJ</p>
                        <p><strong>Date format:</strong> YYYY-MM-DD</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-muted-foreground">UTF-8 encoded | Do not alter column names</span>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-3">
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
                      <span className="font-semibold text-primary">Drag & Drop</span> or <span className="font-semibold text-primary">Browse Files</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Accepts: .csv, .xlsx only | Max Size: 5MB</p>
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

          {/* File Preview and Validation */}
          {selectedFile && (
            <div className="space-y-4">
              {/* Preview Table */}
              {previewData.length > 0 && (
                <div className="border rounded-lg p-4 bg-muted/20">
                  <h4 className="font-medium mb-3 text-sm">File Preview (First 3 rows)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Name</th>
                          <th className="text-left p-2 font-medium">Email</th>
                          <th className="text-left p-2 font-medium">Department</th>
                          <th className="text-left p-2 font-medium">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{row.name}</td>
                            <td className="p-2">{row.email}</td>
                            <td className="p-2">{row.department}</td>
                            <td className="p-2">{row.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Validation Summary */}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Valid Rows: <strong>{validRows}</strong>
                </span>
                {errorRows > 0 && (
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Errors: <strong className="text-red-600">{errorRows}</strong>
                  </span>
                )}
                {duplicateRows > 0 && (
                  <span className="flex items-center gap-1">
                    <X className="h-4 w-4 text-orange-600" />
                    Duplicates: <strong className="text-orange-600">{duplicateRows}</strong>
                  </span>
                )}
              </div>

              {/* Error Details */}
              {validationErrors.length > 0 && errorRows > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-2">⚠️ Errors Found:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {validationErrors.filter(error => !error.includes('Invalid file format') && !error.includes('File size')).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {isValid && errorRows === 0 && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <div className="font-semibold">✅ File parsed successfully. {validRows} valid rows ready for import.</div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Skip Invalid Rows Option */}
              {errorRows > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="skip-invalid" 
                    checked={skipInvalidRows}
                    onCheckedChange={(checked) => setSkipInvalidRows(checked as boolean)}
                  />
                  <label htmlFor="skip-invalid" className="text-sm font-medium">
                    Skip invalid rows and import only valid entries
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            disabled={!selectedFile || (!isValid && !skipInvalidRows)} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Import Employees
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
