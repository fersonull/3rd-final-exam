import { Outlet } from "react-router-dom";
import HomeNavbar from "@/components/home/home-navbar";
import { Button } from "@/components/ui/button";

export default function PublicRoutes() {
  return (
    <div className="flex flex-col h-screen font-geist">
      <HomeNavbar />

      <main className="lg:px-24 flex-1">
        <div className="h-full grid md:grid-cols-3 grid-cols-1 items-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
