"use server";
import { getSchedulesAction } from "@/actions/schedule/get-schedules.action";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScheduleWithRelations } from "@/types/schedule.types";
import { formatCentsToReais } from "@/utils/formatCentsToReais";
import { formatDate } from "@/utils/formatDate";
import ActionButton from "./components/actions-button";
import SelectStatus from "./components/select-status";

export default async function AdminPage() {
  const schedules: ScheduleWithRelations[] = await getSchedulesAction();
  const emptySchedules = schedules.length === 0;
  const calculateTotal = (services: ScheduleWithRelations["services"]) => {
    return services.reduce((total, scheduleService) => {
      return total + scheduleService.service.price;
    }, 0);
  };

  const getServiceNames = (services: ScheduleWithRelations["services"]) => {
    return services
      .map((scheduleService) => scheduleService.service.title)
      .join(", ");
  };

  return (
    <div className="py-5 w-full max-w-[1200px] mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Serviços</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.client.name}</TableCell>
              <TableCell>{getServiceNames(schedule.services)}</TableCell>
              <TableCell>{formatDate(schedule.date)}</TableCell>
              <TableCell>
                <SelectStatus id={schedule.id} status={schedule.status} />
              </TableCell>
              <TableCell>
                {formatCentsToReais(calculateTotal(schedule.services))}
              </TableCell>
              <TableCell className="text-right">
                <ActionButton scheduleId={schedule.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {emptySchedules && (
        <div className="text-center text-muted-foreground py-10">
          Nenhum agendamento encontrado.
        </div>
      )}
    </div>
  );
}
