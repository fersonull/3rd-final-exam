import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "../ui/card";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

// Pie chart data and color palette
const totalTasks = 200;
const completedTasks = 122;
const ongoingTasks = 12;

const pieData = [
    { name: "Completed", value: completedTasks },
    { name: "Ongoing", value: ongoingTasks },
    { name: "Remaining", value: totalTasks - completedTasks - ongoingTasks }
];

// Color palette from InfoChart
const PIE_COLORS = [
    "#a8e6a3", // Completed (matches tasksCompleted in InfoChart)
    "#7ba6e4", // Ongoing (matches tasksCreated in InfoChart)
    "#e5e7eb"  // Remaining (neutral gray, tailwind gray-200)
];


export default function DistributionChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>
                    Breakdown of completed, ongoing, and remaining tasks
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center w-full h-64">
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
                                <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
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
            </CardContent>
        </Card>
    )
}

function CustomPieTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 rounded-md shadow bg-background border-accent text-xs">
                <span className="font-medium">{payload[0].name}:</span> {payload[0].value}
            </div>
        );
    }
    return null;
}