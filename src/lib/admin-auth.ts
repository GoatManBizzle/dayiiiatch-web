import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "dayiiiatch_admin_auth";

export function getAdminPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD ?? "";
}

export function getAdminAuthToken() {
  const password = getAdminPassword();

  if (!password) return "";

  return createHash("sha256")
    .update(`dayiiiatch-admin:${password}`)
    .digest("hex");
}

export function isValidAdminPassword(password: string) {
  const expectedPassword = getAdminPassword();

  if (!expectedPassword || !password) return false;

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expectedPassword);

  if (passwordBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(passwordBuffer, expectedBuffer);
}

export function isValidAdminToken(token: string | undefined) {
  const expectedToken = getAdminAuthToken();

  if (!expectedToken || !token) return false;

  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expectedToken);

  if (tokenBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}

export async function requireAdminApiAuth() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (isValidAdminToken(authToken)) return null;

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
