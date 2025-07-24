import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function requireAuth() {
  const session = await auth();

  if (!session) {
    throw new Error("User not authenticated");
  }

  return session;
}

export async function requireRole(requiredRole: Role) {
  const session = await requireAuth();

  const userRole = session.user?.role;

  if (userRole !== requiredRole) {
    throw new Error(
      `Access denied: User does not have permission. Required role: ${requiredRole}`
    );
  }

  return session;
}

export async function requireAdmin() {
  return await requireRole("ADMIN");
}

export async function requireUser() {
  return await requireRole("USER");
}
