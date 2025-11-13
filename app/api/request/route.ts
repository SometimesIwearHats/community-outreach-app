import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cityRegex, phoneRegex, postalRegex } from "@/lib/validation";

const mealRequestSchema = z.object({
  recipientName: z
    .string()
    .trim()
    .min(2, "Recipient name is too short")
    .max(120, "Recipient name is too long"),
  requestingFor: z.enum(["self", "other"]),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Phone must be exactly 10 digits"),
  address: z
    .string()
    .trim()
    .min(5, "Address is too short")
    .max(255),
  city: z
    .string()
    .trim()
    .regex(cityRegex, "City must contain only letters"),
  postal: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      postalRegex,
      "Postal code must be in A1A1A1 format (letters and digits only)"
    ),
  diet: z
    .enum(["none", "vegetarian"])
    .optional()
    .default("none"),
  serves: z.enum(["1", "2", "3", "4", "5+"]),
  notes: z
    .string()
    .max(2000)
    .optional()
    .nullable(),
  consent: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = mealRequestSchema.parse(body);

    const { error } = await supabaseAdmin.from("meal_requests").insert({
      recipient_name: data.recipientName,
      requesting_for: data.requestingFor,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postal: data.postal,
      diet: data.diet,
      serves: data.serves,
      notes: data.notes ?? null,
      consent: data.consent,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error (meal_requests):", error);
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Validation error in /api/request:", err.issues);
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          details: err.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    console.error("Unknown error in /api/request:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid data" },
      { status: 400 }
    );
  }
}
