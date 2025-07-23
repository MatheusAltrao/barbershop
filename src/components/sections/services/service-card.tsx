import { formatCentsToReais } from "@/utils/formatCentsToReais";
import ServiceCardSchedule from "./service-card-schedule";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
}

export default function ServiceCard({
  title,
  description,
  price,
}: ServiceCardProps) {
  return (
    <div className="p-3 border rounded-md flex gap-3">
      <div className="min-w-[110px] h-[110px] rounded-md bg-muted-foreground"></div>

      <div className="w-full space-y-2">
        <div>
          <h4 className="text-sm font-bold">{title}</h4>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-primary ">
            {formatCentsToReais(price)}
          </span>

          <ServiceCardSchedule />
        </div>
      </div>
    </div>
  );
}
