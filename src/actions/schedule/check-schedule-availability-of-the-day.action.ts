"use server";

import { HOURS } from "@/constants/hours";
import { prisma } from "@/lib/prisma";

export async function checkScheduleAvailabilityAction(
  date: Date
): Promise<string[]> {
  try {
    const schedules = await prisma.schedule.findMany({
      where: {
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      },
    });

    if (schedules.length === 0) {
      return HOURS;
    }

    const unavailableTimes = schedules.map((schedule) => {
      const hour = schedule.date.getHours().toString().padStart(2, "0");
      const minutes = schedule.date.getMinutes().toString().padStart(2, "0");
      return `${hour}:${minutes}`;
    });

    return HOURS.filter((hour) => !unavailableTimes.includes(hour));
  } catch (error: any) {
    console.error("Erro ao verificar disponibilidade de horários:", error);
    throw new Error(`Error checking schedule availability: ${error.message}`);
  }
}
