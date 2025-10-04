import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { useAuthContext } from "@/contexts/auth-context";

export default function SidebarUserAvatar() {
  const { user } = useAuthContext();

  console.log(user);

  return (
    <div className="flex flex-col gap-0.5 px-2 py-1.5 rounded-md border">
      <div className="flex items-center gap-2">
        <img
          src="https://ui-avatars.com/api/?name=Jasfer+Monton&background=random"
          alt="Jasfer Monton"
          className="w-8 h-8 rounded-full border"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-medium text-sm truncate">{user?.name}</span>
          <span className="text-xs text-muted-foreground truncate">
            {user?.email}
          </span>
        </div>
        <Button variant="icon" title="Settings">
          <Settings />
        </Button>
      </div>
    </div>
  );
}
