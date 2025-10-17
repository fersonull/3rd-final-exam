import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
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
import Banner from "@/components/ui/banner";
import { useFetch } from "@/hooks/use-fetch";
import CalendarGrid from "@/components/calendar/calendar-grid";



export default function CalendarPage() {
  const { pid } = useParams();
  const [month, setMonth] = useState(() => new Date());

  const startDate = format(
    startOfWeek(startOfMonth(month), { weekStartsOn: 0 }),
    "yyyy-MM-dd"
  );
  const endDate = format(
    endOfWeek(endOfMonth(month), { weekStartsOn: 0 }),
    "yyyy-MM-dd"
  );

  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useFetch(pid ? `/tasks/calendar/${pid}/${startDate}/${endDate}` : null);

  const tasks = useMemo(() => {
    if (tasksData?.data && Array.isArray(tasksData.data)) {
      return tasksData.data;
    }
    return [];
  }, [tasksData]);

  const monthLabel = format(month, "MMMM yyyy");

  function goToPrev() {
    setMonth((m) => add(m, { months: -1 }));
  }
  function goToNext() {
    setMonth((m) => add(m, { months: 1 }));
  }

  if (tasksError) {
    return (
      <>
        <Banner
          title="Calendar"
          sub="View your team's calendar and track scheduled project tasks."
        />
        <Card className="">
          <CardContent className="p-8 text-center">
            <div className="text-destructive">Error loading calendar tasks</div>
          </CardContent>
        </Card>
      </>
    );
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
          {tasksLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">
                Loading calendar tasks...
              </div>
            </div>
          ) : (
            <CalendarGrid monthDate={month} tasks={tasks} />
          )}
        </CardContent>
      </Card>
    </>
  );
}
