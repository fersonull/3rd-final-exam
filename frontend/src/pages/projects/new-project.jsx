import Banner from "@/components/ui/banner";
import NewProjectForm from "@/components/forms/new-project-form";

export default function NewProject() {
  return (
    <>
      <Banner
        title="Create new project"
        sub="Fill out the form below to create a new project."
      />

      <NewProjectForm />
    </>
  );
}
