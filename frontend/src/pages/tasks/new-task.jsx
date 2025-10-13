import Banner from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Check, ListCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useResponsive from "@/hooks/use-responsive";
import NewTaskForm from "@/components/forms/new-task-form";
import { useParams } from "react-router-dom";

export default function NewTask() {
  const navigate = useNavigate();
  const { isTablet, isDesktop } = useResponsive();
  const { pid } = useParams();

    return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
        <Banner
          title="Create new task"
          sub={`Add a new task to your project and assign it to your team.`}
        />

        {isTablet || isDesktop && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              title="Cancel"
              onClick={() => navigate(-1)}
            >
              {/* <Check size={18} /> */}
              Cancel
            </Button>
            <Button title="Save task">
              <ListCheck />
              Save Task
            </Button>
          </div>
        )}
      </div>

      <NewTaskForm projectId={pid} />
    </>
  );
}
