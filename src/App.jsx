import React from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { LandingPage } from "@/pages/LandingPage"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { AdminLogin } from "@/pages/admin/Login"
import { Dashboard } from "@/pages/admin/Dashboard"

import { BlogList } from "@/pages/admin/BlogList"
import { BlogEditor } from "@/pages/admin/BlogEditor"
import { ProjectsList } from "@/pages/admin/ProjectsList"
import { ProjectForm } from "@/pages/admin/ProjectForm"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id" element={<ProjectForm />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/:id" element={<BlogEditor />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App


