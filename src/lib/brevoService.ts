import { Lead } from "./leadsStorage";

interface BrevoEmailPayload {
  sender: {
    name: string;
    email: string;
  };
  to: Array<{
    email: string;
    name?: string;
  }>;
  replyTo?: {
    email: string;
    name?: string;
  };
  subject: string;
  htmlContent: string;
}

export function isBrevoConfigured(): boolean {
  const apiKey = process.env.BREVO_API_KEY;
  return Boolean(apiKey && apiKey !== "your_brevo_api_key_here" && !apiKey.startsWith("placeholder"));
}

async function sendBrevoEmail(payload: BrevoEmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || apiKey === "your_brevo_api_key_here") {
    console.warn("[Brevo] API key not configured. Email dispatch skipped in local/preview mode.");
    return { success: false, error: "Brevo API key not configured" };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = (errData as { message?: string }).message || `Brevo HTTP error ${res.status}`;
      console.error("[Brevo] Dispatch error:", errMsg);
      return { success: false, error: errMsg };
    }

    const data = await res.json().catch(() => ({}));
    return { success: true, messageId: (data as { messageId?: string }).messageId };
  } catch (error) {
    console.error("[Brevo] Network error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Network error" };
  }
}

/**
 * Sends a notification email to Ghulam Ahmed when a visitor is qualified by the AI Agent
 */
export async function sendNewLeadAdminNotification(lead: Lead) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "ahmedghulam622@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Portfolio AI Agent";
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ahmedghulam622@gmail.com";

  const subject = `[New Qualified Lead] ${lead.name} — ${lead.serviceRequested} (${lead.budgetRange})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080811; margin: 0; padding: 24px; color: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background: #0f1322; border: 1px solid #10b98144; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6); }
          .header { background: linear-gradient(135deg, #047857, #10b981); padding: 24px 28px; text-align: left; }
          .badge { display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.2); border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; margin-bottom: 8px; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #d1fae5; }
          .content { padding: 28px 24px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
          .field { margin-bottom: 16px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #10b981; font-weight: 700; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #f3f4f6; font-weight: 500; }
          .desc-box { background: #161c30; border-radius: 10px; border-left: 4px solid #10b981; padding: 16px; margin-top: 6px; }
          .desc-text { margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
          .summary-box { background: #0e241e; border: 1px dashed #10b98166; border-radius: 10px; padding: 14px; margin-top: 16px; }
          .summary-text { margin: 0; font-size: 13px; color: #6ee7b7; line-height: 1.5; }
          .cta-row { margin-top: 24px; padding-top: 20px; border-top: 1px solid #ffffff15; text-align: center; }
          .btn-reply { display: inline-block; padding: 12px 28px; background: #10b981; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(16,185,129,0.3); }
          .footer { padding: 16px 24px; background: #080a14; border-top: 1px solid #1e293b; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">🤖 AI Agent Qualified Lead</div>
            <h1>New Project Inquiry</h1>
            <p>A website visitor completed the Portfolio Automation Agent qualification workflow.</p>
          </div>
          <div class="content">
            <div class="grid">
              <div class="field">
                <div class="field-label">Visitor Name</div>
                <div class="field-value">${lead.name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email Address</div>
                <div class="field-value">
                  <a href="mailto:${lead.email}" style="color: #38bdf8; text-decoration: none;">${lead.email}</a>
                </div>
              </div>
            </div>

            <div class="grid">
              <div class="field">
                <div class="field-label">Company / Org</div>
                <div class="field-value">${lead.company || "Individual / Not specified"}</div>
              </div>
              <div class="field">
                <div class="field-label">Service Requested</div>
                <div class="field-value" style="color: #34d399; font-weight: 700;">${lead.serviceRequested}</div>
              </div>
            </div>

            <div class="grid">
              <div class="field">
                <div class="field-label">Budget Range</div>
                <div class="field-value" style="color: #fbbf24; font-weight: 600;">${lead.budgetRange}</div>
              </div>
              <div class="field">
                <div class="field-label">Expected Timeline</div>
                <div class="field-value">${lead.expectedTimeline}</div>
              </div>
            </div>

            <div class="field">
              <div class="field-label">Project Requirements & Scope</div>
              <div class="desc-box">
                <p class="desc-text">${lead.projectDescription}</p>
              </div>
            </div>

            ${
              lead.conversationSummary
                ? `
            <div class="field">
              <div class="field-label">AI Conversation Summary</div>
              <div class="summary-box">
                <p class="summary-text">${lead.conversationSummary}</p>
              </div>
            </div>
            `
                : ""
            }

            <div class="cta-row">
              <a href="mailto:${lead.email}?subject=Re:%20Project%20Inquiry%20%E2%80%94%20${encodeURIComponent(
    lead.serviceRequested
  )}" class="btn-reply">Reply to ${lead.name}</a>
            </div>
          </div>
          <div class="footer">
            Ghulam Ahmed Portfolio Automation Agent • Lead ID: ${lead.id} • ${new Date(
    lead.createdAt
  ).toLocaleString("en-US", { timeZone: "Asia/Karachi" })} PKT
          </div>
        </div>
      </body>
    </html>
  `;

  return sendBrevoEmail({
    sender: { name: senderName, email: senderEmail },
    to: [{ email: receiverEmail, name: "Ghulam Ahmed" }],
    replyTo: { email: lead.email, name: lead.name },
    subject,
    htmlContent,
  });
}

