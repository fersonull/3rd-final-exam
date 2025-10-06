import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OverviewCards from "@/components/dashboard/overview-cards";
import { List, Notebook, Timer, ListChecks } from "lucide-react";
import ChartSkeleton from "@/components/dashboard/chart-skeleton";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DistributionChart from "@/components/dashboard/distribution-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import Banner from "@/components/ui/banner";
import { Button } from "@/components/ui/button";

const DashboardChart = lazy(() =>
  import("@/components/dashboard/dashboard-chart")
);

export default function Index() {
  const navigate = useNavigate();

  return (
    <>
      <Banner
        title="Overview"
        sub={`View key metrics, track progress, and manage your team's tasks all in one place.`}
      />

      <div className="grid grid-cols-1 gap-4">
        <OverviewCards />

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="lg:col-span-2">
            <Suspense fallback={<ChartSkeleton />}>
              <DashboardChart />
            </Suspense>
          </div>

          {/* Pie Chart Card */}
          <DistributionChart />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Task Activity</CardTitle>
            <CardDescription>
              See the latest updates and changes to your team's tasks
            </CardDescription>

            <CardAction>
              <Link to="/tasks">
                <Button variant="outline">
                  <List />
                  Browse all
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <DashboardTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
