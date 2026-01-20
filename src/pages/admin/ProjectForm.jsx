import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowLeft, Plus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const ProjectForm = () => {
    const { toast } = useToast()
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isEditing = !!id

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "Web Development",
            tech_stack: "", // Comma separated string for simplicity in form
            live_link: "",
            github_link: "",
            images: [""], // Array of strings (URLs)
        }
    })

    // Watch images to render inputs dynamically
    const images = watch("images")

    useEffect(() => {
        if (isEditing) {
            fetchProject()
        }
    }, [id])

    const fetchProject = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("id", id)
                .single()

            if (error) throw error

            // Transform data for form
            reset({
                ...data,
                tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack.join(", ") : data.tech_stack,
                images: data.images && data.images.length > 0 ? data.images : [""]
            })
        } catch (error) {
            console.error("Error fetching project:", error)
            toast({
                title: "Error",
                description: "Failed to load project details.",
                variant: "destructive",
            })
            navigate("/admin/projects")
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            // Transform form data for DB
            const dbData = {
                title: data.title,
                description: data.description,
                category: data.category,
                tech_stack: data.tech_stack.split(",").map(t => t.trim()).filter(Boolean),
                live_link: data.live_link,
                github_link: data.github_link,
                images: data.images.filter(Boolean), // Remove empty strings
            }

            let error
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from("projects")
                    .update(dbData)
                    .eq("id", id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from("projects")
                    .insert([dbData])
                error = insertError
            }

            if (error) throw error

            toast({
                title: "Success",
                description: `Project ${isEditing ? "updated" : "created"} successfully.`,
            })
            navigate("/admin/projects")
        } catch (error) {
            console.error("Error saving project:", error)
            toast({
                title: "Error",
                description: "Failed to save project.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const addImageField = () => {
        setValue("images", [...images, ""])
    }

    const removeImageField = (index) => {
        const newImages = images.filter((_, i) => i !== index)
        setValue("images", newImages.length ? newImages : [""])
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/admin/projects")}>
                    <ArrowLeft className="h-5 w-5 text-white" />
                </Button>
                <h1 className="text-3xl font-bold text-white">
                    {isEditing ? "Edit Project" : "New Project"}
                </h1>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900 border border-white/5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Project Title</label>
                            <Input
                                {...register("title", { required: "Title is required" })}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="e.g. E-Commerce Platform"
                            />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Category</label>
                            <Input
                                {...register("category")}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="e.g. Web Development"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Description</label>
                        <Textarea
                            {...register("description", { required: "Description is required" })}
                            className="bg-black/50 border-white/10 text-white min-h-[120px]"
                            placeholder="Detailed description of the project..."
                        />
                        {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Tech Stack (comma separated)</label>
                        <Input
                            {...register("tech_stack")}
                            className="bg-black/50 border-white/10 text-white"
                            placeholder="React, Node.js, Tailwind CSS"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Live URL</label>
                            <Input
                                {...register("live_link")}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">GitHub URL</label>
                            <Input
                                {...register("github_link")}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="https://github.com/user/repo"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-400">Images (URLs)</label>
                            <Button type="button" size="sm" variant="ghost" onClick={addImageField} className="text-blue-400 hover:text-blue-300">
                                <Plus className="h-4 w-4 mr-1" /> Add Image
                            </Button>
                        </div>

                        {images.map((img, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    {...register(`images.${index}`)}
                                    className="bg-black/50 border-white/10 text-white"
                                    placeholder="https://..."
                                />
                                {images.length > 1 && (
                                    <Button type="button" size="icon" variant="ghost" onClick={() => removeImageField(index)} className="text-red-400 hover:bg-red-900/10">
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <p className="text-xs text-zinc-500">
                            * Enter direct image URLs. In the future we can add file upload.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 min-w-[150px]" disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            {isEditing ? "Save Changes" : "Create Project"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
