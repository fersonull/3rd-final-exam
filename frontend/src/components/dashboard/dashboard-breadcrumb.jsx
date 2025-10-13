import { useLocation, useParams } from "react-router-dom";
import BreadcrumbTemplate from "./breadcrumb-templ";
import useActiveProject from "@/hooks/use-active-project";

export default function DashboardBreadcrumb() {
  const location = useLocation();
  const { pid } = useParams();

  // Fetch the active project using pid
  const active = useActiveProject({ projectId: pid });

  // Split the path, e.g. /p/123/tasks -> ["p", "123", "tasks"]
  const paths = location.pathname.split("/").filter(Boolean);

  // Only handle dashboard breadcrumb for /p/:projectid/...
  // Paths: ["p", ":projectid", ...rest]
  const breadcrumbItems = [];

  if (paths[0] === "p" && paths[1]) {
    // Project page root breadcrumb
    breadcrumbItems.push({
      label: active.activeProject?.name || "Project",
      to: `/p/${paths[1]}/overview`,
    });


    // Add additional breadcrumbs for each sub path
    for (let i = 2; i < paths.length; i++) {
      const pathSegment = paths[i];
      const label = pathSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const href =
        `/p/${paths[1]}/overview` +
        (i > 2
          ? "/" + paths.slice(2, i + 1).join("/")
          : i === 2
          ? "/" + paths[2]
          : "");
      breadcrumbItems.push({
        label,
        to: i === paths.length - 1 ? null : href,
      });
    }
  }

  return <BreadcrumbTemplate items={breadcrumbItems} />;
}
