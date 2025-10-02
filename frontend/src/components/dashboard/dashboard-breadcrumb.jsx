import { useLocation, Link } from "react-router-dom";
import BreadcrumbTemplate from "./breadcrumb-templ";

export default function DashboardBreadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return {
      label,
      to: index === paths.length - 1 ? null : href,
    };
  });

  return (
    <BreadcrumbTemplate
      items={[{ label: "Home", href: "/" }, ...breadcrumbItems]}
    />
  );
}
