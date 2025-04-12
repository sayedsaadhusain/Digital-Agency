import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "Working with this team was an absolute game-changer for our business. Their innovative approach and technical expertise delivered results beyond our expectations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Michael Chen",
    role: "Founder, InnovateLab",
    content: "The attention to detail and commitment to excellence sets them apart. They didn't just build a website, they created a digital experience that our customers love.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    content: "Their strategic approach to web development helped us achieve our business goals. The results speak for themselves - our conversion rate has doubled.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
]

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-card p-8 rounded-2xl shadow-lg max-w-xl mx-auto"
  >
    <div className="flex items-center mb-6">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-14 h-14 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-muted-foreground italic">"{testimonial.content}"</p>
  </motion.div>
)

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Client <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Testimonials</span>
          </h2>
          <p className="text-gray-500 dark:text-muted-foreground">What our clients say about us</p>
        </motion.div>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            index === currentIndex && (
              <TestimonialCard key={index} testimonial={testimonial} />
            )
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-muted-foreground'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Testimonials }
