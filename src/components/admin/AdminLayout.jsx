import React, { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { LayoutDashboard, FolderKanban, FileEdit, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const AdminLayout = () => {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
            if (!session) {
                navigate("/admin/login")
            }
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (!session) {
                navigate("/admin/login")
            }
        })

        return () => subscription.unsubscribe()
    }, [navigate])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate("/admin/login")
    }

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!session) return null // Should redirect

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
                <div className="mb-10 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
                    <span className="font-bold text-xl">Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active={location.pathname === "/admin/dashboard"} />
                    <NavItem to="/admin/projects" icon={<FolderKanban size={20} />} label="Projects" active={location.pathname.startsWith("/admin/projects")} />
                    <NavItem to="/admin/blog" icon={<FileEdit size={20} />} label="Blog" active={location.pathname.startsWith("/admin/blog")} />
                </nav>

                <Button variant="ghost" className="justify-start gap-2 text-white/60 hover:text-red-400 hover:bg-red-900/10" onClick={handleLogout}>
                    <LogOut size={20} />
                    Logout
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-neutral-950/50 p-8">
                <Outlet />
            </main>
        </div>
    )
}

const NavItem = ({ to, icon, label, active }) => (
    <Link to={to}>
        <Button
            variant="ghost"
            className={`w-full justify-start gap-3 mb-1 ${active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
        >
            {icon}
            {label}
        </Button>
    </Link>
)
