"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "../login/verify-login.action";

export async function getSchedulesAction() {
  try {
    await requireAdmin();

    const schedules = await prisma.schedule.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        services: {
          include: {
            service: {
              select: {
                id: true,
                title: true,
                description: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return schedules;
  } catch (error: any) {
    console.error("Erro ao buscar agendamentos:", error);
    throw new Error(`Error fetching schedules: ${error.message}`);
  }
}
