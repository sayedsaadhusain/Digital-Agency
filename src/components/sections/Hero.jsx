
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-scroll"
import { ArrowRight } from "lucide-react"
import { ProjectForm } from "@/components/project-form"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        >
          <source
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/videos/tech-background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        <div className="particle-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                "--particle-size": `${Math.random() * 2 + 1}px`,
                "--particle-delay": `${Math.random() * 5}s`,
                "--particle-top": `${Math.random() * 100}%`,
                "--particle-left": `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold mb-6 neon-glow relative"
          >
            We Create{" "}
            <span className="gradient-text relative">
              Digital Futures
              <motion.span
                className="absolute -inset-1 rounded-lg bg-primary/20 blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto backdrop-blur-sm rounded-lg p-4"
          >
            Transforming ideas into extraordinary digital experiences with cutting-edge
            technology and innovative design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <ProjectForm />
            <Link to="portfolio" spy={true} smooth={true} offset={-100} duration={500}>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">View Our Work</span>
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { Hero }
