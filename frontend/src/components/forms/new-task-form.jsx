import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useFormData } from "@/hooks/use-formdata";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ListCheck, X } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  priority: "normal",
  status: "pending",
  due_date: "",
  assignee_id: "",
  project_id: "",
};

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
];

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "ongoing", label: "Ongoing" },
  { value: "finished", label: "Finished" },
];

export default function NewTaskForm({ projectId, projects = [], onSubmit }) {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { values, handleChange, getFormData } = useFormData({
    ...initialForm,
    project_id: projectId || "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Fetch for creating the task (mutation)
  const { refetch: createTask, error } = useFetch(
    "/tasks",
    { method: "POST" },
    false
  );

  // Fetch project members with useFetch custom hook
  const {
    data: members,
    loading: membersLoading,
    error: membersError,
  } = useFetch(pid ? `/projects/${pid}/members` : null);

  useEffect(() => {
    if (projectId) {
      handleChange({ target: { name: "project_id", value: projectId } });
    }
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = getFormData();

      const res = await createTask({ body: form });

      if (res?.success) {
        toast.success(res.message);
        navigate(`/p/${projectId}/tasks/${res.task.id}`);
      }
    } catch (e) {
      console.error("Error creating task:", e);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="">
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Task Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                maxLength={200}
                placeholder="Enter task title..."
                className="w-full"
              />
              {error?.title && (
                <p className="text-xs text-destructive">{error.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the task details..."
                className="w-full"
              />
              {error?.description && (
                <p className="text-xs text-destructive">{error.description}</p>
              )}
            </div>
          </div>

          {/* Project Selection */}
          {!projectId && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Project <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={values.project_id}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "project_id", value } })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Select project</SelectItem>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error?.project_id && (
                    <p className="text-xs text-destructive">
                      {error.project_id}
                    </p>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Assignment and Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Assign To</Label>
              <Select
                value={values.user_id}
                onValueChange={(value) =>
                  handleChange({ target: { name: "assignee_id", value } })
                }
                disabled={membersLoading || !members}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={membersLoading ? "Loading..." : "Unassigned"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Unassigned</SelectItem>
                  {members?.map(({ user_id, user_name, user_email }) => (
                    <SelectItem key={user_id} value={user_id}>
                      {user_name || user_email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!members && (
                <p className="text-xs text-destructive">
                  No project members found.
                </p>
              )}
              {error?.user_name && members && members.length > 0 && (
                <p className="text-xs text-destructive">{error.user_name}</p>
              )}
            </div>

            {/* Task Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <Select
                  value={values.priority}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "priority", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error?.priority && (
                  <p className="text-xs text-destructive">{error.priority}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select
                  value={values.status}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "status", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error?.status && (
                  <p className="text-xs text-destructive">{error.status}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_date" className="text-sm font-medium">
                  Due Date
                </Label>
                <Input
                  id="due_date"
                  name="due_date"
                  type="date"
                  value={values.due_date}
                  onChange={handleChange}
                />
                {error?.due_date && (
                  <p className="text-xs text-destructive">{error.due_date}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              title="Cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="min-w-[120px]"
            >
              <ListCheck />
              {submitting ? "Creating..." : "Save Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
