import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const ContactForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const position = [26.8467, 80.9462] // Lucknow coordinates

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Success!",
      description: "Your message has been sent. We'll get back to you soon!"
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="text-left mb-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Let's Work <span className="gradient-text">Together</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to transform your digital presence? Send us a message and let's discuss how we can help your business grow.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Visit Us</h4>
                    <p className="text-muted-foreground">Lucknow, Uttar Pradesh, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    <p className="text-muted-foreground">sayedsaadhusain@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Call Us</h4>
                    <p className="text-muted-foreground">+91 726 691 4546</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="gradient-border p-[1px] rounded-lg bg-card focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-none bg-background h-14 pl-6 text-lg"
                />
              </div>
              <div className="gradient-border p-[1px] rounded-lg bg-card focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-none bg-background h-14 pl-6 text-lg"
                />
              </div>
              <div className="gradient-border p-[1px] rounded-lg bg-card focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-none bg-background min-h-[150px] p-6 text-lg resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg h-14 gradient-border group">
                Send Message
                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden gradient-border">
            <div className="absolute inset-0 z-0">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    <div className="font-semibold text-center">
                      BrandIgnite HQ<br />
                      <span className="text-xs text-muted-foreground">Digital Excellence Hub</span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            {/* Overlay for aesthetic */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { ContactForm }
