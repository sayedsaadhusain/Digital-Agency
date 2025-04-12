
import React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const Carousel = ({ items, className }) => {
  const [current, setCurrent] = React.useState(0)

  const prev = () => setCurrent((current) => (current === 0 ? items.length - 1 : current - 1))
  const next = () => setCurrent((current) => (current === items.length - 1 ? 0 : current + 1))

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {items[current]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === current ? "bg-primary" : "bg-primary/20"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

export { Carousel }
