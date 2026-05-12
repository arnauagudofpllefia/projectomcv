import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireEditor } from "@/lib/api-auth";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 2 * 1024 * 1024;

export async function POST(request) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string" || !file.name) {
    return NextResponse.json({ error: "Fitxer no valid" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Tipus no permes" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "Fitxer massa gran" }, { status: 400 });
  }

  const ext = path.extname(file.name).slice(0, 10) || ".bin";
  const name = `${randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "blog");

  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);

  return NextResponse.json({ url: `/uploads/blog/${name}` });
}
