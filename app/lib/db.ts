import { neon } from "@neondatabase/serverless";

export interface HostLead {
  businessName: string;
  venueType: string;
  neighborhood?: string | null;
  contactName: string;
  email: string;
  phone?: string | null;
  notes?: string | null;
}

// Insert a host-waitlist submission into Neon. Throws if DATABASE_URL is unset
// or the insert fails — the caller decides how to surface that.
export async function insertHostLead(lead: HostLead): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(connectionString);
  await sql`
    INSERT INTO host_leads
      (business_name, venue_type, neighborhood, contact_name, email, phone, notes)
    VALUES
      (${lead.businessName}, ${lead.venueType}, ${lead.neighborhood ?? null},
       ${lead.contactName}, ${lead.email}, ${lead.phone ?? null}, ${lead.notes ?? null})
  `;
}
