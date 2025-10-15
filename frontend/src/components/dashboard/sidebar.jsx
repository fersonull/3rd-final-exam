import SidebarUserAvatar from "./sidebar-user-avatar";
import { Link, useNavigate } from "react-router-dom";
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
  SidebarFooter,
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
import { projects } from "@/lib/projetcs-data-placeholder";
import { projectItems, appItems } from "@/lib/dashboard-sidebar-definitions";
import { useFetch } from "@/hooks/use-fetch";
import { useAuthContext } from "@/contexts/auth-context";
import useLocalStorage from "@/hooks/use-localstorage";
import { useCallback, useEffect } from "react";
import useActiveProject from "@/hooks/use-active-project";



export default function AppSidebar() {
  const navigate = useNavigate();
  const { get, set } = useLocalStorage("activeProject");
  const { token } = useAuthContext();
  const { data: projects, loading: projectsLoading } = useFetch("/projects/users");

  const setActiveProject = get();

  const { activeProject, loading: projectLoading } = useActiveProject({ projectId: setActiveProject?.id });


  const handleProjectChange = useCallback((value) => {

    set(value);


    navigate(`/p/${value}/overview`);
  }, [setActiveProject]);

  // useEffect(() => {
  //   console.log(activeProject)
  // }, [activeProject, projectLoading])

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select defaultValue={setActiveProject?.id} onValueChange={handleProjectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select project" disabled={projectsLoading} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your projects</SelectLabel>
                  {projects?.data?.length > 0 ? (
                    projects?.data?.map(({ id, name }) => (
                      <SelectItem key={id} value={id} disabled={projectsLoading}>
                        {name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>No projects found</SelectItem>
                  )}
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
        <SidebarUserAvatar />
      </SidebarFooter>
    </Sidebar >
  );
}
