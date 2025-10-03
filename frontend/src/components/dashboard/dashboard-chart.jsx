import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const sales = [
  { date: "Aug 29", contributions: 2, feedback: 344 },
  { date: "Aug 30", contributions: 2682, feedback: 1879 },
  { date: "Sept 1", contributions: 3000, feedback: 23 },
  { date: "Sept 2", contributions: 2982, feedback: 123 },
  { date: "Sept 3", contributions: 300, feedback: 1000 },
  { date: "Sept 4", contributions: 12, feedback: 4333 },
  { date: "Sept 5", contributions: 2313, feedback: 24 },
  { date: "Sept 6", contributions: 23, feedback: 1122 },
  { date: "Sept 7", contributions: 233, feedback: 44 },
  { date: "Sept 8", contributions: 2233, feedback: 111 },
  { date: "Sept 9", contributions: 2355, feedback: 25 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={sales}
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
          dataKey="contributions"
          stroke="#fff"
          fillOpacity={1}
          fill="url(#color1)"
          stackId={1}
        />
        <Area
          type="natural"
          dataKey="feedback"
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
              <div className="p-1 border-accent me-1 bg-[#7ba6e4]"></div>
              <p className="flex-1">Contributions</p>
            </span>
            <p className="font-bold">{payload[0].value}</p>
          </div>
          <div className="flex gap-4">
            <span className="flex-center flex-1">
              <div className="p-1 border-accent me-1 bg-[#465f82]"></div>
              <p className="flex-1">Feedbacks</p>
            </span>
            <p className="font-bold">{payload[1].value}</p>
          </div>
        </div>
      </div>
    );
  }
}
