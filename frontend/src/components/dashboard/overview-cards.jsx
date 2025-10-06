import React from "react";
import OverviewCard from "./overview-card";
import { ListChecks, Notebook, Timer } from "lucide-react";

export default function OverviewCards() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
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
      <OverviewCard
        title="Overdue tasks"
        content={8}
        icon={<Timer color="red" />}
        description="Tasks past their due date"
        trend={1}
        trendLabel="since last week"
      />
    </div>
  );
}
