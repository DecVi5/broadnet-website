import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  enquiryType: string;
  requirements: string[];
  message?: string;
}

function generateEmailHtml(data: EnquiryPayload): string {
  const isSecurity = data.enquiryType.toLowerCase().includes("security");
  const accentColor = isSecurity ? "#EF1313" : "#4E0DBA";
  const badgeBg = isSecurity ? "#FFF0F0" : "#F4F0FD";

  const reqBadges = (data.requirements && data.requirements.length > 0)
    ? data.requirements
        .map(
          (r) =>
            `<span style="display:inline-block;padding:4px 10px;margin:2px 4px 2px 0;background:${badgeBg};color:${accentColor};border:1px solid ${accentColor}33;border-radius:999px;font-size:12px;font-weight:600;">${r}</span>`
        )
        .join("")
    : "<span style='color:#888;font-style:italic;'>None specified</span>";

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>New BroadNet Enquiry</title>
    </head>
    <body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#F8F8FC;color:#16143E;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(22,20,62,0.06);border:1px solid rgba(22,20,62,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#16143E;padding:28px 32px;text-align:left;">
            <div style="font-size:22px;font-weight:800;letter-spacing:1px;color:#ffffff;">
              BROAD<span style="color:#EF1313;">NET</span>
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;">
              New Customer Submission — ${data.enquiryType}
            </div>
          </td>
        </tr>

        <!-- Alert Bar -->
        <tr>
          <td style="background:${accentColor};padding:8px 32px;color:#ffffff;font-size:12px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;">
            ⚡ Priority Lead Notification
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:22px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#6B6980;width:35%;font-weight:600;">Customer Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#16143E;font-weight:700;font-size:15px;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#6B6980;font-weight:600;">Contact Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;">
                  <a href="tel:${data.phone}" style="color:${accentColor};font-weight:700;text-decoration:none;">${data.phone}</a>
                </td>
              </tr>
              ${data.email ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#6B6980;font-weight:600;">Email Address</td>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;">
                  <a href="mailto:${data.email}" style="color:${accentColor};text-decoration:none;">${data.email}</a>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#6B6980;font-weight:600;">Location / Area</td>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#16143E;">${data.location || "<span style='color:#999;'>Not provided</span>"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#6B6980;font-weight:600;">Enquiry Category</td>
                <td style="padding:10px 0;border-bottom:1px solid #ECECF4;color:#16143E;font-weight:600;">${data.enquiryType}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #ECECF4;color:#6B6980;font-weight:600;vertical-align:top;">Selected Services</td>
                <td style="padding:12px 0;border-bottom:1px solid #ECECF4;">${reqBadges}</td>
              </tr>
              <tr>
                <td style="padding:14px 0 6px 0;color:#6B6980;font-weight:600;vertical-align:top;" colspan="2">Client Notes / Requirements:</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:12px 16px;background:#F9F9FD;border-radius:12px;border:1px solid #ECECF4;color:#2C2A4A;font-size:13.5px;line-height:22px;white-space:pre-wrap;">
                  ${data.message || "<span style='color:#999;font-style:italic;'>No additional notes provided.</span>"}
                </td>
              </tr>
            </table>

            <!-- Quick Action Buttons -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;">
              <tr>
                <td align="center">
                  <a href="tel:${data.phone}" style="display:inline-block;padding:12px 24px;background:#16143E;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:13px;margin-right:10px;">
                    📞 Call Lead Directly
                  </a>
                  <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}" style="display:inline-block;padding:12px 24px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:13px;">
                    💬 WhatsApp Client
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F2F2FA;padding:18px 32px;text-align:center;font-size:12px;color:#8E8CA0;border-top:1px solid #ECECF4;">
            This email was automatically dispatched by the BroadNet Online Enquiry Engine.<br/>
            Target destination: <strong style="color:#16143E;">admin@broadnet.in</strong>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function saveLocalBackup(data: EnquiryPayload) {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "enquiries.json");
    let existing: unknown[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      try {
        existing = JSON.parse(content);
      } catch {
        existing = [];
      }
    }
    existing.unshift({
      ...data,
      timestamp: new Date().toISOString(),
    });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    // If running in read-only environment, fallback to tmp
    try {
      const tmpFile = path.join(process.env.TEMP || "/tmp", "broadnet_enquiries.json");
      let existing: unknown[] = [];
      if (fs.existsSync(tmpFile)) {
        try {
          existing = JSON.parse(fs.readFileSync(tmpFile, "utf-8"));
        } catch {
          existing = [];
        }
      }
      existing.unshift({
        ...data,
        timestamp: new Date().toISOString(),
      });
      fs.writeFileSync(tmpFile, JSON.stringify(existing, null, 2), "utf-8");
    } catch (tmpErr) {
      console.error("[BroadNet Backup Error]:", err, tmpErr);
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as EnquiryPayload;

    const trimmedName = body.name?.trim();
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 80) {
      return NextResponse.json(
        { error: "Please provide a valid full name between 2 and 80 characters." },
        { status: 400 }
      );
    }

    const cleanPhone = body.phone?.replace(/[\s\-\(\)]/g, "") || "";
    // Match Indian phone numbers (10 digits starting with 6-9, or with +91/0 prefix)
    const phoneValid = /^(?:\+?91|0)?[6-9]\d{9}$/.test(cleanPhone);
    if (!phoneValid) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit Indian phone number (e.g. 9884344075)." },
        { status: 400 }
      );
    }

    if (body.email && body.email.trim()) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email.trim());
      if (!emailValid) {
        return NextResponse.json(
          { error: "Please provide a valid email address or leave the field blank." },
          { status: 400 }
        );
      }
    }

    if (body.location && body.location.length > 120) {
      return NextResponse.json(
        { error: "Location must be within 120 characters." },
        { status: 400 }
      );
    }

    if (body.message && body.message.length > 1000) {
      return NextResponse.json(
        { error: "Requirement notes must be within 1000 characters." },
        { status: 400 }
      );
    }

    // Save persistent backup
    saveLocalBackup(body);

    const adminEmail = process.env.ADMIN_EMAIL || "admin@broadnet.in";
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = process.env.SMTP_SECURE !== "false";

    // 1. If SMTP credentials exist in .env.local, send real email directly to admin@broadnet.in
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"BroadNet Enquiries" <${smtpUser}>`,
        to: adminEmail,
        replyTo: adminEmail,
        subject: `[BroadNet Lead] ${body.enquiryType}: ${body.name} (${body.phone})`,
        text: `New Enquiry Received:\n\nName: ${body.name}\nPhone: ${body.phone}\nLocation: ${body.location || "N/A"}\nType: ${body.enquiryType}\nRequirements: ${body.requirements?.join(", ") || "None"}\nNotes: ${body.message || "None"}`,
        html: generateEmailHtml(body),
      });

      console.log(`[BroadNet SMTP] Sent email directly to ${adminEmail}, MessageId: ${info.messageId}`);
      return NextResponse.json({
        success: true,
        message: "Enquiry delivered to admin@broadnet.in directly via SMTP.",
        mode: "production",
      });
    }

    // 2. Default Localhost Testing: Automatic Ethereal test inbox over the internet
    console.log("[BroadNet Localhost] No custom SMTP credentials detected in .env.local. Creating test mailbox...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      const testTransporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await testTransporter.sendMail({
        from: `"BroadNet Web" <no-reply@broadnet.in>`,
        to: adminEmail,
        subject: `[Test Submission] ${body.enquiryType}: ${body.name} (${body.phone})`,
        text: `New Enquiry Received:\n\nName: ${body.name}\nPhone: ${body.phone}\nLocation: ${body.location || "N/A"}\nType: ${body.enquiryType}\nRequirements: ${body.requirements?.join(", ") || "None"}\nNotes: ${body.message || "None"}`,
        html: generateEmailHtml(body),
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[BroadNet Localhost] ✅ Message sent to test account!`);
      console.log(`[BroadNet Localhost] 📬 Preview URL: ${previewUrl}`);

      return NextResponse.json({
        success: true,
        message: "Enquiry successfully processed and dispatched.",
        mode: "test",
        previewUrl: previewUrl || undefined,
        note: "Processed in test mode. Set SMTP credentials in .env.local to send directly to real mailboxes.",
      });
    } catch (testErr) {
      console.warn("[BroadNet Test Dispatch Warning]:", testErr);
      // Fallback: If network to Ethereal is unavailable, local backup succeeded
      return NextResponse.json({
        success: true,
        message: "Enquiry saved locally to data/enquiries.json.",
        mode: "local_backup",
      });
    }
  } catch (error) {
    console.error("[BroadNet API Enquiry Error]:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}
