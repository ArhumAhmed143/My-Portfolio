import { NextResponse } from "next/server";
import {
  getLeads,
  updateLeadStatus,
  deleteLead,
  getLeadsSummary,
  LeadStatus,
} from "@/lib/leadsStorage";

function verifyAdminAuth(req: Request): boolean {
  const passcode = process.env.ADMIN_PASSCODE || "ghulam-admin-2026";
  const headerCode = req.headers.get("x-admin-passcode");
  const authHeader = req.headers.get("authorization");

  if (headerCode && headerCode === passcode) return true;
  if (authHeader && authHeader.replace(/^Bearer\s+/i, "").trim() === passcode) return true;

  return false;
}

// GET /api/agent/leads - Fetch all leads and summary metrics
export async function GET(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const searchQuery = searchParams.get("q")?.toLowerCase();

    let leads = await getLeads();
    const summary = await getLeadsSummary();

    if (statusFilter && statusFilter !== "ALL") {
      leads = leads.filter((l) => l.status === statusFilter);
    }

    if (searchQuery) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(searchQuery) ||
          l.email.toLowerCase().includes(searchQuery) ||
          (l.company && l.company.toLowerCase().includes(searchQuery)) ||
          l.serviceRequested.toLowerCase().includes(searchQuery) ||
          l.projectDescription.toLowerCase().includes(searchQuery)
      );
    }

    return NextResponse.json({
      success: true,
      summary,
      leads,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Admin Leads GET error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve leads." },
      { status: 500 }
    );
  }
}

// PATCH /api/agent/leads - Update lead status or admin notes
export async function PATCH(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Lead ID is required." },
        { status: 400 }
      );
    }

    const validStatuses: LeadStatus[] = [
      "NEW",
      "QUALIFIED",
      "CONTACTED",
      "IN PROGRESS",
      "COMPLETED",
      "REJECTED",
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updatedLead = await updateLeadStatus(id, status, notes);
    if (!updatedLead) {
      return NextResponse.json(
        { success: false, error: "Lead not found." },
        { status: 404 }
      );
    }

    const summary = await getLeadsSummary();

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      summary,
    });
  } catch (error) {
    console.error("[Admin Leads PATCH error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead." },
      { status: 500 }
    );
  }
}

// DELETE /api/agent/leads - Remove a lead
export async function DELETE(req: Request) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required in query params." },
        { status: 400 }
      );
    }

    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead not found or could not be deleted." },
        { status: 404 }
      );
    }

    const summary = await getLeadsSummary();

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully.",
      summary,
    });
  } catch (error) {
    console.error("[Admin Leads DELETE error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead." },
      { status: 500 }
    );
  }
}
