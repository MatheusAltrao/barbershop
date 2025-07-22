import AboutSection from "@/components/sections/about/about-section";
import ContactSection from "@/components/sections/contacts/contact-section";
import ServiceSection from "@/components/sections/services/service-section";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-3 pb-10">
      <div className="h-[350px] bg-muted-foreground"></div>

      <div className="space-y-6 ">
        <div className="px-5 space-y-3">
          <h1 className="font-bold text-lg">Vintage Barber</h1>
          <div className="flex items-center gap-2">
            <MapPinIcon className="text-primary" size={20} />{" "}
            <span className="text-sm">
              Avenida São Sebastião, 357, São Paulo
            </span>
          </div>
        </div>

        <Separator />

        <AboutSection />

        <Separator />

        <ServiceSection />

        <Separator />

        <ContactSection />
      </div>
    </div>
  );
}
