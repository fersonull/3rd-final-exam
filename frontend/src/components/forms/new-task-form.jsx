import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useFormData } from "@/hooks/use-formdata";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
];

export default function NewTaskForm({ projectId, projects = [], members = [], onSubmit }) {
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const { values, handleChange, getFormData } = useFormData({
        ...initialForm,
        project_id: projectId || ""
    });

    const [submitting, setSubmitting] = useState(false);

    const { refetch: createTask, error } = useFetch("/tasks", { method: "POST", headers: { Authorization: `Bearer ${token}` } }, false);
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

            if (error) {
                console.log(error);
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

            { // If project is not preselected, offer a select
                !projectId &&
                <div>
                    <label className="block font-medium mb-1">
                        Project <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="project_id"
                        className="w-full border rounded px-3 py-2"
                        value={values.project_id}
                        onChange={handleChange}

                    >
                        <option value="">Select project</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    {error?.project_id && <span className="text-xs text-red-500">{error.project_id}</span>}
                </div>
            }

            <div>
                <label className="block font-medium mb-1">Assign To</label>
                <select
                    name="assignee_id"
                    className="w-full border rounded px-3 py-2"
                    value={values.assignee_id}
                    onChange={handleChange}
                >
                    <option value="">Unassigned</option>
                    {members.map((m) => (
                        <option key={m.id} value={m.id}>{m.name || m.email}</option>
                    ))}
                </select>
                {error?.assignee_id && <span className="text-xs text-red-500">{error.assignee_id}</span>}
            </div>

            <div className="flex flex-wrap gap-4">
                <div>
                    <label className="block font-medium mb-1">Priority</label>
                    <select
                        name="priority"
                        className="border rounded px-3 py-2"
                        value={values.priority}
                        onChange={handleChange}
                    >
                        {PRIORITY_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {error?.priority && <span className="text-xs text-red-500">{error.priority}</span>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Status</label>
                    <select
                        name="status"
                        className="border rounded px-3 py-2"
                        value={values.status}
                        onChange={handleChange}
                    >
                        {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
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