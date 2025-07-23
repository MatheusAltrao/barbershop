"use server";
import GoogleIcon from "@/assets/icons/google.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth, signIn, signOut } from "@/lib/auth";
import { Calendar, DoorOpen, Home, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default async function Header() {
  const session = await auth();

  const isLoggedIn = !!session?.user;

  const links = [
    {
      label: "Início",
      href: "/",
      icon: <Home size={20} />,
    },
    { label: "Agendamento", href: "/schedule", icon: <Calendar size={20} /> },
  ];

  return (
    <header className=" p-5 bg-gray-800 ">
      <div className="flex items-center justify-between text-white w-full max-w-[1200px] mx-auto">
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

              {isLoggedIn && (
                <div className="flex items-center gap-2">
                  <Image
                    className=" rounded-full "
                    src={session.user?.image || ""}
                    alt={session.user?.name || ""}
                    width={48}
                    height={48}
                  />

                  <div className="flex flex-col ">
                    <span className="font-bold">{session.user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
              )}

              {!isLoggedIn && (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <Button className="gap-2 w-full" variant={"secondary"}>
                    <Image
                      width={24}
                      height={24}
                      src={GoogleIcon}
                      alt="Google"
                    />
                    Entrar com o Google
                  </Button>
                </form>
              )}

              {isLoggedIn && <Separator className="my-4" />}

              {isLoggedIn && (
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

                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button className="w-full " variant={"destructive"}>
                      <DoorOpen /> Sair da conta
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
