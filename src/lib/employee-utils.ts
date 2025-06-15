
import { Employee } from "@/lib/types";

export const generateEmployeeId = (
  employmentType: "Full-time" | "Part-time" | "Contractor" | "Intern",
  existingEmployees: Employee[]
): string => {
  let prefix = "";
  let regex: RegExp;

  switch (employmentType) {
    case "Full-time":
      prefix = "AL";
      regex = /^AL(\d{3})$/;
      break;
    case "Part-time":
      prefix = "AL-PT-";
      regex = /^AL-PT-(\d{2})$/;
      break;
    case "Intern":
      prefix = "AL-INT-";
      regex = /^AL-INT-(\d{2})$/;
      break;
    case "Contractor":
    default:
      prefix = "AL-CT-";
      regex = /^AL-CT-(\d{2})$/;
      break;
  }
  
  const relevantIds = existingEmployees
    .map(e => e.employeeId)
    .filter(id => regex.test(id))
    .map(id => parseInt(id.match(regex)![1], 10));

  const maxId = relevantIds.length > 0 ? Math.max(...relevantIds) : 0;
  const newIdNumber = maxId + 1;

  if (employmentType === "Full-time") {
    return `${prefix}${String(newIdNumber).padStart(3, '0')}`;
  }
  return `${prefix}${String(newIdNumber).padStart(2, '0')}`;
};