/**
 * Sends an automated confirmation email to the visitor who submitted their project requirement
 */
export async function sendLeadVisitorConfirmation(lead: Lead) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "ahmedghulam622@gmail.com";
  const senderName = "Ghulam Ahmed — Software & Automation Engineer";

  const subject = `Inquiry Confirmed: Thank you for reaching out, ${lead.name}!`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px; color: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4); }
          .header { background: linear-gradient(135deg, #059669, #10b981); padding: 28px 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
          .header p { margin: 6px 0 0 0; font-size: 14px; color: #d1fae5; }
          .content { padding: 28px 24px; }
          .salutation { font-size: 16px; font-weight: 600; color: #f9fafb; margin-bottom: 14px; }
          .text { font-size: 14px; line-height: 1.6; color: #d1d5db; margin-bottom: 16px; }
          .recap-box { background: #1e293b; border-radius: 10px; border-left: 4px solid #10b981; padding: 18px; margin: 20px 0; }
          .recap-item { margin-bottom: 10px; font-size: 13px; color: #e2e8f0; }
          .recap-item strong { color: #10b981; }
          .badge-next { display: inline-block; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; color: #34d399; font-size: 12px; font-weight: 600; margin-bottom: 10px; }
          .actions { margin-top: 24px; padding-top: 20px; border-top: 1px solid #374151; display: flex; gap: 12px; flex-wrap: wrap; }
          .btn-wa { display: inline-block; padding: 10px 20px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; }
          .btn-portfolio { display: inline-block; padding: 10px 20px; background: #1f2937; border: 1px solid #374151; color: #f3f4f6; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; }
          .signature { margin-top: 24px; font-size: 14px; color: #9ca3af; line-height: 1.5; }
          .footer { padding: 18px 24px; background: #0f172a; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Inquiry Confirmed</h1>
            <p>Your project requirements were received successfully via my AI Agent</p>
          </div>
          <div class="content">
            <div class="salutation">Hi ${lead.name},</div>
            <p class="text">
              Thank you for visiting my portfolio and submitting your project requirement through my AI automation agent. I have received your structured project details and will review them carefully.
            </p>

            <div class="recap-box">
              <div class="badge-next">📋 Submitted Project Summary</div>
              <div class="recap-item"><strong>Service Requested:</strong> ${lead.serviceRequested}</div>
              <div class="recap-item"><strong>Budget Range:</strong> ${lead.budgetRange}</div>
              <div class="recap-item"><strong>Expected Timeline:</strong> ${lead.expectedTimeline}</div>
              <div class="recap-item" style="margin-bottom: 0;"><strong>Scope Overview:</strong> ${lead.projectDescription}</div>
            </div>

            <p class="text">
              <strong>What happens next?</strong><br>
              I usually review inquiries and follow up within <strong>12 to 24 hours</strong> with architectural feedback, potential timelines, and scheduling an initial discussion.
            </p>

            <p class="text">
              Need immediate discussion or prefer quick messaging? Feel free to reach me directly on WhatsApp:
            </p>

            <div class="actions">
              <a href="https://wa.me/923235678381?text=Hi%20Ghulam!%20I%20just%20submitted%20a%20project%20inquiry%20(${encodeURIComponent(
    lead.serviceRequested
  )})%20and%20would%20like%20to%20connect." class="btn-wa">Direct WhatsApp Connect</a>
              <a href="https://my-portfolio-delta-ten-19.vercel.app/" class="btn-portfolio">Back to Portfolio</a>
            </div>

            <div class="signature">
              Warm regards,<br>
              <strong style="color: #f3f4f6;">Ghulam Ahmed</strong><br>
              Software Department Intern @ Revive Medical Technologies<br>
              BS Information Engineering Technology, Foundation University Islamabad<br>
              <a href="mailto:ahmedghulam622@gmail.com" style="color: #10b981; text-decoration: none;">ahmedghulam622@gmail.com</a> • +92 323 5678381
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Ghulam Ahmed. This is an automated confirmation sent via Brevo.
          </div>
        </div>
      </body>
    </html>
  `;

  return sendBrevoEmail({
    sender: { name: senderName, email: senderEmail },
    to: [{ email: lead.email, name: lead.name }],
    replyTo: { email: senderEmail, name: "Ghulam Ahmed" },
    subject,
    htmlContent,
  });
}
