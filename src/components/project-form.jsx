import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import emailjs from '@emailjs/browser'; // 👈 Import emailjs

export function ProjectForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // (Optional) Initialize EmailJS
      emailjs.init('4QjGJBWA5_ArTsvgU'); // 👈 Add your Public Key here

      // Send email
      await emailjs.send('service_014o7sn', 'template_49etpd9', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      // Send to WhatsApp
      const whatsappNumber = '917266914546';
      const fullMessage = `Hello, I want to start a project!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');

      toast({
        title: "Success!",
        description: "Your project request has been sent. We'll contact you soon!"
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setOpen(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gradient-border group relative overflow-hidden">
          <span className="relative z-10">Start Your Project</span>
          <motion.div
            className="absolute inset-0 bg-primary/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
          />
          <Send className="ml-2 h-4 w-4 relative z-10" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Start Your Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-input bg-background"
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border-input bg-background"
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border-input bg-background"
          />
          <Textarea
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="border-input bg-background min-h-[100px]"
          />
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-border">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
