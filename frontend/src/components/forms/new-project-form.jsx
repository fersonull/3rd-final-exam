import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useFormData } from "@/hooks/use-formdata";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
import { FolderPlus, X } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  status: "active",
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
];

export default function NewProjectForm() {
  const navigate = useNavigate();
  const { values, handleChange, getFormData } = useFormData(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const {
    data,
    refetch: createProject,
    error,
  } = useFetch("/projects", { method: "POST" }, false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = getFormData();

      const res = await createProject({ body: form });

      if (res?.success) {
        toast.success(res.message || "Project created successfully!");
        navigate(`/p`);
      }
    } catch (e) {
      console.error("Error creating project:", e);
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
              <Label htmlFor="name" className="text-sm font-medium">
                Project Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                maxLength={200}
                placeholder="Enter project name..."
                className="w-full"
              />
              {data?.errors && data?.errors?.name && (
                <p className="text-xs text-destructive">{data?.errors?.name}</p>
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
                rows={4}
                placeholder="Describe your project..."
                className="w-full"
              />
              {data?.errors && data?.errors?.description && (
                <p className="text-xs text-destructive">
                  {data?.errors?.description}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Project Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={values.status}
                onValueChange={(value) =>
                  handleChange({ target: { name: "status", value } })
                }
              >
                <SelectTrigger className="w-full">
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
              {data?.errors && data?.errors?.status && (
                <p className="text-xs text-destructive">
                  {data?.errors?.status}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              title="Cancel"
              onClick={() => navigate(-1)}
              type="button"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="min-w-[140px]"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              {submitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
