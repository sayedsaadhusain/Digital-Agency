
import React from "react"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Portfolio } from "@/components/sections/Portfolio"
import { About } from "@/components/sections/About"
import { Testimonials } from "@/components/sections/Testimonials"
import { Blog } from "@/components/sections/Blog"
import { ContactForm } from "@/components/sections/ContactForm"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="testimonials">
          <Testimonials />
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
