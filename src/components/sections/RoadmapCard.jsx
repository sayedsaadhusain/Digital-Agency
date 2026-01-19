import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export const RoadmapCard = ({ item, index }) => {
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { margin: "-50% 0px -50% 0px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }} // Keep original viewport for enter animation
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Content Side */}
            <div className={`w-full md:w-1/2 px-4 group ${isInView ? "active-step" : ""}`}>
                <div className={`
                    relative p-8 md:p-10 rounded-3xl 
                    bg-card/40 backdrop-blur-xl 
                    border duration-500 transition-all
                    ${isInView
                        ? "border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.15)] -translate-y-1"
                        : "border-white/10 dark:border-white/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                    }
                `}>
                    {/* Background Gradient - Activated by Scroll Position */}
                    <div className={`
                        absolute inset-0 bg-gradient-to-br ${item.gradient} 
                        transition-opacity duration-500 rounded-3xl
                        ${isInView ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    `} />

                    {/* Huge Step Number */}
                    <div className={`
                        absolute -right-4 -top-8 md:-right-8 md:-top-10 text-[8rem] md:text-[10rem] font-bold 
                        select-none pointer-events-none leading-none z-0 transition-colors duration-500
                        ${isInView ? "text-primary/10 dark:text-white/10" : "text-primary/5 dark:text-white/5"}
                    `}>
                        {item.step}
                    </div>

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className={`
                                h-16 w-16 rounded-2xl ${item.bg} 
                                flex items-center justify-center 
                                shadow-lg ${isInView ? item.glow + " scale-110 rotate-3" : item.glow}
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                            `}>
                                <item.icon className={`h-8 w-8 ${item.color}`} />
                            </div>
                            <div>
                                <h3 className={`text-2xl md:text-3xl font-bold mb-1 transition-colors ${isInView ? "text-primary" : "group-hover:text-primary"}`}>
                                    {item.title}
                                </h3>
                                <p className="text-sm font-semibold text-primary uppercase tracking-wider">{item.goal}</p>
                            </div>
                        </div>

                        {/* Details List */}
                        <ul className="space-y-4 mb-8">
                            {item.details.map((detail, i) => (
                                <li key={i} className={`flex items-center transition-colors duration-300 ${isInView ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} mr-3 ring-2 ring-transparent ${isInView ? `ring-${item.color.replace('text-', '')}/30` : `group-hover:ring-${item.color.replace('text-', '')}/30`}`} />
                                    <span className="text-base">{detail}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Output Box */}
                        <div className={`relative overflow-hidden rounded-xl bg-background/50 border p-4 transition-colors ${isInView ? "border-primary/40" : "border-border/50 group-hover:border-primary/20"}`}>
                            <div className="flex items-center justify-between relative z-10">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Deliverable</span>
                                <span className="text-sm font-bold gradient-text">{item.output}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Node (Desktop) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                <div className="relative">
                    <div className={`
                        w-16 h-16 rounded-full bg-background border-4 border-card shadow-2xl 
                        flex items-center justify-center z-10 relative transition-transform duration-500
                        ${isInView ? "scale-125 border-primary/30" : "group-hover:scale-110"}
                    `}>
                        <div className={`w-5 h-5 rounded-full ${item.dotColor} ${isInView ? "animate-none shadow-[0_0_20px_2px_currentColor]" : "animate-pulse"}`} />
                    </div>
                    {/* Glow behind node */}
                    <div className={`absolute inset-0 ${item.glowColor} blur-xl rounded-full transition-opacity duration-500 ${isInView ? "opacity-100 scale-150" : "opacity-50"}`} />
                </div>
            </div>

            {/* Empty Side */}
            <div className="w-full md:w-1/2 hidden md:block" />
        </motion.div>
    )
}
