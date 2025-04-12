
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Code, Paintbrush, Search, Shield, Smartphone, Cloud, Database, ShoppingCart, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


const services = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored solutions built with cutting-edge technologies",
    plans: [
      {
        name: "Basic",
        price: "$999",
        features: ["Single Page Website", "Mobile Responsive", "3 Revisions", "5 Pages"]
      },
      {
        name: "Professional",
        price: "$2499",
        features: ["Multi-Page Website", "Mobile Responsive", "5 Revisions", "10 Pages", "SEO Optimization"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Custom Web Application", "Full Stack Development", "Unlimited Revisions", "Maintenance Support"]
      }
    ]
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    description: "Engaging, user-centered designs to enhance user experience",
    plans: [
      {
        name: "Starter",
        price: "$499",
        features: ["Landing Page Design", "2 Revisions", "Mobile Optimized"]
      },
      {
        name: "Professional",
        price: "$1199",
        features: ["Website Redesign", "5 Revisions", "Prototype + Wireframes"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Mobile App UI/UX", "Branding Consultation", "Unlimited Revisions"]
      }
    ]
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Boost your visibility and rankings on search engines",
    plans: [
      {
        name: "Starter",
        price: "$299",
        features: ["Basic SEO Audit", "Keyword Optimization", "Meta Tags Setup"]
      },
      {
        name: "Professional",
        price: "$799",
        features: ["On-Page SEO", "Off-Page SEO", "Content Optimization"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Full SEO Strategy", "Monthly Reporting", "Competitor Analysis"]
      }
    ]
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Protect your digital assets with industry-grade security",
    plans: [
      {
        name: "Basic",
        price: "$499",
        features: ["Vulnerability Assessment", "Firewall Setup", "Basic Monitoring"]
      },
      {
        name: "Professional",
        price: "$1299",
        features: ["Penetration Testing", "24/7 Threat Monitoring", "Security Hardening"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Full IT Security Management", "Custom Compliance Solutions", "Incident Response"]
      }
    ]
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Build scalable and powerful mobile applications",
    plans: [
      {
        name: "Basic",
        price: "$1999",
        features: ["Single Platform App", "Basic UI/UX", "3 Revisions"]
      },
      {
        name: "Professional",
        price: "$4999",
        features: ["iOS & Android App", "Custom UI/UX", "API Integration"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Full Stack Mobile Development", "Cloud Integration", "Ongoing Support"]
      }
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Empowering businesses with cloud technologies",
    plans: [
      {
        name: "Starter",
        price: "$399",
        features: ["Cloud Migration Consultation", "AWS/GCP Setup", "Basic Training"]
      },
      {
        name: "Professional",
        price: "$999",
        features: ["Cloud Architecture Design", "Load Balancing", "Backup Solutions"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Multi-Cloud Strategy", "DevOps Automation", "Full Management"]
      }
    ]
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Reliable and efficient database services",
    plans: [
      {
        name: "Basic",
        price: "$299",
        features: ["Database Setup", "Data Backup", "Performance Tuning"]
      },
      {
        name: "Professional",
        price: "$799",
        features: ["Data Migration", "Cloud Database Management", "Optimization Reports"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Database Scaling", "Data Security Services", "Advanced Analytics"]
      }
    ]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description: "Launch your online store with professional e-commerce solutions",
    plans: [
      {
        name: "Starter",
        price: "$999",
        features: ["Shopify Setup", "5 Products Listing", "Payment Gateway Integration"]
      },
      {
        name: "Professional",
        price: "$2499",
        features: ["Custom E-commerce Website", "Inventory Management", "Coupons & Discounts Setup"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Marketplace Development", "Multi-Vendor Support", "Full Store Management"]
      }
    ]
  },
  {
    icon: Users,
    title: "CRM Development",
    description: "Manage your customer relationships efficiently",
    plans: [
      {
        name: "Basic",
        price: "$699",
        features: ["Contact Management", "Lead Tracking", "Email Integration"]
      },
      {
        name: "Professional",
        price: "$1799",
        features: ["Sales Pipeline Automation", "Advanced Reporting", "Mobile Access"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Custom CRM Solutions", "Third-party Integrations", "Dedicated Support"]
      }
    ]
  }
];

export default services;


const Services = () => {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 neon-glow">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground">Comprehensive solutions for your digital needs</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg gradient-border card-glow hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <service.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text mb-4">
                  {selectedService.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedService.plans.map((plan, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-lg gradient-border"
                  >
                    <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                    <p className="text-2xl font-bold gradient-text mb-4">{plan.price}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export { Services }
