import { Link } from "react-router-dom";
import { PanelRightOpen } from "lucide-react";
import { Button } from "../ui/button";

export default function HomeNavbar() {
  return (
    <div className="flex-center lg:px-24 px-4 py-2">
      <div className="flex-between w-full">
        <Link className="logo">Tracksikel</Link>

        <div className="md:hidden">
          <Button variant="ghost">
            <PanelRightOpen />
          </Button>
        </div>

        <div className="hidden md:flex gap-2">
          <Button size="sm" variant="ghost">
            Login
          </Button>
          <Button size="sm">Get started</Button>
        </div>
      </div>
    </div>
  );
}
