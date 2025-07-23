import { Badge } from "@/components/ui/badge";

interface SchedulesCardProps {
  status: "confirmado" | "pendente" | "finalizado";
  services: string[];
  date: string;
  time: string;
}

export default function SchedulesCard({
  status,
  services,
  date,
  time,
}: SchedulesCardProps) {
  const getDay = date.split("-")[2];
  const getMonth = date.split("-")[1];

  const badgeStatusColors = {
    confirmado: "bg-green-500",
    pendente: "bg-yellow-500",
    finalizado: "bg-gray-500",
  };

  const bgStatusColors = {
    confirmado: "bg-green-50",
    pendente: "bg-yellow-50",
    finalizado: "bg-gray-50",
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
        <div className="flex flex-wrap gap-2">
          <p className="text-xs"> {services.join(", ")}</p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-1">
        <span className="text-xs">{getMonth}</span>
        <span className="text-2xl">{getDay}</span>
        <span className="text-xs">{time}</span>
      </div>
    </div>
  );
}
