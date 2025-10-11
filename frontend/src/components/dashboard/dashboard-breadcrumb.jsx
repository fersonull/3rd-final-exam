import { useLocation, Link } from "react-router-dom";
import BreadcrumbTemplate from "./breadcrumb-templ";

export default function DashboardBreadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = paths.map((path, index) => {
    const label = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const href =
      "/" +
      paths
        .slice(0, index + 1)
        .map((p) => p.replace(/-/g, ""))
        .join("/");

    return {
      label,
      to: index === paths.length - 1 ? null : href,
    };
  });

  return (
    <BreadcrumbTemplate
      items={[{ label: "Project name", href: "/" }, ...breadcrumbItems]}
    />
  );
}
