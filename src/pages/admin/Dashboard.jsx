import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BarChart3, Users, FolderOpen, FileText, Loader2, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"

export const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        posts: 0,
        views: 0, // Placeholder
        users: 0 // Placeholder
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { count: projectCount, error: projectError } = await supabase
                    .from('projects')
                    .select('*', { count: 'exact', head: true })

                const { count: postCount, error: postError } = await supabase
                    .from('posts')
                    .select('*', { count: 'exact', head: true })

                if (projectError) throw projectError
                if (postError) throw postError

                setStats(prev => ({
                    ...prev,
                    projects: projectCount || 0,
                    posts: postCount || 0
                }))
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<FolderOpen />} label="Projects" value={stats.projects} color="text-purple-400" bg="bg-purple-400/10" />
                <StatCard icon={<FileText />} label="Blog Posts" value={stats.posts} color="text-orange-400" bg="bg-orange-400/10" />
                <StatCard icon={<Users />} label="Users" value="24" color="text-green-400" bg="bg-green-400/10" />
                <StatCard icon={<BarChart3 />} label="Total Views" value="1.2k" color="text-blue-400" bg="bg-blue-400/10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/admin/projects/new" className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors mr-3">
                                <Plus className="h-4 w-4" />
                            </div>
                            <span className="text-zinc-300 group-hover:text-white">Add New Project</span>
                        </Link>
                        <Link to="/admin/blog/new" className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="p-2 rounded-md bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors mr-3">
                                <FileText className="h-4 w-4" />
                            </div>
                            <span className="text-zinc-300 group-hover:text-white">Write New Post</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-zinc-400">Database Connection</span>
                            </div>
                            <span className="text-green-400 text-sm font-medium">Operational</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-zinc-400">API Gateway</span>
                            </div>
                            <span className="text-green-400 text-sm font-medium">Operational</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-zinc-400">CDN</span>
                            </div>
                            <span className="text-green-400 text-sm font-medium">Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StatCard = ({ icon, label, value, color, bg }) => (
    <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all hover:shadow-lg hover:shadow-black/50 backdrop-blur-sm group">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-zinc-500 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-white mt-1 group-hover:scale-105 transition-transform origin-left">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${bg} ${color}`}>{icon}</div>
        </div>
    </div>
)
