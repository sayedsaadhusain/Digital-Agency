import React, { useState } from "react"
import { motion } from "framer-motion"
import { Code, Paintbrush, Search, Shield, Smartphone, Cloud, Database, ShoppingCart, Users, Check, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
    title: "Cybersecurity",
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
    title: "Mobile Apps",
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
    title: "Database Mgmt",
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
    title: "E-commerce",
    description: "Launch your online store with professional solutions",
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

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive digital solutions tailored to elevate your business. From concept to execution, we deliver excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Plans <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[900px] bg-card/95 backdrop-blur-xl border-white/10">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold gradient-text mb-2 text-center">
                  {selectedService.title} Plans
                </DialogTitle>
                <p className="text-center text-muted-foreground mb-8">Choose the perfect plan for your needs</p>
              </DialogHeader>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedService.plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`relative p-6 rounded-xl border ${index === 1
                      ? 'bg-primary/10 border-primary/50 shadow-xl shadow-primary/10'
                      : 'bg-card/50 border-white/10'
                      }`}
                  >
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold gradient-text mb-6">{plan.price}</div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${index === 1 ? 'bg-primary' : 'variant-outline'}`}>
                      Get Started
                    </Button>
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
