import { Outlet } from "react-router-dom";
import Sidebar from "@/components/projects/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardBreadcrumb from "@/components/dashboard/dashboard-breadcrumb";

export default function ProjectsLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full font-outfit">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>
          <div className="py-3">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
