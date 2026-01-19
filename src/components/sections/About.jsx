import React from "react"
import { motion } from "framer-motion"
import { Award, Users, Clock, Zap } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: "250+",
    label: "Projects Completed",
    delay: 0.2
  },
  {
    icon: Users,
    value: "120+",
    label: "Happy Clients",
    delay: 0.4
  },
  {
    icon: Clock,
    value: "8+",
    label: "Years Experience",
    delay: 0.6
  },
  {
    icon: Zap,
    value: "24/7",
    label: "Support Available",
    delay: 0.8
  }
]

const About = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">BrandIgnite</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            We combine creativity, technical expertise, and strategic thinking to deliver
            exceptional digital solutions that drive real business results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stat.delay }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border text-center group hover:border-primary/20 transition-all duration-300"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <motion.h3
                className="text-4xl font-bold mb-2 gradient-text"
              >
                {stat.value}
              </motion.h3>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30" />
            <img
              alt="Team collaboration"
              className="relative rounded-2xl w-full shadow-2xl border border-border"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              Transforming Ideas into
              <span className="gradient-text block mt-2">Digital Excellence</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              With over 8 years of experience in web development, we've helped businesses
              of all sizes establish their digital presence and achieve their goals. Our passion for innovation drives everything we do.
            </p>
            <ul className="space-y-4">
              {[
                "Expert team of developers and designers",
                "Cutting-edge technology stack",
                "Agile development methodology",
                "Continuous support and maintenance"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-lg">
                  <span className="h-2 w-2 rounded-full bg-primary mr-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { About }
