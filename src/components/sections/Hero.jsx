import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Star, Phone } from "lucide-react"
import { Link } from "react-scroll"
import { AuditFormModal } from "@/components/forms/AuditFormModal"

const Hero = () => {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const words = [
    "High-Converting Websites",
    "Landing Pages That Sell",
    "E-commerce Stores",
    "Scalable Web Apps"
  ]

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length
      const fullText = words[i]

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 100)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, words])

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-20 overflow-hidden hero-pattern">
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
              <span className="text-sm font-medium text-white">Available for new projects</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight min-h-[160px] md:min-h-[220px] lg:min-h-[240px]">
              We Build <br />
              <span className="gradient-text">{text}</span>
              <span className="animate-pulse">|</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              We design and develop conversion-focused websites that attract customers, build trust, and increase revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <AuditFormModal>
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 cursor-pointer">
                  Get a Free Website Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </AuditFormModal>
              <Link to="portfolio" smooth={true} duration={500}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-border hover:bg-white/5">
                  See Case Studies →
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span>4.9★ client rating</span>
              <span className="mx-2">•</span>
              <span>Proven results</span>
              <span className="mx-2">•</span>
              <span>No hidden costs</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background/50 p-4 rounded-xl border border-border">
                  <div className="text-3xl font-bold gradient-text mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction (last 12 months)</div>
                </div>
                <div className="bg-background/50 p-4 rounded-xl border border-border">
                  <div className="text-3xl font-bold gradient-text mb-1">250+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered (E-commerce, Travel, SaaS, Local)</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    initial: "A",
                    title: "Outstanding Experience",
                    subtitle: "“Delivered exactly what we needed — fast, clean, and professional.”",
                    author: "Ayaan Khan · Founder, E-commerce Brand"
                  },
                  {
                    initial: "B",
                    title: "Highly Recommended",
                    subtitle: "“Our website conversion rate improved within weeks.”",
                    author: "Bilal Ahmad · Travel Business Owner"
                  },
                  {
                    initial: "C",
                    title: "Reliable & Skilled Team",
                    subtitle: "“Clear communication and on-time delivery. Will work again.”",
                    author: "Saif Ali · Service Startup"
                  }
                ].map((card, i) => (
                  <div key={i} className="flex items-start gap-4 bg-background/30 p-4 rounded-lg border border-border">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                      {card.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-sm">{card.title}</div>
                        <div className="flex shrink-0 ml-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic mb-2">{card.subtitle}</p>
                      <p className="text-xs font-medium text-primary/80 truncate">{card.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-float"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-float-delayed"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
