
import React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-full"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 0 : 1,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 0 : 1,
          opacity: theme === "light" ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-blue-500" />
      </motion.div>
    </Button>
  )
}
