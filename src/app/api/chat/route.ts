import { NextResponse } from "next/server";
import { processUserMessage } from "../../../lib/agent/orchestrator";
import { dbRepository } from "../../../lib/db/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId, pageContext, action } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    if (action === "clear") {
      await dbRepository.clearMessages(sessionId);
      return NextResponse.json({ success: true });
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Get previous messages for context
    const previousMessages = await dbRepository.getMessages(sessionId);

    // Save user message
    await dbRepository.saveMessage(sessionId, {
      id: Date.now().toString(),
      sender: "user",
      text: message
    });

    // Process with Orchestrator (Passing history and context)
    const agentResponse = await processUserMessage(message, previousMessages, pageContext);

    // Save bot message
    await dbRepository.saveMessage(sessionId, {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: agentResponse.text
    });

    return NextResponse.json({ 
      text: agentResponse.text,
      toolUsed: agentResponse.toolUsed,
      options: agentResponse.options
    });

  } catch (error) {
    console.error("[CHAT API ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
