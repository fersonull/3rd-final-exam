import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,  
  Tooltip,
  CartesianGrid,
} from "recharts";

function getLast7DaysData() {
  const today = new Date();
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    data.push({
      date: `${month} ${day}`,
      tasksCreated: Math.floor(Math.random() * 10) + 1,
      tasksCompleted: Math.floor(Math.random() * 9) + 1,
    });
  }
  return data;
}

function getLast1MonthData() {
  const today = new Date();
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    data.push({
      date: `${month} ${day}`,
      tasksCreated: Math.floor(Math.random() * 10) + 1,
      tasksCompleted: Math.floor(Math.random() * 9) + 1,
    });
  }
  return data;
}

export default function InfoChart({ range = "7d" }) {
  const data = range === "1m" ? getLast1MonthData() : getLast7DaysData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7ba6e4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7ba6e4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#465f82" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#465f82" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <CartesianGrid vertical={false} opacity={0.1} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="natural"
          dataKey="tasksCreated"
          stroke="#fff"
          fillOpacity={1}
          fill="url(#color1)"
          stackId={1}
        />
        <Area
          type="natural"
          dataKey="tasksCompleted"
          stroke="#fff"
          fillOpacity={1}
          fill="url(#color2)"
          stackId={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-md shadow bg-background border-accent">
        <p className="font-medium text-sm mb-1">{label}</p>
        <div className="text-muted-foreground text-xs flex flex-col gap-1">
          <div className="flex gap-4">
            <span className="flex-center flex-1">
              <div className="p-1 border-accent me-1 bg-[#7ba6e4]" />
              <p className="flex-1">Tasks created</p>
            </span>
            <p className="font-bold">{payload[0].value}</p>
          </div>
          <div className="flex gap-4">
            <span className="flex-center flex-1">
              <div className="p-1 border-accent me-1 bg-[#465f82]" />
              <p className="flex-1">Tasks completed</p>
            </span>
            <p className="font-bold">{payload[1].value}</p>
          </div>
        </div>
      </div>
    );
  }
}
