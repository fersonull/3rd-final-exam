import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useFormData } from "@/hooks/use-formdata";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialForm = {
    title: "",
    description: "",
    priority: "normal",
    status: "pending",
    due_date: "",
    assignee_id: "",
    project_id: ""
};

const PRIORITY_OPTIONS = [
    { value: "low", label: "Low" },
    { value: "normal", label: "Normal" },
    { value: "high", label: "High" }
];

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "ongoing", label: "Ongoing" },
    { value: "finished", label: "Finished" }
];

export default function NewTaskForm({ projectId, projects = [], onSubmit }) {
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const { pid } = useParams();
    const { values, handleChange, getFormData } = useFormData({
        ...initialForm,
        project_id: projectId || ""
    });

    const [submitting, setSubmitting] = useState(false);

    // Fetch for creating the task (mutation)
    const { refetch: createTask, error } = useFetch("/tasks", { method: "POST" }, false);

    // Fetch project members with useFetch custom hook
    const {
        data: members,
        loading: membersLoading,
        error: membersError
    } = useFetch(
        pid ? `/projects/${pid}/members` : null,
    );

    console.log(members);
    console.log(membersError);

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
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div>
                <label className="block font-medium mb-1">
                    Task Title <span className="text-red-500">*</span>
                </label>
                <input
                    name="title"
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={values.title}
                    onChange={handleChange}
                    maxLength={200}
                />
                {error?.title && <span className="text-xs text-red-500">{error.title}</span>}
            </div>

            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    name="description"
                    className="w-full border rounded px-3 py-2"
                    value={values.description}
                    onChange={handleChange}
                    rows={3}
                />
                {error?.description && <span className="text-xs text-red-500">{error.description}</span>}
            </div>

            {
                !projectId &&
                <div>
                    <label className="block font-medium mb-1">
                        Project <span className="text-red-500">*</span>
                    </label>
                    <Select
                        name="project_id"
                        className="w-full border rounded px-3 py-2"
                        value={values.project_id}
                        onValueChange={(value) => handleChange({ target: { name: "project_id", value } })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Select project</SelectItem>
                            {projects.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {error?.project_id && <span className="text-xs text-red-500">{error.project_id}</span>}
                </div>
            }

            {/* dito */}
            <div>
                <label className="block font-medium mb-1">Assign To</label>
                <Select
                    name="user_id"
                    className="w-full border rounded px-3 py-2"
                    value={values.user_id}
                    onValueChange={(value) => handleChange({ target: { name: "assignee_id", value } })}
                    disabled={membersLoading || !members}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={membersLoading ? "Loading..." : "Unassigned"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="null">Unassigned</SelectItem>
                        {members?.map(({ user_id, user_name, user_email }) => (
                            <SelectItem key={user_id} value={user_id}>{user_name || user_email}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {membersError && <span className="text-xs text-red-500">Could not fetch project members.</span>}
                {error?.user_name && <span className="text-xs text-red-500">{error.user_name}</span>}
            </div>

            <div className="flex flex-wrap gap-4">
                <div>
                    <label className="block font-medium mb-1">Priority</label>
                    <Select
                        name="priority"
                        className="border rounded px-3 py-2"
                        value={values.priority}
                        onValueChange={(value) => handleChange({ target: { name: "priority", value } })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            {PRIORITY_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {error?.priority && <span className="text-xs text-red-500">{error.priority}</span>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Status</label>
                    <Select
                        name="status"
                        className="border rounded px-3 py-2"
                        value={values.status}
                        onValueChange={(value) => handleChange({ target: { name: "status", value } })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATUS_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {error?.status && <span className="text-xs text-red-500">{error.status}</span>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Due Date</label>
                    <input
                        name="due_date"
                        type="date"
                        className="border rounded px-3 py-2"
                        value={values.due_date}
                        onChange={handleChange}
                    />
                    {error?.due_date && <span className="text-xs text-red-500">{error.due_date}</span>}
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={submitting}
            >
                {submitting ? "Creating..." : "Create Task"}
            </button>
        </form>
    );
}