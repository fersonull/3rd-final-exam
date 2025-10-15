import TasksTable from "@/components/tasks/tasks-table";
import Banner from "@/components/ui/banner";
import { useFetch } from "@/hooks/use-fetch";

export default function Tasks() {


  const { data: tasks, isLoading, error } = useFetch("/tasks");


  if (error?.forbidden) {
    return <div>{error?.forbidden}</div>
  }



  if (!error) return (
    <>
      <div className="flex md:flex-row items-center justify-between gap-4 ">
        <Banner title="Tasks" sub={`Manage and track your team's tasks.`} />
      </div>

      <div className="w-full h-full">
        <TasksTable tasks={tasks} />
      </div>
    </>
  );
}
