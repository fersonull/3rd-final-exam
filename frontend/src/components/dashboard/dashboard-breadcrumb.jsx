import { useLocation, useParams } from "react-router-dom";
import BreadcrumbTemplate from "./breadcrumb-templ";
import useActiveProject from "@/hooks/use-active-project";

export default function DashboardBreadcrumb() {
  const location = useLocation();
  const { pid } = useParams();

  const active = useActiveProject({ projectId: pid });

  const paths = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = [];

  if (paths[0] === "p" && paths[1]) {
    breadcrumbItems.push({
      label: active.activeProject?.name || "Project",
      to: `/p/${paths[1]}/overview`,
    });


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
