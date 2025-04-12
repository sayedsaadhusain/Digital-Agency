
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
    <section id="about" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 neon-glow">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine creativity, technical expertise, and strategic thinking to deliver
            exceptional digital solutions that drive real business results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stat.delay }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg gradient-border text-center card-glow"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <motion.h3
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: stat.delay }}
                className="text-3xl font-bold mb-2"
              >
                {stat.value}
              </motion.h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img  alt="Team collaboration" className="rounded-lg w-full" src="https://images.unsplash.com/photo-1676369010695-70c5fce8ae31" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-4xl font-bold">
              Transforming Ideas into
              <span className="gradient-text block">Digital Excellence</span>
            </h3>
            <p className="text-muted-foreground">
              With over 8 years of experience in web development, we've helped businesses
              of all sizes establish their digital presence and achieve their goals.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-3" />
                Expert team of developers and designers
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-3" />
                Cutting-edge technology stack
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-3" />
                Agile development methodology
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-3" />
                Continuous support and maintenance
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { About }
