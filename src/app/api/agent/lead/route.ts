import { NextResponse } from "next/server";
import { createLead } from "@/lib/leadsStorage";
import {
  sendNewLeadAdminNotification,
  sendLeadVisitorConfirmation,
  isBrevoConfigured,
} from "@/lib/brevoService";

function sanitize(input?: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // strip HTML tags
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      serviceRequested,
      projectType,
      projectDescription,
      budgetRange,
      expectedTimeline,
      conversationSummary,
      conversationSnippet,
    } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }
    if (name.trim().length > 120) {
      return NextResponse.json(
        { success: false, error: "Name must be 120 characters or fewer." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your email address." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.trim().length > 254) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    if (
      !serviceRequested ||
      typeof serviceRequested !== "string" ||
      !serviceRequested.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Please select or specify a required service." },
        { status: 400 }
      );
    }

    if (
      !projectDescription ||
      typeof projectDescription !== "string" ||
      projectDescription.trim().length < 5
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a brief description of your project (at least 5 characters).",
        },
        { status: 400 }
      );
    }
    if (projectDescription.trim().length > 5000) {
      return NextResponse.json(
        { success: false, error: "Project description is too long (max 5,000 characters)." },
        { status: 400 }
      );
    }

    // 2. Sanitization
    const cleanName = sanitize(name);
    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany = sanitize(company);
    const cleanService = sanitize(serviceRequested);
    const cleanProjectType = sanitize(projectType || serviceRequested);
    const cleanDescription = sanitize(projectDescription);
    const cleanBudget = sanitize(budgetRange || "Flexible / To be discussed");
    const cleanTimeline = sanitize(expectedTimeline || "Flexible");
    const cleanSummary = sanitize(conversationSummary || "");

    // 3. Create persistent structured lead
    const newLead = await createLead({
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || undefined,
      serviceRequested: cleanService,
      projectType: cleanProjectType,
      projectDescription: cleanDescription,
      budgetRange: cleanBudget,
      expectedTimeline: cleanTimeline,
      source: "ai_agent",
      status: "QUALIFIED",
      conversationSummary: cleanSummary,
      conversationSnippet: Array.isArray(conversationSnippet)
        ? conversationSnippet.slice(-8)
        : undefined,
    });

    // 4. Automated Brevo Email Triggers (Non-blocking errors)
    let emailDispatched = false;
    let confirmationDispatched = false;

    if (isBrevoConfigured()) {
      try {
        const [adminResult, visitorResult] = await Promise.allSettled([
          sendNewLeadAdminNotification(newLead),
          sendLeadVisitorConfirmation(newLead),
        ]);

        if (adminResult.status === "fulfilled" && adminResult.value.success) {
          emailDispatched = true;
        } else {
          console.warn("[Lead API] Admin email dispatch result:", adminResult);
        }

        if (visitorResult.status === "fulfilled" && visitorResult.value.success) {
          confirmationDispatched = true;
        } else {
          console.warn("[Lead API] Visitor confirmation email dispatch result:", visitorResult);
        }
      } catch (emailErr) {
        console.error("[Lead API] Brevo trigger error:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead created and qualified successfully!",
      lead: newLead,
      notifications: {
        adminNotified: emailDispatched,
        visitorConfirmed: confirmationDispatched,
      },
    });
  } catch (error) {
    console.error("[Lead Submission API Error]:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving the lead." },
      { status: 500 }
    );
  }
}
