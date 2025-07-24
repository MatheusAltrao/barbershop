"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "../login/verify-login.action";

export async function deleteScheduleAction(id: string) {
  await requireAdmin();

  if (!id) {
    throw new Error("Schedule ID is required");
  }

  const schedule = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return schedule;
}
