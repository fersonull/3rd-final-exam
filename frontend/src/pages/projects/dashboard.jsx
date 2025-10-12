import { useState, useMemo } from "react";
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
import { Search, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

// FAKE: Simulated user info and invited projects for demonstration
const currentUser = {
  id: "u1",
  name: "Jane Smith",
  email: "jane@example.com",
};
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
  let filtered = projectList.filter((project) =>
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
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }
  return filtered;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);

  const filteredAndSortedProjects = useMemo(() => {
    return sortAndFilter(projects, search, sort);
  }, [search, sort]);

  const filteredAndSortedInvitedProjects = useMemo(() => {
    return sortAndFilter(invitedProjects, search, sort);
  }, [search, sort]);

  return (
    <>
      <Banner
        title="Projects"
        sub="All your owned and shared projects are visible here. Quickly create, browse or join new workspaces."
      />

      {/* Enhanced Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md border rounded-lg shadow-sm px-4 py-4 sticky top-3 z-10">
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
        <Button
          size="lg"
          className="mt-2 md:mt-0 flex gap-2 items-center shadow active:scale-95"
        >
          <FolderPlus className="w-5 h-5" />
          <span className="font-semibold">New Project</span>
        </Button>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center mb-4 gap-2">
            <span className="font-semibold text-2xl flex-shrink-0">
              Your Projects
            </span>
            <span className="bg-green-100 text-green-700 ml-2 px-2 rounded-full text-xs h-6 flex items-center">
              {filteredAndSortedProjects.length} active
            </span>
          </div>
          {filteredAndSortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredAndSortedProjects.map((project) => (
                <ProjectCard key={project.id + "-owned"} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 border rounded-lg bg-gray-50 text-gray-700">
              <div className="text-3xl mb-2">😕</div>
              <div className="text-lg font-semibold">No projects found</div>
              <p className="text-gray-500 mt-1 text-sm">
                You don&apos;t have any projects yet.
                <br />
                <Button className="mt-5" size="sm" variant="outline">
                  <FolderPlus className="w-4 h-4 mr-2" /> Create Project
                </Button>
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center mb-4 gap-2">
            <span className="font-semibold text-2xl flex-shrink-0">
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
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-gray-50 text-gray-700">
              <div className="text-lg font-semibold">No invited projects</div>
              <p className="text-gray-500 mt-1 text-sm">
                You are not a member of any shared projects yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
