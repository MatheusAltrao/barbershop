"use client";
import TitleSection from "@/components/typography/title-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HOURS } from "@/constants/hours";
import { SERVICES_WITHOUT_DESCRIPTION } from "@/constants/services";
import { CURRENT_TIME } from "@/utils/amazones-timezone";
import { formatCentsToReais } from "@/utils/formatCentsToReais";
import { ptBR } from "date-fns/locale";
import { Calendar1Icon, Plus } from "lucide-react";
import { useState } from "react";

export default function ServiceCardSchedule() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [time, setTime] = useState<string | null>(null);
  const [services, setServices] = useState<{ title: string; price: number }[]>(
    []
  );

  const handleToggleService = (service: { title: string; price: number }) => {
    setServices((prev) => {
      if (prev.find((s) => s.title === service.title)) {
        return prev.filter((s) => s.title !== service.title);
      }
      return [...prev, service];
    });
  };

  const handleTotalPrice = () => {
    return services.reduce((total, service) => {
      return total + service.price;
    }, 0);
  };

  const handleCreateSchedule = () => {
    if (!date || !time || services.length === 0) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const scheduleDetails = {
      date: date.toLocaleDateString("pt-BR"),
      time,
      services,
    };

    console.log("Agendamento criado:", scheduleDetails);

    setDate(undefined);
    setTime(null);
    setServices([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"}>Reservar</Button>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto pb-10">
        <SheetHeader>
          <SheetTitle>Fazer Reserva</SheetTitle>
          <SheetDescription>
            Reserve seu horário agora mesmo! Preencha os detalhes abaixo e
            garanta seu atendimento.
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        <div className="space-y-4 ">
          <div>
            <TitleSection title="Selecione a data" />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border w-full "
              disabled={(date) => date < yesterday}
              locale={ptBR}
            />
          </div>

          <Separator />

          <div className="flex  flex-col ">
            <TitleSection title="Selecione o horário" />
            <div className="space-y-2">
              <div className="flex items-center gap-2  pb-2 overflow-x-auto ">
                {HOURS.map((hour) => (
                  <button key={hour} onClick={() => setTime(hour)}>
                    <Badge
                      className=" px-4 py-2"
                      variant={hour === time ? "default" : "outline"}
                    >
                      {hour}
                    </Badge>
                  </button>
                ))}
              </div>

              <span className="text-xs ">
                Horário atual de Três Lagoas - MS - <span>{CURRENT_TIME}</span>{" "}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex  flex-col ">
            <TitleSection title="Serviços selecionados" />
            <div className="flex flex-wrap gap-2  pb-2 text-sm">
              {SERVICES_WITHOUT_DESCRIPTION.map((service, index) => (
                <button
                  onClick={() => handleToggleService(service)}
                  key={index}
                >
                  <Badge
                    className="flex items-center gap-2  px-4 py-2"
                    variant={
                      services.find((s) => s.title === service.title)
                        ? "default"
                        : "outline"
                    }
                  >
                    {service.title} <Plus size={16} />{" "}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="">
            <div className="p-2 rounded-md border">
              <TitleSection title="Resumo" />

              <div className="space-y-2">
                <div>
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="font-bold text-sm">{service.title}</span>
                      <span className="text-xs">
                        {formatCentsToReais(service.price)}
                      </span>
                    </div>
                  ))}

                  {services.length > 1 && (
                    <div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total: </span>
                        <span>{formatCentsToReais(handleTotalPrice())}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>Data:</span>
                  <span>{date?.toLocaleDateString("pt-BR")}</span>
                </div>

                <div className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>Horário:</span>
                  <span>{time}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="">
            <Button onClick={handleCreateSchedule} className="w-full ">
              <Calendar1Icon size={20} /> Agendar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
