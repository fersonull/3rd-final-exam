import TasksTable from "@/components/tasks/tasks-table";
import Banner from "@/components/ui/banner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";

export default function Tasks() {
  return (
    <>
      <div className="flex md:flex-row items-center justify-between gap-4 ">
        <Banner title="Tasks" sub={`Manage and track your team's tasks.`} />
      </div>

      <div className="w-full h-full">
        <TasksTable />
      </div>
    </>
  );
}
