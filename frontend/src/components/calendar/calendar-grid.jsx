import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  add,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

export default function CalendarGrid({ monthDate, tasks }) {
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
          (task) =>
            format(new Date(task.due_date), "yyyy-MM-dd") ===
            format(d, "yyyy-MM-dd")
        );
        return (
          <div
            key={d.toString()}
            className={`min-h-[72px] flex flex-col p-2 border-r border-b ${
              !isSameMonth(d, monthDate)
                ? "bg-muted/50 text-muted-foreground"
                : isToday(d)
                ? "bg-primary/10 border-primary"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs ${
                  isToday(d) ? "font-bold text-primary" : ""
                }`}
              >
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
                  <Card
                    className={`p-1 cursor-pointer hover:bg-accent transition ${
                      task.overdue
                        ? "bg-red-100 border-red-300"
                        : task.status === "completed"
                        ? "bg-green-100 border-green-300"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-xs font-medium truncate">
                      {task.title}
                    </div>
                    {task.assignee_name && (
                      <div className="text-xs text-muted-foreground truncate">
                        {task.assignee_name}
                      </div>
                    )}
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
