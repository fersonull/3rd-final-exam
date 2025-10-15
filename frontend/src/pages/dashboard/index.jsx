import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import OverviewCards from "@/components/dashboard/overview-cards";
import { List } from "lucide-react";
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
import useActiveProject from "@/hooks/use-active-project";
import { useFetch } from "@/hooks/use-fetch";

const DashboardChart = lazy(() =>
  import("@/components/dashboard/dashboard-chart")
);

export default function Index() {
  const navigate = useNavigate();
  const { pid } = useParams();


  const { data, loading: statsLoading, error } = useFetch(
    `/stats?pid=${pid}`,
    true
  )


  const { activeProject, loading } = useActiveProject({ projectId: pid });


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error?.forbidden) {
    return <div>{error?.forbidden}</div>
  }

  if (!activeProject) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <Banner
        title="Overview"
        sub={`View key metrics, track progress, and manage your team's tasks all in one place.`}
      />

      <div className="grid grid-cols-1 gap-4">
        <OverviewCards data={data} />

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
              <Link to="tasks">
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
