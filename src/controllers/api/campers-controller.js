import { NextResponse } from "next/server";
import {
  listPublishedCampers,
  getCamperBySlug,
  listAllCampers,
  createCamper,
  getCamperById,
  updateCamper,
  deleteCamper,
} from "@/services/camper-service";

function validateCamperPayload(body) {
  if (!body?.slug || !body?.name || !body?.shortDescription || !body?.description) {
    return "slug, name, shortDescription i description son obligatoris";
  }

  if (!Number.isInteger(body.dailyPrice) || body.dailyPrice <= 0) {
    return "dailyPrice ha de ser un enter positiu";
  }

  if (!Number.isInteger(body.seats) || body.seats <= 0) {
    return "seats ha de ser un enter positiu";
  }

  if (!Number.isInteger(body.beds) || body.beds <= 0) {
    return "beds ha de ser un enter positiu";
  }

  if (!body?.transmission || !body?.fuelType) {
    return "transmission i fuelType son obligatoris";
  }

  return null;
}

export async function handleListPublicCampers() {
  const campers = await listPublishedCampers();
  return NextResponse.json(campers);
}

export async function handleGetCamperBySlug(slug) {
  const camper = await getCamperBySlug(slug);
  if (!camper || !camper.isPublished) {
    return NextResponse.json({ error: "No trobat" }, { status: 404 });
  }
  return NextResponse.json(camper);
}

export async function handleListAdminCampers() {
  const campers = await listAllCampers();
  return NextResponse.json(campers);
}

export async function handleCreateCamper(body, authorId) {
  const validationError = validateCamperPayload(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const camper = await createCamper({
    slug: String(body.slug).trim(),
    name: String(body.name).trim(),
    shortDescription: String(body.shortDescription).trim(),
    description: String(body.description).trim(),
    dailyPrice: Number(body.dailyPrice),
    seats: Number(body.seats),
    beds: Number(body.beds),
    transmission: String(body.transmission).trim(),
    fuelType: String(body.fuelType).trim(),
    imageUrl: body.imageUrl ? String(body.imageUrl) : null,
    isPublished: Boolean(body.isPublished ?? true),
    authorId,
  });

  return NextResponse.json(camper, { status: 201 });
}

export async function handleGetCamperById(id) {
  const camper = await getCamperById(id);
  if (!camper) {
    return NextResponse.json({ error: "No trobat" }, { status: 404 });
  }
  return NextResponse.json(camper);
}

export async function handleUpdateCamper(id, body) {
  const partial = {
    slug: body.slug ? String(body.slug).trim() : undefined,
    name: body.name ? String(body.name).trim() : undefined,
    shortDescription: body.shortDescription ? String(body.shortDescription).trim() : undefined,
    description: body.description ? String(body.description).trim() : undefined,
    dailyPrice: Number.isInteger(body.dailyPrice) ? body.dailyPrice : undefined,
    seats: Number.isInteger(body.seats) ? body.seats : undefined,
    beds: Number.isInteger(body.beds) ? body.beds : undefined,
    transmission: body.transmission ? String(body.transmission).trim() : undefined,
    fuelType: body.fuelType ? String(body.fuelType).trim() : undefined,
    imageUrl: body.imageUrl === null ? null : body.imageUrl ? String(body.imageUrl) : undefined,
    isPublished: typeof body.isPublished === "boolean" ? body.isPublished : undefined,
  };

  try {
    const camper = await updateCamper(id, partial);
    return NextResponse.json(camper);
  } catch {
    return NextResponse.json({ error: "No s'ha pogut actualitzar" }, { status: 400 });
  }
}

export async function handleDeleteCamper(id) {
  try {
    await deleteCamper(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No s'ha pogut esborrar" }, { status: 400 });
  }
}
