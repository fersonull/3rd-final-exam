import { Link } from "react-router-dom";
import { PanelRightOpen, Workflow } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/auth-context";

export default function HomeNavbar() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex-center lg:px-24 px-4 py-2">
      <div className="flex-between w-full">
        <Link to="/" className="logo">
          Nebulo
        </Link>

        <div className="md:hidden">
          <Button variant="ghost">
            <PanelRightOpen />
          </Button>
        </div>

        <div className="hidden md:flex gap-2 font-outfit">
          {isAuthenticated ? (
            <Link to="p">
              <Button>
                <Workflow /> Go to workspace
              </Button>
            </Link>
          ) : (
            <>
              <Link to={"/auth?tab=login"}>
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </Link>
              <Link to={"/auth?tab=register"}>
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
