"use server";
import { getSchedulesAction } from "@/actions/schedule/get-schedules.action";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
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
import { Menu } from "lucide-react";

export default async function AdminPage() {
  const schedules: ScheduleWithRelations[] = await getSchedulesAction();

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
                <StatusBadge status={schedule.status} />
              </TableCell>
              <TableCell>
                {formatCentsToReais(calculateTotal(schedule.services))}
              </TableCell>
              <TableCell className="text-right">
                <Button size={"icon"} variant={"outline"}>
                  <Menu />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
