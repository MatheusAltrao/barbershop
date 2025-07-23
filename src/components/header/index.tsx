import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, DoorOpen, Home, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Header() {
  const links = [
    {
      label: "Início",
      href: "/",
      icon: <Home size={20} />,
    },
    { label: "Agendamento", href: "/schedule", icon: <Calendar size={20} /> },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Barbershop</h1>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="p-0" size="icon" variant={"ghost"}>
            <Menu size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-6 h-screen flex flex-col ">
          <div className="flex flex-col flex-1">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Entre com o Google para acessar sua conta
              </SheetDescription>
            </SheetHeader>

            <Separator className="my-4" />

            <div className="flex items-center gap-2">
              <div className="h-12 min-w-12 rounded-full bg-primary"></div>

              <div className="flex flex-col ">
                <span className="font-bold">Pedro Gonçalves</span>
                <span className="text-xs text-muted-foreground">
                  pedrogoncalves@gmail.com
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col flex-1 justify-between  ">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link className="w-full" key={link.href} href={link.href}>
                    <Button
                      className="w-full justify-start"
                      variant={"outline"}
                    >
                      {link.icon} {link.label}
                    </Button>
                  </Link>
                ))}
              </div>

              <Button className="w-full " variant={"destructive"}>
                <DoorOpen /> Sair da conta
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
