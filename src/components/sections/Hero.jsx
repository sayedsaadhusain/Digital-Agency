import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Star, Phone } from "lucide-react"
import { Link } from "react-scroll"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden hero-pattern">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6 border border-primary/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-primary-foreground/80">Available for new projects</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              We Build <span className="gradient-text">Digital Products</span> That Drive Growth
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Transform your business with high-converting websites and applications. We combine stunning design with cutting-edge technology to deliver results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25">
                  Book 1:1 Call
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="portfolio" smooth={true} duration={500}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-white/10 hover:bg-white/5">
                  View Our Work
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="text-3xl font-bold gradient-text mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="text-3xl font-bold gradient-text mb-1">250+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 bg-background/30 p-3 rounded-lg border border-white/5">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <div className="font-medium">Project Success</div>
                      <div className="text-xs text-muted-foreground">Delivered on time and budget</div>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
