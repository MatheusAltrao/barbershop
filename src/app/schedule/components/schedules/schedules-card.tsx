import { UserScheduleWithRelations } from "@/actions/schedule/get-user-status-schedule.action";
import { Badge } from "@/components/ui/badge";
import { StatusProps } from "@/types/status.types";
import { formatCentsToReais } from "@/utils/formatCentsToReais";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SchedulesCardProps {
  status: StatusProps;
  services: UserScheduleWithRelations["services"];
  date: Date;
}

export default function SchedulesCard({
  status,
  services,
  date,
}: SchedulesCardProps) {
  const getDay = format(date, "dd", { locale: ptBR });
  const getMonth = format(date, "MMMM", { locale: ptBR });
  const time = format(date, "HH:mm", { locale: ptBR });
  const badgeStatusColors = {
    CONFIRMADO: "bg-green-500",
    PENDENTE: "bg-yellow-500",
    FINALIZADO: "bg-gray-500",
    CANCELADO: "bg-red-500",
  };

  const bgStatusColors = {
    CONFIRMADO: "bg-green-50",
    PENDENTE: "bg-yellow-50",
    FINALIZADO: "bg-gray-50",
    CANCELADO: "bg-red-50",
  };

  const getServiceNames = (services: UserScheduleWithRelations["services"]) => {
    return services
      .map((scheduleService) => scheduleService.service.title)
      .join(", ");
  };

  const calculateTotal = (services: UserScheduleWithRelations["services"]) => {
    return services.reduce((total, scheduleService) => {
      return total + scheduleService.service.price;
    }, 0);
  };

  return (
    <div
      className={` p-2 rounded-md border ${bgStatusColors[status]} grid grid-cols-3`}
    >
      <div className=" col-span-2 flex flex-col gap-2 border-r">
        <Badge
          className={`text-xs w-max uppercase ${badgeStatusColors[status]}`}
        >
          {status}
        </Badge>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium">{getServiceNames(services)}</p>
          <p className="text-xs text-gray-600">
            {formatCentsToReais(calculateTotal(services))}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-1">
        <span className="text-xs capitalize">{getMonth}</span>
        <span className="text-2xl">{String(getDay).padStart(2, "0")}</span>
        <span className="text-xs">{time}</span>
      </div>
    </div>
  );
}
