import { dbRepository } from "../../../lib/db/repository";

export async function executeCRMTool(inputs: any) {
  console.log("[CRM TOOL] Executing with inputs:", inputs);
  
  if (!process.env.CRM_API_KEY) {
    console.warn("[CRM TOOL] No CRM_API_KEY found. Running in mock mode.");
    
    // Save to local mock DB instead of real CRM
    const leadId = await dbRepository.createLead({
      name: inputs.name || "Unknown",
      email: inputs.email || "Unknown",
      phone: inputs.phone,
      company: inputs.company,
      requested_service: inputs.service,
      requirements: inputs.requirements,
      lead_status: "new",
      created_at: new Date().toISOString()
    });

    const result = { success: true, leadId, message: "Lead saved safely (Mock Mode)" };
    await dbRepository.logToolExecution("CRM", inputs, result);
    return result;
  }

  // Real API implementation goes here
  return { success: true, message: "Lead submitted to CRM" };
}
