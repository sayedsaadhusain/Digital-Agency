import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Map, Palette, Code, ShieldCheck, Rocket, Headphones, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RoadmapCard } from "./RoadmapCard"
import { ProjectKickoffModal } from "@/components/forms/ProjectKickoffModal"

const roadmapSteps = [
    {
        icon: Search,
        step: "01",
        title: "Discovery & Onboarding",
        goal: "Understand the business before writing code.",
        details: [
            "Requirement discussion",
            "Business goals & metrics",
            "Scope & tech stack",
            "NDA (if needed)"
        ],
        output: "Clear project plan + milestones",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        gradient: "from-blue-500/20 to-transparent",
        glow: "shadow-blue-500/20",
        dotColor: "bg-blue-500",
        glowColor: "bg-blue-500/30"
    },
    {
        icon: Map,
        step: "02",
        title: "Strategy & Planning",
        goal: "Avoid rework and wasted time.",
        details: [
            "Feature prioritization",
            "User flow & architecture",
            "Database & API planning",
            "Timeline & roadmap"
        ],
        output: "Technical blueprint + delivery plan",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        gradient: "from-purple-500/20 to-transparent",
        glow: "shadow-purple-500/20",
        dotColor: "bg-purple-500",
        glowColor: "bg-purple-500/30"
    },
    {
        icon: Palette,
        step: "03",
        title: "UI/UX Design",
        goal: "Design before development = faster delivery.",
        details: [
            "Wireframes & user journeys",
            "High-fidelity UI design",
            "Feedback & revisions",
            "Final design approval"
        ],
        output: "Production-ready UI designs",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        gradient: "from-pink-500/20 to-transparent",
        glow: "shadow-pink-500/20",
        dotColor: "bg-pink-500",
        glowColor: "bg-pink-500/30"
    },
    {
        icon: Code,
        step: "04",
        title: "Development Phase",
        goal: "Build scalable, clean, and secure software.",
        details: [
            "Frontend & backend dev",
            "API integration",
            "Authentication & roles",
            "Weekly progress updates"
        ],
        output: "Fully functional software modules",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        gradient: "from-orange-500/20 to-transparent",
        glow: "shadow-orange-500/20",
        dotColor: "bg-orange-500",
        glowColor: "bg-orange-500/30"
    },
    {
        icon: ShieldCheck,
        step: "05",
        title: "Testing & QA",
        goal: "Zero surprises after launch.",
        details: [
            "Functionality & edge cases",
            "Performance & responsiveness",
            "Security & data validation",
            "Bug fixes & refinements"
        ],
        output: "Stable, tested software",
        color: "text-green-500",
        bg: "bg-green-500/10",
        gradient: "from-green-500/20 to-transparent",
        glow: "shadow-green-500/20",
        dotColor: "bg-green-500",
        glowColor: "bg-green-500/30"
    },
    {
        icon: Rocket,
        step: "06",
        title: "Deployment & Launch",
        goal: "Smooth, stress-free launch.",
        details: [
            "Production deployment",
            "Domain & server setup",
            "Environment configuration",
            "Go-live support"
        ],
        output: "Live, production-ready application",
        color: "text-red-500",
        bg: "bg-red-500/10",
        gradient: "from-red-500/20 to-transparent",
        glow: "shadow-red-500/20",
        dotColor: "bg-red-500",
        glowColor: "bg-red-500/30"
    },
    {
        icon: Headphones,
        step: "07",
        title: "Support & Optimization",
        goal: "Long-term success, not just delivery.",
        details: [
            "Maintenance & updates",
            "Performance optimization",
            "Feature enhancements",
            "Monitoring & support"
        ],
        output: "Scalable software that grows",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        gradient: "from-teal-500/20 to-transparent",
        glow: "shadow-teal-500/20",
        dotColor: "bg-teal-500",
        glowColor: "bg-teal-500/30"
    }
]

const Roadmap = () => {
    const containerRef = useRef(null)
    const stepsRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: stepsRef,
        offset: ["start center", "end center"]
    })

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section className="py-24 bg-background relative" id="roadmap" ref={containerRef}>
            {/* Ambient Background */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] animate-float-delayed"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-24 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Our Process
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        From Onboarding to <span className="gradient-text">Results</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A structured, transparent, and efficient journey to transform your vision into a scalable digital reality.
                    </p>
                </motion.div>

                <div className="relative" ref={stepsRef}>
                    {/* Connecting Line (Desktop) */}

                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/30 to-border/40 transform -translate-x-1/2">
                        {/* Static Dashed Line */}
                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,currentColor_50%)] bg-[length:1px_12px] opacity-30 text-foreground" />

                        {/* Animated Gradient Fill */}
                        <motion.div
                            style={{ height }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_20px_2px_rgba(34,211,238,0.6)]"
                        />

                        {/* Sticky Spark Wrapper - Locks to Center of Viewport */}
                        <div className="sticky top-1/2 h-0 overflow-visible flex justify-center w-full">
                            <div className="absolute top-0 -translate-y-1/2 w-8 h-8 z-50">
                                <span className="absolute inset-0 bg-cyan-400/30 rounded-full animate-ping" />
                                <span className="relative block w-full h-full bg-white rounded-full blur-[2px] shadow-[0_0_50px_10px_rgba(255,255,255,0.9)] border-4 border-cyan-400/50" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-16 md:space-y-32 relative z-10">
                        {roadmapSteps.map((item, index) => (
                            <RoadmapCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center"
                >
                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative bg-card/80 backdrop-blur-2xl rounded-3xl md:rounded-full p-2 border border-primary/20">
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 px-8 py-8 md:py-8 rounded-2xl md:rounded-full bg-background/50">
                                <div className="text-left text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-1">Ready to scale?</h3>
                                    <p className="text-muted-foreground text-sm">Join the league of successful brands today.</p>
                                </div>
                                <div className="h-10 w-px bg-border hidden md:block" />
                                <ProjectKickoffModal>
                                    <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all hover:scale-105 cursor-pointer">
                                        Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </ProjectKickoffModal>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export { Roadmap }
