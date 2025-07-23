"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getSchedulesAction() {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("User not authenticated");
    }

    const userRole = session.user?.role;
    console.log("User role:", userRole);

    if (userRole !== "ADMIN") {
      throw new Error(
        "Access denied: User does not have permission to view schedules"
      );
    }

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
