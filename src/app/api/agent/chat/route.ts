import { NextResponse } from "next/server";
import { processAgentQuery } from "@/lib/agentEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

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

    return NextResponse.json({
      success: true,
      ...response,
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
