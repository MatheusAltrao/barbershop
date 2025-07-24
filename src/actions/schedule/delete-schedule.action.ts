"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../login/verify-login.action";

export async function deleteScheduleAction(id: string) {
  if (!id) {
    throw new Error("Schedule ID is required");
  }

  await requireAdmin();

  await prisma.schedule.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
}
