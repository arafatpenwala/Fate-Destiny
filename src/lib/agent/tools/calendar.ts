import { dbRepository } from "../../../lib/db/repository";

export async function executeCalendarTool(inputs: { action: "check_availability" | "book"; date?: string; email?: string }) {
  console.log("[CALENDAR TOOL] Executing with inputs:", inputs);
  
  if (!process.env.CALENDAR_API_KEY) {
    console.warn("[CALENDAR TOOL] No CALENDAR_API_KEY found. Running in mock mode.");
    
    let result;
    if (inputs.action === "check_availability") {
      result = { success: true, availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"], message: "Mock availability retrieved" };
    } else {
      result = { success: true, bookingId: `book_${Date.now()}`, message: "Mock appointment booked safely" };
    }

    await dbRepository.logToolExecution("Calendar", inputs, result);
    return result;
  }

  // Real API implementation goes here
  return { success: true, message: "Calendar operation successful" };
}
