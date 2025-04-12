
import React, { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const navItems = [
  { name: "Home", to: "home" },
  { name: "Services", to: "services" },
  { name: "Portfolio", to: "portfolio" },
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            DevAgency
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
            <a
              href="https://wa.me/917266914546?text=Hi,%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="gradient-border">Get a Quote</Button>
            </a>
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
              className="md:hidden"
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
                <a
                  href="https://wa.me/917266914546?text=Hi,%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button className="w-full gradient-border">Get a Quote</Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export { Navbar }
