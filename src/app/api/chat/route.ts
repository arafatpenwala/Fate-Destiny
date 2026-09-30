import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { processUserMessage } from "../../../lib/agent/orchestrator";
import { dbRepository } from "../../../lib/db/repository";
import { logger } from "../../../lib/logger";
import { sanitizeText, validateStringLength, validateOptions } from "../../../lib/sanitize";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('sessionId')?.value;
    let isNewSession = false;

    if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('session_')) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      isNewSession = true;
      logger.security("NEW_SESSION_CREATED", { sessionId });
    }

    const body = await req.json();
    const action = body.action ? sanitizeText(body.action) : undefined;
    const message = body.message ? sanitizeText(body.message) : undefined;
    const pageContext = body.pageContext ? sanitizeText(body.pageContext) : undefined;

    if (action === "clear") {
      await dbRepository.clearMessages(sessionId);
      const response = NextResponse.json({ success: true });
      if (isNewSession) {
        response.cookies.set('sessionId', sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        });
      }
      return response;
    }

    if (!message || !validateStringLength(message, 1, 2000)) {
      const response = NextResponse.json({ error: "Invalid or empty message" }, { status: 400 });
      if (isNewSession) {
        response.cookies.set('sessionId', sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        });
      }
      return response;
    }
    
    if (pageContext && !validateStringLength(pageContext, 0, 1000)) {
      return NextResponse.json({ error: "Invalid page context length" }, { status: 400 });
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

    const response = NextResponse.json({ 
      text: agentResponse.text,
      toolUsed: agentResponse.toolUsed,
      options: agentResponse.options
    });

    if (isNewSession) {
      response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
    }

    return response;

  } catch (error: any) {
    logger.error("CHAT_API_ERROR", { error: error.message, stack: error.stack });
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
