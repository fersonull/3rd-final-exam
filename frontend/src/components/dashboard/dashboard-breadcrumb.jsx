import { useLocation, useParams, matchPath, Link } from "react-router-dom";
import BreadcrumbTemplate from "./breadcrumb-templ";

export default function DashboardBreadcrumb() {
  const location = useLocation();
  const { pid } = useParams(); // TODO: apply backend fetching for current project

  console.log(pid);

  // Split the path, e.g. /p/123/tasks -> ["p", "123", "tasks"]
  const paths = location.pathname.split("/").filter(Boolean);

  // Only handle dashboard breadcrumb for /p/:projectid/...
  // Paths: ["p", ":projectid", ...rest]
  const breadcrumbItems = [];

  if (paths[0] === "p" && paths[1]) {
    // Project page root breadcrumb
    breadcrumbItems.push({
      label: pid?.name || "Project 1",
      to: `/p/${paths[1]}`,
    });

    // Add additional breadcrumbs for each sub path
    for (let i = 2; i < paths.length; i++) {
      const pathSegment = paths[i];
      const label = pathSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const href =
        `/p/${paths[1]}` +
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
