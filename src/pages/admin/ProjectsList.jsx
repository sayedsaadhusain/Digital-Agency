import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Database } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const ProjectsList = () => {
    const { toast } = useToast()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setProjects(data || [])
        } catch (error) {
            console.error("Error fetching projects:", error)
            toast({
                title: "Error",
                description: "Failed to load projects. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return

        try {
            const { error } = await supabase.from("projects").delete().eq("id", id)
            if (error) throw error

            setProjects(projects.filter((p) => p.id !== id))
            toast({
                title: "Success",
                description: "Project deleted successfully.",
            })
        } catch (error) {
            console.error("Error deleting project:", error)
            toast({
                title: "Error",
                description: "Failed to delete project.",
                variant: "destructive",
            })
        }
    }

    const handleMigrate = async () => {
        try {
            setLoading(true)
            // Fetch directly from public folder
            const response = await fetch('/projects.json')
            const localProjects = await response.json()

            if (!window.confirm(`This will import ${localProjects.length} projects from projects.json. Continue?`)) {
                setLoading(false)
                return
            }

            const projectsToInsert = localProjects.map(p => ({
                title: p.title,
                description: p.description,
                category: "Web Development", // Default
                tech_stack: p.techStack,
                live_link: p.liveLink,
                github_link: p.githubLink,
                images: p.screenshots
            }))

            const { error } = await supabase.from("projects").insert(projectsToInsert)
            if (error) throw error

            toast({
                title: "Success",
                description: "Projects migrated successfully.",
            })
            fetchProjects()
        } catch (error) {
            console.error("Error migrating projects:", error)
            toast({
                title: "Error",
                description: "Failed to migrate projects. Make sure projects.json exists.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Projects</h1>
                <div className="flex gap-2">
                    {projects.length === 0 && (
                        <Button variant="outline" onClick={handleMigrate} className="border-green-500/20 text-green-400 hover:bg-green-500/10">
                            <Database className="h-4 w-4 mr-2" />
                            Migrate from JSON
                        </Button>
                    )}
                    <Link to="/admin/projects/new">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Project
                        </Button>
                    </Link>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900 rounded-xl border border-white/5">
                    <p className="text-zinc-500 mb-4">No projects found.</p>
                    <Link to="/admin/projects/new">
                        <Button variant="outline">Create your first project</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {project.images?.[0] ? (
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="h-16 w-24 object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="h-16 w-24 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-500 text-xs">
                                        No Image
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <span className="bg-white/5 px-2 py-0.5 rounded">{project.category}</span>
                                        {project.live_link && (
                                            <a
                                                href={project.live_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center hover:text-blue-400 transition-colors"
                                            >
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link to={`/admin/projects/${project.id}`}>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-white">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-900/10"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
