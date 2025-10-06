import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OverviewCard from "@/components/dashboard/overview-card";
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
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <OverviewCard
            title="Total tasks"
            content={200}
            icon={<Notebook color="orange" />}
            description="All tasks in the system"
            trend={5}
            trendLabel="since last week"
          />
          <OverviewCard
            title="Ongoing tasks"
            content={12}
            icon={<Timer color="blue" />}
            description="Currently in progress"
            trend={-2}
            trendLabel="since last week"
          />
          <OverviewCard
            title="Completed tasks"
            content={122}
            icon={<ListChecks color="green" />}
            description="Tasks marked as done"
            trend={7}
            trendLabel="since last week"
          />
        </div>

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
