import ProjectCard from "@/components/projects/project-card";
import { projects } from "@/lib/projetcs-data-placeholder";
import Banner from "@/components/ui/banner";

export default function Dashboard() {
  return (
    <>
      <Banner title="Projects" sub="Manage and view all your projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No projects found</div>
          <p className="text-gray-400 mt-2">
            Create your first project to get started
          </p>
        </div>
      )}
    </>
  );
}
