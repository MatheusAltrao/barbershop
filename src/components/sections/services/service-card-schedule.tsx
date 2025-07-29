"use client";
import { checkScheduleAvailabilityAction } from "@/actions/schedule/check-schedule-availability-of-the-day.action";
import { createScheduleAction } from "@/actions/schedule/create-schedule.action";
import { toastSuccessAction } from "@/components/toast/toast-action";
import TitleSection from "@/components/typography/title-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ServiceProps } from "@/types/service.types";
import { CURRENT_TIME } from "@/utils/amazones-timezone";
import { formatCentsToReais } from "@/utils/formatCentsToReais";
import { ptBR } from "date-fns/locale";
import { Calendar1Icon, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

interface ServiceCardScheduleProps {
  services: ServiceProps[];
  selectedService: ServiceProps;
}

export default function ServiceCardSchedule({
  selectedService,
  services,
}: ServiceCardScheduleProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [time, setTime] = useState<string | null>(null);
  const [addedServices, setAddedServices] = useState<ServiceProps[]>([
    selectedService,
  ]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  const handleToggleService = (service: ServiceProps) => {
    setAddedServices((prev) => {
      if (prev.find((s) => s.title === service.title)) {
        return prev.filter((s) => s.title !== service.title);
      }
      return [...prev, service];
    });
  };

  const handleTotalPrice = () => {
    return addedServices.reduce((total, service) => {
      return total + service.price;
    }, 0);
  };

  const handleCreateSchedule = async () => {
    startTransition(async () => {
      if (!date || !time || addedServices.length === 0) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const scheduleDetails = {
        date: date.toLocaleDateString("pt-BR"),
        time,
        addedServices,
      };

      await createScheduleAction(scheduleDetails);
      toastSuccessAction("Agendamento criado com sucesso!");
      setOpen(false);

      setDate(undefined);
      setTime(null);
      setAddedServices([]);
    });
  };

  useEffect(() => {
    if (!date) {
      setAvailableTimes([]);
      return;
    }

    const checkAvailability = async () => {
      setIsLoadingTimes(true);
      try {
        const times = await checkScheduleAvailabilityAction(date);

        // Filtrar horários passados se for hoje
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        const filteredTimes = isToday
          ? times.filter((hour) => {
              const [hourPart, minutePart] = hour.split(":").map(Number);
              const scheduleTime = new Date(date);
              scheduleTime.setHours(hourPart, minutePart, 0, 0);
              return scheduleTime > now;
            })
          : times;

        setAvailableTimes(filteredTimes);

        // Reset time se não estiver mais disponível
        if (time && !filteredTimes.includes(time)) {
          setTime(null);
        }
      } catch (error) {
        console.error("Erro ao verificar disponibilidade:", error);
        setAvailableTimes([]);
      } finally {
        setIsLoadingTimes(false);
      }
    };

    checkAvailability();
  }, [date, time]);

  const noScheduleAvailable = availableTimes.length === 0 && !isLoadingTimes;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
                {availableTimes.map((hour) => (
                  <button key={hour} onClick={() => setTime(hour)}>
                    <Badge
                      className=" px-4 py-2"
                      variant={hour === time ? "default" : "outline"}
                    >
                      {hour}
                    </Badge>
                  </button>
                ))}

                {noScheduleAvailable && (
                  <span className="text-red-500 text-sm">
                    Não há horários disponíveis para esta data. <br /> tente
                    outro dia
                  </span>
                )}
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
              {services.map((service, index) => (
                <button
                  onClick={() => handleToggleService(service)}
                  key={index}
                >
                  <Badge
                    className="flex items-center gap-2  px-4 py-2"
                    variant={
                      addedServices.find((s) => s.title === service.title)
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
                  {addedServices.map((service, index) => (
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

                  {addedServices.length > 1 && (
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
            <Button
              onClick={handleCreateSchedule}
              disabled={isPending}
              className="w-full "
            >
              {isPending ? <Loading /> : <Calendar1Icon size={20} />} Agendar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
