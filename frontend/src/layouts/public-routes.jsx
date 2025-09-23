import { Outlet } from "react-router-dom";
import HomeNavbar from "@/components/home/home-navbar";

export default function PublicRoutes() {
  return (
    <div className="flex flex-col h-screen font-geist">
      <HomeNavbar />

      <main className="lg:px-24 px-8 flex-1">
        <div className="h-full grid-cols-1 grid md:grid-cols-3 items-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
