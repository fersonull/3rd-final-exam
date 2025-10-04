import { Button } from "../ui/button";
import {
  Calendar,
  LayoutDashboard,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const projectItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
];

const appItems = [
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select>
              <SelectTrigger className="w-full">  
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your projects</SelectLabel>
                  <SelectItem value="Project 1">
                    Project 1
                  </SelectItem>
                  <SelectItem value="Project 2">
                    Project 2
                  </SelectItem>
                  <SelectItem value="Project 3">
                    Project 3
                  </SelectItem>
                  <SelectItem value="Project 4">
                    Project 4
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-0.5 px-2 py-1.5 rounded-md border">
          <div className="flex items-center gap-2">
            <img
              src="https://ui-avatars.com/api/?name=Jasfer+Monton&background=random"
              alt="Jasfer Monton"
              className="w-8 h-8 rounded-full border"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-sm truncate">Jasfer Monton</span>
              <span className="text-xs text-muted-foreground truncate">jasfer@example.com</span>
            </div>
            <Button
              variant='icon'
              title="Settings"
            >
              <Settings />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
