import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { listUsers, updateUserRole, getUserByEmail, createUser } from "@/services/user-service";

export async function handleListUsers() {
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function handleUpdateUserRole(userId, role) {
  if (role !== "ADMIN" && role !== "EDITOR") {
    return NextResponse.json({ error: "Rol no valid" }, { status: 400 });
  }

  const updated = await updateUserRole(userId, role);
  return NextResponse.json(updated);
}

export async function handleRegisterUser(body) {
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "email i password son obligatoris" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "La contrasenya ha de tenir minim 8 caracters" }, { status: 400 });
  }

  const exists = await getUserByEmail(email);
  if (exists) {
    return NextResponse.json({ error: "Ja existeix un usuari amb aquest email" }, { status: 409 });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await createUser({
    email,
    passwordHash,
    role: "EDITOR",
  });

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    { status: 201 }
  );
}
