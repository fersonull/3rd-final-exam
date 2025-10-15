import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useAuthContext } from "@/contexts/auth-context";

export default function useActiveProject({ projectId }) {
    const [projectID, setProjectID] = useState(projectId);
    const [loading, setLoading] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const { token } = useAuthContext();
    const { refetch: getProjects } = useFetch("/projects/" + projectId, { method: "GET", headers: { Authorization: "Bearer " + token } }, false);

    useEffect(() => {
        setProjectID(projectId);
    }, [projectId]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const project = await getProjects();

                // console.log(project);

                if (!project || project.error) {
                    console.error("Error fetching project:", project?.error);
                    setActiveProject(null);
                    return;
                }

                setActiveProject(project.data);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectID]);

    return { activeProject, loading };
}