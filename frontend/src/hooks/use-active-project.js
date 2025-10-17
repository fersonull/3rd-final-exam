import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/use-fetch";
import useLocalStorage from "./use-localstorage";

export default function useActiveProject({ projectId }) {
    const [projectID, setProjectID] = useState(projectId);
    const [loading, setLoading] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const { refetch: getProjects } = useFetch("/projects/" + projectId);
    const { get, set } = useLocalStorage("activeProject");

    useEffect(() => {
        setProjectID(projectId);
        setActiveProject(get() ?? null);
    }, [projectId]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const project = await getProjects();


                if ((!project || project?.error) && !get()) {
                    console.error("Error fetching project:", project?.error);
                    setActiveProject(null);
                    return;
                }

                setActiveProject(project?.data);

                set(project?.data);

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