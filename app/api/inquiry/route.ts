import { Resend } from "resend";
import { NextResponse } from "next/server";
import { insertHostLead } from "@/app/lib/db";

const NOTIFY_TO = "ryan@salishtrading.com";
const FROM = "Salish Trading Co. <hello@salishtrading.com>";

// Minimal HTML escaping so user input can't break out of the email markup.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const businessName = String(body.businessName ?? "").trim();
  const venueType = String(body.venueType ?? "").trim();
  const neighborhood = String(body.neighborhood ?? "").trim();
  const contactName = String(body.contactName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const notes = String(body.notes ?? "").trim();

  if (!businessName || !venueType || !contactName || !email) {
    return NextResponse.json(
      { error: "Business name, venue type, contact name, and email are required." },
      { status: 400 }
    );
  }

  // 1. Persist the lead — this is the durable record. If it fails, the whole
  //    submission fails so we never silently lose a host.
  try {
    await insertHostLead({
      businessName,
      venueType,
      neighborhood: neighborhood || null,
      contactName,
      email,
      phone: phone || null,
      notes: notes || null,
    });
  } catch (error) {
    console.error("Failed to store host lead:", error);
    return NextResponse.json(
      { error: "Failed to save your submission. Please try again." },
      { status: 500 }
    );
  }

  // 2. Email notification + confirmation — best effort. The lead is already
  //    saved, so a mail failure (e.g. missing API key locally) shouldn't fail
  //    the request.
  // Live-event inquiries are a different product (a pack-ripping host), so they
  // get their own notification subject and confirmation copy — not the vending
  // host-machine recap.
  const isEvent = venueType === "Event or wedding planner";

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        subject: `${isEvent ? "New event lead" : "New host lead"}: ${businessName} (${venueType})`,
        replyTo: email,
        html: `
          <h2>${isEvent ? "New Live-Event Inquiry" : "New Host Waitlist Submission"}</h2>
          <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
          <p><strong>Venue type:</strong> ${escapeHtml(venueType)}</p>
          <p><strong>Neighborhood:</strong> ${escapeHtml(neighborhood) || "Not specified"}</p>
          <p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone) || "Not specified"}</p>
          <p><strong>Anything else:</strong> ${escapeHtml(notes) || "None"}</p>
        `,
      });

      await resend.emails.send({
        from: FROM,
        to: email,
        subject: isEvent
          ? "Thanks for reaching out — Salish Trading Co."
          : "You're on the founding-host list",
        html: isEvent
          ? `
          <h2>Thanks, ${escapeHtml(contactName)}!</h2>
          <p>Got your note about ${escapeHtml(businessName)}. We'll be in touch about bringing a live pack-ripping host to your events.</p>
          <p>Quick version: a host opens trading-card packs with your guests, works the room, and turns the big pulls into a shared moment — premium live entertainment for weddings, corporate parties, and private events. It typically runs a few hours, with an optional video add-on.</p>
          <p>Reply to this email anytime.</p>
          <p>— The Salish Trading Co. team</p>
        `
          : `
          <h2>Thanks, ${escapeHtml(contactName)}!</h2>
          <p>We've added ${escapeHtml(businessName)} to our founding-host list. We'll be in touch to talk through the details.</p>
          <p>Quick recap of how it works: we own, stock, service, and insure the machine and run the payments. You give it a few square feet and an outlet, and earn a cut of every sale — or a flat monthly rent, your choice.</p>
          <p>Reply to this email anytime if you have questions.</p>
          <p>— The Salish Trading Co. team</p>
        `,
      });
    } catch (error) {
      // Lead is saved; log and move on.
      console.error("Lead saved, but email notification failed:", error);
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping email; lead was saved to the database.");
  }

  return NextResponse.json({ success: true });
}
