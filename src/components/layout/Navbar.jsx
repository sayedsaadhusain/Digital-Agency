
import React, { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { ProjectKickoffModal } from "@/components/forms/ProjectKickoffModal"

const navItems = [
  { name: "Home", to: "home" },
  { name: "Services", to: "services" },
  { name: "Portfolio", to: "portfolio" },
  { name: "Pricing", to: "pricing" },
  { name: "About", to: "about" },
  { name: "Testimonials", to: "testimonials" },
  { name: "Blog", to: "blog" },
  { name: "Contact", to: "contact" }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            BrandIgnite
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 z-10">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            <ProjectKickoffModal>
              <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 hover:opacity-90 transition-opacity">Start Project</Button>
            </ProjectKickoffModal>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="block text-sm font-medium text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <ProjectKickoffModal>
                  <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 hover:opacity-90 transition-opacity">Start Project</Button>
                </ProjectKickoffModal>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export { Navbar }
