import { Badge } from "@/components/ui/badge";

const statusVariantMap = {
  finished: "success",
  ongoing: "ongoing",
  due: "warning",
  overdue: "destructive",
};

export default function TaskStatusPill({ status }) {
  const variant = statusVariantMap[status] || "secondary";

  return (
    <Badge
      variant={variant}
      className="min-w-[90px] justify-center text-xs font-medium rounded-full px-3 py-1"
    >
      {status}
    </Badge>
  );
}
