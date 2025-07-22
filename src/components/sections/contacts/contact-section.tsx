import TitleSection from "@/components/typography/title-section";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="px-5 ">
      <TitleSection title="CONTATO" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span>(11) 98204-5108</span>
          </div>

          <Button size={"sm"} variant={"secondary"}>
            Copiar
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span>(11) 98204-5108</span>
          </div>

          <Button size={"sm"} variant={"secondary"}>
            Copiar
          </Button>
        </div>
      </div>
    </div>
  );
}
