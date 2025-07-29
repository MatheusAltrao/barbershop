"use server";

import { prisma } from "@/lib/prisma";
import { StatusProps } from "@/types/status.types";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../login/verify-login.action";

export async function changeScheduleStatusAction(
  id: string,
  status: StatusProps
) {
  await requireAdmin();

  try {
    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: { status },
    });

    console.log("Schedule updated successfully:", updatedSchedule);

    revalidatePath("/admin");
  } catch (error) {
    console.error("Error updating schedule status:", error);
    throw new Error("Failed to update schedule status");
  }
}
