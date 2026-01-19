import React from "react"
import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How long does it take to build a website?",
        answer: "The timeline depends on the complexity of the project. A basic website typically takes 1-2 weeks, while more complex custom solutions can take 4-8 weeks. We provide a detailed timeline during our initial consultation."
    },
    {
        question: "Do you provide ongoing support and maintenance?",
        answer: "Yes, we offer comprehensive maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. We're here to support your long-term success."
    },
    {
        question: "What is your pricing structure?",
        answer: "We offer both fixed-price packages and custom quotes based on project requirements. Our goal is to provide transparent pricing that delivers maximum value for your investment."
    },
    {
        question: "Can you help with SEO and content?",
        answer: "Absolutely! We build all our websites with SEO best practices in mind. We also offer dedicated SEO services and content creation to help you rank higher and engage your audience."
    },
    {
        question: "Do you work with international clients?",
        answer: "Yes, we work with clients globally. We use modern communication tools to ensure smooth collaboration regardless of your location."
    }
]

const FAQ = () => {
    return (
        <section className="py-24 bg-background/50">
            <div className="container mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Got questions? We've got answers.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border p-8"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-border">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}

export { FAQ }
