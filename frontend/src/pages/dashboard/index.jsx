import { lazy, Suspense } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useNavigate } from "react-router-dom";
import OverviewCard from "@/components/dashboard/overview-card";
import { CheckCircle, Folders, FolderClockIcon } from "lucide-react";
import ChartSkeleton from "@/components/dashboard/chart-skeleton";
import DashboardTable from "@/components/dashboard/dashboard-table";
import RecentOverview from "@/components/dashboard/recent-overview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Banner from "@/components/ui/banner";

const DashboardChart = lazy(() =>
  import("@/components/dashboard/dashboard-chart")  
);

export default function Index() {
  const navigate = useNavigate();

  return (
    <>
      <Banner title='Overview' sub={`View key metrics, track progress, and manage your team's tasks all in one place.`} />

      <div className="grid grid-cols-1 gap-4">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <OverviewCard
            title="Total tasks"
            content={200}
            icon={<Folders color="orange" />}
          />
          <OverviewCard
            title="Ongoing tasks"
            content={12}
            icon={<FolderClockIcon color="blue" />}
          />
          <OverviewCard
            title="Completed tasks"
            content={188}
            icon={<CheckCircle color="green" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="lg:col-span-2">
            <Suspense fallback={<ChartSkeleton />}>
              <DashboardChart />
            </Suspense>
          </div>

          <RecentOverview />
        </div>

        <Card>
          <CardContent>
            <DashboardTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
