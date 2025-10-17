import { Badge } from "@/components/ui/badge";

const statusVariantMap = {
  completed: "default",
  ongoing: "secondary",
  pending: "outline",
  overdue: "destructive",
};

export default function TaskStatusPill({ status }) {
  const variant = statusVariantMap[status] || "secondary";

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}
