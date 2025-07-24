"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Eye, Menu, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteScheduleButton } from "./delete-schedule-button";

interface ActionButtonProps {
  scheduleId: string;
}

export default function ActionButton({ scheduleId }: ActionButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-[180px]">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} size={"sm"}>
              <Trash /> Apagar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o
                agendamento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <DeleteScheduleButton scheduleId={scheduleId} />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Link href={`/admin/${scheduleId}`}>
          <Button variant={"secondary"} size={"sm"}>
            <Eye /> Ver detalhes
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
