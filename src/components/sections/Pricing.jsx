import React from "react"
import { motion } from "framer-motion"
import { Check, Clock, Zap, Star, Shield, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"

const packages = [
    {
        name: "Basic Package",
        subtitle: "Starter Presence",
        price: "₹8,999 – ₹12,999",
        description: "Best for: Individuals, small businesses, startups",
        icon: Layout,
        features: [
            "1–5 Page Modern Website",
            "Mobile Responsive Design",
            "Clean & Professional UI",
            "Basic Animations",
            "Contact Form Integration",
            "WhatsApp Chat Button",
            "Basic SEO Setup",
            "Fast Loading Optimization",
        ],
        delivery: "5–7 Days",
        popular: false,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        name: "Standard Package",
        subtitle: "Business Growth",
        price: "₹18,999 – ₹25,999",
        description: "Best for: Growing businesses, service providers",
        icon: Zap,
        features: [
            "5–10 Page Website",
            "Premium UI/UX Design",
            "Conversion-Optimized Layout",
            "Advanced Animations & Micro-Interactions",
            "Lead Capture Forms + CTA Strategy",
            "WhatsApp + Email Integration",
            "On-Page SEO (Meta, Speed, Structure)",
            "Google Analytics Setup",
            "Testimonials & Trust Sections",
        ],
        delivery: "7–12 Days",
        popular: true,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        name: "Premium Package",
        subtitle: "High-Conversion Authority",
        price: "₹39,999 – ₹65,999",
        description: "Best for: Brands, agencies, ecommerce, serious founders",
        icon: Star,
        features: [
            "Fully Custom Website (Unlimited Pages)",
            "Premium Brand-Focused UI/UX",
            "High-Conversion Landing Pages",
            "Advanced Animations (GSAP / Framer Motion)",
            "CRM-Ready Lead System",
            "WhatsApp, Email & Call CTAs",
            "Advanced SEO + Performance Optimization",
            "Security Setup + SSL Guidance",
            "Blog / CMS Integration",
            "Payment Gateway (if required)",
            "30 Days Free Support",
        ],
        delivery: "15–25 Days",
        popular: false,
        gradient: "from-orange-500 to-red-500"
    }
]

const addOns = [
    "Domain & Hosting Setup",
    "Monthly Maintenance",
    "Content Writing",
    "Logo & Branding",
    "Ads Landing Page",
    "Speed Boost (90+ PageSpeed)"
]

const Pricing = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="pricing">
            {/* Background Decor */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Transparent <span className="gradient-text">Pricing</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the perfect package for your business goals. No hidden fees, just results.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative bg-card rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${pkg.popular
                                    ? "border-primary/50 shadow-primary/10 scale-105 z-10"
                                    : "border-white/5 hover:border-primary/20"
                                }`}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        MOST POPULAR
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${pkg.gradient} bg-opacity-10 mb-6`}>
                                    <pkg.icon className="h-6 w-6 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                                <div className="text-sm font-medium text-primary mb-4">{pkg.subtitle}</div>
                                <div className="text-3xl font-bold mb-4">{pkg.price}</div>
                                <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 bg-secondary/50 p-3 rounded-lg">
                                    <Clock className="h-4 w-4" />
                                    <span>Delivery: <span className="font-semibold text-foreground">{pkg.delivery}</span></span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {pkg.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1">
                                                <Check className={`h-4 w-4 text-green-500`} />
                                            </div>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button className={`w-full h-12 text-white bg-gradient-to-r ${pkg.gradient} hover:opacity-90 transition-opacity border-0`}>
                                    Select Package
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Add-ons & Included */}
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-card/50 rounded-2xl p-8 border border-white/5"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-500" />
                            All Packages Include
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Clean, modern design",
                                "Mobile & tablet optimized",
                                "Cross-browser compatibility",
                                "Basic security best practices",
                                "Ownership of source files"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-card/50 rounded-2xl p-8 border border-white/5"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Layout className="h-5 w-5 text-purple-500" />
                            Optional Add-Ons
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {addOns.map((addon, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                    {addon}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export { Pricing }
