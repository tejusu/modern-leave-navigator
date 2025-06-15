interface WelcomeEmailParams {
  employee_name: string;
  employee_id: string;
  company_name: string;
}

const defaultWelcomeTemplate = {
  subject: "Welcome to {company_name}!",
  body: "Hi {employee_name},\n\nWelcome to the team! We're excited to have you at {company_name}.\n\nYour employee ID is {employee_id}.\n\nYou can access our employee portal to manage your leaves and personal information.\n\nBest regards,\nThe {company_name} Team",
};

export const getWelcomeEmailTemplate = (): { subject: string; body: string } => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("welcomeEmailTemplate");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.subject === 'string' && typeof parsed.body === 'string') {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse welcome email template from localStorage", e);
      }
    }
  }
  return defaultWelcomeTemplate;
};

export const saveWelcomeEmailTemplate = (template: { subject: string; body: string }) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("welcomeEmailTemplate", JSON.stringify(template));
  }
};

export const sendWelcomeEmail = (employee: { name: string; email: string, employeeId: string }) => {
  const template = getWelcomeEmailTemplate();
  
  const params: WelcomeEmailParams = {
    employee_name: employee.name,
    employee_id: employee.employeeId,
    company_name: "LeaveFlow", // This could be a setting as well
  };

  let { subject, body } = template;

  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    subject = subject.replace(new RegExp(placeholder, 'g'), value);
    body = body.replace(new RegExp(placeholder, 'g'), value);
  });

  console.log("--- Sending Welcome Email ---");
  console.log(`To: ${employee.email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${body}`);
  console.log("----------------------------");
};
