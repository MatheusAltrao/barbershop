import { formatCentsToReais } from "@/utils/formatCentsToReais";
import ServiceCardSchedule from "./service-card-schedule";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    price: number;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const serviceSelected = {
    title: service.title,
    price: service.price,
  };
  return (
    <div className="p-3 border rounded-md flex gap-3">
      <div className="min-w-[110px] h-[110px] rounded-md bg-muted-foreground"></div>

      <div className="w-full space-y-2">
        <div>
          <h4 className="text-sm font-bold">{service.title}</h4>
          <p className="text-muted-foreground text-xs">{service.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-primary ">
            {formatCentsToReais(service.price)}
          </span>

          <ServiceCardSchedule serviceSelected={serviceSelected} />
        </div>
      </div>
    </div>
  );
}
