import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-5 w-full max-w-[1200px] mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Serviços</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Matheus</TableCell>
            <TableCell>Haircut</TableCell>
            <TableCell>2023-10-01</TableCell>
            <TableCell>
              <StatusBadge status="FINALIZADO" />
            </TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="text-right">
              <Button size={"icon"} variant={"outline"}>
                <Menu />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
