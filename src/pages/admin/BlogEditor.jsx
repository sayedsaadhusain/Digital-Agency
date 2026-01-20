import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export const BlogEditor = () => {
    const { toast } = useToast()
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isEditing = !!id

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            excerpt: "",
            cover_image: "",
            published: false,
        }
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
        ],
        content: '<p>Start writing your amazing post...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 bg-black/50 rounded-lg border border-white/10',
            },
        },
    })

    // Watch title to auto-generate slug
    const title = watch("title")
    useEffect(() => {
        if (!isEditing && title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            setValue("slug", slug)
        }
    }, [title, isEditing, setValue])

    useEffect(() => {
        if (isEditing) {
            fetchPost()
        }
    }, [id])

    const fetchPost = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single()

            if (error) throw error

            reset(data)
            if (editor && data.content) {
                editor.commands.setContent(data.content)
            }
        } catch (error) {
            console.error("Error fetching post:", error)
            toast({
                title: "Error",
                description: "Failed to load post.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const content = editor.getHTML()

            const dbData = {
                ...data,
                content,
            }

            let error
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from("posts")
                    .update(dbData)
                    .eq("id", id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from("posts")
                    .insert([dbData])
                error = insertError
            }

            if (error) throw error

            toast({
                title: "Success",
                description: `Post ${isEditing ? "updated" : "created"} successfully.`,
            })
            navigate("/admin/blog")
        } catch (error) {
            console.error("Error saving post:", error)
            toast({
                title: "Error",
                description: "Failed to save post. Slug might be duplicate.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
                        <ArrowLeft className="h-5 w-5 text-white" />
                    </Button>
                    <h1 className="text-3xl font-bold text-white">
                        {isEditing ? "Edit Post" : "New Post"}
                    </h1>
                </div>
                <Button onClick={handleSubmit(onSubmit)} className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Title</label>
                        <Input
                            {...register("title", { required: "Title is required" })}
                            className="bg-black/50 border-white/10 text-white text-lg font-bold"
                            placeholder="Enter post title..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Content</label>
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-4">
                        <h3 className="font-semibold text-white">Publishing</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="published"
                                {...register("published")}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <label htmlFor="published" className="text-sm text-zinc-300">Publish immediately</label>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-4">
                        <h3 className="font-semibold text-white">SEO & Metadata</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Slug</label>
                            <Input
                                {...register("slug", { required: "Slug is required" })}
                                className="bg-black/50 border-white/10 text-white font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Excerpt</label>
                            <Textarea
                                {...register("excerpt")}
                                className="bg-black/50 border-white/10 text-white h-24"
                                placeholder="Short summary for SEO..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Cover Image URL</label>
                            <Input
                                {...register("cover_image")}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
