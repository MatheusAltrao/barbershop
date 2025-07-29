"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { requireAuth } from "../login/verify-login.action";

// Tipo inferido pelo Prisma
type UserScheduleWithRelations = Prisma.ScheduleGetPayload<{
  include: {
    services: {
      include: {
        service: {
          select: {
            id: true;
            title: true;
            description: true;
            price: true;
          };
        };
      };
    };
  };
}>;

export async function getUserStatusScheduleAction(): Promise<
  UserScheduleWithRelations[]
> {
  try {
    const session = await requireAuth();

    const schedulesByUser = await prisma.schedule.findMany({
      where: {
        clientId: session.user?.id!,
      },
      include: {
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

    return schedulesByUser;
  } catch (error) {
    console.error("Error fetching user schedules:", error);
    throw new Error("Failed to fetch user schedules");
  }
}

// Exportar o tipo para usar em outros arquivos
export type { UserScheduleWithRelations };
