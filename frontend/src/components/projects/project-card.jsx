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
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const { id, name, description, owner_name, status = "active" } = project;

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

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-gray-500">Project ID: {id}</div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link to={`/p/${id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
