import { dbRepository } from "../../../lib/db/repository";

export async function executeWhatsappTool(inputs: { phone: string; message: string }) {
  console.log("[WHATSAPP TOOL] Executing with inputs:", inputs);
  
  if (!process.env.WHATSAPP_API_KEY) {
    console.warn("[WHATSAPP TOOL] No WHATSAPP_API_KEY found. Running in mock mode.");
    
    const result = { success: true, message: `WhatsApp message mocked to ${inputs.phone}` };
    await dbRepository.logToolExecution("WhatsApp", inputs, result);
    return result;
  }

  // Real API implementation goes here
  return { success: true, message: "Message sent via WhatsApp API" };
}
