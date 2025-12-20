
import React from "react"
import { Link } from "react-scroll"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-card pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-6">BrandIgnite</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transforming ideas into extraordinary digital experiences. We help businesses grow through innovative technology and strategic design.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Portfolio", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-1" />
                <span>Lucknow, Uttar Pradesh<br />India</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href="tel:+917266914546" className="hover:text-primary transition-colors">+91 726 691 4546</a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href="mailto:contact@brandignite.com" className="hover:text-primary transition-colors">contact@brandignite.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Ready to Start?</h4>
            <p className="text-muted-foreground mb-6">
              Get a free consultation for your next project.
            </p>
            <a
              href="https://wa.me/917266914546?text=Hi,%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full gradient-border group">
                Chat on WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 BrandIgnite. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
