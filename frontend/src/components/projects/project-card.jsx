import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Users, ListTodo, Calendar } from "lucide-react"; // Add relevant icons
import useLocalStorage from "@/hooks/use-localstorage";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const {
    set,
  } = useLocalStorage("activeProject");
  const {
    id,
    name,
    description,
    owner_name,
    status = "active",
    total_members, // Added
    total_tasks, // Added
    createdAt, // Add createdAt for the date
  } = project;

  // Fallback for demo if data not provided
  const members =
    typeof total_members === "number"
      ? total_members
      : Math.floor(Math.random() * 7) + 2;
  const tasks =
    typeof total_tasks === "number"
      ? total_tasks
      : Math.floor(Math.random() * 51) + 10;

  // Format the date nicely
  function formatDate(dateStr) {
    if (!dateStr) return "Unknown date";
    try {
      const dateObj = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
      return dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Unknown date";
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };


  const handleView = () => {
    set(project);

    navigate(`/p/${id}/overview`);
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {name}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-600">
              Owner: {owner_name || "Unknown"}
            </CardDescription>
            {/* Add created date below owner */}
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
              <Calendar size={14} className="text-gray-300" />
              <span>Created: {formatDate(createdAt)}</span>
            </div>
          </div>
          <CardAction>
            <Badge
              className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(
                status
              )}`}
            >
              {status || "Active"}
            </Badge>
          </CardAction>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {description && (
            <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          )}

          {/* Added members and tasks info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={14} className="text-gray-400" /> {members} Members
            </span>
            <span className="flex items-center gap-1">
              <ListTodo size={14} className="text-gray-400" /> {tasks} Tasks
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-gray-500">Project ID: {id}</div>
            <Button
              variant="outline"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleView}
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
