import TasksTable from "@/components/tasks/tasks-table";
import Banner from "@/components/ui/banner";
import { useFetch } from "@/hooks/use-fetch";
import { useParams } from "react-router-dom";
export default function Tasks() {
  const { pid } = useParams();

  const { data: tasks, loading, error } = useFetch(`/tasks/project/${pid}/0`);

  // console.log(tasks);

  if (error?.forbidden) {
    return <div>{error?.forbidden}</div>;
  }

  return (
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
