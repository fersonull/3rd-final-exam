import { lazy, Suspense, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import OverviewCards from "@/components/dashboard/overview-cards";
import { List } from "lucide-react";
import ChartSkeleton from "@/components/dashboard/chart-skeleton";
import DistributionSkeleton from "@/components/dashboard/distribution-skeleton";
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
import DashboardTableSkeleton from "@/components/dashboard/dashboard-table-skeleton";

const DashboardChart = lazy(() =>
  import("@/components/dashboard/dashboard-chart")
);

export default function Index() {
  const { pid } = useParams();
  const [range, setRange] = useState("7");
  const [taskLimit] = useState(5);

  const {
    data: stats,
    loading: statsLoading,
    error,
  } = useFetch(`/stats/${pid}`);

  const {
    data: chart,
    loading: chartLoading,
    error: chartError,
  } = useFetch(`/stats/${pid}/chart/${range}`);

  const {
    data: distribution,
    loading: disLoading,
    error: disError,
  } = useFetch(`/stats/${pid}/chart`);

  const {
    data: tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useFetch(`/tasks/project/${pid}/${taskLimit}`);

  const { activeProject, loading: projectLoading } = useActiveProject({
    projectId: pid,
  });

  const normalizedTasks = useMemo(() => {
    if (Array.isArray(tasks)) return tasks;
    if (tasks && Array.isArray(tasks.data)) return tasks.data;
    return [];
  }, [tasks]);

  if (error?.forbidden) {
    return <div>{error?.forbidden}</div>;
  }

  if (!activeProject && !projectLoading) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <Banner
        title="Overview"
        sub={`View key metrics, track progress, and manage your team's tasks all in one place.`}
      />

      <div className="grid grid-cols-1 gap-4">
        <OverviewCards data={stats} loading={statsLoading} />

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="lg:col-span-2">
            {chartLoading ? (
              <ChartSkeleton />
            ) : (
              <Suspense fallback={<ChartSkeleton />}>
                <DashboardChart
                  data={chart?.data}
                  setRange={setRange}
                  range={range}
                />
              </Suspense>
            )}
          </div>

          {disLoading ? (
            <DistributionSkeleton />
          ) : (
            <DistributionChart distribution={distribution} />
          )}
        </div>

        {tasksLoading ? (
          <DashboardTableSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Task Activity</CardTitle>
              <CardDescription>
                See the latest {taskLimit} tasks and recent updates to your
                team's work
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
              {/* Use key to force remount when project changes, to ensure DashboardTable clears out. */}
              <DashboardTable
                key={pid}
                tasks={normalizedTasks}
                loading={tasksLoading}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
