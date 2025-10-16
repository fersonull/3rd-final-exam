import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Legend,
  AreaChart,
  BarChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { IconChartBar } from "@tabler/icons-react";

function getLast7DaysData(taskData) {
  const today = new Date();
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const dateKey = d.toISOString().split("T")[0];

    const found = taskData?.find((item) => item.date === dateKey);

    const label = `${d.toLocaleString("default", {
      month: "short",
    })} ${d.getDate()}`;

    data.push({
      date: label,
      tasksCreated: found ? found.total_created : 0,
      tasksCompleted: found ? found.total_finished : 0,
    });
  }

  return data;
}

function getLast1MonthData(taskData) {
  const today = new Date();
  const data = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const dateKey = d.toISOString().split("T")[0];

    const found = taskData?.find((item) => item.date === dateKey);

    const label = `${d.toLocaleString("default", {
      month: "short",
    })} ${d.getDate()}`;

    data.push({
      date: label,
      tasksCreated: found ? found.total_created : 0,
      tasksCompleted: found ? found.total_finished : 0,
    });
  }

  return data;
}

export default function InfoChart({ data, range }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(
      range === "7" ? getLast7DaysData(data) : getLast1MonthData(data)
    );
  }, [data, range]);

  if (chartData.length === 0 || !data) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconChartBar />
          </EmptyMedia>
          <EmptyTitle>No data found</EmptyTitle>
          <EmptyDescription>
            No data found for the selected range
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={730}
        height={250}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a8e6a3" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a8e6a3" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7ba6e4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7ba6e4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <CartesianGrid vertical={false} opacity={0.1} />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          name="Tasks Created"
          dataKey="tasksCreated"
          stroke="#fff"
          fillOpacity={1}
          fill="url(#color1)"
        />

        <Bar
          name="Tasks Completed"
          dataKey="tasksCompleted"
          stroke="#fff"
          fillOpacity={1}
          fill="url(#color2)"
        />

        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const created = payload.find(
      (p) => p.dataKey === "tasksCreated" || p.dataKey === "total_created"
    );
    const completed = payload.find(
      (p) => p.dataKey === "tasksCompleted" || p.dataKey === "total_finished"
    );

    return (
      <div className="p-3 rounded-md shadow bg-background border-accent">
        <p className="font-medium text-sm mb-1">{label}</p>
        <div className="text-muted-foreground text-xs flex flex-col gap-1">
          <div className="flex gap-4">
            <span className="flex-center flex-1">
              <div className="p-1 border-accent me-1 bg-[#7ba6e4]" />
              <p className="flex-1">Tasks created</p>
            </span>
            <p className="font-bold">{created ? created.value : 0}</p>
          </div>
          <div className="flex gap-4">
            <span className="flex-center flex-1">
              <div className="p-1 border-accent me-1 bg-[#a8e6a3]" />
              <p className="flex-1">Tasks completed</p>
            </span>
            <p className="font-bold">{completed ? completed.value : 0}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
