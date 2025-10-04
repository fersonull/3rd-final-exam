import Banner from "@/components/ui/banner"
import { Button } from "@/components/ui/button"
import { Check, ListCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NewTask(){
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
                <Banner title="Create new task" sub={`Add a new task to your project and assign it to your team.`} />
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
                    <Button
                        size="sm"
                        title="Save task"
                    >
                        <ListCheck />
                        Save Task
                    </Button>
                </div>
            </div>
        </>
    )
}