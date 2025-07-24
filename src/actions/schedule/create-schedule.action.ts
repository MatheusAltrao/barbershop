"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireAuth } from "../login/verify-login.action";

const scheduleSchema = z.object({
  addedServices: z
    .array(
      z.object({
        id: z.string().min(1, "ID do serviço é obrigatório"),
        title: z.string().min(1, "Título do serviço é obrigatório"),
        description: z.string().min(1, "Descrição do serviço é obrigatória"),
        price: z.number().nonnegative("Preço não pode ser negativo"),
      })
    )
    .min(1, "Pelo menos um serviço deve ser adicionado"),
  date: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve estar no formato HH:MM"),
});

type IScheduleSchema = z.infer<typeof scheduleSchema>;

export async function createScheduleAction(data: IScheduleSchema) {
  try {
    const session = await auth();

    await requireAuth();

    const validationResult = scheduleSchema.safeParse(data);

    if (!validationResult.success) {
      throw new Error(
        `Validation failed: ${validationResult.error.issues
          .map((err: any) => err.message)
          .join(", ")}`
      );
    }

    const validatedData = validationResult.data;
    console.log("Dados validados:", validatedData);

    const [day, month, year] = validatedData.date.split("/");
    const formattedDate = `${month}/${day}/${year}`;

    const dateTime = new Date(`${formattedDate} ${validatedData.time}`);
    console.log("DateTime criado:", dateTime);

    // Validar se a data foi criada corretamente
    if (isNaN(dateTime.getTime())) {
      throw new Error(
        `Data inválida: ${validatedData.date} ${validatedData.time}`
      );
    }

    const schedule = await prisma.schedule.create({
      data: {
        clientId: session?.user?.id!,
        date: dateTime,
        status: "PENDENTE",
        description: `Agendamento com ${validatedData.addedServices.length} serviço(s)`,
      },
    });
    console.log("Schedule criado:", schedule);

    const scheduleServices = await Promise.all(
      validatedData.addedServices.map((service) =>
        prisma.scheduleService.create({
          data: {
            scheduleId: schedule.id,
            serviceId: service.id,
          },
        })
      )
    );

    console.log("Schedule services criados:", scheduleServices);

    return { success: true, scheduleId: schedule.id };
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);

    if (error instanceof Error) {
      throw new Error(`Error creating schedule: ${error.message}`);
    }

    throw new Error(`Error creating schedule: ${JSON.stringify(error)}`);
  }
}
