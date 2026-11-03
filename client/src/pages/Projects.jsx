import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Folder, Trash } from "@phosphor-icons/react";

import api from "../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProjects = async () => {
        try {
            const res = await api.get("/projects");
            setProjects(res.data);
        } catch (error) {
            setError("Unable to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const createProject = async (e) => {
        e.preventDefault();

        try {
            await api.post("/projects", {
                name,
                description,
            });

            setName("");
            setDescription("");
            setError("");

            fetchProjects();
        } catch (error) {
            setError(error.response?.data?.message || "Creation failed");
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm("Delete this project and its issues?")) {
            return;
        }

        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (error) {
            setError("Unable to delete project");
        }
    };

    const editProject = async (project) => {
        const newName = window.prompt("Enter new project name", project.name);

        if (!newName || !newName.trim()) return;

        try {
            await api.put(`/projects/${project._id}`, {
                name: newName,
            });

            fetchProjects();
        } catch (error) {
            setError("Unable to update project");
        }
    };

    if (loading) return <p>Loading projects...</p>;

    return (
        <div>
            <div className="page-heading">
                <div>
                    <h1>Projects</h1>
                    <p>Manage your development projects.</p>
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <form className="project-form" onSubmit={createProject}>
                <input
                    placeholder="Project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    placeholder="Project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">
                    <Plus size={18} />
                    Create Project
                </button>
            </form>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div className="project-card" key={project._id}>
                        <div className="project-icon">
                            <Folder size={24} />
                        </div>

                        <h3>{project.name}</h3>

                        <p>{project.description}</p>

                        <div className="project-actions">
                            <Link to={`/projects/${project._id}`}>
                                View Details
                            </Link>

                            <button onClick={() => editProject(project)}>
                                Edit
                            </button>

                            <button onClick={() => deleteProject(project._id)}>
                                <Trash size={17} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <p>No projects found. Create your first project.</p>
            )}
        </div>
    );
}

export default Projects;
