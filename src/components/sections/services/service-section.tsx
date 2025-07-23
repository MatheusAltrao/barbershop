"use server";
import { getServicesAction } from "@/actions/services/get-services.action";
import TitleSection from "@/components/typography/title-section";
import ServiceCard from "./service-card";
import ServiceCardSchedule from "./service-card-schedule";

export default async function ServiceSection() {
  const services = await getServicesAction();

  return (
    <div className="px-5 ">
      <TitleSection title="SERVIÇOS" />

      <div className="space-y-2">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service}>
            <ServiceCardSchedule
              services={services}
              selectedService={service}
            />
          </ServiceCard>
        ))}
      </div>
    </div>
  );
}
