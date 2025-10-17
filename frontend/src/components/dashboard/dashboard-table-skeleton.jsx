import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-1/8 h-4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/4 h-3" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-78" />
      </CardContent>
    </Card>
  );
}
