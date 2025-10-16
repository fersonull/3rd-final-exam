import { Button } from "../ui/button";
import { Settings, LogOut, User, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useFetch } from "@/hooks/use-fetch";
import { useNavigate } from "react-router-dom";

export default function SidebarUserAvatar() {
  const { token } = useAuthContext();
  const { refetch: logout, loading: loggingOut } = useFetch(
    "/logout",
    {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    },
    false
  );
  const { user, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();

    if (res?.success) {
      setToken(null);

      toast.success(res?.message);

      navigate("/auth");

      return;
    }
  };

  const handleProfile = () => {
    // navigate("/profile");
  };

  return (
    <div className="flex flex-col gap-0.5 px-2 py-1.5 rounded-md border">
      <div className="flex items-center gap-2">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
          alt={user?.name || "User Avatar"}
          className="w-8 h-8 rounded-full border"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-medium text-sm truncate">{user?.name}</span>
          <span className="text-xs text-muted-foreground truncate">
            {user?.email}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" title="Settings">
              <Settings />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="!font-outfit">
            <DropdownMenuItem onClick={handleProfile}>
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              {loggingOut ? (
                <LoaderCircle size={16} className="mr-2 animate-spin" />
              ) : (
                <LogOut size={16} className="mr-2" />
              )}
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
