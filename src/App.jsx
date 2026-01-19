
import React from "react"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Roadmap } from "@/components/sections/Roadmap"
import { Portfolio } from "@/components/sections/Portfolio"
import { Pricing } from "@/components/sections/Pricing"
import { About } from "@/components/sections/About"
import { Testimonials } from "@/components/sections/Testimonials"
import { Blog } from "@/components/sections/Blog"
import { ContactForm } from "@/components/sections/ContactForm"
import { FAQ } from "@/components/sections/FAQ"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 cursor-none">
      <CustomCursor />
      <WhatsAppFloat />
      <Toaster />
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="roadmap">
          <Roadmap />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
