<<<<<<< HEAD
import { useAuthContext } from "@/contexts/auth-context";

export default function Index() {
  const { user } = useAuthContext()

  return <div>Welcome, {user?.name}</div>;
=======
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth-context";
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
    const res = await logout();

    navigate("/auth");

    return;
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
>>>>>>> 95b24a4 ([ FIXED ] fix error)
}
