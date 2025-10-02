import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-3">
          <SidebarTrigger />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
