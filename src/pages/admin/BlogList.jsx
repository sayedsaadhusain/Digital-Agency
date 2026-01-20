import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Loader2, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const BlogList = () => {
    const { toast } = useToast()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error("Error fetching posts:", error)
            toast({
                title: "Error",
                description: "Failed to load blog posts.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return

        try {
            const { error } = await supabase.from("posts").delete().eq("id", id)
            if (error) throw error

            setPosts(posts.filter((p) => p.id !== id))
            toast({
                title: "Success",
                description: "Post deleted successfully.",
            })
        } catch (error) {
            console.error("Error deleting post:", error)
            toast({
                title: "Error",
                description: "Failed to delete post.",
                variant: "destructive",
            })
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
                <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                <Link to="/admin/blog/new">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Write New Post
                    </Button>
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900 rounded-xl border border-white/5">
                    <p className="text-zinc-500 mb-4">No blog posts found.</p>
                    <Link to="/admin/blog/new">
                        <Button variant="outline">Write your first post</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {post.cover_image ? (
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="h-16 w-24 object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="h-16 w-24 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-500 text-xs">
                                        No Cover
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <span className={`px-2 py-0.5 rounded ${post.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                                            {post.published ? "Published" : "Draft"}
                                        </span>
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {post.published && (
                                    <div className="mr-2">
                                        <Eye className="h-4 w-4 text-zinc-400 cursor-not-allowed" />
                                        {/* Link to public blog post will go here later */}
                                    </div>
                                )}
                                <Link to={`/admin/blog/${post.id}`}>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-white">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-900/10"
                                    onClick={() => handleDelete(post.id)}
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
