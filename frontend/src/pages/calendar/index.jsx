import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, add, isSameMonth, isSameDay, isToday } from "date-fns";
import Banner from "@/components/ui/banner";

// Dummy data for project tasks (in real use, fetch from API based on project)
const dummyTasks = [
    {
        id: 1,
        name: "Design wireframes",
        dueDate: "2024-06-18",
        projectId: "sample-project",
    },
    {
        id: 2,
        name: "API integration",
        dueDate: "2024-06-20",
        projectId: "sample-project",
    },
    {
        id: 3,
        name: "Sprint planning",
        dueDate: "2024-06-21",
        projectId: "sample-project",
    },
];

function getProjectTasks(projectId) {
    // Replace with real fetching logic
    return dummyTasks.filter((t) => t.projectId === projectId);
}

function CalendarGrid({ monthDate, tasks }) {
    // start and end for grid
    const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 0 });

    let day = start;
    let days = [];
    while (day <= end) {
        days.push(day);
        day = add(day, { days: 1 });
    }

    return (
        <div className="grid grid-cols-7 text-sm border rounded-lg overflow-hidden bg-white dark:bg-background">
            {/* Weekday headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((wd) => (
                <div
                    key={wd}
                    className="p-3 border-b font-semibold text-center bg-muted text-muted-foreground"
                >
                    {wd}
                </div>
            ))}
            {days.map((d) => {
                const dayTasks = tasks.filter(
                    (task) => format(new Date(task.dueDate), "yyyy-MM-dd") === format(d, "yyyy-MM-dd")
                );
                return (
                    <div
                        key={d.toString()}
                        className={`min-h-[72px] flex flex-col p-2 border-r border-b ${!isSameMonth(d, monthDate)
                            ? "bg-muted/50 text-muted-foreground"
                            : isToday(d)
                                ? "bg-primary/10 border-primary"
                                : ""
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${isToday(d) ? "font-bold text-primary" : ""}`}>
                                {d.getDate()}
                            </span>
                            {isSameDay(d, new Date()) && (
                                <span className="rounded-full bg-primary text-white px-2 py-0.5 text-xs ml-2">
                                    Today
                                </span>
                            )}
                        </div>
                        <ul className="mt-1 space-y-1">
                            {dayTasks.map((task) => (
                                <li key={task.id}>
                                    <Card className="p-1 bg-muted cursor-pointer hover:bg-accent transition">
                                        <div className="text-xs font-medium truncate">{task.name}</div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default function CalendarPage() {
    const { pid } = useParams();
    const [month, setMonth] = useState(() => new Date());
    const tasks = useMemo(() => getProjectTasks(pid || "sample-project"), [pid]);
    const monthLabel = format(month, "MMMM yyyy");

    // The calendar will always show month view
    function goToPrev() {
        setMonth((m) => add(m, { months: -1 }));
    }
    function goToNext() {
        setMonth((m) => add(m, { months: 1 }));
    }

    return (
        <>
            <Banner
                title="Calendar"
                sub="View your team's calendar and track scheduled project tasks."
            />

            <Card className="">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>
                                <CalendarIcon className="inline-block mr-2" size={24} />
                                {monthLabel}
                            </CardTitle>
                            <CardDescription>
                                Scheduled tasks are shown on their due date.
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={goToPrev}>
                                &#8592;
                            </Button>
                            <Button variant="outline" size="icon" onClick={goToNext}>
                                &#8594;
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <CalendarGrid monthDate={month} tasks={tasks} />
                </CardContent>
            </Card>
        </>
    );
}