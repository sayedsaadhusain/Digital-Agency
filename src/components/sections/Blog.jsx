
import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const posts = [
  {
    title: "The Future of Web Development: Trends to Watch",
    excerpt: "Explore the latest trends shaping the future of web development and stay ahead of the curve.",
    content: `Web development is constantly evolving, with new technologies and methodologies emerging regularly. 
    This article explores key trends that are shaping the future of web development, including:
    
    1. Progressive Web Apps (PWAs)
    2. JAMstack Architecture
    3. Serverless Computing
    4. AI and Machine Learning Integration
    5. WebAssembly
    
    Understanding these trends is crucial for developers and businesses looking to stay competitive in the digital landscape.`,
    date: "2025-04-01",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd"
  },
  {
    title: "Why UX Design Matters More Than Ever",
    excerpt: "Dive into the significance of user experience design and how it impacts modern digital products.",
    content: `In an increasingly competitive market, user experience (UX) design plays a pivotal role in determining the success of a digital product.
    This article covers:
    
    1. Core principles of UX design
    2. How good UX increases customer retention
    3. Examples of successful UX implementations
    4. Tools and strategies for improving UX
    
    Delivering an exceptional user experience is no longer optional; it’s essential for brand loyalty and business growth.`,
    date: "2025-04-05",
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702"
  },
  {
    title: "A Beginner's Guide to API Integration",
    excerpt: "Learn how APIs work and how you can integrate them into your projects to unlock powerful features.",
    content: `APIs (Application Programming Interfaces) allow different software systems to communicate and share data seamlessly. 
    This guide explains:
    
    1. What APIs are and why they matter
    2. Common types of APIs (REST, GraphQL, SOAP)
    3. How to authenticate and consume APIs
    4. Best practices for secure API integration
    
    Mastering API integration is crucial for modern developers aiming to build feature-rich and scalable applications.`,
    date: "2025-04-10",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
  // ... (rest of the posts array)
]

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 neon-glow">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-muted-foreground">Stay updated with our latest thoughts and innovations</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden gradient-border group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <time className="text-sm text-primary mb-2 block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button 
                  variant="ghost" 
                  className="group"
                  onClick={() => setSelectedPost(post)}
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text mb-4">
                  {selectedPost.title}
                </DialogTitle>
                <time className="text-sm text-primary">
                  {new Date(selectedPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line">{selectedPost.content}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export { Blog }
