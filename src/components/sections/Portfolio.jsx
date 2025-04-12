
import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const projects = [
  {
    title: "E-commerce Platform",
    description: "Next-gen shopping experience with advanced features including real-time inventory management, AI-powered product recommendations, and seamless payment integration.",
    image: "https://images.unsplash.com/photo-1539278383962-a7774385fa02",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    features: [
      "Real-time inventory tracking",
      "AI product recommendations",
      "Multi-currency support",
      "Advanced analytics dashboard"
    ]
  },
  {
    title: "Mobile Banking App",
    description: "Secure financial solutions with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    image: "https://images.unsplash.com/photo-1575195662509-43c05a6b0b1f",
    category: "Mobile App",
    technologies: ["React Native", "Firebase", "Redux", "Plaid API"],
    features: [
      "Biometric security",
      "Real-time transactions",
      "Budget tracking",
      "Investment portfolio"
    ]
  },
  {
    title: "AI Analytics Dashboard",
    description: "Data visualization platform with machine learning insights, predictive analytics, and customizable reporting tools.",
    image: "https://images.unsplash.com/photo-1697256200022-f61abccad430",
    category: "Web Application",
    technologies: ["Vue.js", "Python", "TensorFlow", "D3.js"],
    features: [
      "ML-powered insights",
      "Custom report builder",
      "Real-time monitoring",
      "Predictive analytics"
    ]
  },
  {
    title: "Healthcare Platform",
    description: "Digital health solutions featuring telemedicine integration, electronic health records, and patient management system.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    category: "Web Development",
    technologies: ["Angular", "Java Spring", "PostgreSQL", "WebRTC"],
    features: [
      "Video consultations",
      "Electronic health records",
      "Appointment scheduling",
      "Prescription management"
    ]
  },
  {
    title: "Smart Home System",
    description: "IoT control interface with automated scheduling, energy monitoring, and voice command integration.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    category: "IoT",
    technologies: ["React", "Node.js", "MQTT", "WebSocket"],
    features: [
      "Device automation",
      "Energy monitoring",
      "Voice commands",
      "Security controls"
    ]
  },
  {
    title: "Educational Platform",
    description: "E-learning solution with interactive courses, progress tracking, and virtual classroom capabilities.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
    category: "Web Application",
    technologies: ["Next.js", "GraphQL", "MongoDB", "WebRTC"],
    features: [
      "Interactive courses",
      "Progress tracking",
      "Virtual classrooms",
      "Assignment management"
    ]
  }
]

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 neon-glow">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground">Showcasing our best work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg gradient-border cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                src={project.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                <div>
                  <span className="text-primary text-sm font-medium mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text mb-4">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">About the Project</h4>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export { Portfolio }
