import { NextResponse } from "next/server";
import { dbRepository } from "../../../lib/db/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate lead
    if (!body.name || !body.email || !body.service) {
      return NextResponse.json({ error: "Missing required lead fields" }, { status: 400 });
    }

    const leadId = await dbRepository.createLead({
      name: body.name,
      email: body.email,
      company: body.company,
      requested_service: body.service,
      requirements: body.description,
      lead_status: "new",
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, leadId });

  } catch (error) {
    console.error("[LEADS API ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
