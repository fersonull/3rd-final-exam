import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { refetch: logout, loading: loggingOut } = useFetch(
    "/logout",
    { method: "POST" },
    false
  );

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div>
      <div>Welcome, {user?.name}</div>

      {loggingOut && <p>Logging out...</p>}

      <Button onClick={handleLogout} variant="destructive">
        Log out
      </Button>
    </div>
  );
}
