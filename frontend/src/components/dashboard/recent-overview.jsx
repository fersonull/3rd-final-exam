import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import RecentCard from "@/components/dashboard/recent-card";

export default function RecentOverview() {
  return (
    <Card>
        <CardHeader>
            <div className="flex-col-center">
                <div className="flex flex-1 flex-col gap-1 w-full">
                    <CardTitle>Your recent contributions</CardTitle>
                    <CardDescription>
                    Showing your recent contributions to the team
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="w-full font-medium text-xs">
            <div className="space-y-3">
                <RecentCard
                    type="finished"
                    title={`Completed "API Integration"`}
                    time="2 hours ago"
                />
                <RecentCard
                    type="ongoing"
                    title={`Updated "Database Schema"`}
                    time="5 hours ago"
                />
                <RecentCard
                    type="created"
                    title={`Created "User Authentication"`}
                    time="1 day ago"
                />
                <RecentCard
                    type="finished"
                    title={`Completed "UI Components"`}
                    time="2 days ago"
                />
                <div className="mt-4 pt-3 border-t">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    View all contributions →
                    </button>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
