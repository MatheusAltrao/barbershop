import TitleSection from "@/components/typography/title-section";
import { SERVICES } from "@/constants/services";
import ServiceCard from "./service-card";

export default function ServiceSection() {
  return (
    <div className="px-5 ">
      <TitleSection title="SERVIÇOS" />

      <div className="space-y-2">
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}
