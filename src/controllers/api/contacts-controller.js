import { NextResponse } from "next/server";
import { createContactRequest } from "@/services/contact-service";

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function handleCreateContact(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email i message son obligatoris" },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Email no valid" }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json({ error: "Missatge massa curt" }, { status: 400 });
  }

  const request = await createContactRequest({
    name,
    email,
    phone: phone || null,
    message,
  });

  return NextResponse.json({ ok: true, request }, { status: 201 });
}
