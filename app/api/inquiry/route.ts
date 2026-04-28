import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, eventType, date, guests, message } = body;

    const { error } = await resend.emails.send({
      from: "Salish Trading Co. <onboarding@resend.dev>",
      to: "ryan@salishtrading.co",
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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}
