import { NextResponse } from "next/server";
import { processAgentQuery } from "@/lib/agentEngine";
import { saveOrUpdateChatLead } from "@/lib/leadsStorage";
import { sendNewLeadAdminNotification, isBrevoConfigured } from "@/lib/brevoService";

function extractEmail(text: string): string | undefined {
  const match = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  return match ? match[0] : undefined;
}

function extractPhone(text: string): string | undefined {
  const match = text.match(/(?:\+?\d{1,4}[ -]?)?(?:03\d{2}[ -]?\d{7}|\b\d{10,13}\b)/);
  return match ? match[0] : undefined;
}

function extractName(text: string): string | undefined {
  const match = text.match(/(?:my name is|i am|this is)\s+([A-Za-z\s]{2,30})/i);
  return match ? match[1].trim() : undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide a message for the agent." },
        { status: 400 }
      );
    }

    if (message.trim().length > 2000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (max 2000 characters)." },
        { status: 400 }
      );
    }

    const response = processAgentQuery(message);

    // Save/update query into admin leads database
    const sid =
      typeof sessionId === "string" && sessionId.trim()
        ? sessionId.trim()
        : `session_${Date.now()}`;
    const email = extractEmail(message);
    const phone = extractPhone(message);
    const name = extractName(message);

    let savedLead = null;
    try {
      savedLead = await saveOrUpdateChatLead({
        sessionId: sid,
        userMessage: message.trim(),
        assistantMessage: response.message,
        serviceRequested: response.intent || "Chatbot Portfolio Inquiry",
        extractedEmail: email,
        extractedPhone: phone,
        extractedName: name,
      });

      // If user provided an email, notify admin via Brevo
      if (email && isBrevoConfigured()) {
        sendNewLeadAdminNotification(savedLead).catch((err) =>
          console.warn("[Chat API] Brevo notification warning:", err)
        );
      }
    } catch (saveError) {
      console.error("[Agent Chat Lead Save Error]:", saveError);
    }

    return NextResponse.json({
      success: true,
      ...response,
      leadId: savedLead?.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Agent Chat API Error]:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while processing the agent request." },
      { status: 500 }
    );
  }
}
