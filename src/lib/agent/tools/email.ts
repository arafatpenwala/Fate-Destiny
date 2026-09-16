import { dbRepository } from "../../../lib/db/repository";

export async function executeEmailTool(inputs: { to: string; subject: string; body: string }) {
  console.log("[EMAIL TOOL] Executing with inputs:", inputs);
  
  // Note: Standard project doesn't have an email provider key (e.g. SendGrid/Resend) by default.
  // Using Mock Mode safely.
  
  const result = { success: true, message: `Email mocked to ${inputs.to}` };
  await dbRepository.logToolExecution("Email", inputs, result);
  
  return result;
}
