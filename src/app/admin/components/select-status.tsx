"use client";
import { changeScheduleStatusAction } from "@/actions/schedule/change-schelude-status.action";
import { toastSuccessAction } from "@/components/toast/toast-action";
import { StatusProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StatusBadge from "@/components/ui/status-badge";
import { ChevronDown } from "lucide-react";
import { useState, useTransition } from "react";

interface SelectStatusProps {
  id: string;
  status: StatusProps;
}

export default function SelectStatus({ id, status }: SelectStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChangeStatus = async (newStatus: StatusProps) => {
    startTransition(async () => {
      try {
        await changeScheduleStatusAction(id, newStatus);
        toastSuccessAction("Status do agendamento alterado com sucesso");
        setIsOpen(false);
      } catch (error) {
        toastSuccessAction("Erro ao alterar status do agendamento");
        console.error("Error changing schedule status:", error);
        setIsOpen(false);
      }
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isPending}
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2"
        >
          <StatusBadge status={status} />
          {isPending && <Loading />}
          {!isPending && <ChevronDown size={20} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px]">
        <div className="flex flex-col  gap-2">
          <Button
            onClick={() => handleChangeStatus("CONFIRMADO")}
            className="w-full"
            variant={"ghost"}
            size={"sm"}
          >
            <StatusBadge status="CONFIRMADO" />
          </Button>
          <Button
            onClick={() => handleChangeStatus("PENDENTE")}
            className="w-full"
            variant={"ghost"}
            size={"sm"}
          >
            <StatusBadge status="PENDENTE" />
          </Button>
          <Button
            onClick={() => handleChangeStatus("CANCELADO")}
            className="w-full"
            variant={"ghost"}
            size={"sm"}
          >
            <StatusBadge status="CANCELADO" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
