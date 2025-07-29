import { StatusProps } from "@/types/status.types";
import { Badge } from "./badge";

interface StatusBadgeProps {
  status: StatusProps;
}
export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className="w-full flex items-center justify-center" variant={status}>
      {status}
    </Badge>
  );
}
