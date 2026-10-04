import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Basic Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please enter your message." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey || apiKey === "your_brevo_api_key_here") {
      console.error(
        "Brevo API error: BREVO_API_KEY is not set or still has the placeholder value in .env."
      );
      return NextResponse.json(
        {
          error:
            "Email service is not configured yet. Please set your BREVO_API_KEY in .env.",
        },
        { status: 500 }
      );
    }

    const senderEmail = process.env.BREVO_SENDER_EMAIL || "ahmedghulam622@gmail.com";
    const senderName = process.env.BREVO_SENDER_NAME || "Portfolio Contact";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ahmedghulam622@gmail.com";

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject?.trim() || `New Portfolio Message from ${cleanName}`;
    const cleanMessage = message.trim();

    // Call Brevo Transactional Email Endpoint
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: "Arhum Ahmed",
          },
        ],
        replyTo: {
          email: cleanEmail,
          name: cleanName,
        },
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px; color: #f1f5f9; }
                .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4); }
                .header { background: linear-gradient(135deg, #059669, #10b981); padding: 24px; text-align: left; }
                .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
                .header p { margin: 4px 0 0 0; font-size: 13px; color: #d1fae5; }
                .content { padding: 28px 24px; }
                .field { margin-bottom: 20px; }
                .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; font-weight: 600; margin-bottom: 4px; }
                .field-value { font-size: 15px; color: #f3f4f6; font-weight: 500; }
                .message-box { background: #1e293b; border-radius: 8px; border-left: 4px solid #10b981; padding: 16px; margin-top: 8px; }
                .message-text { margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; word-break: break-word; }
                .footer { padding: 18px 24px; background: #0f172a; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280; text-align: center; }
                .footer a { color: #10b981; text-decoration: none; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Portfolio Message</h1>
                  <p>Someone reached out via your portfolio contact form</p>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="field-label">Sender Name</div>
                    <div class="field-value">${cleanName}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Sender Email</div>
                    <div class="field-value">
                      <a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a>
                    </div>
                  </div>
                  <div class="field">
                    <div class="field-label">Subject</div>
                    <div class="field-value">${cleanSubject}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Message</div>
                    <div class="message-box">
                      <p class="message-text">${cleanMessage}</p>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <p style="margin: 0;">Hit <strong>Reply</strong> in your email client to directly respond to ${cleanName} (${cleanEmail}).</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}));
      console.error("Brevo API error response:", errorData);

      const errorMessage =
        (errorData as { message?: string }).message ||
        "Failed to send email through Brevo.";

      return NextResponse.json({ error: errorMessage }, { status: brevoResponse.status });
    }

    const data = await brevoResponse.json().catch(() => ({}));
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      messageId: (data as { messageId?: string }).messageId,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
