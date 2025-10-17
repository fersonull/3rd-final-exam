import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "../ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { IconChartBar } from "@tabler/icons-react";

const totalTasks = 200;
const completedTasks = 122;
const ongoingTasks = 12;

const PIE_COLORS = [
  "#a8e6a3", // Completed (matches tasksCompleted in InfoChart)
  "#7ba6e4", // Ongoing (matches tasksCreated in InfoChart)
  "#9ca3af", // Remaining (darker gray, tailwind gray-400)
];

export default function DistributionChart({ distribution }) {
  const [pie, setPie] = useState(distribution?.data);

  useEffect(() => {
    setPie(distribution?.data);
  }, [distribution]);

  const pieData = [
    { name: "Completed", value: pie?.completed ?? 0 },
    { name: "Ongoing", value: pie?.ongoing ?? 0 },
    {
      name: "Remaining",
      value: (pie?.total ?? 0) - (pie?.completed ?? 0) - (pie?.ongoing ?? 0),
    },
  ];

  const isPieDataEmpty = pieData.every(
    (item) => !item.value || item.value <= 0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
        <CardDescription>
          Breakdown of completed, ongoing, and remaining tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center w-full h-64">
        {isPieDataEmpty || !distribution?.data ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconChartBar />
              </EmptyMedia>
              <EmptyTitle>No data found</EmptyTitle>
              <EmptyDescription>
                No data found for the selected project
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="text-xs">
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={35}
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name} (${Math.round(percent * 100)}%)`
                }
              >
                {pieData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={PIE_COLORS[idx % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend
                formatter={(value) => {
                  if (value === "Completed") return "Completed";
                  if (value === "Ongoing") return "Ongoing";
                  if (value === "Remaining") return "Remaining";
                  return value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded-md shadow bg-background border-accent text-xs">
        <span className="font-medium">{payload[0].name}:</span>{" "}
        {payload[0].value}
      </div>
    );
  }
  return null;
}
