
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Send } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 neon-glow">
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-muted-foreground">Let's discuss your next project</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="gradient-border p-[1px] rounded-lg">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-none bg-card"
                />
              </div>
              <div className="gradient-border p-[1px] rounded-lg">
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-none bg-card"
                />
              </div>
              <div className="gradient-border p-[1px] rounded-lg">
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-none bg-card min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full gradient-border group">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          <div className="h-[500px] rounded-lg overflow-hidden gradient-border z-0">
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
                  DevAgency<br />
                  Lucknow, Uttar Pradesh
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { ContactForm }
