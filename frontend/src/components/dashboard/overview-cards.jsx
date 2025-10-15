import React from "react";
import OverviewCard from "./overview-card";
import { ListChecks, Notebook, Timer, TimerOff, List } from "lucide-react";
import { useFetch } from "@/hooks/use-fetch";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth-context";

export default function OverviewCards() {
  const { pid } = useParams();
  const { token } = useAuthContext();


  const { data, loading: statsLoading } = useFetch(
    `/stats?pid=${pid}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined
      }
    },
    true
  )

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      <OverviewCard
        title="Total tasks"
        content={data?.total_tasks}
        icon={<List color="orange" />}
        description="All tasks in the system"
        trend={5}
        trendLabel="since last week"
      />
      <OverviewCard
        title="Ongoing tasks"
        content={data?.ongoing_tasks}
        icon={<Timer color="blue" />}
        description="Currently in progress"
        trend={-2}
        trendLabel="since last week"
      />
      <OverviewCard
        title="Completed tasks"
        content={data?.finished_tasks}
        icon={<ListChecks color="green" />}
        description="Tasks marked as done"
        trend={7}
        trendLabel="since last week"
      />
      <OverviewCard
        title="Overdue tasks"
        content={data?.overdue_tasks}
        icon={<TimerOff color="red" />}
        description="Tasks past their due date"
        trend={1}
        trendLabel="since last week"
      />
    </div>
  );
}
