import { useAuthContext } from "@/contexts/auth-context";

export default function Index() {
  const { user } = useAuthContext()

  return <div>Welcome, {user?.name}</div>;
}
