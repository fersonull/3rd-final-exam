import { Card, CardHeader, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function OverviewCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <span className="flex items-center gap-2">
                    <Skeleton className="w-10 h-7 rounded-sm" />
                    <div className="w-full flex flex-col gap-1">
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-full h-2" />
                    </div>
                </span>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-9" />
            </CardContent>
        </Card>
    );
}