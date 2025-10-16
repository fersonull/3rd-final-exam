import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function DistributionSkeleton() {
    return (
        <Card className="h-94">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-1/3 h-4" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="w-1/2 h-3" />
                </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <Skeleton className="w-full h-full" />
            </CardContent>
        </Card>
    );
}