import { NextResponse } from "next/server";
import { dbRepository } from "../../../lib/db/repository";
import { logger } from "../../../lib/logger";
import { sanitizeText, validateEmail, validateStringLength } from "../../../lib/sanitize";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate lead types and required fields
    if (!validateStringLength(body.name, 1, 100)) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!validateStringLength(body.service, 1, 100)) {
      return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
    }

    // Optional fields validation if they exist
    if (body.company && !validateStringLength(body.company, 0, 150)) {
      return NextResponse.json({ error: "Invalid company name length" }, { status: 400 });
    }
    if (body.description && !validateStringLength(body.description, 0, 3000)) {
      return NextResponse.json({ error: "Description is too long" }, { status: 400 });
    }

    // Sanitize inputs
    const safeName = sanitizeText(body.name);
    const safeEmail = sanitizeText(body.email).toLowerCase();
    const safeCompany = body.company ? sanitizeText(body.company) : undefined;
    const safeService = sanitizeText(body.service);
    const safeDescription = body.description ? sanitizeText(body.description) : undefined;

    const leadId = await dbRepository.createLead({
      name: safeName,
      email: safeEmail,
      company: safeCompany,
      requested_service: safeService,
      requirements: safeDescription,
      lead_status: "new",
      created_at: new Date().toISOString()
    });

    logger.info("NEW_LEAD_CREATED", { leadId, service: safeService });

    return NextResponse.json({ success: true, leadId });

  } catch (error: any) {
    logger.error("LEADS_API_ERROR", { error: error.message, stack: error.stack });
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
