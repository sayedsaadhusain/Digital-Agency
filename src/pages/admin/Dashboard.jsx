import React from "react"
import { BarChart3, Users, FolderOpen, FileText } from "lucide-react"

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<BarChart3 />} label="Total Views" value="12,345" color="text-blue-400" />
                <StatCard icon={<Users />} label="Active Users" value="1,234" color="text-green-400" />
                <StatCard icon={<FolderOpen />} label="Projects" value="15" color="text-purple-400" />
                <StatCard icon={<FileText />} label="Blog Posts" value="8" color="text-orange-400" />
            </div>

            <div className="p-6 rounded-xl bg-zinc-900 border border-white/5">
                <h3 className="text-xl font-semibold mb-4 text-white">Recent Activity</h3>
                <p className="text-zinc-500">No recent activity to display.</p>
            </div>
        </div>
    )
}

const StatCard = ({ icon, label, value, color }) => (
    <div className="p-6 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between">
        <div>
            <p className="text-zinc-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-white/5 ${color}`}>{icon}</div>
    </div>
)
