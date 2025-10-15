import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ChartSkeleton() {
  return (
    <Card className="lg:h-full h-104">
      <CardHeader>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-5 w-1/3" /> {/* Title placeholder */}
          <Skeleton className="h-3 w-1/2" /> {/* Subtitle placeholder */}
        </div>
      </CardHeader>

      <CardContent className="w-full h-full flex items-end">
        <Skeleton className="w-full h-full" />
      </CardContent>
    </Card>
  );
}
