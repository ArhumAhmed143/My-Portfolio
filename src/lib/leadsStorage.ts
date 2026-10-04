import fs from "fs";
import path from "path";

export type LeadStatus =
  | "NEW"
  | "QUALIFIED"
  | "CONTACTED"
  | "IN PROGRESS"
  | "COMPLETED"
  | "REJECTED";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  serviceRequested: string;
  projectType: string;
  projectDescription: string;
  budgetRange: string;
  expectedTimeline: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  source: "ai_agent" | "contact_form" | "whatsapp";
  conversationSummary?: string;
  conversationSnippet?: Array<{ role: "user" | "assistant"; content: string }>;
  notes?: string;
  ipAddress?: string;
}

export interface LeadsSummary {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  contactedLeads: number;
  inProgressLeads: number;
  completedLeads: number;
  rejectedLeads: number;
}

// In-memory fallback / cache
let memoryLeads: Lead[] = [
  {
    id: "lead_sample_01",
    name: "Marcus Vance",
    email: "marcus.vance@apexcloud.io",
    company: "Apex Cloud Systems",
    serviceRequested: "Multi-Tenant SaaS Platforms",
    projectType: "Enterprise Cloud Application",
    projectDescription:
      "Looking for an expert to architect a multi-tenant client portal with isolated tenant databases, automated role-based permissions, and Render cloud deployment.",
    budgetRange: "$3,000 - $5,000",
    expectedTimeline: "1 Month",
    status: "QUALIFIED",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    source: "ai_agent",
    conversationSummary:
      "Client inquired about SaaS Multi-Tenant Automation Platform, verified requirements, and completed AI qualification for 1-month delivery.",
    notes: "Followed up via email regarding architectural schema.",
  },
  {
    id: "lead_sample_02",
    name: "Sarah Jenkins",
    email: "s.jenkins@retailpulse.com",
    company: "RetailPulse Solutions",
    serviceRequested: "POS & Inventory Automation",
    projectType: "Multi-Store Retail POS",
    projectDescription:
      "Need a modern offline-capable retail POS system with multi-branch synchronization and automated low-stock inventory alerts.",
    budgetRange: "$5,000+",
    expectedTimeline: "2-3 Months",
    status: "NEW",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    source: "ai_agent",
    conversationSummary:
      "Visitor asked about the Cloud-Based Multi-Store POS project and wants a customized implementation for their 4 retail outlets.",
    notes: "New automated lead awaiting introductory call.",
  },
];

function getStorageFilePath(): string {
  const primaryDir = path.join(process.cwd(), "data");
  const primaryFile = path.join(primaryDir, "leads.json");

  try {
    if (!fs.existsSync(primaryDir)) {
      fs.mkdirSync(primaryDir, { recursive: true });
    }
    return primaryFile;
  } catch {
    // If running in a read-only root (e.g. Vercel serverless), use /tmp
    const tmpDir = path.join("/tmp", "portfolio-data");
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      return path.join(tmpDir, "leads.json");
    } catch {
      return primaryFile;
    }
  }
}

export function readLeadsFromDisk(): Lead[] {
  const filePath = getStorageFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryLeads = parsed;
        return parsed;
      }
    }
    // Write defaults if file doesn't exist yet
    writeLeadsToDisk(memoryLeads);
    return memoryLeads;
  } catch (error) {
    console.warn("Could not read leads file, using in-memory cache:", error);
    return memoryLeads;
  }
}

export function writeLeadsToDisk(leads: Lead[]): boolean {
  memoryLeads = leads;
  const filePath = getStorageFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.warn("Could not write leads file, retained in memory:", error);
    return false;
  }
}

export async function getLeads(): Promise<Lead[]> {
  return readLeadsFromDisk().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const leads = await getLeads();
  return leads.find((lead) => lead.id === id) || null;
}

export async function createLead(
  data: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status"> & {
    status?: LeadStatus;
  }
): Promise<Lead> {
  const leads = await getLeads();
  const newLead: Lead = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: data.status || "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  writeLeadsToDisk(leads);
  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  notes?: string
): Promise<Lead | null> {
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    status,
    notes: notes !== undefined ? notes : leads[index].notes,
    updatedAt: new Date().toISOString(),
  };

  writeLeadsToDisk(leads);
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;

  writeLeadsToDisk(filtered);
  return true;
}

export async function getLeadsSummary(): Promise<LeadsSummary> {
  const leads = await getLeads();
  return {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "NEW").length,
    qualifiedLeads: leads.filter((l) => l.status === "QUALIFIED").length,
    contactedLeads: leads.filter((l) => l.status === "CONTACTED").length,
    inProgressLeads: leads.filter((l) => l.status === "IN PROGRESS").length,
    completedLeads: leads.filter((l) => l.status === "COMPLETED").length,
    rejectedLeads: leads.filter((l) => l.status === "REJECTED").length,
  };
}
