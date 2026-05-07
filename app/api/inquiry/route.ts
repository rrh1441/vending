import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, eventType, date, guests, message } = body;

    // Send notification to you
    const { error } = await resend.emails.send({
      from: "Salish Trading Co. <hello@salishtrading.com>",
      to: "ryan@salishtrading.com",
      subject: `New Inquiry: ${eventType} from ${name}`,
      html: `
        <h2>New Event Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${date || "Not specified"}</p>
        <p><strong>Guest Count:</strong> ${guests || "Not specified"}</p>
        <p><strong>Additional Notes:</strong> ${message || "None"}</p>
      `,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Send confirmation to submitter
    await resend.emails.send({
      from: "Salish Trading Co. <hello@salishtrading.com>",
      to: email,
      subject: "We got your inquiry!",
      html: `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>We received your inquiry about a ${eventType} and will be in touch soon.</p>
        <p>In the meantime, feel free to reply to this email if you have any questions.</p>
        <p>— The Salish Trading Co. team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}
