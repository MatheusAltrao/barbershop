"use client";

import { deleteScheduleAction } from "@/actions/schedule/delete-schedule.action";
import {
  toastErrorAction,
  toastSuccessAction,
} from "@/components/toast/toast-action";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export function DeleteScheduleButton({ scheduleId }: { scheduleId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteSchedule = async () => {
    startTransition(async () => {
      try {
        await deleteScheduleAction(scheduleId);
        toastSuccessAction("Agendamento excluído");
      } catch (error) {
        toastErrorAction("Erro ao excluir agendamento");
        console.error("Erro ao excluir agendamento:", error);
      }
    });
  };

  return (
    <Button
      variant={"destructive"}
      disabled={isPending}
      onClick={handleDeleteSchedule}
    >
      {isPending ? <Loading /> : <Trash />} Apagar
    </Button>
  );
}
