import { Prisma } from "@prisma/client";

export type ScheduleWithRelations = Prisma.ScheduleGetPayload<{
  include: {
    client: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
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
