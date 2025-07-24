"use client";

import { deleteScheduleAction } from "@/actions/schedule/delete-schedule.action";
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
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
      }
    });
  };

  return (
    <Button disabled={isPending} onClick={handleDeleteSchedule}>
      {isPending ? <Loading /> : <Trash />} Apagar
    </Button>
  );
}
