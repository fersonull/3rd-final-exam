import { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/projects/project-card";
import { projects } from "@/lib/projetcs-data-placeholder";
import Banner from "@/components/ui/banner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import EmptyProject from "@/components/projects/empty-project";
import { Search, FolderPlus, FolderCode, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useAuthContext } from "@/contexts/auth-context";


const invitedProjects = [
  {
    id: "invd1",
    name: "Invited Marketing Platform",
    description: "A marketing analytics dashboard shared by another team.",
    owner_name: "Elena Lindstrom",
    status: "active",
    createdAt: "2024-05-15T10:00:00Z",
    invited: true,
  },
  {
    id: "invd2",
    name: "Shared Real Estate Portal",
    description: "Collaboration on property listing portal.",
    owner_name: "Greg Tanaka",
    status: "on-hold",
    createdAt: "2024-01-30T08:00:00Z",
    invited: true,
  },
];

const sortOptions = [
  { value: "created-newest", label: "Newest" },
  { value: "created-oldest", label: "Oldest" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

function sortAndFilter(projectList, search, sort) {
  let filtered = projectList?.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );
  switch (sort) {
    case "created-oldest":
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "created-newest":
    default:
      filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }
  return filtered;
}

export default function Dashboard() {
  const { token } = useAuthContext();
  const { data: projects, loading } = useFetch(
    "/projects/users",
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined
      }
    },
    true
  );


  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);

  const filteredAndSortedProjects = useMemo(() => {
    return sortAndFilter(projects?.data, search, sort);
  }, [search, sort, projects?.data]);

  const filteredAndSortedInvitedProjects = useMemo(() => {
    return sortAndFilter(invitedProjects, search, sort);
  }, [search, sort, projects?.data]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Banner
        title="Projects"
        sub="All your owned and shared projects are visible here. Quickly create, browse or join new workspaces."
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-1 gap-3">
          <InputGroup className="w-full max-w-xs">
            <InputGroupAddon>
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              placeholder="Search by project name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
              aria-label="Search projects"
              autoFocus
            />
          </InputGroup>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-40 min-w-[120px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button>
          <FolderPlus />
          New Project
        </Button>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center mb-4 gap-2">
            <span className="font-medium">
              Your Projects
            </span>
            <span className="bg-green-100 text-green-700 ml-2 px-2 rounded-full text-xs h-6 flex items-center">
              {filteredAndSortedProjects?.length} active
            </span>
          </div>
          {filteredAndSortedProjects?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredAndSortedProjects.map((project) => (
                <ProjectCard key={project.id + "-owned"} project={project} />
              ))}
            </div>
          ) : (
            <EmptyProject>
              <div className="flex gap-2">
                <Button>
                  Create Project
                </Button>
              </div>
            </EmptyProject>
          )}
        </section>

        <section>
          <div className="flex items-center mb-4 gap-2">
            <span className="font-medium">
              Invited Projects
            </span>
            <span className="ml-1 bg-blue-100 text-blue-600 px-2 rounded-full text-xs h-6 flex items-center">
              {filteredAndSortedInvitedProjects.length} shared
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              (accepted)
            </span>
          </div>
          {filteredAndSortedInvitedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredAndSortedInvitedProjects.map((project) => (
                <ProjectCard key={project.id + "-invited"} project={project} />
              ))}
            </div>
          ) : (
            <EmptyProject icon={<UsersRound />} title={"No Invited Projects"} desc={"You are not a member of any shared projects yet."} />
          )}

          <Button className="mt-5" size="sm" variant="outline">
            <UsersRound />
            Browse all
          </Button>
        </section>
      </div>
    </>
  );
}
