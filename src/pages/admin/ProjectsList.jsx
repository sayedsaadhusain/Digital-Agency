import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Database, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const ProjectsList = () => {
    const { toast } = useToast()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedProjects, setSelectedProjects] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const fileInputRef = useRef(null)

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

    const toggleSelectAll = () => {
        if (selectedProjects.length === projects.length) {
            setSelectedProjects([])
        } else {
            setSelectedProjects(projects.map(p => p.id))
        }
    }

    const toggleSelect = (id) => {
        if (selectedProjects.includes(id)) {
            setSelectedProjects(selectedProjects.filter(pid => pid !== id))
        } else {
            setSelectedProjects([...selectedProjects, id])
        }
    }

    const handleBulkDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedProjects.length} projects? This cannot be undone.`)) return

        try {
            setLoading(true)
            const { error } = await supabase
                .from('projects')
                .delete()
                .in('id', selectedProjects)

            if (error) throw error

            setProjects(projects.filter(p => !selectedProjects.includes(p.id)))
            setSelectedProjects([])
            toast({
                title: "Success",
                description: "Selected projects deleted successfully.",
            })
        } catch (error) {
            console.error("Error deleting projects:", error)
            toast({
                title: "Error",
                description: "Failed to delete projects.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleImportClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        const fileExt = file.name.split('.').pop().toLowerCase()

        if (!['csv', 'json'].includes(fileExt)) {
            toast({
                title: "Invalid File",
                description: "Please upload a valid CSV or JSON file.",
                variant: "destructive",
            })
            return
        }

        const reader = new FileReader()
        reader.onload = async (e) => {
            try {
                setLoading(true)
                const text = e.target.result
                const projectsToInsert = []

                if (fileExt === 'json') {
                    const json = JSON.parse(text)
                    const items = Array.isArray(json) ? json : [json]

                    projectsToInsert.push(...items.map(p => ({
                        title: p.title || "Untitled Project",
                        description: p.description || "",
                        category: p.category || "Web Development",
                        tech_stack: p.tech_stack || p.techStack || [],
                        live_link: p.live_link || p.liveLink || "",
                        github_link: p.github_link || p.githubLink || "",
                        images: p.images || p.screenshots || []
                    })))
                } else {
                    const rows = text.split('\n').filter(row => row.trim() !== '')

                    // Helper to safely parse CSV line with quotes
                    const parseCSVLine = (line) => {
                        const values = []
                        let current = ''
                        let inQuotes = false

                        for (let i = 0; i < line.length; i++) {
                            const char = line[i]

                            if (char === '"') {
                                inQuotes = !inQuotes
                            } else if (char === ',' && !inQuotes) {
                                values.push(current.trim())
                                current = ''
                            } else {
                                current += char
                            }
                        }
                        values.push(current.trim())
                        return values
                    }

                    const startIdx = rows[0].toLowerCase().includes('title') ? 1 : 0

                    for (let i = startIdx; i < rows.length; i++) {
                        const columns = parseCSVLine(rows[i])
                        if (columns.length < 2) continue

                        // Remove quotes from extracted values
                        const cleanColumns = columns.map(col => col.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1'))
                        const [title, description, category, tech_stack, live_link, github_link, images] = cleanColumns

                        projectsToInsert.push({
                            title: title || "Untitled Project",
                            description: description || "",
                            category: category || "Web Development",
                            tech_stack: tech_stack ? tech_stack.split(';').map(t => t.trim()).filter(Boolean) : [],
                            live_link: live_link || "",
                            github_link: github_link || "",
                            images: images ? images.split(';').map(url => url.trim()).filter(Boolean) : []
                        })
                    }
                }

                if (projectsToInsert.length === 0) {
                    toast({
                        title: "No Data",
                        description: "No valid projects found.",
                        variant: "destructive",
                    })
                    return
                }

                const { error } = await supabase.from("projects").insert(projectsToInsert)
                if (error) throw error

                toast({
                    title: "Success",
                    description: `Successfully imported ${projectsToInsert.length} projects.`,
                })
                fetchProjects()

            } catch (error) {
                console.error("Error importing file:", error)
                toast({
                    title: "Import Failed",
                    description: "Failed to process file. Check format.",
                    variant: "destructive",
                })
            } finally {
                setLoading(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        }
        reader.readAsText(file)
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
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    {projects.length > 0 && (
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedProjects.length === projects.length && projects.length > 0}
                                onChange={toggleSelectAll}
                                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-zinc-400">Select All</span>
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    {selectedProjects.length > 0 && (
                        <Button
                            variant="destructive"
                            onClick={handleBulkDelete}
                            className="bg-red-600 hover:bg-red-700 mr-2"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete ({selectedProjects.length})
                        </Button>
                    )}

                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 bg-zinc-900 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 mr-2"
                    />

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".csv,.json"
                        className="hidden"
                    />
                    <Button variant="outline" onClick={handleImportClick} className="border-white/20 text-white hover:bg-white/10">
                        <Upload className="h-4 w-4 mr-2" />
                        Import CSV / JSON
                    </Button>

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
                    {projects
                        .filter(p =>
                            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((project) => (
                            <div
                                key={project.id}
                                className={`p-4 rounded-xl bg-zinc-900 border flex items-center justify-between group transition-colors ${selectedProjects.includes(project.id) ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/5 hover:border-white/10'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedProjects.includes(project.id)}
                                        onChange={() => toggleSelect(project.id)}
                                        className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500"
                                    />
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
