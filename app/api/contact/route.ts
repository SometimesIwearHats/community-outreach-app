// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Define and validate the expected shape of the request body
const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  message: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input; throws if invalid
    const { name, email, message } = contactSchema.parse(body);

    // Insert into Supabase
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert({ name, email, message });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in /api/contact:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid data" },
      { status: 400 }
    );
  }
}
    