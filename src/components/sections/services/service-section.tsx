"use server";
import { signInAction } from "@/actions/login/signIn.action";
import { getServicesAction } from "@/actions/services/get-services.action";
import TitleSection from "@/components/typography/title-section";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import ServiceCard from "./service-card";
import ServiceCardSchedule from "./service-card-schedule";

export default async function ServiceSection() {
  const services = await getServicesAction();
  const session = await auth();

  const isLoggedIn = !!session?.user;

  return (
    <div className="px-5 ">
      <TitleSection title="SERVIÇOS" />

      <div className="space-y-2">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service}>
            {!isLoggedIn && (
              <form action={signInAction}>
                <Button size={"sm"}>Reservar</Button>
              </form>
            )}

            {isLoggedIn && (
              <ServiceCardSchedule
                services={services}
                selectedService={service}
              />
            )}
          </ServiceCard>
        ))}
      </div>
    </div>
  );
}
