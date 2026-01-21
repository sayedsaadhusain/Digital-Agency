import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto space-y-8"
            >
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-9xl font-bold gradient-text"
                >
                    404
                </motion.h1>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link to="/">
                        <Button size="lg" className="w-full sm:w-auto gap-2 group">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <button onClick={() => window.history.back()}>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 group bg-background/50 backdrop-blur-sm">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </Button>
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
